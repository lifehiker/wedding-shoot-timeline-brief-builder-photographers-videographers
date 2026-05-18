import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireStudio } from "@/lib/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";

export default async function DashboardPage() {
  const { studio } = await requireStudio();
  const [projects, events] = await Promise.all([
    prisma.weddingProject.findMany({ where: { studioId: studio.id, archived: false }, orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.eventLog.findMany({ where: { studioId: studio.id }, orderBy: { createdAt: "desc" }, take: 6 }),
  ]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="text-stone-600">Plan, approve, and export wedding production briefs.</p></div>
        <Link className="rounded-md bg-teal-700 px-4 py-2 font-semibold text-white" href="/projects/new">New project</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Active projects</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{projects.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Approvals</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{projects.filter((p) => p.status === "Approved").length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Plan</CardTitle></CardHeader><CardContent className="text-3xl font-bold capitalize">{studio.subscription?.plan || "trial"}</CardContent></Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader><CardTitle>Recent weddings</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="flex items-center justify-between rounded-md border border-stone-200 p-3 hover:bg-stone-50">
                <span className="font-semibold">{project.coupleName1} + {project.coupleName2}</span>
                <ProjectStatusBadge status={project.status} />
              </Link>
            ))}
            {!projects.length && <p className="text-sm text-stone-600">Create your first demo project to generate a full brief.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-stone-600">
            {events.map((event) => <p key={event.id}>{event.type.replaceAll("_", " ")} · {event.createdAt.toLocaleDateString()}</p>)}
            {!events.length && <p>No activity logged yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
