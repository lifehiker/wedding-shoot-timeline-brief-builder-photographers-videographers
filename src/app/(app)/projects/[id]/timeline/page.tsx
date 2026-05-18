import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { TimelineEditor } from "@/components/timeline/TimelineEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireProject } from "@/lib/session";

export default async function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project } = await requireProject(id);
  return <div className="space-y-5"><ProjectNavTabs id={id} /><Card><CardHeader><CardTitle>Shooting timeline</CardTitle></CardHeader><CardContent><TimelineEditor projectId={id} items={project.timelineItems} /></CardContent></Card></div>;
}
