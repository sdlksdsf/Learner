"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import type { Attempt, Paper } from "@/lib/types";
import { buildArchivePaper } from "@/lib/engine/generate";
import { getArchiveEntry } from "@/lib/data/archive";
import { getAttempt, getPaper, savePaper } from "@/lib/storage";
import { PaperSheet } from "@/components/paper/paper-sheet";
import { MarkScheme } from "@/components/paper/mark-scheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/format";

export function PrintView({
  paperId,
  initialScheme = false,
  initialReport = false,
}: {
  paperId: string;
  initialScheme?: boolean;
  initialReport?: boolean;
}) {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [scheme, setScheme] = useState(initialScheme);
  const [report, setReport] = useState(initialReport);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let loaded = getPaper(paperId);
    if (!loaded && paperId.startsWith("arc_")) {
      const entry = getArchiveEntry(paperId.slice(4));
      if (entry) {
        loaded = buildArchivePaper(entry);
        savePaper(loaded);
      }
    }
    if (!loaded) {
      setNotFound(true);
      return;
    }
    setPaper(loaded);
    setAttempt(getAttempt(loaded.id));
  }, [paperId]);

  if (notFound) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-3xl">Paper not found.</p>
        <Link href="/create" className="btn btn-primary mt-6">
          Build a paper
        </Link>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="bg-[#8d8778] p-8">
        <div className="mx-auto h-[297mm] w-full max-w-[210mm] animate-pulse bg-white/60" />
      </div>
    );
  }

  const backHref = paper.mode === "archive" ? "/library" : "/create";

  return (
    <div className="min-h-screen bg-[#8d8778] pb-24 print:bg-white print:pb-0">
      <div className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 backdrop-blur-md">
        <div className="container-x flex flex-wrap items-center gap-2 py-3 sm:gap-3">
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-[11px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="ml-auto flex flex-wrap items-center gap-2 sm:gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-[10.5px] text-muted">
              <input
                type="checkbox"
                checked={scheme}
                onChange={(e) => setScheme(e.target.checked)}
                className="accent-[#B93A2B]"
              />
              Mark scheme
            </label>
            {attempt?.result && (
              <label className="flex cursor-pointer items-center gap-2 text-[10.5px] text-muted">
                <input
                  type="checkbox"
                  checked={report}
                  onChange={(e) => setReport(e.target.checked)}
                  className="accent-[#B93A2B]"
                />
                Marked report
              </label>
            )}
            <Button onClick={() => window.print()} size="sm">
              <Printer size={13} /> Print / Save PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[210mm] space-y-6 p-4 sm:p-8 print:space-y-0 print:p-0">
        <CoverPage paper={paper} />
        <div className="bg-white p-[14mm] shadow-2xl print:p-[14mm] print:shadow-none">
          <PaperSheet paper={paper} className="!max-w-none !border-0 !bg-white !shadow-none" />
        </div>
        {scheme && (
          <div
            className="bg-white p-[14mm] shadow-2xl print:p-[14mm] print:shadow-none"
            style={{ breakBefore: "page" }}
          >
            <div className="mb-5 border-b-2 border-ink pb-3">
              <p className="mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Papertrail · mark scheme
              </p>
              <h2 className="mt-2 font-display text-[28px] leading-tight">
                Mark scheme — {paper.title}
              </h2>
              <p className="mt-1 text-[10px] text-muted">{paper.subtitle}</p>
            </div>
            <MarkScheme paper={paper} />
          </div>
        )}
        {report && attempt?.result && (
          <ReportPage paper={paper} attempt={attempt} />
        )}
      </div>
    </div>
  );
}

