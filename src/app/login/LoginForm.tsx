"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function LoginForm({ created }: { created?: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(formData: FormData) {
    setError("");
    const res = await signIn("credentials", {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
      redirect: false,
    });
    if (res?.ok) router.push("/dashboard");
    else setError("Email or password was not recognized.");
  }
  return (
    <form action={submit} className="grid gap-4">
      {created && <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">Account created. Sign in to continue.</p>}
      {error && <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      <Field label="Email"><Input name="email" type="email" required /></Field>
      <Field label="Password"><Input name="password" type="password" required /></Field>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
