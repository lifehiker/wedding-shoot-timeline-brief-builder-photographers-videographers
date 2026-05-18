"use server";

import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireProject, requireStudio } from "@/lib/session";
import { canCreateProject } from "@/lib/subscription";
import { defaultQuestionnaire } from "@/lib/default-questionnaire";
import { generateTimeline } from "@/lib/generators/timeline";
import { generateShotList } from "@/lib/generators/shot-list";
import { generateFamilyFormals, splitLines } from "@/lib/generators/family-formals";
import { generateReelBrief } from "@/lib/generators/reel-brief";
import { generateEditorNotes } from "@/lib/generators/editor-notes";
import { approvalEmail, questionnaireEmail } from "@/lib/email";
import { logEvent } from "@/lib/events";
import { appUrl, parseJson, toJson } from "@/lib/utils";

function formString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function signupAction(formData: FormData) {
  const name = formString(formData, "name");
  const email = formString(formData, "email").toLowerCase();
  const password = formString(formData, "password");
  if (!email || password.length < 8) redirect("/signup?error=Use+a+valid+email+and+8+character+password");
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) redirect("/login?created=1");
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      studios: {
        create: {
          name: name ? `${name}'s Studio` : "Wedding Studio",
          contactEmail: email,
          subscription: { create: { plan: "trial", status: "trialing" } },
        },
      },
    },
    include: { studios: true },
  });
  await logEvent("signup", user.studios[0]?.id, { email });
  redirect("/login?created=1");
}

