# FORGE COMPLETION AUDIT

## Product Scope
- Marketing homepage and sample brief: `src/app/page.tsx`, `src/components/site/Header.tsx`, `src/components/site/Footer.tsx`.
- Pricing and subscription positioning: `src/app/pricing/page.tsx`, `src/app/(app)/billing/page.tsx`.
- SEO template/tool/guide/checklist pages: `src/content/seo-pages.ts`, `src/components/seo/TemplatePage.tsx`, `src/components/seo/ToolPage.tsx`, `src/app/templates/[slug]/page.tsx`, `src/app/tools/[slug]/page.tsx`, `src/app/guides/[slug]/page.tsx`, `src/app/checklists/[slug]/page.tsx`, `src/app/ai-tools-for-wedding-photographers/page.tsx`.

## Data, Auth, And Account
- Prisma SQLite schema with all requested models: `prisma/schema.prisma`.
- Prisma singleton: `src/lib/prisma.ts`.
- Demo seed data: `prisma/seed.ts`.
- Credential auth and session gating: `src/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `src/lib/session.ts`.
- Signup/login: `src/app/signup/page.tsx`, `src/app/login/page.tsx`, `src/app/login/LoginForm.tsx`.
- Studio profile settings: `src/app/(app)/settings/page.tsx`, `updateStudio` in `src/app/(app)/projects/actions.ts`.

## App Pages And Workflows
- Authenticated shell: `src/app/(app)/layout.tsx`, `src/components/app/AppSidebar.tsx`, `src/components/app/AppTopbar.tsx`.
- Dashboard: `src/app/(app)/dashboard/page.tsx`.
- Project CRUD and gating: `src/app/(app)/projects/actions.ts`, `src/app/(app)/projects/page.tsx`, `src/app/(app)/projects/new/page.tsx`, `src/app/(app)/projects/[id]/page.tsx`.
- Status and navigation: `src/components/projects/ProjectStatusBadge.tsx`, `src/components/projects/ProjectNavTabs.tsx`.
- Missing-info checklist: `src/lib/missing-info.ts`, `src/components/projects/MissingInfoChecklist.tsx`.
- Questionnaire link management: `src/app/(app)/projects/[id]/questionnaire/page.tsx`.
- Public questionnaire submission: `src/app/client/[token]/page.tsx`, `src/app/client/[token]/actions.ts`.
- Public approval review: `src/app/approve/[token]/page.tsx`, `src/app/approve/[token]/actions.ts`.

## Document Generation And Editing
- Default questionnaire: `src/lib/default-questionnaire.ts`.
- Timeline generator/editor: `src/lib/generators/timeline.ts`, `src/components/timeline/TimelineEditor.tsx`, `src/app/(app)/projects/[id]/timeline/page.tsx`.
- Shot list generator/editor: `src/lib/generators/shot-list.ts`, `src/components/shot-list/ShotListEditor.tsx`, `src/app/(app)/projects/[id]/shot-list/page.tsx`.
- Family formal generator/editor: `src/lib/generators/family-formals.ts`, `src/components/family-formals/FamilyFormalEditor.tsx`, `src/app/(app)/projects/[id]/family-formals/page.tsx`.
- Reel brief generator/editor: `src/lib/generators/reel-brief.ts`, `src/components/briefs/BriefEditor.tsx`, `src/app/(app)/projects/[id]/reel-brief/page.tsx`.
- Editor notes generator/editor: `src/lib/generators/editor-notes.ts`, `src/components/briefs/BriefEditor.tsx`, `src/app/(app)/projects/[id]/editor-notes/page.tsx`.
- Document save actions: `src/app/(app)/projects/[id]/document-actions.ts`.

## Exports, Billing, Email, Analytics
- Export center: `src/app/(app)/projects/[id]/exports/page.tsx`.
- React PDF template and export helper: `src/lib/pdf/ProductionBriefPdf.tsx`, `src/lib/pdf/export-route.tsx`.
- PDF routes: `src/app/api/projects/[id]/exports/production-brief/route.ts`, `src/app/api/projects/[id]/exports/shot-list/route.ts`, `src/app/api/projects/[id]/exports/family-formals/route.ts`, `src/app/api/projects/[id]/exports/editor-handoff/route.ts`.
- Stripe checkout, portal, webhook with missing-env fallbacks: `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/portal/route.ts`, `src/app/api/webhooks/stripe/route.ts`.
- Subscription gating helpers: `src/lib/subscription.ts`.
- Resend email with lazy initialization and missing-env fallback: `src/lib/email.ts`.
- Event logging: `src/lib/events.ts`.

## Deployment And Verification
- Standalone output: `next.config.ts`.
- Environment template: `.env.example`.
- Docker deployment: `Dockerfile`, `.dockerignore`.
- Setup instructions: `README.md`.
- External credential requirements: `HUMAN_INPUT_NEEDED.md`.

## Intentionally External-Credential Items
- Live Stripe checkout/portal/webhook require Stripe keys and price IDs. Routes are implemented and return safe JSON/fallback behavior when credentials are absent.
- Live Resend email delivery requires `RESEND_API_KEY` and a verified sender. Email functions are implemented and skip delivery safely when credentials are absent.
- Google OAuth from the original PRD was replaced by credential auth because the build instructions require zero-config deployment with no OAuth credentials.
- PostgreSQL from the PRD was replaced by SQLite because the build instructions require no external database service.

## Verification Results
- `npx prisma generate`: passed.
- `npx prisma db push`: passed.
- `npm run db:seed`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Dev server: started at `http://localhost:3000`.
- Smoke tests: `/`, `/pricing`, `/templates/wedding-videographer-shot-list-template`, `/tools/wedding-missing-info-checklist`, `/client/demo-client-token`, and `/approve/demo-approval-token` returned 200; `/dashboard` redirects unauthenticated users to `/login`.
- `docker build .`: attempted, but this environment cannot access `/var/run/docker.sock` due to permission denial.
