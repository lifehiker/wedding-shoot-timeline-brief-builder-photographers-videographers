import { FamilyFormalEditor } from "@/components/family-formals/FamilyFormalEditor";
import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireProject } from "@/lib/session";

export default async function FamilyFormalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project } = await requireProject(id);
  return <div className="space-y-5"><ProjectNavTabs id={id} /><Card><CardHeader><CardTitle>Family formal list</CardTitle></CardHeader><CardContent><FamilyFormalEditor projectId={id} groups={project.familyFormalGroups} /></CardContent></Card></div>;
}
