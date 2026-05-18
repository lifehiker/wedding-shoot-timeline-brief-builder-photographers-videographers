import Link from "next/link";

const tabs = [
  ["Overview", ""],
  ["Questionnaire", "questionnaire"],
  ["Timeline", "timeline"],
  ["Shot list", "shot-list"],
  ["Family formals", "family-formals"],
  ["Reel brief", "reel-brief"],
  ["Editor notes", "editor-notes"],
  ["Exports", "exports"],
];

export function ProjectNavTabs({ id }: { id: string }) {
  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-stone-200 pb-2">
      {tabs.map(([label, path]) => (
        <Link key={label} href={`/projects/${id}${path ? `/${path}` : ""}`} className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-white hover:text-teal-800">
          {label}
        </Link>
      ))}
    </nav>
  );
}
