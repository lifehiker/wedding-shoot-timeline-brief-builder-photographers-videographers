import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const plans = [
  ["Solo", "$29", "10 active weddings, default questionnaire, all core builders, client approvals, PDFs."],
  ["Studio", "$49", "Unlimited projects, branding, vendor handoffs, package presets, email reminders."],
  ["Team/Volume", "$99", "Team members, editor views, second shooter briefs, multiple brands, priority support."],
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-14">
        <h1 className="text-4xl font-bold">Pricing for working wedding teams</h1>
        <p className="mt-3 max-w-2xl text-stone-600">Start with a free demo project. Upgrade when you need saved projects, branded PDFs, approval links, and reusable production workflows.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map(([name, price, desc]) => (
            <div key={name} className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="mt-3 text-4xl font-bold">{price}<span className="text-base font-medium text-stone-500">/mo</span></p>
              <p className="mt-4 min-h-20 text-sm text-stone-600">{desc}</p>
              <Link href="/signup" className="mt-6 inline-flex w-full justify-center rounded-md bg-teal-700 px-4 py-2 font-semibold text-white">Start</Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
