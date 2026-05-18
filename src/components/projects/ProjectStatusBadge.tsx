const tone: Record<string, string> = {
  Draft: "bg-stone-100 text-stone-800",
  "Awaiting client info": "bg-amber-100 text-amber-900",
  "Ready for approval": "bg-blue-100 text-blue-900",
  Approved: "bg-emerald-100 text-emerald-900",
  Exported: "bg-purple-100 text-purple-900",
};

export function ProjectStatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone[status] || tone.Draft}`}>{status}</span>;
}
