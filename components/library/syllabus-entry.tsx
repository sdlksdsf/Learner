import Link from "next/link";
import { ArrowRight, ExternalLink, Info } from "lucide-react";
import type { ArchiveEntry } from "@/lib/types";
import { catalogue, getCatalogueEntry } from "@/lib/data/syllabus";
import { archiveEntries } from "@/lib/data/archive";

/**
 * A syllabus the archive indexes but the question bank cannot build. It still
 * has real value: the chapters the paper draws on, which sessions ran, and the
 * board's own page for the paper and its mark scheme.
 */
export function SyllabusEntry({ entry }: { entry: ArchiveEntry }) {
  const code = entry.specId.split("-")[0];
  const subject = getCatalogueEntry(code) ?? catalogue.find((c) => c.code === code);

  const siblings = archiveEntries
    .filter((e) => e.subjectId === entry.subjectId && e.level === entry.level && e.slug !== entry.slug)
    .sort((a, b) => b.year - a.year)
    .slice(0, 8);

  const chapters = subject?.topics ?? [];

  return (
    <div>
      <div className="anim-rise flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted">
        <Link href="/library" className="hover:text-ink">Archive</Link>
        <span className="text-faint">/</span>
        <span className="mono">{subject?.name ?? entry.title}</span>
        <span className="text-faint">/</span>
        <span className="mono text-ink">{entry.paperCode}</span>
      </div>

      <div className="anim-rise mt-5 flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-accent">
            {entry.session} {entry.year} · {entry.level} · {entry.marks} marks
          </p>
          <h1 className="display mt-2 text-[clamp(34px,4.5vw,54px)]">
            {subject?.name ?? entry.title} {entry.paperCode}
          </h1>
          <p className="mt-2 text-[12px] text-muted">
            {entry.minutes} minutes · {chapters.length || "No"} chapters indexed
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={entry.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm"
          >
            Board papers <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 border border-line bg-paper-2 p-4">
        <Info size={14} className="mt-[2px] shrink-0 text-muted" />
        <p className="text-[11.5px] leading-relaxed text-muted">
          This syllabus is indexed from Cambridge&rsquo;s published specification,
          but Papertrail does not yet hold its question bank, so it cannot build a
          sit-on-screen paper here. The chapters below are the ones the syllabus
          examines, and the board link goes to the paper and mark scheme.
        </p>
      </div>

      {chapters.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-[24px]">What this paper examines</h2>
          <div className="mt-4 border-t border-line">
            {chapters.map((topic) => (
              <details key={topic.code} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center gap-3 py-3.5">
                  <span className="mono shrink-0 text-[9px] uppercase tracking-[0.1em] text-faint">
                    {topic.code}
                  </span>
                  <span className="min-w-0 flex-1 text-[12px]">{topic.name}</span>
                  <span className="mono text-[9px] text-muted">{topic.points.length}</span>
                </summary>
                <ul className="pb-4 pl-0 sm:pl-[68px]">
                  {topic.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 py-1 text-[11px] leading-relaxed text-muted"
                    >
                      <span aria-hidden className="mt-[7px] block h-[3px] w-[3px] shrink-0 bg-line-strong" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      )}

      {siblings.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-[24px]">Other sessions</h2>
          <div className="mt-3 grid gap-px bg-line sm:grid-cols-2">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/library/${s.slug}`}
                className="group flex items-center justify-between gap-3 bg-paper-2 px-4 py-3 transition-colors hover:bg-paper-3"
              >
                <span className="text-[11.5px]">
                  {s.session} {s.year}
                </span>
                <ArrowRight
                  size={12}
                  className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
