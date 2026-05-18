import { requireStudio } from "@/lib/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BillingPage() {
  const { studio } = await requireStudio();
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader><CardTitle>Subscription</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p>Current plan: <b className="capitalize">{studio.subscription?.plan || "trial"}</b></p>
          <div className="flex flex-wrap gap-3">
            {["solo", "studio", "team"].map((plan) => <a key={plan} className="rounded-md bg-teal-700 px-4 py-2 font-semibold text-white" href={`/api/stripe/checkout?plan=${plan}`}>Upgrade to {plan}</a>)}
            <a className="rounded-md border border-stone-300 px-4 py-2 font-semibold" href="/api/stripe/portal">Billing portal</a>
          </div>
          <p className="text-sm text-stone-600">When Stripe credentials are missing, billing routes return a graceful setup message and the app continues to run.</p>
        </CardContent>
      </Card>
    </div>
  );
}
