import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/TemplatePage";
import { getSeoPage } from "@/content/seo-pages";

export default async function ChecklistSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoPage("checklists", slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
