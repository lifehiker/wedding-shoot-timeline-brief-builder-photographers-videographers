import { saveBrief } from "@/app/(app)/projects/[id]/document-actions";
import { Button } from "@/components/ui/button";
import { Field, Textarea } from "@/components/ui/field";
import { parseJson } from "@/lib/utils";

export function BriefEditor({ projectId, type, contentJson }: { projectId: string; type: string; contentJson?: string }) {
  const content = parseJson<Record<string, unknown>>(contentJson, {});
  return (
    <form action={saveBrief.bind(null, projectId, type)} className="grid gap-4">
      {Object.entries(content).map(([key, value]) => (
        <Field key={key} label={key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}>
          <Textarea name={key} defaultValue={Array.isArray(value) ? value.join("\n") : String(value || "")} />
        </Field>
      ))}
      {!Object.keys(content).length && <Field label="Notes"><Textarea name="notes" /></Field>}
      <Button type="submit">Save brief</Button>
    </form>
  );
}
