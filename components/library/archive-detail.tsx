"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ExternalLink,
  Play,
  Printer,
} from "lucide-react";
import type { ArchiveEntry, Paper } from "@/lib/types";
import { getSubject } from "@/lib/data/subjects";
import { savePaper, toggleSaved, isSaved } from "@/lib/storage";
import { archiveEntries } from "@/lib/data/archive";
import { PaperSheet } from "@/components/paper/paper-sheet";
import { MarkScheme } from "@/components/paper/mark-scheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/format";

export function ArchiveDetail({
  entry,
  paper,
}: {
  entry: ArchiveEntry;
  paper: Paper;
}) {
  const router = useRouter();
  const [showScheme, setShowScheme] = useState(false);
  const [saved, setSaved] = useState(false);
  const subject = getSubject(entry.subjectId);

  useEffect(() => {
    setSaved(isSaved(paper.id));
  }, [paper.id]);

  const siblings = archiveEntries
    .filter(
      (e) =>
        e.subjectId === entry.subjectId &&
        e.level === entry.level &&
        e.slug !== entry.slug
    )
    .sort((a, b) => b.year - a.year || a.specId.localeCompare(b.specId))
    .slice(0, 6);

  const practice = () => {
    savePaper(paper);
    router.push(`/practice/${paper.id}`);
  };

  const print = () => {
    savePaper(paper);
    router.push(`/print/${paper.id}`);
  };

  const save = () => {
    const next = toggleSaved(paper.id);
    setSaved(next);
  };

  return (
    <div>
      <div className="anim-rise flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted">
        <span className="mono">Archive</span>
        <span className="text-faint">/</span>
        <span className="mono">{subject?.name}</span>
        <span className="text-faint">/</span>
        <span className="mono text-ink">{entry.paperCode}</span>
      </div>

      <div className="anim-rise mt-5 flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-accent">
            {entry.session} {entry.year} · {entry.level} · {paper.totalMarks} marks
          </p>
          <h1 className="display mt-2 text-[clamp(34px,4.5vw,54px)]">
            {subject?.name} {entry.paperCode}
          </h1>
          <p className="mt-2 text-[12px] text-muted">
            {entry.title} · {paper.durationMin} minutes · {paper.sections.reduce((n, s) => n + s.questions.length, 0)} questions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={practice} size="sm">
            <Play size={13} /> Practice
          </Button>
          <Button onClick={print} variant="ghost" size="sm">
            <Printer size={13} /> Print / PDF
          </Button>
          <Button onClick={save} variant="ghost" size="sm">
            {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
            {saved ? "Saved" : "Save"}
          </Button>
          <a
            href={entry.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm"
          >
            Official source <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="min-w-0">
          <PaperSheet paper={paper} />
          <div className="mx-auto mt-8 max-w-[760px]">
            <button
              onClick={() => setShowScheme((v) => !v)}
              className="flex w-full items-center justify-between border-t border-line py-4 text-left"
            >
              <span className="font-display text-[22px]">Mark scheme</span>
              <ChevronDown
                size={18}
                className={cn("text-muted transition-transform", showScheme && "rotate-180")}
              />
            </button>
            {showScheme && (
              <div className="anim-fade pb-6">
                <MarkScheme paper={paper} />
              </div>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="sheet p-5">
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-faint">
              Series
            </p>
            <dl className="mt-4 space-y-2.5">
              {[
                ["Board", "CAIE"],
                ["Syllabus", subject?.syllabus[entry.level] ?? "—"],
                ["Level", entry.level],
                ["Paper", entry.paperCode],
                ["Marks", `${paper.totalMarks}`],
                ["Duration", `${entry.minutes} min`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between border-b border-line/60 pb-2 last:border-b-0"
                >
                  <dt className="text-[10px] uppercase tracking-[0.1em] text-muted">{k}</dt>
                  <dd className="mono text-[10.5px]">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 border-t border-line pt-4">
              <p className="mono text-[9px] uppercase tracking-[0.14em] text-faint">
                Chapters
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {entry.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-2 text-[10.5px] text-ink-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <Button onClick={practice} className="mt-5 w-full">
              <Play size={13} /> Sit this paper
            </Button>
            <button
              onClick={print}
              className="mt-2 flex w-full items-center justify-center gap-1.5 py-1.5 text-[10px] text-muted transition-colors hover:text-ink"
            >
              <Printer size={11} /> Print the pack
            </button>
          </div>

          {siblings.length > 0 && (
            <div className="mt-4 border border-line bg-paper-2/70 p-4">
              <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                Same level
              </p>
              <ul className="mt-2 divide-y divide-line/70">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`/library/${sibling.slug}`}
                      className="group flex items-center justify-between gap-2 py-2 text-[10.5px] transition-colors hover:text-accent"
                    >
                      <span className="min-w-0 truncate">
                        {sibling.paperCode} · {sibling.title.replace(`${subject?.name} — `, "")}
                      </span>
                      <span className="mono shrink-0 text-[9px] text-muted">
                        {sibling.year}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 border border-line bg-paper-2/70 p-4">
            <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-accent">
              Study reconstruction
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-muted">
              This paper is assembled from the syllabus blueprint and the
              series pattern. It is not the official paper. Official past
              papers and mark schemes remain the copyright of Cambridge
              International.
            </p>
            <a
              href={entry.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium text-ink link-underline"
            >
              Open the official archive <ExternalLink size={11} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
