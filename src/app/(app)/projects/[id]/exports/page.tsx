import Link from "next/link";
import { sendApprovalLink } from "../../actions";
import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { requireProject } from "@/lib/session";
import { appUrl } from "@/lib/utils";

export default async function ExportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project, studio } = await requireProject(id);
  const exports = [
    ["Full production brief", `/api/projects/${id}/exports/production-brief`],
    ["Shot list PDF", `/api/projects/${id}/exports/shot-list`],
    ["Family formal PDF", `/api/projects/${id}/exports/family-formals`],
    ["Editor handoff PDF", `/api/projects/${id}/exports/editor-handoff`],
  ];
  return (
    <div className="space-y-5">
      <ProjectNavTabs id={id} />
      <Card>
        <CardHeader><CardTitle>Exports and approvals</CardTitle></CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-3 md:grid-cols-2">
            {exports.map(([label, href]) => <Link key={href} href={href} className="rounded-md border border-stone-200 p-4 font-semibold hover:bg-stone-50">{label}</Link>)}
          </div>
          <div>
            <p className="mb-2 text-sm text-stone-600">Approval link: {appUrl(`/approve/${project.approvalToken}`)}</p>
            <form action={sendApprovalLink.bind(null, id)} className="grid gap-3 md:grid-cols-[1fr_auto]">
              <Field label="Recipient email"><Input name="email" type="email" defaultValue={studio.contactEmail || ""} /></Field>
              <div className="flex items-end"><Button type="submit">Send approval request</Button></div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
