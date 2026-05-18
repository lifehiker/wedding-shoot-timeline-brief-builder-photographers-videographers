import type { TimelineItem } from "@prisma/client";
import { saveTimeline } from "@/app/(app)/projects/[id]/document-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

export function TimelineEditor({ projectId, items }: { projectId: string; items: TimelineItem[] }) {
  const rows = [...items, ...Array.from({ length: 2 }, (_, i) => ({ id: `new-${i}`, time: "", title: "", description: "", location: "", responsibleParty: "", sortOrder: items.length + i }))] as TimelineItem[];
  return (
    <form action={saveTimeline.bind(null, projectId)} className="space-y-3">
      <input type="hidden" name="rowCount" value={rows.length} />
      {rows.map((item, i) => (
        <div key={item.id} className="grid gap-2 rounded-lg border border-stone-200 bg-white p-3 md:grid-cols-[90px_1fr_1fr_1fr_70px]">
          <Input name={`time-${i}`} defaultValue={item.time} placeholder="Time" />
          <Input name={`title-${i}`} defaultValue={item.title} placeholder="Title" />
          <Input name={`description-${i}`} defaultValue={item.description || ""} placeholder="Description" />
          <Input name={`location-${i}`} defaultValue={item.location || ""} placeholder="Location" />
          <Input name={`sortOrder-${i}`} type="number" defaultValue={item.sortOrder} aria-label="Sort" />
          <input type="hidden" name={`responsibleParty-${i}`} value={item.responsibleParty || ""} />
        </div>
      ))}
      <Button type="submit">Save timeline</Button>
    </form>
  );
}
