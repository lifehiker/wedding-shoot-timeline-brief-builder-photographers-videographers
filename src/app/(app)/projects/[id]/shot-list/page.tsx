import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { ShotListEditor } from "@/components/shot-list/ShotListEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireProject } from "@/lib/session";

export default async function ShotListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project } = await requireProject(id);
  return <div className="space-y-5"><ProjectNavTabs id={id} /><Card><CardHeader><CardTitle>Shot list</CardTitle></CardHeader><CardContent><ShotListEditor projectId={id} items={project.shotListItems} /></CardContent></Card></div>;
}
