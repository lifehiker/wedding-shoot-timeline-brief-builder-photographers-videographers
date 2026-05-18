"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { approvalNotice } from "@/lib/email";
import { logEvent } from "@/lib/events";

export async function submitApproval(token: string, formData: FormData) {
  const project = await prisma.weddingProject.findUnique({ where: { approvalToken: token }, include: { studio: true } });
  if (!project) redirect("/");
  const status = String(formData.get("status") || "Approved");
  const comments = String(formData.get("comments") || "");
  await prisma.clientApproval.create({
    data: {
      projectId: project.id,
      status,
      comments,
      approvedAt: status === "Approved" ? new Date() : null,
      requestedAt: status !== "Approved" ? new Date() : null,
    },
  });
  await prisma.weddingProject.update({ where: { id: project.id }, data: { status: status === "Approved" ? "Approved" : "Ready for approval" } });
  await approvalNotice(project.studio.contactEmail, project.id, status);
  await logEvent("approval_completed", project.studioId, { projectId: project.id, status });
  redirect(`/approve/${token}?done=1`);
}
