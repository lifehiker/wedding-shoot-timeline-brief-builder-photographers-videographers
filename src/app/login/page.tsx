import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ created?: string }> }) {
  const search = await searchParams;
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
        <Card className="w-full">
          <CardHeader><CardTitle>Sign in</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <LoginForm created={Boolean(search.created)} />
            <p className="text-sm text-stone-600">Need an account? <Link className="font-semibold text-teal-800" href="/signup">Create one</Link>.</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
