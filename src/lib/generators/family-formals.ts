export function splitLines(value?: string | null) {
  return (value || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function generateFamilyFormals(rawMembers?: string | null, couple = "Couple") {
  const members = splitLines(rawMembers);
  const parents = members.filter((m) => /mom|dad|mother|father|parent/i.test(m));
  const siblings = members.filter((m) => /sister|brother|sibling/i.test(m));
  const grandparents = members.filter((m) => /grand/i.test(m));
  const groups = [
    { label: `${couple} with immediate family`, people: members.slice(0, 8).join(", ") || "Immediate family", notes: "Start here while everyone is gathered." },
    { label: `${couple} with parents`, people: parents.join(", ") || "Parents", notes: "" },
    { label: `${couple} with siblings`, people: siblings.join(", ") || "Siblings", notes: "" },
    { label: `${couple} with grandparents`, people: grandparents.join(", ") || "Grandparents", notes: "Seat nearby before ceremony if mobility is limited." },
    { label: "Full family group", people: members.join(", ") || "All requested family", notes: "Final large group before releasing extended family." },
  ];
  return groups.map((group, sortOrder) => ({ ...group, sortOrder }));
}
