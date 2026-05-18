import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { requireStudio } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { studio } = await requireStudio();
  return (
    <div className="min-h-screen bg-stone-50 md:flex">
      <AppSidebar />
      <div className="min-w-0 flex-1">
        <AppTopbar studioName={studio.name} />
        <main className="mx-auto max-w-7xl p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
