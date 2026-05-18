type TimelineInput = {
  ceremonyTime?: string | null;
  receptionTime?: string | null;
  venueName?: string | null;
  ceremonyLocation?: string | null;
  receptionLocation?: string | null;
};

export function generateTimeline(input: TimelineInput) {
  const ceremony = input.ceremonyTime || "4:00 PM";
  const reception = input.receptionTime || "6:00 PM";
  const prepLocation = input.venueName || "Getting ready location";
  const ceremonyLocation = input.ceremonyLocation || input.venueName || "Ceremony site";
  const receptionLocation = input.receptionLocation || input.venueName || "Reception space";
  return [
    ["11:30 AM", "Getting ready coverage", `Details, attire, prep candids, and room audio at ${prepLocation}.`, prepLocation, "Lead shooter"],
    ["1:00 PM", "First look setup", "Stage first look, capture reactions, and collect clean audio when relevant.", ceremonyLocation, "Photo/video lead"],
    ["1:30 PM", "Couple portraits", "Guided portraits, motion clips, veil/dress movement, and venue establishing shots.", ceremonyLocation, "Lead shooter"],
    ["2:30 PM", "Wedding party portraits", "Full party, sides, pairings, and personality prompts.", ceremonyLocation, "Lead + second"],
    ["3:10 PM", "Family formals", "Run formal combinations from the approved family formal list.", ceremonyLocation, "Lead shooter"],
    [ceremony, "Ceremony", "Processional, vows, rings, kiss, recessional, crowd reactions, and clean audio priorities.", ceremonyLocation, "Full team"],
    ["5:00 PM", "Cocktail hour and reception details", "Room reveal, flat lays, signage, guest candids, and vendor details.", receptionLocation, "Second shooter"],
    [reception, "Reception entrance and dinner", "Introductions, speeches, dinner ambience, and parent reactions.", receptionLocation, "Full team"],
    ["7:45 PM", "Dances and open floor", "First dance, parent dances, dance floor energy, and guest moments.", receptionLocation, "Full team"],
    ["9:30 PM", "Exit or final portrait", "Sparkler/private last dance/night portrait coverage if scheduled.", receptionLocation, "Lead shooter"],
  ].map(([time, title, description, location, responsibleParty], sortOrder) => ({
    time,
    title,
    description,
    location,
    responsibleParty,
    sortOrder,
  }));
}
