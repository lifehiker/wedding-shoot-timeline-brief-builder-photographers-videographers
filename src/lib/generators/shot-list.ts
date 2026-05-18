export function generateShotList(mustHaveShots: string[] = [], familyGroups: string[] = []) {
  const base: Array<[string, string, boolean]> = [
    ["Details", "Invitation suite, rings, attire, florals, vows, heirlooms", true],
    ["Getting ready", "Hair/makeup finishing, wardrobe, letter/gift exchange, parent reactions", false],
    ["Ceremony", "Processional, vow exchange, rings, kiss, recessional, wide venue angles", true],
    ["Family formals", "Approved immediate family combinations", true],
    ["Couple portraits", "Classic portrait, walking motion, editorial frame, environmental wide", true],
    ["Reception", "Room details, speeches, dances, cake, dance floor, guest interactions", false],
  ];
  const formalItems = familyGroups.map((label) => ["Family formals", label, true] as [string, string, boolean]);
  const customItems = mustHaveShots.map((label) => ["Must-have", label, true] as [string, string, boolean]);
  return [...base, ...formalItems, ...customItems].map(([section, label, isMustHave], sortOrder) => ({
    section,
    label,
    notes: "",
    isMustHave,
    sortOrder,
  }));
}