function CoverPage({ paper }: { paper: Paper }) {
  return (
    <div
      className="relative bg-white p-[16mm] text-ink shadow-2xl print:shadow-none"
      style={{ minHeight: "297mm", breakAfter: "page" }}
    >
      <div className="flex items-start justify-between border-b-2 border-ink pb-4">
        <div className="flex items-center gap-2.5">
          <svg width="22" height="26" viewBox="0 0 24 28" fill="none" aria-hidden>
            <path d="M2 1.5h13.5L22 8v18.5H2V1.5Z" stroke="#17150F" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M15.5 1.5V8H22" stroke="#17150F" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M6.5 16.5l3.5 3.5 7-8" stroke="#B93A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-[24px] leading-none tracking-[-0.03em]">
            Papertrail
          </span>
        </div>
        <div className="text-right">
          <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">
            Study paper
          </p>
          <p className="mono mt-1 text-[11px]">
            {paper.meta?.paperCode ?? "Custom"} · {paper.meta?.series ?? "On demand"}
          </p>
        </div>
      </div>

      <div className="mt-[22mm]">
        <p className="mono text-[10px] uppercase tracking-[0.2em] text-accent">
          {paper.board} · {paper.level}
        </p>
        <h1 className="display mt-5 text-[clamp(38px,6vw,64px)] leading-[0.98]">
          {paper.subjectName}
        </h1>
        <p className="serif-italic mt-3 text-[clamp(22px,3vw,32px)] text-ink-2">
          {paper.mode === "topical"
            ? "Topical paper"
            : paper.title.includes(" — ")
              ? paper.title.split(" — ")[1]
              : paper.subtitle}
        </p>
      </div>

      <div className="mt-[16mm] grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {[
          ["Marks", String(paper.totalMarks)],
          ["Time", `${paper.durationMin} min`],
          ["Questions", String(paper.sections.reduce((n, s) => n + s.questions.length, 0))],
          ["Chapters", String(paper.topics.length)],
        ].map(([k, v]) => (
          <div key={k} className="bg-white p-3">
            <p className="mono text-[8px] uppercase tracking-[0.14em] text-muted">{k}</p>
            <p className="mt-1 font-display text-[22px] leading-none">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-[12mm] grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mono text-[8px] uppercase tracking-[0.14em] text-muted">Candidate name</p>
          <div className="mt-6 border-b border-ink/60" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="mono text-[8px] uppercase tracking-[0.14em] text-muted">Centre number</p>
            <div className="mt-6 border-b border-ink/60" />
          </div>
          <div>
            <p className="mono text-[8px] uppercase tracking-[0.14em] text-muted">Date</p>
            <div className="mt-6 border-b border-ink/60" />
          </div>
        </div>
      </div>

      <div className="mt-[14mm] border border-ink p-4">
        <p className="mono text-[8.5px] uppercase tracking-[0.18em] text-muted">
          Instructions
        </p>
        <ul className="mt-2.5 space-y-1.5 text-[10px] leading-relaxed">
          {paper.instructions.map((instruction) => (
            <li key={instruction} className="flex gap-2">
              <span className="text-line-strong">·</span>
              <span>{instruction}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[14mm] flex items-end justify-between gap-6 border-t border-line pt-4">
        <p className="max-w-md text-[8.5px] leading-relaxed text-muted">
          {paper.mode === "archive"
            ? "Study reconstruction assembled from the syllabus blueprint and series pattern. Not the official paper. Official past papers remain the copyright of their exam board."
            : "Custom paper assembled by Papertrail from indexed past-paper patterns. Not an official exam paper."}
        </p>
        <p className="mono shrink-0 text-[8px] uppercase tracking-[0.14em] text-line-strong">
          Page 1 of cover
        </p>
      </div>
    </div>
  );
}

function ReportPage({ paper, attempt }: { paper: Paper; attempt: Attempt }) {
  const result = attempt.result;
  if (!result) return null;
  return (
    <div
      className="bg-white p-[14mm] text-ink shadow-2xl print:shadow-none"
      style={{ breakBefore: "page" }}
    >
      <div className="border-b-2 border-ink pb-3">
        <p className="mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Papertrail · marked report
        </p>
        <h2 className="mt-2 font-display text-[28px] leading-tight">
          {paper.title}
        </h2>
        <p className="mt-1 text-[10px] text-muted">{paper.subtitle}</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-px border border-line bg-line">
        <div className="bg-white p-4">
          <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">Score</p>
          <p className="mt-1 font-display text-[28px] leading-none">
            {result.score} <span className="text-[14px] text-muted">/ {result.total}</span>
          </p>
        </div>
        <div className="bg-white p-4">
          <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">Percentage</p>
          <p className="mt-1 font-display text-[28px] leading-none">{result.pct}%</p>
        </div>
        <div className="bg-white p-4">
          <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">Indicative grade</p>
          <p className="mt-1 font-display text-[28px] leading-none">{result.grade}</p>
        </div>
      </div>

      <p className="mt-5 text-[10.5px] leading-relaxed text-ink-2">{result.summary}</p>

      <div className="mt-6">
        <h3 className="mono text-[8.5px] uppercase tracking-[0.16em] text-muted">
          Topic breakdown
        </h3>
        <table className="mt-2 w-full border-collapse text-[10px]">
          <thead>
            <tr className="border-b border-ink text-left">
              <th className="py-1.5 font-medium">Topic</th>
              <th className="py-1.5 text-right font-medium">Marks</th>
              <th className="py-1.5 text-right font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {result.topics.map((topic) => (
              <tr key={topic.id} className="border-b border-line">
                <td className="py-1.5">{topic.name}</td>
                <td className="py-1.5 text-right">
                  {topic.awarded}/{topic.possible}
                </td>
                <td className="py-1.5 text-right">{topic.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="mono text-[8.5px] uppercase tracking-[0.16em] text-muted">
          Question breakdown
        </h3>
        <table className="mt-2 w-full border-collapse text-[10px]">
          <thead>
            <tr className="border-b border-ink text-left">
              <th className="py-1.5 font-medium">Q</th>
              <th className="py-1.5 font-medium">Topic</th>
              <th className="py-1.5 text-right font-medium">Marks</th>
            </tr>
          </thead>
          <tbody>
            {result.questions.map((q, i) => {
              const topic = paper.topics.find((t) => t.id === q.topicId);
              return (
                <tr key={q.questionId} className="border-b border-line">
                  <td className="py-1.5">{i + 1}</td>
                  <td className="py-1.5">{topic?.name ?? "—"}</td>
                  <td className="py-1.5 text-right">
                    {q.awarded}/{q.possible}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-8 border-t border-line pt-3 text-[8px] leading-relaxed text-muted">
        Marks are awarded against the scheme for this paper. Extended responses
        are indicative; verify them against the model answer. This report is a
        study aid, not an official statement of results.
      </p>
    </div>
  );
}
