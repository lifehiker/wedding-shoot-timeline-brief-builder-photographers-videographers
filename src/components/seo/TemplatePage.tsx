import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import type { SeoPage } from "@/content/seo-pages";

export function SeoLandingPage({ page }: { page: SeoPage }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Free wedding production resource</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-stone-600">{page.description}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.sections.map((section) => <div key={section} className="rounded-lg border border-stone-200 bg-white p-5 text-sm text-stone-700">{section}</div>)}
        </div>
        <div className="mt-8 rounded-lg bg-stone-950 p-6 text-white">
          <h2 className="text-2xl font-bold">{page.cta}</h2>
          <p className="mt-2 text-stone-200">Create a project, collect answers, edit the generated documents, and export client-ready PDFs.</p>
          <Link href="/signup" className="mt-5 inline-flex rounded-md bg-teal-500 px-4 py-2 font-bold text-stone-950">Start free demo</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
