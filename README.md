# BriefBuilder

Wedding shoot timeline and production brief builder for photographers and videographers.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma + SQLite
- NextAuth credentials auth
- Guarded Stripe and Resend integrations
- React PDF exports

## Local setup

```bash
npm install
cp .env.example .env
npx prisma db push
npm run db:seed
npm run dev
```

Demo login after seeding:

- Email: `demo@briefbuilder.local`
- Password: `password123`

## Verification

```bash
npm run lint
npm run build
```

The app runs without Stripe or Resend credentials. Billing and email routes return safe fallback responses until credentials are configured.
