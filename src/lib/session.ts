import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  return prisma.user.findUnique({
    where: { id: session.user.id },
    include: { studios: { include: { subscription: true } } },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireStudio() {
  const user = await requireUser();
  let studio = user.studios[0];
  if (!studio) {
    studio = await prisma.studio.create({
      data: {
        userId: user.id,
        name: user.name ? `${user.name}'s Studio` : "Wedding Studio",
        contactEmail: user.email,
        subscription: { create: { plan: "trial", status: "trialing" } },
      },
      include: { subscription: true },
    });
  }
  return { user, studio };
}

export async function requireProject(id: string) {
  const { studio } = await requireStudio();
  const project = await prisma.weddingProject.findFirst({
    where: { id, studioId: studio.id },
    include: {
      questionnaire: true,
      timelineItems: { orderBy: { sortOrder: "asc" } },
      shotListItems: { orderBy: { sortOrder: "asc" } },
      familyFormalGroups: { orderBy: { sortOrder: "asc" } },
      briefDocuments: true,
      approvals: { orderBy: { createdAt: "desc" } },
      studio: true,
    },
  });
  if (!project) redirect("/projects");
  return { studio, project };
}
