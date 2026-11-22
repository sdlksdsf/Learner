import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveDetail } from "@/components/library/archive-detail";
import { archiveEntries, getArchiveEntry } from "@/lib/data/archive";
import { buildArchivePaper, canBuildArchivePaper } from "@/lib/engine/generate";
import { SyllabusEntry } from "@/components/library/syllabus-entry";
import { getSubject } from "@/lib/data/subjects";

/**
 * Prerender the papers that can actually be sat. The syllabus-only entries are
 * cheap pages rendered on demand, so pre-generating seven thousand of them
 * would only slow the build and the deploy.
 */
export function generateStaticParams() {
  return archiveEntries
    .filter(canBuildArchivePaper)
    .map((entry) => ({ slug: entry.slug }));
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
  const name = subject?.name ?? entry.title.split(" — ")[0];
  return {
    title: `${name} ${entry.paperCode} — ${entry.session} ${entry.year}`,
    description: `${name} ${entry.level} ${entry.paperCode} paper, ${entry.session} ${entry.year}. ${entry.marks} marks, ${entry.minutes} minutes, with chapters and the board's mark-scheme link.`,
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

  if (!canBuildArchivePaper(entry)) {
    return (
      <div className="container-x py-8 lg:py-12">
        <SyllabusEntry entry={entry} />
      </div>
    );
  }

  const paper = buildArchivePaper(entry);

  return (
    <div className="container-x py-8 lg:py-12">
      <ArchiveDetail entry={entry} paper={paper} />
    </div>
  );
}
