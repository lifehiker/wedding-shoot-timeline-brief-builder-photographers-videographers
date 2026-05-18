import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { appUrl } from "@/lib/utils";
import { logEvent } from "@/lib/events";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.redirect(appUrl("/login"));
  const plan = request.nextUrl.searchParams.get("plan") || "solo";
  const price = plan === "team" ? process.env.STRIPE_PRICE_TEAM : plan === "studio" ? process.env.STRIPE_PRICE_STUDIO : process.env.STRIPE_PRICE_SOLO;
  const studio = await prisma.studio.findFirst({ where: { userId: session.user.id } });
  if (!process.env.STRIPE_SECRET_KEY || !price || !studio) {
    return NextResponse.json({ ok: true, message: "Stripe is not configured. Add Stripe credentials to enable checkout.", plan });
  }
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    success_url: appUrl("/billing?success=1"),
    cancel_url: appUrl("/billing?canceled=1"),
    metadata: { studioId: studio.id, plan },
  });
  await logEvent("stripe_checkout_started", studio.id, { plan });
  return NextResponse.redirect(checkout.url || appUrl("/billing"));
}
