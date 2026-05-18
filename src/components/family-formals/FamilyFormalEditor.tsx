import type { FamilyFormalGroup } from "@prisma/client";
import { saveFamilyFormals } from "@/app/(app)/projects/[id]/document-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";

export function FamilyFormalEditor({ projectId, groups }: { projectId: string; groups: FamilyFormalGroup[] }) {
  const rows = [...groups, ...Array.from({ length: 2 }, (_, i) => ({ id: `new-${i}`, label: "", people: "", notes: "", sortOrder: groups.length + i }))] as FamilyFormalGroup[];
  return (
    <form action={saveFamilyFormals.bind(null, projectId)} className="space-y-3">
      <input type="hidden" name="rowCount" value={rows.length} />
      {rows.map((item, i) => (
        <div key={item.id} className="grid gap-2 rounded-lg border border-stone-200 bg-white p-3 md:grid-cols-[1fr_2fr_1fr_70px]">
          <Input name={`label-${i}`} defaultValue={item.label} placeholder="Group" />
          <Input name={`people-${i}`} defaultValue={item.people} placeholder="People" />
          <Input name={`notes-${i}`} defaultValue={item.notes || ""} placeholder="Notes" />
          <Input name={`sortOrder-${i}`} type="number" defaultValue={item.sortOrder} aria-label="Sort" />
        </div>
      ))}
      <Button type="submit">Save family formals</Button>
    </form>
  );
}
