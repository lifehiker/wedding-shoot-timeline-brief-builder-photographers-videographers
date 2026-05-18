import type { WeddingProject } from "@prisma/client";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { missingInfo } from "@/lib/missing-info";

export function MissingInfoChecklist({ project }: { project: WeddingProject }) {
  const sections = missingInfo(project);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {sections.map((section) => (
        <div key={section.group} className="rounded-lg border border-stone-200 bg-white p-4">
          <div className="mb-2 flex items-center gap-2 font-semibold">
            {section.missing.length ? <CircleAlert className="h-4 w-4 text-amber-700" /> : <CheckCircle2 className="h-4 w-4 text-emerald-700" />}
            {section.group}
          </div>
          {section.missing.length ? (
            <ul className="list-inside list-disc text-sm text-stone-600">
              {section.missing.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-stone-600">Complete</p>
          )}
        </div>
      ))}
    </div>
  );
}
