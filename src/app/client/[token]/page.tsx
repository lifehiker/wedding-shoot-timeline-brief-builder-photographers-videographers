import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";
import { defaultQuestionnaire } from "@/lib/default-questionnaire";
import { prisma } from "@/lib/prisma";
import { submitQuestionnaire } from "./actions";

export default async function ClientQuestionnairePage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ submitted?: string }> }) {
  const { token } = await params;
  const search = await searchParams;
  const questionnaire = await prisma.questionnaire.findUnique({ where: { token }, include: { project: true } });
  if (!questionnaire) notFound();
  if (search.submitted) {
    return <><Header /><main className="mx-auto max-w-2xl px-4 py-16"><Card><CardHeader><CardTitle>Questionnaire submitted</CardTitle></CardHeader><CardContent>Your photo/video team has the details and can prepare the production brief.</CardContent></Card></main></>;
  }
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <CardHeader><CardTitle>{questionnaire.project.coupleName1} + {questionnaire.project.coupleName2} questionnaire</CardTitle></CardHeader>
          <CardContent>
            <form action={submitQuestionnaire.bind(null, token)} className="grid gap-4">
              {defaultQuestionnaire.map((q) => (
                <Field key={q.id} label={q.label}>
                  {q.type === "textarea" ? <Textarea name={q.id} required={q.required} /> : <Input name={q.id} type={q.type} required={q.required} />}
                </Field>
              ))}
              <Button type="submit">Submit questionnaire</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
