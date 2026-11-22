import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveDetail } from "@/components/library/archive-detail";
import { archiveEntries, getArchiveEntry } from "@/lib/data/archive";
import { buildArchivePaper } from "@/lib/engine/generate";
import { getSubject } from "@/lib/data/subjects";

export function generateStaticParams() {
  return archiveEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getArchiveEntry(slug);
  if (!entry) return { title: "Paper not found" };
  const subject = getSubject(entry.subjectId);
  return {
    title: `${subject?.name ?? "Paper"} ${entry.paperCode} — ${entry.session} ${entry.year}`,
    description: `${subject?.name ?? ""} ${entry.level} past-paper reconstruction with mark scheme. ${entry.marks} marks, ${entry.minutes} minutes.`,
  };
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getArchiveEntry(slug);
  if (!entry) notFound();
  const paper = buildArchivePaper(entry);

  return (
    <div className="container-x py-8 lg:py-12">
      <ArchiveDetail entry={entry} paper={paper} />
    </div>
  );
}
