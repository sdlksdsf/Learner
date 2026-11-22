"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Check,
  ChevronDown,
  Clock,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  X,
} from "lucide-react";
import type {
  Attempt,
  AttemptResult,
  Paper,
  PaperQuestion,
} from "@/lib/types";
import { buildArchivePaper } from "@/lib/engine/generate";
import { getArchiveEntry } from "@/lib/data/archive";
import {
  getAttempt,
  getPaper,
  isSaved,
  recordHistory,
  saveAttempt,
  savePaper,
  toggleSaved,
  updateSavedScore,
} from "@/lib/storage";
import { ExaminerNote } from "@/components/practice/examiner-report";
import { markAttempt } from "@/lib/engine/marker";
import { Button } from "@/components/ui/button";
import { cn, clamp, formatClock, formatDuration, topicName } from "@/lib/format";

/* ------------------------------ Small pieces ----------------------------- */

function AnswerArea({
  id,
  value,
  onChange,
  lines,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  lines: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const h = Math.max(lines * 32, el.scrollHeight);
    el.style.height = `${Math.ceil(h / 32) * 32}px`;
  }, [value, lines]);

  return (
    <textarea
      ref={ref}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={lines}
      placeholder="Write your answer here…"
      className="answer-lines block w-full resize-none border-0 bg-transparent p-0 text-[12.5px] leading-[32px] text-ink outline-none placeholder:text-muted/50 focus:ring-0"
      spellCheck
    />
  );
}

function ScoreRing({ pct, size = 128 }: { pct: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.2,0.7,0.2,1)" }}
      />
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-ink)"
        style={{ fontFamily: "var(--font-display)", fontSize: size * 0.24, letterSpacing: "-0.03em" }}
      >
        {pct}%
      </text>
      <text
        x="50%"
        y="64%"
        textAnchor="middle"
        fill="var(--color-muted)"
        style={{ fontFamily: "var(--font-mono)", fontSize: size * 0.075, letterSpacing: "0.12em" }}
      >
        MARK
      </text>
    </svg>
  );
}

function PointIcon({ awarded, possible }: { awarded: number; possible: number }) {
  if (awarded >= possible) {
    return <Check size={13} className="mt-0.5 shrink-0 text-green" strokeWidth={2.4} />;
  }
  if (awarded > 0) {
    return (
      <span className="mt-0.5 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full border border-amber text-[8px] font-bold text-amber">
        ·
      </span>
    );
  }
  return <X size={13} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.4} />;
}

/* ------------------------------- Main view ------------------------------- */

