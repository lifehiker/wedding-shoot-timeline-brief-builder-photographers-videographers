export function generateReelBrief(input: {
  deliverables?: string[];
  musicPreferences?: string | null;
  specialNotes?: string | null;
  restrictions?: string | null;
}) {
  return {
    vibe: "Clean, emotionally paced, true-color wedding story with a few upbeat reception cuts.",
    deliverables: input.deliverables?.length ? input.deliverables : ["One 30-60 second vertical reel"],
    songPreferences: input.musicPreferences || "Use licensed romantic/upbeat tracks unless client supplies a preference.",
    keyMoments: ["First look or aisle reaction", "Vows/ring exchange", "Couple portraits in motion", "Dance floor energy"],
    doNotUse: input.restrictions || "Avoid sensitive family dynamics and unflattering candid moments.",
    captionsHooks: ["A wedding day that felt like home", "The quiet moments made the story", "From first look to final dance"],
    deliveryNotes: "9:16 vertical, caption-safe framing, export 1080x1920.",
    notes: input.specialNotes || "",
  };
}
