import type { Studio, Subscription } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function isPaid(subscription?: Subscription | null) {
  return Boolean(subscription && ["active", "trialing"].includes(subscription.status) && subscription.plan !== "trial");
}

export async function canCreateProject(studio: Studio & { subscription?: Subscription | null }) {
  if (isPaid(studio.subscription)) return { ok: true };
  const count = await prisma.weddingProject.count({ where: { studioId: studio.id, archived: false } });
  return count < 1 ? { ok: true } : { ok: false, reason: "Free workspaces can keep one active demo project. Upgrade to create more." };
}
