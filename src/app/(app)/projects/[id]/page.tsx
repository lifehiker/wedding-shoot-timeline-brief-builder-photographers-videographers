import { format } from "date-fns";
import { updateProject } from "../actions";
import { MissingInfoChecklist } from "@/components/projects/MissingInfoChecklist";
import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { requireProject } from "@/lib/session";
import { parseJson } from "@/lib/utils";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project } = await requireProject(id);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="text-3xl font-bold">{project.coupleName1} + {project.coupleName2}</h1><p className="text-stone-600">{project.weddingDate ? format(project.weddingDate, "PPP") : "Date pending"} · {project.venueName || "Venue pending"}</p></div>
        <ProjectStatusBadge status={project.status} />
      </div>
      <ProjectNavTabs id={project.id} />
      <Card><CardHeader><CardTitle>Missing-info checklist</CardTitle></CardHeader><CardContent><MissingInfoChecklist project={project} /></CardContent></Card>
      <Card>
        <CardHeader><CardTitle>Core wedding details</CardTitle></CardHeader>
        <CardContent>
          <form action={updateProject.bind(null, project.id)} className="grid gap-4 md:grid-cols-2">
            <Field label="Partner one"><Input name="coupleName1" defaultValue={project.coupleName1} /></Field>
            <Field label="Partner two"><Input name="coupleName2" defaultValue={project.coupleName2} /></Field>
            <Field label="Wedding date"><Input type="date" name="weddingDate" defaultValue={project.weddingDate?.toISOString().slice(0, 10)} /></Field>
            <Field label="Venue"><Input name="venueName" defaultValue={project.venueName || ""} /></Field>
            <Field label="Ceremony location"><Input name="ceremonyLocation" defaultValue={project.ceremonyLocation || ""} /></Field>
            <Field label="Reception location"><Input name="receptionLocation" defaultValue={project.receptionLocation || ""} /></Field>
            <Field label="Ceremony time"><Input type="time" name="ceremonyTime" defaultValue={project.ceremonyTime || ""} /></Field>
            <Field label="Reception time"><Input type="time" name="receptionTime" defaultValue={project.receptionTime || ""} /></Field>
            <Field label="Package"><Input name="packageName" defaultValue={project.packageName || ""} /></Field>
            <Field label="Deliverables"><Textarea name="deliverables" defaultValue={parseJson<string[]>(project.deliverablesJson, []).join("\n")} /></Field>
            <Field label="Vendors"><Textarea name="vendors" defaultValue={parseJson<string[]>(project.vendorContactsJson, []).join("\n")} /></Field>
            <Field label="Music preferences"><Textarea name="musicPreferences" defaultValue={project.musicPreferences || ""} /></Field>
            <Field label="Family members"><Textarea name="familyMembers" defaultValue={parseJson<string[]>(project.familyMembersJson, []).join("\n")} /></Field>
            <Field label="Must-have shots"><Textarea name="mustHaveShots" defaultValue={parseJson<string[]>(project.mustHaveShotsJson, []).join("\n")} /></Field>
            <Field label="Restrictions"><Textarea name="restrictions" defaultValue={project.restrictions || ""} /></Field>
            <Field label="Special notes"><Textarea name="specialNotes" defaultValue={project.specialNotes || ""} /></Field>
            <div className="md:col-span-2"><Button type="submit">Save details</Button></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
