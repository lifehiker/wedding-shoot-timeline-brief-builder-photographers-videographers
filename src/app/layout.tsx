import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BriefBuilder | Wedding Shoot Timeline and Brief Builder",
  description:
    "Turn wedding questionnaires into timelines, shot lists, family formals, reel briefs, editor notes, PDFs, and approval pages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
