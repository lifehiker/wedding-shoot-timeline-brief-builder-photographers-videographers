import { prisma } from "@/lib/prisma";

export async function logEvent(type: string, studioId?: string | null, payload?: unknown) {
  try {
    await prisma.eventLog.create({
      data: {
        type,
        studioId: studioId || undefined,
        payload: payload ? JSON.stringify(payload) : undefined,
      },
    });
  } catch (error) {
    console.warn("[events] failed", type, error);
  }
}
