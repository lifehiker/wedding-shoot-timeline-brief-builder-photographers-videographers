import Link from "next/link";
import { Camera, LayoutDashboard } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-stone-950">
          <Camera className="h-5 w-5 text-teal-700" />
          BriefBuilder
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link className="hidden rounded-md px-3 py-2 text-stone-700 hover:bg-stone-100 sm:inline-flex" href="/pricing">Pricing</Link>
          <Link className="hidden rounded-md px-3 py-2 text-stone-700 hover:bg-stone-100 sm:inline-flex" href="/templates/wedding-videographer-shot-list-template">Templates</Link>
          <Link className="rounded-md px-3 py-2 text-stone-700 hover:bg-stone-100" href="/login">Login</Link>
          <Link className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-white hover:bg-teal-800" href="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            App
          </Link>
        </nav>
      </div>
    </header>
  );
}
