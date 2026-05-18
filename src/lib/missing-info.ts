import type { WeddingProject } from "@prisma/client";
import { parseJson } from "./utils";

export function missingInfo(project: WeddingProject) {
  const deliverables = parseJson<string[]>(project.deliverablesJson, []);
  const vendors = parseJson<string[]>(project.vendorContactsJson, []);
  const family = parseJson<string[]>(project.familyMembersJson, []);
  const shots = parseJson<string[]>(project.mustHaveShotsJson, []);
  return [
    { group: "Couple details", items: [["Partner one", project.coupleName1], ["Partner two", project.coupleName2], ["Wedding date", project.weddingDate]] },
    { group: "Venue/logistics", items: [["Venue name", project.venueName], ["Ceremony location", project.ceremonyLocation], ["Reception location", project.receptionLocation]] },
    { group: "Timeline", items: [["Ceremony time", project.ceremonyTime], ["Reception time", project.receptionTime]] },
    { group: "Family formals", items: [["Family names/groups", family.length ? "set" : ""]] },
    { group: "Vendor contacts", items: [["Vendor contacts", vendors.length ? "set" : ""]] },
    { group: "Music/deliverables", items: [["Package", project.packageName], ["Deliverables", deliverables.length ? "set" : ""], ["Music preferences", project.musicPreferences]] },
    { group: "Editor notes", items: [["Must-have shots", shots.length ? "set" : ""], ["Restrictions/special notes", project.restrictions || project.specialNotes]] },
  ].map((section) => ({
    group: section.group,
    missing: section.items.filter(([, value]) => !value).map(([label]) => label as string),
  }));
}
