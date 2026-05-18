import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo/TemplatePage";
import { FamilyTool, MissingTool } from "@/components/seo/ToolPage";
import { getSeoPage } from "@/content/seo-pages";

export default async function ToolSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSeoPage("tools", slug);
  if (!page) notFound();
  return (
    <>
      <SeoLandingPage page={page} />
      <section className="mx-auto max-w-5xl px-4 pb-12 -mt-8">
        {slug === "family-formal-shot-list-generator" ? <FamilyTool /> : <MissingTool />}
      </section>
    </>
  );
}
