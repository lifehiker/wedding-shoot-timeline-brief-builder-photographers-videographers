import { createProject } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/field";

export default function NewProjectPage() {
  return (
    <Card>
      <CardHeader><CardTitle>New wedding project</CardTitle></CardHeader>
      <CardContent>
        <form action={createProject} className="grid gap-4 md:grid-cols-2">
          <Field label="Partner one"><Input name="coupleName1" required /></Field>
          <Field label="Partner two"><Input name="coupleName2" required /></Field>
          <Field label="Wedding date"><Input name="weddingDate" type="date" /></Field>
          <Field label="Venue"><Input name="venueName" /></Field>
          <Field label="Ceremony location"><Input name="ceremonyLocation" /></Field>
          <Field label="Reception location"><Input name="receptionLocation" /></Field>
          <Field label="Ceremony time"><Input name="ceremonyTime" type="time" /></Field>
          <Field label="Reception time"><Input name="receptionTime" type="time" /></Field>
          <Field label="Package"><Input name="packageName" placeholder="Photo + highlight film" /></Field>
          <Field label="Deliverables"><Textarea name="deliverables" placeholder="Highlight film&#10;Vertical reel&#10;Full ceremony edit" /></Field>
          <Field label="Vendors"><Textarea name="vendors" placeholder="Planner, DJ, florist, venue contact" /></Field>
          <Field label="Music preferences"><Textarea name="musicPreferences" /></Field>
          <Field label="Family members"><Textarea name="familyMembers" placeholder="Alex - mom&#10;Sam - dad&#10;Taylor - sister" /></Field>
          <Field label="Must-have shots"><Textarea name="mustHaveShots" /></Field>
          <Field label="Restrictions"><Textarea name="restrictions" /></Field>
          <Field label="Special notes"><Textarea name="specialNotes" /></Field>
          <div className="md:col-span-2"><Button type="submit">Create and generate documents</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
