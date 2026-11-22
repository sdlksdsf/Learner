"use client";

import { useMemo } from "react";
import type { AttemptResult, Paper } from "@/lib/types";
import { buildExaminerReport, buildTrend } from "@/lib/engine/examiner";
import type { Trend } from "@/lib/engine/examiner";
import { loadHistory } from "@/lib/storage";
import { cn } from "@/lib/format";

const FAULT_MARK: Record<string, string> = {
  blank: "Blank",
  method: "Method",
  accuracy: "Accuracy",
  precision: "Wording",
  keyword: "Term",
  depth: "Depth",
  unsupported: "Evidence",
  arithmetic: "Arith.",
};

/** The question, not just its label — "(b)" alone tells the student nothing. */
const describe = (prompt: string): string => {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return clean.length > 78 ? `${clean.slice(0, 78).trimEnd()}…` : clean;
};

/**
 * The examiner's written note on a finished paper: what held up, what cost
 * marks and why, the one habit to fix first, and where the student is against
 * their own history. Every line is derived from the marking data.
 */
export function ExaminerNote({
  paper,
  result,
}: {
  paper: Paper;
  result: AttemptResult;
}) {
  const report = useMemo(() => {
    const parts = new Map(
      paper.sections.flatMap((s) => s.questions.flatMap((q) => q.parts)).map((p) => [p.id, p])
    );
    return buildExaminerReport(paper, result, parts);
  }, [paper, result]);

  const trend: Trend | null = useMemo(() => {
    if (typeof window === "undefined") return null;
    return buildTrend(
      { pct: result.pct, paperId: paper.id },
      loadHistory().map((h) => ({
        pct: h.pct,
        subjectId: h.subjectId,
        paperId: h.paperId,
        at: h.at,
      }))
    );
  }, [paper.id, result.pct]);

  const counted = report.faults.slice(0, 6);

  return (
    <section className="border-t border-line pt-5">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-[24px]">Examiner&rsquo;s note</h2>
        <span className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
          {report.gradeBand}
        </span>
      </div>

      <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-ink">{report.headline}</p>

      {trend && (
        <div
          className={cn(
            "mt-4 border-l-2 pl-3",
            trend.direction === "up"
              ? "border-green"
              : trend.direction === "down"
                ? "border-accent"
                : "border-line"
          )}
        >
          <p className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
            Against your history — {trend.label}
          </p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{trend.detail}</p>
        </div>
      )}

      <div className="mt-5 grid gap-px bg-line sm:grid-cols-2">
        <div className="bg-paper-2 p-4">
          <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
            What held up
          </p>
          <ul className="mt-2 space-y-1.5">
            {report.strengths.map((line) => (
              <li key={line} className="flex gap-2 text-[11px] leading-relaxed text-muted">
                <span aria-hidden className="mt-[6px] block h-[3px] w-[3px] shrink-0 bg-green" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-paper-2 p-4">
          <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
            What cost marks
          </p>
          {counted.length ? (
            <ul className="mt-2 space-y-1.5">
              {counted.map((f) => (
                <li key={f.part.id} className="flex gap-2 text-[11px] leading-relaxed text-muted">
                  <span className="mono mt-[1px] shrink-0 whitespace-nowrap border border-line px-1 text-[8px] uppercase tracking-[0.06em] text-ink">
                    {FAULT_MARK[f.kind]}
                  </span>
                  <span>
                    <span className="text-ink">
                      {f.result.possible - f.result.awarded} mark
                      {f.result.possible - f.result.awarded === 1 ? "" : "s"}
                    </span>{" "}
                    on &ldquo;{describe(f.part.prompt)}&rdquo;
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-[11px] leading-relaxed text-muted">
              Every scheme point was evidenced. Nothing to correct on this paper.
            </p>
          )}
        </div>
      </div>

      {report.priority && (
        <div className="mt-4 border border-line bg-paper-2 p-4">
          <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
            Fix this first — {report.priority.marks} mark
            {report.priority.marks === 1 ? "" : "s"}
          </p>
          <p className="mt-1 font-display text-[17px] leading-snug">{report.priority.title}</p>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            {report.priority.advice}
          </p>
        </div>
      )}

      {report.nextSteps.length > 0 && (
        <div className="mt-6">
          <p className="mono text-[9px] uppercase tracking-[0.14em] text-faint">
            Before the next paper
          </p>
          <ol className="mt-2 space-y-2">
            {report.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-[11.5px] leading-relaxed text-muted">
                <span className="mono shrink-0 text-[9px] leading-[1.9] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
