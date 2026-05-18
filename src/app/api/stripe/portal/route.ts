import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { appUrl } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.redirect(appUrl("/login"));
  const studio = await prisma.studio.findFirst({ where: { userId: session.user.id }, include: { subscription: true } });
  if (!process.env.STRIPE_SECRET_KEY || !studio?.subscription?.stripeCustomerId) {
    return NextResponse.json({ ok: true, message: "Stripe billing portal is not configured yet." });
  }
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const portal = await stripe.billingPortal.sessions.create({ customer: studio.subscription.stripeCustomerId, return_url: appUrl("/billing") });
  return NextResponse.redirect(portal.url);
}
