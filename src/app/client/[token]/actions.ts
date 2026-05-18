"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { submissionNotice } from "@/lib/email";
import { logEvent } from "@/lib/events";
import { splitLines } from "@/lib/generators/family-formals";
import { toJson } from "@/lib/utils";
import { regenerateDocuments } from "@/app/(app)/projects/actions";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function submitQuestionnaire(token: string, formData: FormData) {
  const questionnaire = await prisma.questionnaire.findUnique({ where: { token }, include: { project: { include: { studio: true } } } });
  if (!questionnaire) redirect("/");
  const answers: Record<string, string> = {};
  for (const [key, val] of formData.entries()) answers[key] = String(val);
  await prisma.questionnaireResponse.create({ data: { projectId: questionnaire.projectId, answersJson: toJson(answers) } });
  await prisma.weddingProject.update({
    where: { id: questionnaire.projectId },
    data: {
      coupleName1: value(formData, "coupleName1") || questionnaire.project.coupleName1,
      coupleName2: value(formData, "coupleName2") || questionnaire.project.coupleName2,
      weddingDate: value(formData, "weddingDate") ? new Date(`${value(formData, "weddingDate")}T12:00:00`) : questionnaire.project.weddingDate,
      venueName: value(formData, "venueName") || questionnaire.project.venueName,
      ceremonyLocation: value(formData, "ceremonyLocation") || questionnaire.project.ceremonyLocation,
      receptionLocation: value(formData, "receptionLocation") || questionnaire.project.receptionLocation,
      ceremonyTime: value(formData, "ceremonyTime") || questionnaire.project.ceremonyTime,
      receptionTime: value(formData, "receptionTime") || questionnaire.project.receptionTime,
      packageName: value(formData, "packageName") || questionnaire.project.packageName,
      deliverablesJson: value(formData, "deliverables") ? toJson(splitLines(value(formData, "deliverables"))) : questionnaire.project.deliverablesJson,
      vendorContactsJson: value(formData, "vendors") ? toJson(splitLines(value(formData, "vendors"))) : questionnaire.project.vendorContactsJson,
      musicPreferences: value(formData, "musicPreferences") || questionnaire.project.musicPreferences,
      familyMembersJson: value(formData, "familyMembers") ? toJson(splitLines(value(formData, "familyMembers"))) : questionnaire.project.familyMembersJson,
      mustHaveShotsJson: value(formData, "mustHaveShots") ? toJson(splitLines(value(formData, "mustHaveShots"))) : questionnaire.project.mustHaveShotsJson,
      restrictions: value(formData, "restrictions") || questionnaire.project.restrictions,
      specialNotes: value(formData, "specialNotes") || questionnaire.project.specialNotes,
      status: "Ready for approval",
    },
  });
  await regenerateDocuments(questionnaire.projectId);
  await submissionNotice(questionnaire.project.studio.contactEmail, questionnaire.projectId);
  await logEvent("questionnaire_submitted", questionnaire.project.studioId, { projectId: questionnaire.projectId });
  redirect(`/client/${token}?submitted=1`);
}
