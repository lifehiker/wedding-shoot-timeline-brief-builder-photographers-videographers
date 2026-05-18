# FORGE PRD TASKS

Implementation order followed the PRD contract: foundation -> data/auth -> core workflows -> secondary workflows -> marketing/pages -> deployment -> QA.

## Foundation
- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Initialized Next.js App Router with TypeScript and Tailwind.
- [x] Used system fonts only; no `next/font/google`.
- [x] Set `next.config.ts` to `output: "standalone"`.
- [x] Added reusable app/site UI shell and polished responsive styling.

## Data Model
- [x] Configured Prisma with SQLite for zero-config deployment.
- [x] Added required PRD models: `User`, `Account`, `Session`, `VerificationToken`, `Studio`, `Subscription`, `WeddingProject`, `Questionnaire`, `QuestionnaireResponse`, `TimelineItem`, `ShotListItem`, `FamilyFormalGroup`, `BriefDocument`, `ClientApproval`, `ExportLog`, `EventLog`.
- [x] Added seed script with demo studio/project and generated documents.
- [x] Generated Prisma client and verified schema with `prisma db push`.

## Auth And Account
- [x] Implemented credential auth with NextAuth safe for missing OAuth credentials.
- [x] Added `/login` and `/signup`.
- [x] Created default studio on signup.
- [x] Added studio settings for name, website, logo URL, brand color, contact email.
- [x] Gated app routes by authenticated ownership checks.

## Billing And Subscription
- [x] Added pricing page with Solo, Studio, Team plans.
- [x] Added guarded Stripe checkout, portal, and webhook routes with missing-credential fallbacks.
- [x] Stored subscription state locally.
- [x] Enforced free limit: one active demo project for trial workspaces.
- [x] Documented Stripe credentials in `HUMAN_INPUT_NEEDED.md`.

## User-Facing App Pages
- [x] `/dashboard`: overview metrics, recent projects, next actions.
- [x] `/projects`: list, status badges, archive/duplicate controls.
- [x] `/projects/new`: project creation.
- [x] `/projects/[id]`: wedding project detail and missing-info checklist.
- [x] `/projects/[id]/questionnaire`: public link and send email action.
- [x] `/projects/[id]/timeline`: editable timeline.
- [x] `/projects/[id]/shot-list`: editable shot list.
- [x] `/projects/[id]/family-formals`: generated editable family groups.
- [x] `/projects/[id]/reel-brief`: editable reel brief.
- [x] `/projects/[id]/editor-notes`: editable editor handoff.
- [x] `/projects/[id]/exports`: export center.
- [x] `/settings`: studio profile.
- [x] `/billing`: subscription and portal access.

## Public Workflows
- [x] `/client/[token]`: no-login questionnaire submission.
- [x] `/approve/[token]`: no-login review, approve, or request changes.
- [x] Stores questionnaire response, generates initial docs, and notifies studio safely.
- [x] Stores approval status, timestamp, comments, and notifies studio safely.

## Core Generation
- [x] Deterministic timeline generator.
- [x] Deterministic shot list generator.
- [x] Family formal combinations generator with reorder/notes support.
- [x] Reel brief generator.
- [x] Editor notes generator.
- [x] Missing-info checklist grouped by PRD categories.

## Server Actions And APIs
- [x] Project actions: `createProject`, `updateProject`, `archiveProject`, `duplicateProject`.
- [x] Editor save actions for timeline, shot list, family formals, reel brief, editor notes.
- [x] Email actions: questionnaire link, approval request, submission/approval notifications with Resend fallback.
- [x] PDF export routes for production brief, shot list, family formals, editor handoff.
- [x] Analytics event logging for signup, project creation, questionnaire submission, document generation, PDF export, approval, checkout, subscription.

## Marketing And SEO
- [x] Homepage explaining questionnaire -> documents workflow.
- [x] Public sample brief section on homepage.
- [x] First 10 SEO pages implemented:
  - [x] `/templates/wedding-videographer-shot-list-template`
  - [x] `/templates/wedding-film-client-questionnaire`
  - [x] `/tools/family-formal-shot-list-generator`
  - [x] `/templates/wedding-reel-brief-template`
  - [x] `/templates/wedding-videographer-editor-notes`
  - [x] `/checklists/wedding-photography-timeline-checklist`
  - [x] `/tools/wedding-missing-info-checklist`
  - [x] `/templates/vendor-handoff-pdf-wedding`
  - [x] `/guides/wedding-photographer-client-questionnaire-timeline`
  - [x] `/ai-tools-for-wedding-photographers`
- [x] Free browser-side family formal generator.
- [x] Free browser-side missing-info checklist generator.

## Deployment
- [x] Added `.env.example`.
- [x] Added `.dockerignore`.
- [x] Added production-ready Dockerfile using standalone output and SQLite startup migration.
- [x] Added README setup/deploy instructions.

## Verification
- [x] Ran `npm run lint`.
- [x] Ran `npm run build`.
- [x] Started dev server.
- [x] Smoke-tested public marketing pages.
- [x] Smoke-tested auth redirects/pages.
- [x] Smoke-tested dashboard protection and demo public token routes.
- [x] Smoke-tested public client and approval token routes.
- [x] Smoke-tested API fallbacks.
- [x] Attempted `docker build .`; Docker exists but socket permission denied in this environment.
- [x] Created `FORGE_COMPLETION_AUDIT.md`.
- [x] Created `HUMAN_INPUT_NEEDED.md` for external credentials only.
