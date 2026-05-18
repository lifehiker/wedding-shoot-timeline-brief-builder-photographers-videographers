import Link from "next/link";
import { Header } from "@/components/site/Header";
import { signupAction } from "@/app/(app)/projects/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
        <Card className="w-full">
          <CardHeader><CardTitle>Create your studio</CardTitle></CardHeader>
          <CardContent>
            <form action={signupAction} className="grid gap-4">
              <Field label="Name"><Input name="name" required /></Field>
              <Field label="Email"><Input name="email" type="email" required /></Field>
              <Field label="Password"><Input name="password" type="password" minLength={8} required /></Field>
              <Button type="submit">Create account</Button>
            </form>
            <p className="mt-4 text-sm text-stone-600">Already registered? <Link href="/login" className="font-semibold text-teal-800">Sign in</Link>.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
