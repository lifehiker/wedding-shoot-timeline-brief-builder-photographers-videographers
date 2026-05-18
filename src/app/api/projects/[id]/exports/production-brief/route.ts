import { exportPdf } from "@/lib/pdf/export-route";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return exportPdf(id, "production-brief");
}
