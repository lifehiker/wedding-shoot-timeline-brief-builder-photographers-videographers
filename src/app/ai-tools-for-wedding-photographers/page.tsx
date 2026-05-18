import { SeoLandingPage } from "@/components/seo/TemplatePage";
import { getSeoPage } from "@/content/seo-pages";

export default function AiToolsPage() {
  return <SeoLandingPage page={getSeoPage("root", "ai-tools-for-wedding-photographers")!} />;
}
