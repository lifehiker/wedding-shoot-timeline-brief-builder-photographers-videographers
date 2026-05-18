export type SeoPage = {
  slug: string;
  kind: "templates" | "tools" | "guides" | "checklists" | "root";
  title: string;
  description: string;
  sections: string[];
  cta: string;
};

export const seoPages: SeoPage[] = [
  { kind: "templates", slug: "wedding-videographer-shot-list-template", title: "Wedding Videographer Shot List Template", description: "Free wedding video shot list template built for ceremony, portraits, reception, audio, and editor handoff coverage.", sections: ["Coverage grouped by wedding section.", "Must-have moments and family formal prompts.", "Designed to become a saved project shot list."], cta: "Generate a shot list from your couple questionnaire." },
  { kind: "templates", slug: "wedding-film-client-questionnaire", title: "Wedding Film Client Questionnaire", description: "A complete questionnaire for wedding filmmakers collecting venue, timeline, vendor, music, family, and editing preferences.", sections: ["Questions couples can answer without an account.", "Maps directly to timelines, reel briefs, and editor notes.", "Includes music preference and do-not-use prompts."], cta: "Turn answers into a timeline, shot list, and editor brief." },
  { kind: "tools", slug: "family-formal-shot-list-generator", title: "Family Formal Shot List Generator", description: "Generate family formal group combinations for wedding photographers and videographers.", sections: ["Paste family names and relationship notes.", "Get immediate formal combinations.", "Save output to a wedding project after signup."], cta: "Save to a wedding project." },
  { kind: "templates", slug: "wedding-reel-brief-template", title: "Wedding Reel Brief Template", description: "Instagram and TikTok reel brief template for wedding videographers with music, captions, aspect ratio, and key moment notes.", sections: ["Package-based reel deliverables.", "Song preferences and do-not-use notes.", "Caption hooks and delivery specs."], cta: "Generate reel briefs per package deliverable." },
  { kind: "templates", slug: "wedding-videographer-editor-notes", title: "Wedding Videographer Editor Notes", description: "Editor handoff notes template for wedding films, speeches, reels, ceremony edits, music, and story priorities.", sections: ["Audio priorities.", "Story arc and must-include moments.", "Restrictions and deadline notes."], cta: "Create editor handoff PDF." },
  { kind: "checklists", slug: "wedding-photography-timeline-checklist", title: "Wedding Photography Timeline Checklist", description: "Checklist for building a wedding-day photo and video timeline from client questionnaire answers.", sections: ["Getting ready through exit coverage.", "Family formals and reception detail windows.", "Missing timeline fields surfaced automatically."], cta: "Build timeline from questionnaire." },
  { kind: "tools", slug: "wedding-missing-info-checklist", title: "Wedding Missing-Info Checklist", description: "Free checklist generator showing missing venue, vendor, music, timeline, family, and editor details.", sections: ["Grouped by planning category.", "Useful before final client calls.", "Can become an approval-ready project checklist."], cta: "Invite couple to fill missing info." },
  { kind: "templates", slug: "vendor-handoff-pdf-wedding", title: "Vendor Handoff PDF for Weddings", description: "Sample vendor handoff PDF structure for wedding photographers and videographers.", sections: ["Timeline overview.", "Vendor contacts and logistics.", "Production notes without private studio data."], cta: "Create branded vendor handoff." },
  { kind: "guides", slug: "wedding-photographer-client-questionnaire-timeline", title: "Wedding Photographer Client Questionnaire Timeline", description: "How questionnaire answers map to a final wedding-day photo and video timeline.", sections: ["Ask for fixed events first.", "Collect venue transitions and family constraints.", "Convert answers into approval-ready sections."], cta: "Use the automated builder." },
  { kind: "root", slug: "ai-tools-for-wedding-photographers", title: "AI Tools for Wedding Photographers", description: "A practical guide to AI-assisted planning documents for wedding photographers, focused on timelines and handoffs instead of image generation.", sections: ["Structured planning beats generic chat output.", "Client approval and PDFs make the work reusable.", "Use deterministic templates when accuracy matters."], cta: "Generate your next wedding brief." },
];

export function getSeoPage(kind: string, slug: string) {
  return seoPages.find((page) => page.slug === slug && (page.kind === kind || (page.kind === "root" && kind === "root")));
}
