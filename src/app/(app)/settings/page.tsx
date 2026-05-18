import { updateStudio } from "../projects/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { requireStudio } from "@/lib/session";

export default async function SettingsPage() {
  const { studio } = await requireStudio();
  return (
    <Card>
      <CardHeader><CardTitle>Studio settings</CardTitle></CardHeader>
      <CardContent>
        <form action={updateStudio} className="grid gap-4 md:grid-cols-2">
          <Field label="Studio name"><Input name="name" defaultValue={studio.name} /></Field>
          <Field label="Website"><Input name="website" defaultValue={studio.website || ""} /></Field>
          <Field label="Logo URL"><Input name="logoUrl" defaultValue={studio.logoUrl || ""} /></Field>
          <Field label="Brand color"><Input name="brandColor" type="color" defaultValue={studio.brandColor} /></Field>
          <Field label="Contact email"><Input name="contactEmail" type="email" defaultValue={studio.contactEmail || ""} /></Field>
          <div className="md:col-span-2"><Button type="submit">Save studio</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
