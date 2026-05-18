import { Copy } from "lucide-react";
import { sendQuestionnaireLink } from "../../actions";
import { ProjectNavTabs } from "@/components/projects/ProjectNavTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { requireProject } from "@/lib/session";
import { appUrl } from "@/lib/utils";

export default async function QuestionnairePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { project, studio } = await requireProject(id);
  const link = appUrl(`/client/${project.questionnaire?.token}`);
  return (
    <div className="space-y-5">
      <ProjectNavTabs id={id} />
      <Card>
        <CardHeader><CardTitle>Client questionnaire</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-md bg-stone-100 p-3 text-sm">{link}</div>
          <form action={sendQuestionnaireLink.bind(null, id)} className="grid gap-3 md:grid-cols-[1fr_auto]">
            <Field label="Client email"><Input name="email" defaultValue={studio.contactEmail || ""} type="email" /></Field>
            <div className="flex items-end"><Button type="submit">Send link</Button></div>
          </form>
          <p className="flex items-center gap-2 text-sm text-stone-600"><Copy className="h-4 w-4" /> The public link works without a client account and saves answers into this project.</p>
        </CardContent>
      </Card>
    </div>
  );
}
