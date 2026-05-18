"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { generateFamilyFormals } from "@/lib/generators/family-formals";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/field";

export function FamilyTool() {
  const [value, setValue] = useState("Alex - mom\nSam - dad\nTaylor - sister\nMorgan - grandparent");
  const groups = useMemo(() => generateFamilyFormals(value, "Couple"), [value]);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="space-y-2">{groups.map((group) => <div className="rounded-md border border-stone-200 bg-white p-3 text-sm" key={group.label}><b>{group.label}</b><br />{group.people}</div>)}</div>
      <Link href="/signup" className="rounded-md bg-teal-700 px-4 py-2 text-center font-semibold text-white md:col-span-2">Save to a wedding project</Link>
    </div>
  );
}

export function MissingTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const items = ["Couple names", "Wedding date", "Venue contact", "Ceremony time", "Reception time", "Family names", "Vendor contacts", "Music preferences", "Must-have shots"];
  const missing = items.filter((item) => !checked.includes(item));
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">{items.map((item) => <label key={item} className="flex gap-2 rounded-md border border-stone-200 bg-white p-3 text-sm"><input type="checkbox" checked={checked.includes(item)} onChange={(e) => setChecked(e.target.checked ? [...checked, item] : checked.filter((i) => i !== item))} />{item}</label>)}</div>
      <div className="rounded-lg border border-stone-200 bg-white p-4"><h2 className="font-bold">Missing info</h2>{missing.map((item) => <p className="mt-2 text-sm" key={item}>{item}</p>)}{!missing.length && <p className="mt-2 text-sm text-emerald-700">Everything is ready.</p>}</div>
      <Button className="md:col-span-2">Generate checklist</Button>
    </div>
  );
}
