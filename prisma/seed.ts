import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { prisma } from "../src/lib/prisma";
import { defaultQuestionnaire } from "../src/lib/default-questionnaire";
import { generateTimeline } from "../src/lib/generators/timeline";
import { generateFamilyFormals } from "../src/lib/generators/family-formals";
import { generateShotList } from "../src/lib/generators/shot-list";
import { generateReelBrief } from "../src/lib/generators/reel-brief";
import { generateEditorNotes } from "../src/lib/generators/editor-notes";

async function main() {
  const email = "demo@briefbuilder.local";
  const passwordHash = await bcrypt.hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Demo Studio Owner", passwordHash },
  });
  const studio = await prisma.studio.upsert({
    where: { id: "demo-studio" },
    update: {},
    create: { id: "demo-studio", userId: user.id, name: "Northlight Films", contactEmail: email, brandColor: "#0f766e", subscription: { create: { plan: "studio", status: "active" } } },
  });
  const project = await prisma.weddingProject.upsert({
    where: { id: "demo-project" },
    update: {},
    create: {
      id: "demo-project",
      studioId: studio.id,
      coupleName1: "Maya",
      coupleName2: "Jordan",
      weddingDate: new Date("2026-09-19T12:00:00"),
      venueName: "The Cedar Room",
      ceremonyLocation: "Garden courtyard",
      receptionLocation: "Main hall",
      ceremonyTime: "16:00",
      receptionTime: "18:00",
      packageName: "Photo + highlight film + reel",
      deliverablesJson: JSON.stringify(["Highlight film", "Full ceremony edit", "Vertical reel", "Online gallery"]),
      vendorContactsJson: JSON.stringify(["Planner: Ellis Events", "DJ: Tempo Co", "Florist: Stem House"]),
      musicPreferences: "Warm indie, no explicit lyrics.",
      familyMembersJson: JSON.stringify(["Avery - mom", "Chris - dad", "Riley - sister", "Morgan - grandparent"]),
      mustHaveShotsJson: JSON.stringify(["Private vow reading", "Grandparent reaction", "Dance floor lift"]),
      restrictions: "Avoid filming one estranged uncle.",
      specialNotes: "Sunset portrait window is important.",
      status: "Ready for approval",
      approvalToken: "demo-approval-token",
      questionnaire: { create: { token: "demo-client-token", title: "Wedding production questionnaire", schemaJson: JSON.stringify(defaultQuestionnaire) } },
    },
  });
  await prisma.timelineItem.deleteMany({ where: { projectId: project.id } });
  await prisma.familyFormalGroup.deleteMany({ where: { projectId: project.id } });
  await prisma.shotListItem.deleteMany({ where: { projectId: project.id } });
  const formals = generateFamilyFormals("Avery - mom\nChris - dad\nRiley - sister\nMorgan - grandparent", "Maya and Jordan");
  await prisma.timelineItem.createMany({ data: generateTimeline(project).map((item) => ({ ...item, projectId: project.id })) });
  await prisma.familyFormalGroup.createMany({ data: formals.map((item) => ({ ...item, projectId: project.id })) });
  await prisma.shotListItem.createMany({ data: generateShotList(["Private vow reading", "Grandparent reaction"], formals.map((f) => f.label)).map((item) => ({ ...item, projectId: project.id })) });
  await prisma.briefDocument.upsert({ where: { projectId_type: { projectId: project.id, type: "reel-brief" } }, update: {}, create: { projectId: project.id, type: "reel-brief", title: "Instagram reel brief", contentJson: JSON.stringify(generateReelBrief({ musicPreferences: project.musicPreferences })) } });
  await prisma.briefDocument.upsert({ where: { projectId_type: { projectId: project.id, type: "editor-notes" } }, update: {}, create: { projectId: project.id, type: "editor-notes", title: "Editor notes", contentJson: JSON.stringify(generateEditorNotes({ packageName: project.packageName })) } });
  console.log("Seeded demo login demo@briefbuilder.local / password123", nanoid(4));
}

main().finally(() => prisma.$disconnect());
