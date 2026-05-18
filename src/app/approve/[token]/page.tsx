import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/field";
import { prisma } from "@/lib/prisma";
import { submitApproval } from "./actions";

export default async function ApprovePage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ done?: string }> }) {
  const { token } = await params;
  const search = await searchParams;
  const project = await prisma.weddingProject.findUnique({
    where: { approvalToken: token },
    include: { timelineItems: { orderBy: { sortOrder: "asc" } }, shotListItems: { orderBy: { sortOrder: "asc" }, take: 12 }, familyFormalGroups: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project) notFound();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Card>
          <CardHeader><CardTitle>{project.coupleName1} + {project.coupleName2} approval</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {search.done && <p className="rounded-md bg-emerald-50 p-3 text-emerald-800">Your response was recorded.</p>}
            <section><h2 className="mb-2 font-bold">Timeline</h2>{project.timelineItems.map((item) => <p key={item.id} className="border-b border-stone-100 py-2 text-sm"><b>{item.time}</b> {item.title}</p>)}</section>
            <section><h2 className="mb-2 font-bold">Family formals</h2>{project.familyFormalGroups.map((item) => <p key={item.id} className="border-b border-stone-100 py-2 text-sm">{item.label}: {item.people}</p>)}</section>
            <section><h2 className="mb-2 font-bold">Must-have shots</h2>{project.shotListItems.filter((i) => i.isMustHave).map((item) => <p key={item.id} className="border-b border-stone-100 py-2 text-sm">{item.label}</p>)}</section>
            <form action={submitApproval.bind(null, token)} className="space-y-3">
              <Textarea name="comments" placeholder="Approval notes or requested changes" />
              <div className="flex flex-wrap gap-3">
                <Button name="status" value="Approved" type="submit">Approve</Button>
                <Button name="status" value="Changes requested" variant="secondary" type="submit">Request changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
