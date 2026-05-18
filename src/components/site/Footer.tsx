import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-stone-600 md:grid-cols-4">
        <div>
          <div className="font-bold text-stone-950">BriefBuilder</div>
          <p className="mt-2">Pre-wedding production documents for photographers and videographers.</p>
        </div>
        <Link href="/tools/family-formal-shot-list-generator">Family formal generator</Link>
        <Link href="/tools/wedding-missing-info-checklist">Missing-info checklist</Link>
        <Link href="/guides/wedding-photographer-client-questionnaire-timeline">Questionnaire guide</Link>
      </div>
    </footer>
  );
}
