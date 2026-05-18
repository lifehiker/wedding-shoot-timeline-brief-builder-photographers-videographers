import { BriefEditor } from "@/components/briefs/BriefEditor";
import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireProject } from "@/lib/session";

export default async function EditorNotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project } = await requireProject(id);
  const brief = project.briefDocuments.find((doc) => doc.type === "editor-notes");
  return <div className="space-y-5"><ProjectNavTabs id={id} /><Card><CardHeader><CardTitle>Editor handoff notes</CardTitle></CardHeader><CardContent><BriefEditor projectId={id} type="editor-notes" contentJson={brief?.contentJson} /></CardContent></Card></div>;
}
