export type Question = {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "time";
  group: string;
  required?: boolean;
};

export const defaultQuestionnaire: Question[] = [
  { id: "coupleName1", label: "Partner one name", type: "text", group: "Couple", required: true },
  { id: "coupleName2", label: "Partner two name", type: "text", group: "Couple", required: true },
  { id: "weddingDate", label: "Wedding date", type: "date", group: "Couple", required: true },
  { id: "venueName", label: "Main venue name", type: "text", group: "Venue", required: true },
  { id: "ceremonyLocation", label: "Ceremony location", type: "text", group: "Venue" },
  { id: "receptionLocation", label: "Reception location", type: "text", group: "Venue" },
  { id: "ceremonyTime", label: "Ceremony time", type: "time", group: "Timeline", required: true },
  { id: "receptionTime", label: "Reception time", type: "time", group: "Timeline" },
  { id: "packageName", label: "Photo/video package", type: "text", group: "Deliverables" },
  { id: "deliverables", label: "Deliverables expected", type: "textarea", group: "Deliverables" },
  { id: "vendors", label: "Vendor names and contacts", type: "textarea", group: "Vendors" },
  { id: "musicPreferences", label: "Music preferences and do-not-use songs", type: "textarea", group: "Music" },
  { id: "familyMembers", label: "Family members and relationship notes", type: "textarea", group: "Family" },
  { id: "mustHaveShots", label: "Must-have shots or moments", type: "textarea", group: "Shot list" },
  { id: "restrictions", label: "Restrictions, sensitivities, or surprises", type: "textarea", group: "Notes" },
  { id: "specialNotes", label: "Anything else the team should know", type: "textarea", group: "Notes" },
];
