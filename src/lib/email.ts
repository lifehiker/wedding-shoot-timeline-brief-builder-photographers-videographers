import { appUrl } from "@/lib/utils";

type EmailPayload = {
  to?: string | null;
  subject: string;
  html: string;
};

export async function sendEmail(payload: EmailPayload) {
  if (!payload.to) return { ok: true, skipped: "missing-recipient" };
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set, email skipped:", payload.subject, payload.to);
    return { ok: true, skipped: "missing-api-key" };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "BriefBuilder <noreply@example.com>",
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  });
  return { ok: true };
}

export function questionnaireEmail(to: string, link: string) {
  return sendEmail({
    to,
    subject: "Wedding questionnaire link",
    html: `<p>Your wedding questionnaire is ready:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export function approvalEmail(to: string | null | undefined, link: string) {
  return sendEmail({
    to,
    subject: "Wedding production brief ready for approval",
    html: `<p>Please review the timeline, family formals, and must-have shots:</p><p><a href="${link}">${link}</a></p>`,
  });
}

export function submissionNotice(to: string | null | undefined, projectId: string) {
  return sendEmail({
    to,
    subject: "Wedding questionnaire submitted",
    html: `<p>A couple submitted their questionnaire. Open the project: <a href="${appUrl(`/projects/${projectId}`)}">${appUrl(`/projects/${projectId}`)}</a></p>`,
  });
}

export function approvalNotice(to: string | null | undefined, projectId: string, status: string) {
  return sendEmail({
    to,
    subject: `Client ${status.toLowerCase()} production brief`,
    html: `<p>The client marked the approval as ${status}. Open the project: <a href="${appUrl(`/projects/${projectId}`)}">${appUrl(`/projects/${projectId}`)}</a></p>`,
  });
}
