export function AppTopbar({ studioName }: { studioName: string }) {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
      <div>
        <p className="text-xs uppercase tracking-wide text-stone-500">Workspace</p>
        <h1 className="font-semibold text-stone-950">{studioName}</h1>
      </div>
      <form action="/api/auth/signout" method="post">
        <button className="rounded-md border border-stone-300 px-3 py-2 text-sm font-medium hover:bg-stone-50">Sign out</button>
      </form>
    </div>
  );
}
