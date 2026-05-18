import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { ProductionBriefPdf } from "@/lib/pdf/ProductionBriefPdf";
import { prisma } from "@/lib/prisma";
import { logEvent } from "@/lib/events";

export async function exportPdf(id: string, kind: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const project = await prisma.weddingProject.findFirst({
    where: { id, studio: { userId: session.user.id } },
    include: { studio: true, timelineItems: { orderBy: { sortOrder: "asc" } }, shotListItems: { orderBy: { sortOrder: "asc" } }, familyFormalGroups: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const blob = await pdf(<ProductionBriefPdf project={project} studio={project.studio} timeline={project.timelineItems} shots={project.shotListItems} formals={project.familyFormalGroups} type={kind} />).toBlob();
  await prisma.exportLog.create({ data: { projectId: id, type: kind } });
  await logEvent("pdf_exported", project.studioId, { projectId: id, kind });
  return new NextResponse(blob, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${kind}-${project.coupleName1}-${project.coupleName2}.pdf"`,
    },
  });
}
