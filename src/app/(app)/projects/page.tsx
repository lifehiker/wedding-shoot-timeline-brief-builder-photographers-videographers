import Link from "next/link";
import { archiveProject, duplicateProject } from "./actions";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/session";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const { studio } = await requireStudio();
  const projects = await prisma.weddingProject.findMany({ where: { studioId: studio.id, archived: false }, orderBy: { updatedAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold">Projects</h1><Link className="rounded-md bg-teal-700 px-4 py-2 font-semibold text-white" href="/projects/new">Create project</Link></div>
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        {projects.map((project) => (
          <div key={project.id} className="grid gap-3 border-b border-stone-100 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <Link href={`/projects/${project.id}`}><div className="font-semibold">{project.coupleName1} + {project.coupleName2}</div><div className="text-sm text-stone-600">{project.venueName || "Venue pending"}</div></Link>
            <ProjectStatusBadge status={project.status} />
            <div className="flex gap-2">
              <form action={duplicateProject.bind(null, project.id)}><Button variant="secondary" type="submit">Duplicate</Button></form>
              <form action={archiveProject.bind(null, project.id)}><Button variant="ghost" type="submit">Archive</Button></form>
            </div>
          </div>
        ))}
        {!projects.length && <div className="p-6 text-stone-600">No active projects yet.</div>}
      </div>
    </div>
  );
}
