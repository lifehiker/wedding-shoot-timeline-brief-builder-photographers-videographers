"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireProject } from "@/lib/session";
import { toJson } from "@/lib/utils";

function rows(formData: FormData, fields: string[]) {
  const count = Number(formData.get("rowCount") || 0);
  return Array.from({ length: count }, (_, i) => {
    const row: Record<string, string | boolean | number> = { sortOrder: Number(formData.get(`sortOrder-${i}`) || i) };
    for (const field of fields) {
      row[field] = field === "isMustHave" ? formData.get(`${field}-${i}`) === "on" : String(formData.get(`${field}-${i}`) || "");
    }
    return row;
  }).filter((row) => Object.values(row).some((v) => typeof v === "string" && v.trim()));
}

export async function saveTimeline(id: string, formData: FormData) {
  const { project } = await requireProject(id);
  await prisma.timelineItem.deleteMany({ where: { projectId: project.id } });
  await prisma.timelineItem.createMany({ data: rows(formData, ["time", "title", "description", "location", "responsibleParty"]).map((row) => ({ ...row, projectId: id })) as never });
  revalidatePath(`/projects/${id}/timeline`);
}

export async function saveShotList(id: string, formData: FormData) {
  const { project } = await requireProject(id);
  await prisma.shotListItem.deleteMany({ where: { projectId: project.id } });
  await prisma.shotListItem.createMany({ data: rows(formData, ["section", "label", "notes", "isMustHave"]).map((row) => ({ ...row, projectId: id })) as never });
  revalidatePath(`/projects/${id}/shot-list`);
}

export async function saveFamilyFormals(id: string, formData: FormData) {
  const { project } = await requireProject(id);
  await prisma.familyFormalGroup.deleteMany({ where: { projectId: project.id } });
  await prisma.familyFormalGroup.createMany({ data: rows(formData, ["label", "people", "notes"]).map((row) => ({ ...row, projectId: id })) as never });
  revalidatePath(`/projects/${id}/family-formals`);
}

export async function saveBrief(id: string, type: string, formData: FormData) {
  await requireProject(id);
  const content: Record<string, string> = {};
  for (const [key, value] of formData.entries()) content[key] = String(value);
  await prisma.briefDocument.upsert({
    where: { projectId_type: { projectId: id, type } },
    update: { contentJson: toJson(content) },
    create: { projectId: id, type, title: type === "reel-brief" ? "Instagram reel brief" : "Editor handoff notes", contentJson: toJson(content) },
  });
  revalidatePath(`/projects/${id}/${type === "reel-brief" ? "reel-brief" : "editor-notes"}`);
}