export function Practice({ paperId }: { paperId: string }) {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [notFound, setNotFound] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const elapsedRef = useRef(elapsed);
  elapsedRef.current = elapsed;
  const startRef = useRef(startedAt);
  startRef.current = startedAt;
  const submittedRef = useRef(submitted);
  submittedRef.current = submitted;
  const adjustmentsRef = useRef(adjustments);
  adjustmentsRef.current = adjustments;

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
    const attempt = getAttempt(loaded.id);
    if (attempt) {
      setAnswers(attempt.answers ?? {});
      setElapsed(attempt.elapsedSec ?? 0);
      setStartedAt(attempt.startedAt ?? Date.now());
      if (attempt.submitted && attempt.result) {
        setSubmitted(true);
        setResult(attempt.result);
        setAdjustments(attempt.adjustments ?? {});
      }
    } else {
      setStartedAt(Date.now());
    }
    setSaved(isSaved(loaded.id));
  }, [paperId]);

  useEffect(() => {
    if (!paper || submitted || notFound) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [paper, submitted, notFound]);

  useEffect(() => {
    if (!paper || submitted || notFound) return;
    const t = window.setTimeout(() => {
      if (submittedRef.current) return;
      saveAttempt({
        paperId: paper.id,
        answers,
        startedAt,
        elapsedSec: elapsedRef.current,
        submitted: false,
      });
    }, 800);
    return () => window.clearTimeout(t);
  }, [answers, paper, submitted, notFound, startedAt]);

  useEffect(() => {
    return () => {
      if (paper && !submittedRef.current) {
        saveAttempt({
          paperId: paper.id,
          answers: answersRef.current,
          startedAt: startRef.current,
          elapsedSec: elapsedRef.current,
          submitted: false,
        });
      }
    };
  }, [paper]);

  const allQuestions = useMemo(
    () => (paper ? paper.sections.flatMap((s) => s.questions) : []),
    [paper]
  );
  const allParts = useMemo(() => allQuestions.flatMap((q) => q.parts), [allQuestions]);
  const partById = useMemo(
    () => new Map(allParts.map((p) => [p.id, p])),
    [allParts]
  );
  const answeredParts = allParts.filter((p) => (answers[p.id] ?? "").trim().length > 0).length;
  const progress = allParts.length ? Math.round((answeredParts / allParts.length) * 100) : 0;
  const timeLeft = paper ? Math.max(0, paper.durationMin * 60 - elapsed) : 0;

  const finish = (auto = false) => {
    if (!paper || submittedRef.current) return;
    submittedRef.current = true;
    setConfirm(false);
    setMarking(true);
    const r = markAttempt(paper, answersRef.current, adjustmentsRef.current);
    const attempt: Attempt = {
      paperId: paper.id,
      answers: answersRef.current,
      startedAt: startRef.current,
      elapsedSec: elapsedRef.current,
      submitted: true,
      result: r,
      adjustments: adjustmentsRef.current,
    };
    saveAttempt(attempt);
    updateSavedScore(paper.id, r.score, r.total);
    recordHistory({
      at: Date.now(),
      paperId: paper.id,
      subjectId: paper.subjectId,
      level: paper.level,
      score: r.score,
      total: r.total,
      pct: r.pct,
      grade: r.grade,
    });
    window.setTimeout(() => {
      setMarking(false);
      setSubmitted(true);
      setResult(r);
      setExpanded(null);
      if (auto) setToast("Time is up — the paper has been marked.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  useEffect(() => {
    if (!paper || submitted || notFound) return;
    if (elapsed >= paper.durationMin * 60) finish(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, paper, submitted, notFound]);

  const requestSubmit = () => {
    if (!paper) return;
    const unanswered = allParts.length - answeredParts;
    if (unanswered > 0) setConfirm(true);
    else finish();
  };

  const restart = () => {
    if (!paper) return;
    setAnswers({});
    setElapsed(0);
    setStartedAt(Date.now());
    setSubmitted(false);
    submittedRef.current = false;
    setResult(null);
    setAdjustments({});
    setConfirm(false);
    setExpanded(null);
    saveAttempt({
      paperId: paper.id,
      answers: {},
      startedAt: Date.now(),
      elapsedSec: 0,
      submitted: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const adjustPart = (partId: string, delta: number) => {
    if (!paper || !result) return;
    const part = partById.get(partId);
    if (!part) return;
    const currentPart = result.questions
      .flatMap((q) => q.parts)
      .find((p) => p.partId === partId);
    const current =
      adjustments[partId] ?? currentPart?.awarded ?? 0;
    const nextValue = clamp(current + delta, 0, part.marks);
    const nextAdj = { ...adjustments, [partId]: nextValue };
    setAdjustments(nextAdj);
    const r = markAttempt(paper, answers, nextAdj);
    setResult(r);
    saveAttempt({
      paperId: paper.id,
      answers,
      startedAt,
      elapsedSec: elapsed,
      submitted: true,
      result: r,
      adjustments: nextAdj,
    });
    updateSavedScore(paper.id, r.score, r.total);
  };

  const saveToggle = () => {
    if (!paper) return;
    setSaved(toggleSaved(paper.id));
  };

  const scrollToQuestion = (id: string) => {
    const el = document.getElementById(`q-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (notFound) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="mono text-[10px] uppercase tracking-[0.16em] text-accent">Paper not found</p>
        <h1 className="display mt-4 text-[40px]">That paper is not on this device.</h1>
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-muted">
          Papers are stored locally. Build a new one, or open it from the
          archive.
        </p>
        <div className="mt-7 flex gap-2">
          <Link href="/create" className="btn btn-primary">Build a paper</Link>
          <Link href="/library" className="btn btn-ghost">Open the archive</Link>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="container-x py-16">
        <div className="mx-auto max-w-[760px]">
          <div className="h-5 w-40 animate-pulse bg-paper-3" />
          <div className="mt-4 h-10 w-3/4 animate-pulse bg-paper-3" />
          <div className="mt-8 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse bg-paper-3" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="container-x flex h-16 items-center gap-3 sm:gap-5">
          <Link
            href={paper.mode === "archive" ? "/library" : "/create"}
            className="flex items-center gap-1.5 text-[11px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Exit</span>
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[15px] leading-tight tracking-[-0.01em]">
              {paper.title}
            </p>
            <p className="mono mt-0.5 truncate text-[8.5px] uppercase tracking-[0.1em] text-muted">
              {paper.level} · {paper.totalMarks} marks · {paper.durationMin} min
            </p>
          </div>

          {!submitted ? (
            <>
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-muted" />
                <span
                  className={cn(
                    "mono text-[13px] tabular",
                    timeLeft < 300 && "text-accent"
                  )}
                >
                  {formatClock(timeLeft)}
                </span>
              </div>
              <span className="mono hidden text-[10px] text-muted sm:inline">
                {answeredParts}/{allParts.length}
              </span>
              <Button onClick={requestSubmit} size="sm">
                Submit
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] uppercase tracking-[0.12em] text-green">
                Marked
              </span>
              <Button onClick={restart} variant="ghost" size="sm">
                <RotateCcw size={13} /> Retry
              </Button>
            </div>
          )}
        </div>
        {!submitted && (
          <div className="h-[2px] w-full bg-line/70">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      {submitted && result ? (
        <ResultsView
          paper={paper}
          result={result}
          adjustments={adjustments}
          expanded={expanded}
          setExpanded={setExpanded}
          onAdjust={adjustPart}
          onRestart={restart}
          saved={saved}
          onSave={saveToggle}
          elapsed={elapsed}
        />
      ) : (
        <div className="container-x grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-12 lg:py-10">
          <div className="min-w-0 pb-24">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  Answer booklet
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Write your answers in the ruled space. Your work saves on this
                  device automatically.
                </p>
              </div>
              <div className="text-right">
                <p className="mono text-[11px]">{answeredParts}/{allParts.length} parts</p>
                <p className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  {progress}% complete
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {paper.sections.map((section) => (
                <div key={section.label}>
                  <div className="flex items-baseline justify-between border-b border-line pb-1.5">
                    <h2 className="font-display text-[15px] italic">{section.label}</h2>
                    <span className="mono text-[9px] text-muted">{section.marks} marks</span>
                  </div>
                  <div className="mt-5 space-y-7">
                    {section.questions.map((q) => (
                      <PracticeQuestion
                        key={q.id}
                        q={q}
                        subjectId={paper.subjectId}
                        answers={answers}
                        setAnswers={setAnswers}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10.5px] text-muted">
                {answeredParts === allParts.length
                  ? "All parts answered."
                  : `${allParts.length - answeredParts} part${allParts.length - answeredParts === 1 ? "" : "s"} still blank.`}
              </p>
              <Button onClick={requestSubmit} size="lg">
                Submit for marking <ArrowRight size={15} />
              </Button>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="sheet p-4">
                <p className="mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
                  Questions
                </p>
                <div className="mt-3 grid grid-cols-5 gap-1.5">
                  {allQuestions.map((q) => {
                    const done = q.parts.every(
                      (p) => (answers[p.id] ?? "").trim().length > 0
                    );
                    const some = q.parts.some(
                      (p) => (answers[p.id] ?? "").trim().length > 0
                    );
                    return (
                      <button
                        key={q.id}
                        onClick={() => scrollToQuestion(q.id)}
                        className={cn(
                          "aspect-square border text-[10px] transition-colors",
                          done
                            ? "border-green bg-green-soft text-green"
                            : some
                              ? "border-amber/50 bg-amber-soft text-amber"
                              : "border-line text-muted hover:border-ink hover:text-ink"
                        )}
                        aria-label={`Go to question ${q.number}`}
                      >
                        {q.number}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-line pt-3">
                  <div className="flex justify-between text-[10px] text-muted">
                    <span>Answered</span>
                    <span className="mono">{progress}%</span>
                  </div>
                  <div className="mt-1.5 h-[3px] w-full bg-paper-3">
                    <div
                      className="h-full bg-green transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[10px] text-muted">
                  <span>Time left</span>
                  <span className="mono tabular">{formatClock(timeLeft)}</span>
                </div>

                <Button onClick={requestSubmit} className="mt-4 w-full" size="sm">
                  Submit paper
                </Button>
                <button
                  onClick={saveToggle}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 py-1.5 text-[10px] text-muted transition-colors hover:text-ink"
                >
                  {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                  {saved ? "Saved" : "Save paper"}
                </button>
              </div>
              <p className="mt-3 px-1 text-[9.5px] leading-relaxed text-muted">
                Marks are awarded against the exact scheme for this paper.
                Extended answers are indicative — check them against the model
                answer.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* mobile bottom bar */}
      {!submitted && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden">
          <div className="container-x flex items-center gap-3 py-2.5">
            <div className="flex-1">
              <div className="flex items-center justify-between text-[9px] text-muted">
                <span>{answeredParts}/{allParts.length} answered</span>
                <span className="mono">{formatClock(timeLeft)}</span>
              </div>
              <div className="mt-1 h-[3px] w-full bg-paper-3">
                <div
                  className="h-full bg-green transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <Button onClick={requestSubmit} size="sm">
              Submit
            </Button>
          </div>
        </div>
      )}

      {confirm && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4 backdrop-blur-sm"
          onClick={() => setConfirm(false)}
        >
          <div
            className="sheet w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-accent">
              Submit paper
            </p>
            <h3 className="mt-3 font-display text-[26px] leading-tight">
              {allParts.length - answeredParts} part{allParts.length - answeredParts === 1 ? "" : "s"} still blank.
            </h3>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">
              You can submit anyway. Blank parts score zero, and the report will
              show them as gaps.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>
                Keep working
              </Button>
              <Button size="sm" onClick={() => finish()}>
                Submit anyway
              </Button>
            </div>
          </div>
        </div>
      )}

      {marking && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-paper/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center border border-accent">
              <Check size={28} className="anim-stamp text-accent" strokeWidth={2.2} />
            </div>
            <p className="mono mt-5 text-[10px] uppercase tracking-[0.18em] text-muted">
              Marking against the scheme
            </p>
            <div className="mx-auto mt-3 h-[2px] w-40 overflow-hidden bg-line">
              <div className="h-full w-1/2 animate-pulse bg-accent" />
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="anim-rise fixed bottom-6 right-6 z-50 border border-line bg-ink px-4 py-3 text-[12px] text-paper shadow-sheet">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Practice question --------------------------- */

function PracticeQuestion({
  q,
  subjectId,
  answers,
  setAnswers,
}: {
  q: PaperQuestion;
  subjectId: string;
  answers: Record<string, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  return (
    <article id={`q-${q.id}`} className="scroll-mt-24">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[24px] leading-none">{q.number}</span>
          <span className="tag">{topicName(subjectId, q.topicId)}</span>
        </div>
        <span className="mono text-[10px] text-muted">[{q.marks}]</span>
      </div>

      {q.context && (
        <p className="mt-3 whitespace-pre-line text-[12px] leading-relaxed text-ink-2">
          {q.context}
        </p>
      )}

      <div className="mt-4 space-y-5">
        {q.parts.map((part) => (
          <div key={part.id} className="border-l-2 border-line pl-4">
            <div className="flex items-start gap-2">
              {part.label && (
                <span className="mono w-7 shrink-0 text-[11px] leading-[1.6]">
                  {part.label}
                </span>
              )}
              <p className="flex-1 whitespace-pre-line text-[12.5px] leading-[1.65] text-ink-2">
                {part.prompt}
              </p>
              <span className="mono shrink-0 text-[10px] text-muted">[{part.marks}]</span>
            </div>
            <div className="mt-2">
              <AnswerArea
                id={`input-${part.id}`}
                value={answers[part.id] ?? ""}
                onChange={(value) =>
                  setAnswers((a) => ({ ...a, [part.id]: value }))
                }
                lines={Math.max(3, part.lines ?? 3)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-end border-t border-dotted border-line pt-2">
        <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
          Total for question {q.number}: [{q.marks}]
        </span>
      </div>
    </article>
  );
}

/* -------------------------------- Results --------------------------------- */

function ResultsView({
  paper,
  result,
  adjustments,
  expanded,
  setExpanded,
  onAdjust,
  onRestart,
  saved,
  onSave,
  elapsed,
}: {
  paper: Paper;
  result: AttemptResult;
  adjustments: Record<string, number>;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  onAdjust: (partId: string, delta: number) => void;
  onRestart: () => void;
  saved: boolean;
  onSave: () => void;
  elapsed: number;
}) {
  const topicById = new Map(paper.topics.map((t) => [t.id, t]));
  const questions = paper.sections.flatMap((s) => s.questions);
  const resultById = new Map(result.questions.map((q) => [q.questionId, q]));

  return (
    <div className="container-x py-10 lg:py-14">
      <div className="anim-rise">
        <p className="eyebrow">Marked paper</p>
        <h1 className="display mt-3 text-[clamp(36px,5vw,58px)]">
          {result.pct >= 70 ? "Strong paper." : result.pct >= 50 ? "Solid ground." : "A map, not a verdict."}
        </h1>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted">
          {result.summary}
        </p>
      </div>

      <div className="anim-rise mt-8 grid gap-px border border-line bg-line md:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center gap-5 bg-paper-2 p-5 sm:p-6">
          <ScoreRing pct={result.pct} size={124} />
          <div>
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Score
            </p>
            <p className="mt-1 font-display text-[34px] leading-none">
              {result.score}
              <span className="text-[18px] text-muted"> / {result.total}</span>
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="border border-ink px-2 py-0.5 font-display text-[16px] leading-none">
                {result.grade}
              </span>
              <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                indicative
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
          {[
            ["Time", formatDuration(elapsed)],
            ["Confidence", result.confidence === "high" ? "High" : result.confidence === "medium" ? "Medium" : "Review"],
            ["Questions", `${result.questions.filter((q) => q.awarded === q.possible).length}/${result.questions.length} full`],
            ["Marks dropped", String(result.total - result.score)],
            [
              "Focus",
              result.focusTopics.length
                ? `${result.focusTopics.length} topic${result.focusTopics.length === 1 ? "" : "s"}`
                : "None",
            ],
            ["Paper", `${paper.totalMarks} marks`],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper-2 p-4">
              <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">{k}</p>
              <p className="mt-1 text-[12px] font-medium">{v}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-3 bg-paper-2 p-5">
          <div>
            <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">
              Actions
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              <Link href={`/print/${paper.id}?report=1`} className="btn btn-ghost btn-sm">
                <Printer size={12} /> Print report
              </Link>
              <button onClick={onSave} className="btn btn-ghost btn-sm">
                {saved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 text-[10px] text-muted transition-colors hover:text-ink"
          >
            <RotateCcw size={11} /> Try again
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
        <div>
          <div className="border-t border-line pt-5">
            <h2 className="font-display text-[24px]">Where the marks went</h2>
            <div className="mt-4 space-y-3">
              {result.topics.map((topic) => (
                <div key={topic.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11.5px]">{topic.name}</span>
                    <span className="mono text-[10px] text-muted">
                      {topic.awarded}/{topic.possible} · {topic.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-[4px] w-full bg-paper-3">
                    <div
                      className={cn(
                        "h-full transition-all duration-700",
                        topic.pct >= 70 ? "bg-green" : topic.pct >= 45 ? "bg-amber" : "bg-accent"
                      )}
                      style={{ width: `${topic.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <ExaminerNote paper={paper} result={result} />
          </div>

          <div className="mt-8 border-t border-line pt-5">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-[24px]">Question report</h2>
              <span className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                Tap to inspect
              </span>
            </div>
            <div className="mt-3 border-t border-line">
              {questions.map((q) => {
                const r = resultById.get(q.id);
                if (!r) return null;
                const isOpen = expanded === q.id;
                const topic = topicById.get(q.topicId);
                return (
                  <div key={q.id} className="border-b border-line">
                    <button
                      onClick={() => setExpanded(isOpen ? null : q.id)}
                      className="flex w-full items-center gap-3 py-3.5 text-left"
                    >
                      <span className="font-display text-[18px] leading-none">{q.number}</span>
                      <span className="min-w-0 flex-1 truncate text-[11px] text-muted">
                        {topic?.name ?? "Question"}
                      </span>
                      <span
                        className={cn(
                          "mono text-[11px]",
                          r.awarded === r.possible
                            ? "text-green"
                            : r.awarded === 0
                              ? "text-accent"
                              : "text-amber"
                        )}
                      >
                        {r.awarded}/{r.possible}
                      </span>
                      <ChevronDown
                        size={14}
                        className={cn("text-muted transition-transform", isOpen && "rotate-180")}
                      />
                    </button>

                    {isOpen && (
                      <div className="anim-fade pb-5">
                        {q.parts.map((part) => {
                          const pr = r.parts.find((p) => p.partId === part.id);
                          if (!pr) return null;
                          const manual = adjustments[part.id] !== undefined;
                          return (
                            <div key={part.id} className="border-l-2 border-line pl-3.5 mb-4">
                              <div className="flex items-start gap-2">
                                <span className="mono text-[9px] text-muted">
                                  {part.label || "Answer"}
                                </span>
                                <p className="flex-1 text-[11px] leading-relaxed text-ink-2">
                                  {part.prompt}
                                </p>
                                <span className="mono shrink-0 text-[10px]">
                                  {pr.awarded}/{pr.possible}
                                </span>
                              </div>

                              <ul className="mt-2 space-y-1.5">
                                {pr.points.map((point, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-[10.5px] leading-relaxed"
                                  >
                                    <PointIcon awarded={point.awarded} possible={point.marks} />
                                    <span
                                      className={cn(
                                        "flex-1",
                                        point.awarded >= point.marks ? "text-ink-2" : "text-muted"
                                      )}
                                    >
                                      {point.text}
                                    </span>
                                    <span className="mono shrink-0 text-[9px] text-muted">
                                      [{point.marks}]
                                    </span>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                                <p className="text-[9.5px] italic leading-relaxed text-muted">
                                  {pr.comment}
                                </p>
                                <div className="flex items-center gap-1">
                                  {manual && (
                                    <span className="mono text-[8px] uppercase tracking-[0.1em] text-amber">
                                      adjusted
                                    </span>
                                  )}
                                  <button
                                    onClick={() => onAdjust(part.id, -1)}
                                    className="grid h-6 w-6 place-items-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                                    aria-label="Decrease mark"
                                  >
                                    <Minus size={10} />
                                  </button>
                                  <span className="mono w-6 text-center text-[10px]">
                                    {pr.awarded}
                                  </span>
                                  <button
                                    onClick={() => onAdjust(part.id, 1)}
                                    className="grid h-6 w-6 place-items-center border border-line text-muted transition-colors hover:border-ink hover:text-ink"
                                    aria-label="Increase mark"
                                  >
                                    <Plus size={10} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
            <Link href={`/create?subject=${paper.subjectId}&level=${encodeURIComponent(paper.level)}&mode=topical`} className="btn btn-primary">
              Build another paper <ArrowRight size={14} />
            </Link>
            <Link href={`/print/${paper.id}?report=1`} className="btn btn-ghost">
              <Printer size={13} /> Print report
            </Link>
            <button onClick={onRestart} className="btn btn-ghost">
              <RotateCcw size={13} /> Retake
            </button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="sheet p-5">
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-faint">
              Focus list
            </p>
            {result.focusTopics.length ? (
              <>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">
                  These chapters lost the most marks. A short drill is the
                  cheapest way to win them back.
                </p>
                <div className="mt-4 space-y-2">
                  {result.focusTopics.map((name) => {
                    const topic = paper.topics.find((t) => t.name === name);
                    return (
                      <Link
                        key={name}
                        href={`/create?subject=${paper.subjectId}&level=${encodeURIComponent(paper.level)}&mode=topical&topic=${topic?.id ?? ""}`}
                        className="group flex items-center justify-between gap-2 border border-line px-3 py-2.5 transition-colors hover:border-ink hover:bg-paper-2"
                      >
                        <span className="text-[10.5px]">{name}</span>
                        <ArrowRight
                          size={12}
                          className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="mt-2 text-[11px] leading-relaxed text-muted">
                No weak chapter under 65%. Rebuild a paper and raise the
                difficulty instead.
              </p>
            )}

            <div className="mt-5 border-t border-line pt-4">
              <p className="mono text-[8.5px] uppercase tracking-[0.12em] text-faint">
                Marking note
              </p>
              <p className="mt-2 text-[9.5px] leading-relaxed text-muted">
                Short and structured answers are matched to the scheme's points.
                Extended responses are indicative — use the model answer and
                adjust the marks if your teacher would award them differently.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
