import Link from "next/link";
import { CheckCircle2, FileText, ListChecks, Send } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-stone-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_0.85fr] lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">Pre-wedding production briefs</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Wedding shoot timelines, shot lists, and editor handoffs from one questionnaire.</h1>
              <p className="mt-5 max-w-2xl text-lg text-stone-200">BriefBuilder turns client answers, vendor details, family formal requests, package deliverables, and music notes into polished shoot-day and post-production documents.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup" className="rounded-md bg-teal-500 px-5 py-3 text-sm font-bold text-stone-950 hover:bg-teal-400">Start a studio workspace</Link>
                <Link href="/tools/family-formal-shot-list-generator" className="rounded-md border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Try a free generator</Link>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white p-4 text-stone-950 shadow-2xl">
              <div className="rounded-md bg-stone-50 p-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div><p className="text-xs uppercase text-stone-500">Sample brief</p><h2 className="font-bold">Maya + Jordan</h2></div>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">Ready for approval</span>
                </div>
                {["2:30 PM Family formals", "4:00 PM Ceremony", "7:45 PM First dance + open floor"].map((item) => (
                  <div key={item} className="mt-3 rounded-md border border-stone-200 bg-white p-3 text-sm">{item}</div>
                ))}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-teal-50 p-3">32 shot list items</div>
                  <div className="rounded-md bg-amber-50 p-3">8 editor notes</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 md:grid-cols-4">
          {[
            [FileText, "Collect", "Public no-login questionnaire for couples."],
            [ListChecks, "Generate", "Timeline, shot list, family formals, reel brief, and editor notes."],
            [CheckCircle2, "Approve", "Tokenized client review with approval comments."],
            [Send, "Export", "Branded PDFs and handoffs for team, editors, and vendors."],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof FileText;
            return <div key={String(title)} className="rounded-lg border border-stone-200 bg-white p-5"><I className="h-5 w-5 text-teal-700" /><h3 className="mt-4 font-bold">{String(title)}</h3><p className="mt-2 text-sm text-stone-600">{String(text)}</p></div>;
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
