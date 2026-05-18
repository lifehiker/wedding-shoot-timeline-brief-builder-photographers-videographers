import Link from "next/link";
import { CalendarDays, CreditCard, LayoutDashboard, Settings } from "lucide-react";

export function AppSidebar() {
  const links = [
    ["/dashboard", "Dashboard", LayoutDashboard],
    ["/projects", "Projects", CalendarDays],
    ["/settings", "Settings", Settings],
    ["/billing", "Billing", CreditCard],
  ] as const;
  return (
    <aside className="border-r border-stone-200 bg-stone-950 p-4 text-white md:min-h-screen md:w-64">
      <Link href="/dashboard" className="mb-6 block text-lg font-bold">BriefBuilder</Link>
      <nav className="grid gap-1">
        {links.map(([href, label, Icon]) => (
          <Link key={href} href={href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-stone-200 hover:bg-white/10">
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
