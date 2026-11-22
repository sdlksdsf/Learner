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
import { archiveEntries, archiveYears } from "@/lib/data/archive";
import { getSubject } from "@/lib/data/subjects";
import { cn } from "@/lib/format";

const levels = ["All levels", "IGCSE", "AS", "A Level"] as const;
const subjects = ["maths", "physics", "chem", "bio", "cs", "econ"];
const visibleCount = 6;

export function LibraryExplorer() {
  const [subject, setSubject] = useState("all");
  const [level, setLevel] = useState("All levels");
  const [year, setYear] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return archiveEntries
      .filter((e) => subject === "all" || e.subjectId === subject)
      .filter((e) => level === "All levels" || e.level === level)
      .filter((e) => year === "all" || String(e.year) === year)
      .filter((e) => {
        if (!query) return true;
        const subj = getSubject(e.subjectId);
        return [e.title, e.paperCode, subj?.name, ...e.topics]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        const sa = subjects.indexOf(a.subjectId);
        const sb = subjects.indexOf(b.subjectId);
        if (sa !== sb) return sa - sb;
        if (b.year !== a.year) return b.year - a.year;
        return a.paperCode.localeCompare(b.paperCode);
      });
  }, [subject, level, year, search]);

  const groups = useMemo(() => {
    const order = subjects.filter((id) => filtered.some((e) => e.subjectId === id));
    return order.map((id) => {
      const subject = getSubject(id);
      const entries = filtered.filter((e) => e.subjectId === id);
      const levels = Array.from(new Set(entries.map((e) => e.level))).sort(
        (a, b) =>
          ["IGCSE", "AS", "A Level"].indexOf(a) - ["IGCSE", "AS", "A Level"].indexOf(b)
      );
      return {
        key: id,
        name: subject?.name ?? id,
        accent: subject?.accent ?? "#17150F",
        levels,
        entries,
      };
    });
  }, [filtered]);

  const activeCount = filtered.length;

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSubject("all")}
            className={cn(
              "border px-3 py-1.5 text-[11px] font-medium transition-colors duration-150",
              subject === "all"
                ? "border-ink bg-ink text-paper-2"
                : "border-line text-muted hover:border-line-strong hover:text-ink"
            )}
          >
            All subjects
          </button>
          {subjects.map((id) => {
            const s = getSubject(id);
            if (!s) return null;
            return (
              <button
                key={id}
                onClick={() => setSubject(id)}
                className={cn(
                  "border px-3 py-1.5 text-[11px] font-medium transition-colors duration-150",
                  subject === id
                    ? "border-ink bg-ink text-paper-2"
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
              placeholder="Search code, topic…"
              className="h-8 w-44 border border-line bg-paper-2 pl-7 pr-2 text-[11px] outline-none placeholder:text-muted/70 focus:border-ink sm:w-56"
              aria-label="Search papers"
            />
          </div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as (typeof levels)[number])}
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
          <span className="mono order-first flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-muted sm:order-none">
            <SlidersHorizontal size={11} /> {activeCount} papers
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border-b border-line py-24 text-center">
          <p className="font-display text-[28px]">Nothing in that drawer.</p>
          <p className="mt-2 text-[12px] text-muted">
            Try a different subject, level or year.
          </p>
          <button
            onClick={() => {
              setSubject("all");
              setLevel("All levels");
              setYear("all");
              setSearch("");
            }}
            className="btn btn-ghost btn-sm mt-6"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div>
          {groups.map((group) => (
            <section key={group.key} className="border-b border-line">
              <div className="flex items-baseline justify-between py-3">
                <div className="flex items-baseline gap-2.5">
                  <span
                    className="h-[7px] w-[7px]"
                    style={{ background: group.accent }}
                    aria-hidden
                  />
                  <h2 className="font-display text-[19px] tracking-[-0.01em]">
                    {group.name}
                  </h2>
                  <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    {group.levels.join(" · ")}
                  </span>
                </div>
                <span className="mono text-[10px] text-faint">
                  {group.entries.length} paper{group.entries.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3">
                {(expandedGroups.includes(group.key)
                  ? group.entries
                  : group.entries.slice(0, visibleCount)
                ).map((entry) => (
                  <ArchiveCard key={entry.slug} entry={entry} />
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
                      Show {group.entries.length - visibleCount} more{" "}
                      {group.name.toLowerCase()} papers
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
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 text-[10px] leading-relaxed text-muted sm:flex-row sm:justify-between">
        <p>
          Archive papers are study reconstructions assembled from the syllabus
          blueprint and series pattern. Official papers are linked from each
          page.
        </p>
        <p className="mono uppercase tracking-[0.12em]">CAIE · {archiveYears[archiveYears.length - 1]}–{archiveYears[0]}</p>
      </div>
    </div>
  );
}

function ArchiveCard({ entry }: { entry: ArchiveEntry }) {
  const subject = getSubject(entry.subjectId);
  return (
    <Link
      href={`/library/${entry.slug}`}
      className="group relative flex flex-col bg-paper-2 p-5 transition-colors duration-200 hover:bg-paper-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.14em] text-faint">
            {subject?.name} · {entry.level}
          </p>
          <p className="mono mt-1 text-[15px] tracking-wide text-ink">
            {entry.paperCode}
          </p>
        </div>
        <span className="mono text-[10px] text-faint">
          {entry.year} {entry.session}
        </span>
      </div>

      <p className="mt-5 font-display text-[20px] leading-tight tracking-[-0.015em]">
        {entry.title}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {entry.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="tag">
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-6">
        <p className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
          {entry.marks} marks · {entry.minutes} min
        </p>
        <span className="grid h-7 w-7 place-items-center border border-line text-muted transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper-2">
          <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
