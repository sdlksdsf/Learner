"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import type { ArchiveEntry } from "@/lib/types";
import { archiveEntries, archiveYears, archiveSpan } from "@/lib/data/archive";
import { catalogue } from "@/lib/data/syllabus";
import { getSubject } from "@/lib/data/subjects";
import { canBuildArchivePaper } from "@/lib/engine/generate";
import { cn } from "@/lib/format";

const levels = ["All levels", "IGCSE", "O Level", "AS", "A Level"] as const;
const visibleCount = 6;

/** The catalogue row a paper belongs to, for its real name and group. */
const entryInfo = (entry: ArchiveEntry) => {
  const code = entry.specId.split("-")[0];
  return catalogue.find((c) => c.code === code);
};

export function LibraryExplorer() {
  const [subjectCode, setSubjectCode] = useState("all");
  const [level, setLevel] = useState("All levels");
  const [year, setYear] = useState("all");
  const [search, setSearch] = useState("");
  const [onlyBanked, setOnlyBanked] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  /** Subtests that can be sat on screen, offered first as a shortcut. */
  const bankedSubjects = useMemo(() => {
    const ids = Array.from(new Set(archiveEntries.filter(canBuildArchivePaper).map((e) => e.subjectId)));
    return ids
      .map((id) => getSubject(id))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return archiveEntries
      .filter((e) =>
        subjectCode === "all"
          ? true
          : subjectCode.startsWith("sub-")
            ? e.subjectId === subjectCode.slice(4)
            : e.specId.startsWith(`${subjectCode}-`)
      )
      .filter((e) => level === "All levels" || e.level === level)
      .filter((e) => year === "all" || String(e.year) === year)
      .filter((e) => !onlyBanked || canBuildArchivePaper(e))
      .filter((e) => {
        if (!query) return true;
        const info = entryInfo(e);
        return [e.title, e.paperCode, info?.name, e.session, ...e.topics]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        const ba = canBuildArchivePaper(a) ? 0 : 1;
        const bb = canBuildArchivePaper(b) ? 0 : 1;
        if (ba !== bb) return ba - bb;
        if (b.year !== a.year) return b.year - a.year;
        return a.paperCode.localeCompare(b.paperCode);
      });
  }, [subjectCode, level, year, search, onlyBanked]);

  const groups = useMemo(() => {
    const byCode = new Map<string, ArchiveEntry[]>();
    for (const entry of filtered) {
      const code = entry.specId.split("-")[0];
      const list = byCode.get(code) ?? [];
      list.push(entry);
      byCode.set(code, list);
    }
    return [...byCode.entries()]
      .map(([code, entries]) => {
        const info = catalogue.find((c) => c.code === code);
        return {
          key: code,
          code,
          name: info?.name ?? entries[0].title,
          group: info?.group ?? "Other",
          banked: canBuildArchivePaper(entries[0]),
          levels: Array.from(new Set(entries.map((e) => e.level))),
          entries,
        };
      })
      .sort((a, b) => {
        if (a.banked !== b.banked) return a.banked ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 60);
  }, [filtered]);

  const reset = () => {
    setSubjectCode("all");
    setLevel("All levels");
    setYear("all");
    setSearch("");
    setOnlyBanked(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSubjectCode("all")}
            className={cn(
              "border px-3 py-1.5 text-[11px] font-medium transition-colors duration-150",
              subjectCode === "all"
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-line-strong hover:text-ink"
            )}
          >
            All subjects
          </button>
          {bankedSubjects.map((s) => {
            const code = `sub-${s.id}`;
            return (
              <button
                key={s.id}
                onClick={() => setSubjectCode(code)}
                className={cn(
                  "border px-3 py-1.5 text-[11px] font-medium transition-colors duration-150",
                  subjectCode === code
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                )}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code, subject, topic…"
              className="h-8 w-44 border border-line bg-paper-2 pl-7 pr-2 text-[11px] outline-none placeholder:text-muted/70 focus:border-ink sm:w-56"
              aria-label="Search papers"
            />
          </div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="h-8 border border-line bg-paper-2 px-2 text-[11px] outline-none focus:border-ink"
            aria-label="Filter by level"
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="h-8 border border-line bg-paper-2 px-2 text-[11px] outline-none focus:border-ink"
            aria-label="Filter by year"
          >
            <option value="all">All years</option>
            {archiveYears.map((y) => (
              <option key={y} value={String(y)}>
                {y}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOnlyBanked((v) => !v)}
            className={cn(
              "h-8 border px-2.5 text-[10.5px] transition-colors duration-150",
              onlyBanked
                ? "border-ink bg-ink text-paper"
                : "border-line text-muted hover:border-line-strong hover:text-ink"
            )}
            title="Only papers you can sit on screen"
          >
            Sat on screen
          </button>
          <span className="mono order-first flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-muted sm:order-none">
            <SlidersHorizontal size={11} /> {filtered.length.toLocaleString()} papers
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border-b border-line py-24 text-center">
          <p className="font-display text-[28px]">Nothing in that drawer.</p>
          <p className="mt-2 text-[12px] text-muted">
            Try a different subject, level or year.
          </p>
          <button onClick={reset} className="btn btn-ghost btn-sm mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <div>
          {groups.map((group) => (
            <section key={group.key} className="border-b border-line">
              <div className="flex items-baseline justify-between gap-3 py-3">
                <div className="flex min-w-0 items-baseline gap-2.5">
                  <span
                    className={cn("h-[7px] w-[7px] shrink-0", group.banked ? "bg-accent" : "bg-line-strong")}
                    aria-hidden
                  />
                  <h2 className="truncate font-display text-[19px] tracking-[-0.01em]">
                    {group.name}
                  </h2>
                  <span className="mono shrink-0 text-[9px] uppercase tracking-[0.1em] text-muted">
                    {group.code} · {group.levels.join(" · ")}
                  </span>
                </div>
                <span className="mono shrink-0 text-[10px] text-faint">
                  {group.entries.length} paper{group.entries.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
                {(expandedGroups.includes(group.key)
                  ? group.entries
                  : group.entries.slice(0, visibleCount)
                ).map((entry) => (
                  <ArchiveCard key={entry.slug} entry={entry} name={group.name} />
                ))}
              </div>
              {group.entries.length > visibleCount && (
                <button
                  onClick={() =>
                    setExpandedGroups((current) =>
                      current.includes(group.key)
                        ? current.filter((k) => k !== group.key)
                        : [...current, group.key]
                    )
                  }
                  className="group mb-3 mt-px flex w-full items-center justify-center gap-2 border border-line bg-paper py-2.5 text-[10.5px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {expandedGroups.includes(group.key) ? (
                    <>Show fewer <ChevronUp size={12} /></>
                  ) : (
                    <>
                      Show {group.entries.length - visibleCount} more {group.code} papers
                      <ChevronDown
                        size={12}
                        className="transition-transform group-hover:translate-y-0.5"
                      />
                    </>
                  )}
                </button>
              )}
            </section>
          ))}
          {new Set(filtered.map((e) => e.specId.split("-")[0])).size > 60 && (
            <p className="py-4 text-center text-[11px] text-muted">
              Showing the first 60 of{" "}
              {new Set(filtered.map((e) => e.specId.split("-")[0])).size} syllabuses — search or
              filter to narrow the list.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 text-[10px] leading-relaxed text-muted sm:flex-row sm:justify-between">
        <p>
          Every syllabus Cambridge publishes is indexed with the sessions it ran.
          Papers marked with a filled dot can be sat on screen; the rest carry the
          chapter list and a link to the board&rsquo;s own paper and mark scheme.
        </p>
        <p className="mono uppercase tracking-[0.12em]">
          CAIE · {archiveSpan.min}–{archiveSpan.max}
        </p>
      </div>
    </div>
  );
}

function ArchiveCard({ entry, name }: { entry: ArchiveEntry; name: string }) {
  const banked = canBuildArchivePaper(entry);
  return (
    <Link
      href={`/library/${entry.slug}`}
      className="group relative flex flex-col bg-paper-2 p-5 transition-colors duration-200 hover:bg-paper-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {name} · {entry.level}
          </p>
          <p className="mono mt-1 text-[15px] tracking-wide text-ink">{entry.paperCode}</p>
        </div>
        <span className="mono shrink-0 text-right text-[10px] leading-tight text-muted">
          {entry.session}
          <br />
          <span className="text-ink">{entry.year}</span>
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {entry.topics.length > 0 ? (
          entry.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="tag">
              {topic}
            </span>
          ))
        ) : (
          <span className="tag">{banked ? "All chapters" : "Chapter list on the paper"}</span>
        )}
        {!banked && <span className="tag border-dashed">Board link only</span>}
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <p className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
          {entry.marks} marks · {entry.minutes} min
        </p>
        <span className="grid h-7 w-7 place-items-center border border-line text-muted transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