export async function createProject(formData: FormData) {
  const { studio } = await requireStudio();
  const allowed = await canCreateProject(studio);
  if (!allowed.ok) redirect(`/projects/new?error=${encodeURIComponent(allowed.reason || "Upgrade required")}`);
  const coupleName1 = formString(formData, "coupleName1") || "Partner One";
  const coupleName2 = formString(formData, "coupleName2") || "Partner Two";
  const weddingDate = formString(formData, "weddingDate");
  const project = await prisma.weddingProject.create({
    data: {
      studioId: studio.id,
      coupleName1,
      coupleName2,
      weddingDate: weddingDate ? new Date(`${weddingDate}T12:00:00`) : undefined,
      venueName: formString(formData, "venueName"),
      ceremonyLocation: formString(formData, "ceremonyLocation"),
      receptionLocation: formString(formData, "receptionLocation"),
      ceremonyTime: formString(formData, "ceremonyTime"),
      receptionTime: formString(formData, "receptionTime"),
      packageName: formString(formData, "packageName"),
      deliverablesJson: toJson(splitLines(formString(formData, "deliverables"))),
      vendorContactsJson: toJson(splitLines(formString(formData, "vendors"))),
      musicPreferences: formString(formData, "musicPreferences"),
      familyMembersJson: toJson(splitLines(formString(formData, "familyMembers"))),
      mustHaveShotsJson: toJson(splitLines(formString(formData, "mustHaveShots"))),
      restrictions: formString(formData, "restrictions"),
      specialNotes: formString(formData, "specialNotes"),
      status: "Draft",
      approvalToken: nanoid(24),
      questionnaire: {
        create: {
          token: nanoid(24),
          title: "Wedding production questionnaire",
          schemaJson: toJson(defaultQuestionnaire),
        },
      },
    },
    include: { questionnaire: true },
  });
  await regenerateDocuments(project.id);
  await logEvent("project_created", studio.id, { projectId: project.id });
  redirect(`/projects/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  const { project } = await requireProject(id);
  const weddingDate = formString(formData, "weddingDate");
  await prisma.weddingProject.update({
    where: { id: project.id },
    data: {
      coupleName1: formString(formData, "coupleName1"),
      coupleName2: formString(formData, "coupleName2"),
      weddingDate: weddingDate ? new Date(`${weddingDate}T12:00:00`) : null,
      venueName: formString(formData, "venueName"),
      ceremonyLocation: formString(formData, "ceremonyLocation"),
      receptionLocation: formString(formData, "receptionLocation"),
      ceremonyTime: formString(formData, "ceremonyTime"),
      receptionTime: formString(formData, "receptionTime"),
      packageName: formString(formData, "packageName"),
      deliverablesJson: toJson(splitLines(formString(formData, "deliverables"))),
      vendorContactsJson: toJson(splitLines(formString(formData, "vendors"))),
      musicPreferences: formString(formData, "musicPreferences"),
      familyMembersJson: toJson(splitLines(formString(formData, "familyMembers"))),
      mustHaveShotsJson: toJson(splitLines(formString(formData, "mustHaveShots"))),
      restrictions: formString(formData, "restrictions"),
      specialNotes: formString(formData, "specialNotes"),
    },
  });
  revalidatePath(`/projects/${id}`);
}

export async function archiveProject(id: string) {
  const { project } = await requireProject(id);
  await prisma.weddingProject.update({ where: { id: project.id }, data: { archived: true } });
  revalidatePath("/projects");
  redirect("/projects");
}

export async function duplicateProject(id: string) {
  const { studio, project } = await requireProject(id);
  const allowed = await canCreateProject(studio);
  if (!allowed.ok) redirect(`/projects?error=${encodeURIComponent(allowed.reason || "Upgrade required")}`);
  const copy = await prisma.weddingProject.create({
    data: {
      studioId: studio.id,
      coupleName1: `${project.coupleName1} copy`,
      coupleName2: project.coupleName2,
      weddingDate: project.weddingDate,
      venueName: project.venueName,
      ceremonyLocation: project.ceremonyLocation,
      receptionLocation: project.receptionLocation,
      ceremonyTime: project.ceremonyTime,
      receptionTime: project.receptionTime,
      packageName: project.packageName,
      deliverablesJson: project.deliverablesJson,
      vendorContactsJson: project.vendorContactsJson,
      musicPreferences: project.musicPreferences,
      familyMembersJson: project.familyMembersJson,
      mustHaveShotsJson: project.mustHaveShotsJson,
      restrictions: project.restrictions,
      specialNotes: project.specialNotes,
      approvalToken: nanoid(24),
      questionnaire: { create: { token: nanoid(24), title: "Wedding production questionnaire", schemaJson: toJson(defaultQuestionnaire) } },
    },
  });
  await regenerateDocuments(copy.id);
  redirect(`/projects/${copy.id}`);
}

export async function regenerateDocuments(projectId: string) {
  const project = await prisma.weddingProject.findUnique({ where: { id: projectId } });
  if (!project) return;
  const deliverables = parseJson<string[]>(project.deliverablesJson, []);
  const mustHaveShots = parseJson<string[]>(project.mustHaveShotsJson, []);
  const familyMembers = parseJson<string[]>(project.familyMembersJson, []);
  await prisma.timelineItem.deleteMany({ where: { projectId } });
  await prisma.shotListItem.deleteMany({ where: { projectId } });
  await prisma.familyFormalGroup.deleteMany({ where: { projectId } });
  const timeline = generateTimeline(project);
  const family = generateFamilyFormals(familyMembers.join("\n"), `${project.coupleName1} and ${project.coupleName2}`);
  const shots = generateShotList(mustHaveShots, family.map((g) => g.label));
  await prisma.timelineItem.createMany({ data: timeline.map((item) => ({ ...item, projectId })) });
  await prisma.familyFormalGroup.createMany({ data: family.map((item) => ({ ...item, projectId })) });
  await prisma.shotListItem.createMany({ data: shots.map((item) => ({ ...item, projectId })) });
  await prisma.briefDocument.upsert({
    where: { projectId_type: { projectId, type: "reel-brief" } },
    update: { contentJson: toJson(generateReelBrief({ deliverables, musicPreferences: project.musicPreferences, restrictions: project.restrictions, specialNotes: project.specialNotes })) },
    create: { projectId, type: "reel-brief", title: "Instagram reel brief", contentJson: toJson(generateReelBrief({ deliverables, musicPreferences: project.musicPreferences, restrictions: project.restrictions, specialNotes: project.specialNotes })) },
  });
  await prisma.briefDocument.upsert({
    where: { projectId_type: { projectId, type: "editor-notes" } },
    update: { contentJson: toJson(generateEditorNotes({ packageName: project.packageName, deliverables, musicPreferences: project.musicPreferences, mustHaveShots, restrictions: project.restrictions, specialNotes: project.specialNotes })) },
    create: { projectId, type: "editor-notes", title: "Editor handoff notes", contentJson: toJson(generateEditorNotes({ packageName: project.packageName, deliverables, musicPreferences: project.musicPreferences, mustHaveShots, restrictions: project.restrictions, specialNotes: project.specialNotes })) },
  });
  await logEvent("document_generated", project.studioId, { projectId });
}

export async function sendQuestionnaireLink(id: string, formData: FormData) {
  const { project } = await requireProject(id);
  const to = formString(formData, "email");
  const link = appUrl(`/client/${project.questionnaire?.token}`);
  await questionnaireEmail(to, link);
  await prisma.weddingProject.update({ where: { id }, data: { status: "Awaiting client info" } });
  await logEvent("questionnaire_sent", project.studioId, { projectId: id, to });
  revalidatePath(`/projects/${id}/questionnaire`);
}

export async function sendApprovalLink(id: string, formData: FormData) {
  const { project, studio } = await requireProject(id);
  const to = formString(formData, "email") || studio.contactEmail;
  await approvalEmail(to, appUrl(`/approve/${project.approvalToken}`));
  await prisma.weddingProject.update({ where: { id }, data: { status: "Ready for approval" } });
  revalidatePath(`/projects/${id}/exports`);
}

export async function updateStudio(formData: FormData) {
  const { studio } = await requireStudio();
  await prisma.studio.update({
    where: { id: studio.id },
    data: {
      name: formString(formData, "name"),
      website: formString(formData, "website"),
      logoUrl: formString(formData, "logoUrl"),
      brandColor: formString(formData, "brandColor") || "#0f766e",
      contactEmail: formString(formData, "contactEmail"),
    },
  });
  revalidatePath("/settings");
}
