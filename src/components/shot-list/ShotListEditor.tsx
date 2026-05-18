import type { ShotListItem } from "@prisma/client";
import { saveShotList } from "@/app/(app)/projects/[id]/document-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

export function ShotListEditor({ projectId, items }: { projectId: string; items: ShotListItem[] }) {
  const rows = [...items, ...Array.from({ length: 2 }, (_, i) => ({ id: `new-${i}`, section: "", label: "", notes: "", isMustHave: false, sortOrder: items.length + i }))] as ShotListItem[];
  return (
    <form action={saveShotList.bind(null, projectId)} className="space-y-3">
      <input type="hidden" name="rowCount" value={rows.length} />
      {rows.map((item, i) => (
        <div key={item.id} className="grid gap-2 rounded-lg border border-stone-200 bg-white p-3 md:grid-cols-[1fr_2fr_2fr_110px_70px]">
          <Input name={`section-${i}`} defaultValue={item.section} placeholder="Section" />
          <Input name={`label-${i}`} defaultValue={item.label} placeholder="Shot" />
          <Input name={`notes-${i}`} defaultValue={item.notes || ""} placeholder="Notes" />
          <label className="flex items-center gap-2 text-sm"><input name={`isMustHave-${i}`} type="checkbox" defaultChecked={item.isMustHave} /> Must have</label>
          <Input name={`sortOrder-${i}`} type="number" defaultValue={item.sortOrder} aria-label="Sort" />
        </div>
      ))}
      <Button type="submit">Save shot list</Button>
    </form>
  );
}
