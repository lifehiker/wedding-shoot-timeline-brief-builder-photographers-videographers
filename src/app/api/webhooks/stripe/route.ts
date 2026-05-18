import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logEvent } from "@/lib/events";

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: true, skipped: "stripe-not-configured" });
  }
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: Record<string, string>; customer?: string; subscription?: string };
    const studioId = session.metadata?.studioId;
    if (studioId) {
      await prisma.subscription.upsert({
        where: { studioId },
        update: { plan: session.metadata?.plan || "solo", status: "active", stripeCustomerId: String(session.customer || ""), stripeSubscriptionId: String(session.subscription || "") },
        create: { studioId, plan: session.metadata?.plan || "solo", status: "active", stripeCustomerId: String(session.customer || ""), stripeSubscriptionId: String(session.subscription || "") },
      });
      await logEvent("subscription_started", studioId, { plan: session.metadata?.plan });
    }
  }
  return NextResponse.json({ received: true });
}
