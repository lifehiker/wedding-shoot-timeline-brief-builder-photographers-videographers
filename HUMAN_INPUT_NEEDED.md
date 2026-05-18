# Human Input Needed

The app runs locally and in Docker without these credentials. Provide them only to enable live external integrations.

## Stripe

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_SOLO`
- `STRIPE_PRICE_STUDIO`
- `STRIPE_PRICE_TEAM`

Create monthly subscription prices for Solo ($29), Studio ($49), and Team/Volume ($99), then copy their price IDs into the environment.

## Resend

- `RESEND_API_KEY`
- `EMAIL_FROM`

Verify the sending domain in Resend and set `EMAIL_FROM` to an approved sender.

## Production Auth

- `AUTH_SECRET`

Generate with `openssl rand -base64 32` and override the Docker fallback value.
