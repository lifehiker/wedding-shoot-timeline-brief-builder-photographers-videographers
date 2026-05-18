export function generateEditorNotes(input: {
  packageName?: string | null;
  deliverables?: string[];
  musicPreferences?: string | null;
  mustHaveShots?: string[];
  restrictions?: string | null;
  specialNotes?: string | null;
}) {
  return {
    packageName: input.packageName || "Wedding production package",
    deliverables: input.deliverables?.length ? input.deliverables : ["Highlight film", "Ceremony edit", "Social reel"],
    audioPriorities: ["Vows", "Ceremony officiant feed", "Speeches", "Ambient room tone"],
    storyArc: "Open with place and anticipation, build through ceremony commitments, resolve with reception energy and intimate couple moments.",
    mustInclude: input.mustHaveShots?.length ? input.mustHaveShots : ["Aisle reaction", "Vows", "Kiss", "First dance"],
    musicNotes: input.musicPreferences || "Use licensed cinematic music with a restrained build.",
    restrictions: input.restrictions || "No listed restrictions.",
    deadlineNotes: "Prioritize preview/social reel first when included; flag missing audio immediately.",
    productionNotes: input.specialNotes || "",
  };
}
