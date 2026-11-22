"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Search } from "lucide-react";
import {
  catalogue,
  catalogueGroups,
  catalogueLevels,
  type CatalogueEntry,
  type SyllabusLevel,
} from "@/lib/data/syllabus";
import { cn } from "@/lib/format";
import { subjects } from "@/lib/data/subjects";
import { topicsForLevel } from "@/lib/data/subjects";

/** Chapter counts for subjects that already have a question bank, keyed by
 *  syllabus code, so the list never understates what is available. */
const bankedChapters = new Map<string, number>();
for (const subject of subjects) {
  for (const level of subject.levels) {
    const code = subject.syllabus[level];
    if (!code) continue;
    const count = topicsForLevel(subject, level).length;
    if (count > 0) bankedChapters.set(code, Math.max(bankedChapters.get(code) ?? 0, count));
  }
}

export function SyllabusExplorer() {
  const [level, setLevel] = useState<SyllabusLevel | "All">("All");
  const [group, setGroup] = useState("All");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("pakistan-studies-0448");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogue
      .filter((c) => (level === "All" ? true : c.levels.includes(level)))
      .filter((c) => (group === "All" ? true : c.group === group))
      .filter((c) => (q ? c.name.toLowerCase().includes(q) || c.code.includes(q) : true))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [level, group, query]);

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {catalogueLevels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "mono border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-colors",
                level === l
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-muted hover:border-ink hover:text-ink"
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Subject name or syllabus code"
            aria-label="Search subjects"
            className="field-input !h-10 pl-9 text-[13px]"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {catalogueGroups.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={cn(
              "text-[11px] transition-colors",
              group === g ? "text-ink underline underline-offset-4" : "text-faint hover:text-ink"
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="mono mt-6 text-[10px] uppercase tracking-[0.14em] text-faint">
        {rows.length} subjects ·{" "}
        {rows.filter(
          (r) => (r.topics?.length ?? 0) > 0 || (bankedChapters.get(r.code) ?? 0) > 0
        ).length}{" "}
        with chapter lists
      </p>

      <div className="mt-4 border-t border-line">
        {rows.map((entry) => (
          <Row
            key={entry.id}
            entry={entry}
            open={open === entry.id}
            onToggle={() => setOpen(open === entry.id ? null : entry.id)}
          />
        ))}
        {rows.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">
            No subject matches that. Try the syllabus code, e.g. 0448.
          </p>
        )}
      </div>
    </div>
  );
}

function Row({
  entry,
  open,
  onToggle,
}: {
  entry: CatalogueEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const verifiedChapters = entry.topics?.length ?? 0;
  const banked = bankedChapters.get(entry.code) ?? 0;
  const chapters = Math.max(verifiedChapters, banked);
  const hasTopics = chapters > 0;
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-hover"
      >
        <span className="mono w-14 shrink-0 text-[11px] text-faint">{entry.code}</span>
        <span className="flex-1 text-[14px] text-ink">{entry.name}</span>
        <span className="mono hidden text-[9px] uppercase tracking-[0.1em] text-faint sm:block">
          {entry.levels.join(" · ")}
        </span>
        {hasTopics ? (
          <span className="tag tag-green hidden md:inline-flex">
            <Check size={9} /> {chapters} chapters
          </span>
        ) : (
          <span className="tag hidden md:inline-flex">topics pending</span>
        )}
        <span className="mono text-[13px] text-faint">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="pb-6 pl-0 sm:pl-[72px]">
          {verifiedChapters > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {entry.topics!.map((topic) => (
                <div key={topic.code} className="border-l-2 border-accent/40 pl-4">
                  <p className="mono text-[9px] uppercase tracking-[0.12em] text-accent">
                    {topic.code}
                  </p>
                  <p className="mt-1 font-display text-[17px] leading-tight">{topic.name}</p>
                  <ul className="mt-2 space-y-1">
                    {topic.points.map((p) => (
                      <li key={p} className="text-[12.5px] leading-relaxed text-muted">
                        — {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : banked > 0 ? (
            <p className="max-w-xl text-[13px] leading-relaxed text-muted">
              {banked} chapters are indexed for this subject and a question bank is attached, so
              the paper builder is open. The chapter list is shown in the studio, where it drives
              the paper blueprint.
            </p>
          ) : (
            <p className="max-w-xl text-[13px] leading-relaxed text-muted">
              Syllabus code {entry.code} is confirmed against the board&rsquo;s subject list.
              The chapter breakdown for this subject has not been transcribed yet, so the paper
              builder will not offer it — we would rather show nothing than invent chapters.
            </p>
          )}

          {entry.bank && (
            <Link
              href={`/create?subject=${entry.id.split("-").slice(0, -1).join("-")}`}
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-accent hover:underline"
            >
              Build a paper from this subject <ArrowUpRight size={12} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
