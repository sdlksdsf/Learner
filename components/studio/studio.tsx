"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  Play,
  Printer,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type {
  Board,
  Level,
  Mode,
  Paper,
  PaperConfig,
  Topic,
} from "@/lib/types";
import {
  getSubject,
  specsForLevel,
  subjects,
  topicsForLevel,
} from "@/lib/data/subjects";
import { allQuestions, bankMarks, questionsFor } from "@/lib/data";
import { analyse } from "@/lib/engine/analysis";
import { generatePaper } from "@/lib/engine/generate";
import { savePaper, toggleSaved, isSaved } from "@/lib/storage";
import { PaperSheet } from "@/components/paper/paper-sheet";
import { MarkScheme } from "@/components/paper/mark-scheme";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn, clamp, formatDuration } from "@/lib/format";

const stepLabels = ["Set the paper", "Read the pattern", "Your paper"];

function Steps({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-2.5">
          <span
            className={cn(
              "mono text-[10px] transition-colors",
              i === step ? "text-accent" : i < step ? "text-ink" : "text-faint"
            )}
          >
            0{i + 1}
          </span>
          <span
            className={cn(
              "hidden text-[11px] transition-colors sm:inline",
              i === step ? "font-medium text-ink" : "text-muted"
            )}
          >
            {label}
          </span>
          {i < stepLabels.length - 1 && (
            <span className="h-px w-5 bg-line sm:w-8" />
          )}
        </div>
      ))}
    </div>
  );
}

function FormBlock({
  index,
  title,
  hint,
  children,
}: {
  index: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="mono text-[10px] text-accent">{index}</span>
          <h2 className="font-display text-[21px] tracking-[-0.02em]">{title}</h2>
        </div>
        {hint && <p className="text-right text-[10.5px] text-muted">{hint}</p>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Trend({ trend }: { trend: Topic["trend"] }) {
  const label = trend === "up" ? "Rising" : trend === "down" ? "Falling" : "Steady";
  return (
    <span
      className={cn(
        "mono text-[9px] uppercase tracking-[0.1em]",
        trend === "up" ? "text-green" : trend === "down" ? "text-accent" : "text-muted"
      )}
    >
      {label}
    </span>
  );
}

export function Studio({ initial }: { initial: { subject?: string; level?: string; mode?: string; topic?: string } }) {
  const router = useRouter();
  const initialSubject = getSubject(initial.subject ?? "maths") ?? subjects[0];
  const initialLevel: Level =
    initial.level && initialSubject.levels.includes(initial.level as Level)
      ? (initial.level as Level)
      : initialSubject.levels.includes("A Level")
        ? "A Level"
        : initialSubject.levels[0];
  const initialMode: Mode = initial.mode === "topical" ? "topical" : "full";
  const initialTopics = topicsForLevel(initialSubject, initialLevel);
  const initialTopic = initial.topic
    ? initialTopics.find((t) => t.id === initial.topic)
    : undefined;

  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<PaperConfig>({
    subjectId: initialSubject.id,
    level: initialLevel,
    board: initialSubject.boards[0] ?? "CAIE",
    mode: initialMode,
    topicIds: initialTopic ? [initialTopic.id] : [],
    targetMarks: initialMode === "topical" ? 30 : 60,
    difficulty: "mixed",
    specId: specsForLevel(initialSubject, initialLevel)[0]?.id,
  });
  const [paper, setPaper] = useState<Paper | null>(null);
  const [showScheme, setShowScheme] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const subject = getSubject(config.subjectId) ?? subjects[0];
  const topics = topicsForLevel(subject, config.level);
  const specs = specsForLevel(subject, config.level);
  const spec = specs.find((s) => s.id === config.specId) ?? specs[0];
  const bank = questionsFor(subject.id, config.level);
  const fullBankMarks = bank.reduce((sum, q) => sum + q.parts.reduce((s, p) => s + p.marks, 0), 0);

  const selectedTopics = topics.filter((t) => config.topicIds.includes(t.id));
  const selectedMarks = selectedTopics.reduce(
    (sum, t) => sum + bankMarks(subject.id, config.level, t.id),
    0
  );
  const maxMarks =
    config.mode === "topical"
      ? Math.max(10, selectedMarks)
      : Math.max(10, Math.min(spec?.marks ?? 60, fullBankMarks));
  const target = clamp(config.targetMarks, 10, maxMarks);
  const estimatedMinutes =
    config.mode === "topical"
      ? Math.max(20, Math.round(target * 1.5))
      : spec?.minutes ?? 90;

  const analysis = useMemo(
    () => analyse(subject.id, config.level, config.mode, config.topicIds),
    [subject.id, config.level, config.mode, config.topicIds]
  );

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };

  const update = (patch: Partial<PaperConfig>) =>
    setConfig((c) => ({ ...c, ...patch }));

  const selectSubject = (id: string) => {
    const nextSubject = getSubject(id);
    if (!nextSubject) return;
    const nextLevel: Level = nextSubject.levels.includes("A Level")
      ? "A Level"
      : nextSubject.levels[0];
    const nextTopics = topicsForLevel(nextSubject, nextLevel);
    const nextIds = [...nextTopics]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 2)
      .map((t) => t.id);
    setConfig((c) => ({
      ...c,
      subjectId: id,
      level: nextLevel,
      board: nextSubject.boards[0] ?? "CAIE",
      specId: specsForLevel(nextSubject, nextLevel)[0]?.id,
      topicIds: c.mode === "topical" ? nextIds : [],
    }));
  };

  const selectLevel = (level: Level) => {
    const nextTopics = topicsForLevel(subject, level);
    const nextIds = [...nextTopics]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 2)
      .map((t) => t.id);
    setConfig((c) => ({
      ...c,
      level,
      specId: specsForLevel(subject, level)[0]?.id,
      topicIds: c.mode === "topical" ? nextIds : [],
    }));
  };

  const selectMode = (mode: Mode) => {
    if (mode === "topical") {
      const nextIds =
        config.topicIds.length > 0
          ? config.topicIds
          : [...topics]
              .sort((a, b) => b.frequency - a.frequency)
              .slice(0, 2)
              .map((t) => t.id);
      setConfig((c) => ({ ...c, mode, topicIds: nextIds, targetMarks: 30 }));
    } else {
      setConfig((c) => ({ ...c, mode, targetMarks: spec?.marks ?? 60 }));
    }
  };

  const toggleTopic = (id: string) => {
    setConfig((c) => ({
      ...c,
      topicIds: c.topicIds.includes(id)
        ? c.topicIds.filter((t) => t !== id)
        : [...c.topicIds, id],
    }));
  };

  const buildPaper = () => {
    const next = generatePaper(
      { ...config, targetMarks: target, specId: spec?.id },
      { seed: Math.floor(Math.random() * 1e9) }
    );
    setPaper(next);
    savePaper(next);
    setSaved(isSaved(next.id));
  };

  const goGenerate = () => {
    buildPaper();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const regenerate = () => {
    buildPaper();
    notify("A new paper has been built from the same pattern.");
  };

  const practice = () => {
    if (!paper) return;
    savePaper(paper);
    router.push(`/practice/${paper.id}`);
  };

  const print = () => {
    if (!paper) return;
    savePaper(paper);
    router.push(`/print/${paper.id}`);
  };

  const save = () => {
    if (!paper) return;
    const nowSaved = toggleSaved(paper.id);
    setSaved(nowSaved);
    notify(nowSaved ? "Saved to this device." : "Removed from saved papers.");
  };

  const startOver = () => {
    setStep(0);
    setPaper(null);
    setShowScheme(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ------------------------------- Step 1 ------------------------------- */
  if (step === 0) {
    return (
      <div className="container-x py-10 lg:py-14">
        <div className="anim-rise">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Studio</p>
              <h1 className="display mt-4 text-[clamp(40px,5.5vw,64px)]">
                Build a paper.
              </h1>
              <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-muted">
                Set the exam, choose the chapters, and the engine reads the
                pattern before it picks a single question.
              </p>
            </div>
            <Steps step={0} />
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:gap-14">
          <div>
            <FormBlock index="01" title="The exam" hint="Board and level set the paper style">
              <div className="space-y-5">
                <div>
                  <p className="field-label">Board</p>
                  <div className="segmented mt-2 flex-wrap">
                    {subject.boards.map((b) => (
                      <button
                        key={b}
                        data-active={config.board === b}
                        onClick={() => update({ board: b as Board })}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="field-label">Level</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {subject.levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => selectLevel(level)}
                        className={cn(
                          "border px-3 py-1.5 text-[11px] font-medium transition-colors",
                          config.level === level
                            ? "border-ink bg-ink text-paper-2"
                            : "border-line text-muted hover:border-line-strong hover:text-ink"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FormBlock>

            <div className="mt-8">
              <FormBlock index="02" title="Subject" hint={`${subjects.length} indexed`}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {subjects.map((s) => {
                    const active = config.subjectId === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => selectSubject(s.id)}
                        className={cn(
                          "border p-3 text-left transition-all duration-200",
                          active
                            ? "border-ink bg-ink text-paper-2"
                            : "border-line hover:border-line-strong hover:bg-paper-2"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: s.accent }}
                          />
                          <span className="font-display text-[16px] leading-tight">
                            {s.name}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-1.5 text-[9.5px] leading-snug",
                            active ? "text-paper-3/60" : "text-muted"
                          )}
                        >
                          {s.levels.join(" · ")}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </FormBlock>
            </div>

            <div className="mt-8">
              <FormBlock index="03" title="Paper type">
                <div className="grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "topical" as Mode,
                        title: "Topical",
                        body: "Pick the chapters. A focused drill, 10–40 marks.",
                        tag: "Chapters",
                      },
                      {
                        id: "full" as Mode,
                        title: "Full paper",
                        body: "The whole syllabus, structured like the real thing.",
                        tag: "60–80 marks",
                      },
                    ]
                  ).map((mode) => {
                    const active = config.mode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => selectMode(mode.id)}
                        className={cn(
                          "border p-4 text-left transition-all duration-200",
                          active
                            ? "border-ink bg-paper-2 shadow-soft"
                            : "border-line hover:border-line-strong hover:bg-paper-2/60"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-[19px]">{mode.title}</span>
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                        </div>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                          {mode.body}
                        </p>
                        <span className="tag mt-3">{mode.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </FormBlock>
            </div>

            {config.mode === "topical" ? (
              <div className="mt-8">
                <FormBlock
                  index="04"
                  title="Chapters"
                  hint={
                    selectedMarks > 0
                      ? `${selectedMarks} marks available`
                      : "Select at least one"
                  }
                >
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic) => {
                      const active = config.topicIds.includes(topic.id);
                      const marks = bankMarks(subject.id, config.level, topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={cn(
                            "border px-3 py-2 text-left transition-all duration-200",
                            active
                              ? "border-ink bg-ink text-paper-2"
                              : "border-line hover:border-line-strong hover:bg-paper-2"
                          )}
                        >
                          <span className="text-[11px] font-medium">{topic.name}</span>
                          <span
                            className={cn(
                              "mono ml-1.5 text-[9px]",
                              active ? "text-paper-3/60" : "text-faint"
                            )}
                          >
                            {marks}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10px] text-muted">
                    <span>{selectedTopics.length} chapter{selectedTopics.length === 1 ? "" : "s"} selected</span>
                    <span>{selectedMarks} marks in bank</span>
                  </div>
                </FormBlock>
              </div>
            ) : (
              <div className="mt-8">
                <FormBlock
                  index="04"
                  title="Structure"
                  hint={`${fullBankMarks} marks indexed`}
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    {specs.map((s) => {
                      const active = spec?.id === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() =>
                            update({ specId: s.id, targetMarks: Math.min(s.marks, maxMarks) })
                          }
                          className={cn(
                            "border p-4 text-left transition-all",
                            active
                              ? "border-ink bg-paper-2"
                              : "border-line hover:border-line-strong"
                          )}
                        >
                          <p className="font-display text-[17px]">{s.label}</p>
                          <p className="mono mt-1 text-[10px] text-muted">
                            {s.marks} marks · {s.minutes} min
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  {fullBankMarks < (spec?.marks ?? 60) && (
                    <p className="mt-3 text-[10.5px] text-amber">
                      The indexed bank carries {fullBankMarks} marks for this level, so the paper
                      will cap there.
                    </p>
                  )}
                </FormBlock>
              </div>
            )}

            <div className="mt-8">
              <FormBlock
                index="05"
                title="Length"
                hint={config.mode === "topical" ? "Drag to set the marks" : "Fixed by structure"}
              >
                {config.mode === "topical" ? (
                  <div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="font-display text-[44px] leading-none">{target}</span>
                        <span className="ml-1 text-[11px] text-muted">marks</span>
                      </div>
                      <p className="mono text-[11px] text-muted">
                        {estimatedMinutes} min
                      </p>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={Math.max(10, maxMarks)}
                      step={5}
                      value={target}
                      onChange={(e) => update({ targetMarks: Number(e.target.value) })}
                      className="mt-4 w-full"
                      style={{ accentColor: "#B93A2B" }}
                      aria-label="Target marks"
                    />
                    <div className="mt-1 flex justify-between text-[9px] text-faint">
                      <span>10 marks</span>
                      <span>{maxMarks} marks available</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-display text-[44px] leading-none">{target}</span>
                      <span className="ml-1 text-[11px] text-muted">marks</span>
                    </div>
                    <p className="mono text-[11px] text-muted">{estimatedMinutes} min</p>
                  </div>
                )}
              </FormBlock>
            </div>

            <div className="mt-8">
              <FormBlock index="06" title="Difficulty">
                <div className="segmented flex-wrap">
                  {(
                    [
                      { id: "mixed", label: "Mixed" },
                      { id: "core", label: "Core" },
                      { id: "challenge", label: "Challenge" },
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.id}
                      data-active={config.difficulty === d.id}
                      onClick={() => update({ difficulty: d.id })}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </FormBlock>
            </div>

            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10.5px] text-muted">
                {bank.length} questions indexed for {subject.name} {config.level}
              </p>
              <Button
                onClick={() => {
                  if (config.mode === "topical" && config.topicIds.length === 0) {
                    notify("Choose at least one chapter first.");
                    return;
                  }
                  setStep(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                size="lg"
              >
                Read the pattern <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="sheet p-5">
              <p className="mono text-[9px] uppercase tracking-[0.16em] text-faint">
                Paper spec
              </p>
              <dl className="mt-4 space-y-2.5">
                {[
                  ["Subject", subject.name],
                  ["Level", config.level],
                  ["Board", config.board],
                  ["Type", config.mode === "topical" ? "Topical" : spec?.label ?? "Full"],
                  [
                    "Chapters",
                    config.mode === "topical"
                      ? selectedTopics.length
                        ? `${selectedTopics.length} selected`
                        : "None yet"
                      : "All in scope",
                  ],
                  ["Marks", `${target}`],
                  ["Time", `${estimatedMinutes} min`],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2 last:border-b-0"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.1em] text-muted">{k}</dt>
                    <dd className="text-right text-[11px] font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 border-t border-line pt-4">
                <p className="mono text-[9px] uppercase tracking-[0.14em] text-faint">
                  What happens next
                </p>
                <ol className="mt-3 space-y-2 text-[10.5px] leading-relaxed text-muted">
                  <li className="flex gap-2"><span className="mono text-accent">01</span> Frequency and recurrence are read across the indexed series.</li>
                  <li className="flex gap-2"><span className="mono text-accent">02</span> A blueprint is drawn: marks per chapter, command mix, difficulty.</li>
                  <li className="flex gap-2"><span className="mono text-accent">03</span> Questions are assembled to the blueprint and marked against the scheme.</li>
                </ol>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 px-1">
              <Sparkles size={13} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-[10px] leading-relaxed text-muted">
                The engine works from indexed past-paper data. Official papers
                remain the property of their boards.
              </p>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  /* ------------------------------- Step 2 ------------------------------- */
  if (step === 1) {
    const totalBank = selectedTopics.reduce(
      (sum, t) => sum + bankMarks(subject.id, config.level, t.id),
      0
    );
    const top = analysis.topics[0];
    return (
      <div className="container-x py-10 lg:py-14">
        <div className="anim-rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Pattern analysis</p>
            <h1 className="display mt-4 text-[clamp(34px,4.5vw,54px)]">
              What the series keeps asking.
            </h1>
            <p className="mt-3 max-w-xl text-[12.5px] leading-relaxed text-muted">
              {subject.name} {config.level} · {config.mode === "topical" ? `${selectedTopics.length} chapter${selectedTopics.length === 1 ? "" : "s"}` : "full syllabus"} · {config.board}
            </p>
          </div>
          <Steps step={1} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border border-line bg-paper-2 px-4 py-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[11px]">Reading {analysis.seriesAnalyzed} series</span>
          </span>
          <span className="text-[11px] text-muted">
            {analysis.questionsAnalyzed} questions in scope
          </span>
          <span className="mono ml-auto text-[10px] uppercase tracking-[0.12em] text-green">
            Pattern locked
          </span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div>
            <div className="grid grid-cols-3 gap-px border border-line bg-line">
              {[
                [String(analysis.seriesAnalyzed), "series read"],
                [String(analysis.questionsAnalyzed), "questions indexed"],
                [`${top?.prediction ?? 0}%`, "top pattern score"],
              ].map(([value, label]) => (
                <div key={label} className="bg-paper-2 p-4">
                  <p className="font-display text-[32px] leading-none">{value}</p>
                  <p className="mono mt-1.5 text-[8.5px] uppercase tracking-[0.12em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex items-end justify-between">
                <h2 className="font-display text-[26px] tracking-[-0.02em]">
                  Topic frequency
                </h2>
                <span className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  indexed series
                </span>
              </div>
              <div className="mt-4 border-t border-line">
                {analysis.topics.map((topic, i) => (
                  <Reveal
                    key={topic.id}
                    delay={i * 45}
                    className="grid grid-cols-[24px_minmax(0,1fr)_76px_62px] items-center gap-3 border-b border-line py-3"
                  >
                    <span className="mono text-[10px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-[11.5px] font-medium">{topic.name}</p>
                        <p className="mono shrink-0 text-[9px] text-muted">{topic.frequency}/10</p>
                      </div>
                      <div className="mt-1.5 h-[4px] w-full overflow-hidden bg-paper-3">
                        <div
                          className={cn(
                            "anim-bar h-full",
                            i === 0 ? "bg-accent" : "bg-ink/70"
                          )}
                          style={{
                            width: `${topic.prediction}%`,
                            ["--delay" as string]: `${120 + i * 50}ms`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="mono text-[10.5px]">{topic.prediction}%</p>
                      <p className="text-[8.5px] text-muted">{topic.lastSeen}</p>
                    </div>
                    <Trend trend={topic.trend} />
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-[20px]">Command words</h3>
                <div className="mt-3 space-y-2.5">
                  {analysis.commands.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px]">{c.name}</span>
                        <span className="mono text-[9px] text-muted">{c.pct}%</span>
                      </div>
                      <div className="mt-1 h-[3px] w-full bg-paper-3">
                        <div
                          className="anim-bar h-full bg-ink/60"
                          style={{ width: `${c.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-display text-[20px]">What the marks reward</h3>
                <div className="mt-3 space-y-3 text-[11px] leading-relaxed text-muted">
                  <p>
                    The average question is worth{" "}
                    <span className="font-medium text-ink">{analysis.avgMarks} marks</span>.
                    {analysis.longShare}% of the bank is a 6-mark question or longer,
                    so the back section decides the grade.
                  </p>
                  {analysis.notes.slice(1, 3).map((note) => (
                    <p key={note} className="border-l-2 border-line pl-2.5">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 text-[11px] text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft size={14} /> Adjust the paper
              </button>
              <Button onClick={goGenerate} size="lg">
                Generate paper <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="sheet p-5">
              <p className="mono text-[9px] uppercase tracking-[0.16em] text-faint">
                Blueprint
              </p>
              <h3 className="mt-2 font-display text-[23px] leading-tight">
                {config.mode === "topical" ? "Topical paper" : spec?.label}
              </h3>
              <div className="mt-4 space-y-2.5">
                {(config.mode === "topical" ? selectedTopics : topics).map((t) => {
                  const tMarks = bankMarks(subject.id, config.level, t.id);
                  const share = totalBank > 0 ? Math.round((tMarks / totalBank) * target) : 0;
                  return (
                    <div
                      key={t.id}
                      className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2 last:border-b-0"
                    >
                      <span className="text-[10.5px] text-ink-2">{t.name}</span>
                      <span className="mono text-[9.5px] text-muted">
                        {config.mode === "topical" ? `${share} marks` : `${tMarks}m bank`}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-ink pt-3">
                <span className="mono text-[9px] uppercase tracking-[0.12em] text-muted">
                  Target
                </span>
                <span className="font-display text-[24px] leading-none">{target} marks</span>
              </div>
              <p className="mt-1 text-right text-[10px] text-muted">
                {estimatedMinutes} minutes · {config.difficulty}
              </p>
              <Button onClick={goGenerate} className="mt-5 w-full" size="lg">
                Generate paper <ArrowRight size={16} />
              </Button>
            </div>
            <p className="mt-4 px-1 text-[10px] leading-relaxed text-muted">
              The blueprint is a guide, not a quota. The engine keeps the
              paper balanced and never repeats a question.
            </p>
          </aside>
        </div>
      </div>
    );
  }

  /* ------------------------------- Step 3 ------------------------------- */
  if (!paper) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-display text-3xl">No paper yet.</p>
        <div className="mt-6">
          <Button onClick={startOver}>Start again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-8 lg:py-12">
      <div className="anim-rise flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Paper ready</p>
          <h1 className="display mt-3 text-[clamp(30px,4vw,46px)]">{paper.title}</h1>
          <p className="mt-2 text-[11.5px] text-muted">{paper.subtitle}</p>
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
          <Button onClick={regenerate} variant="ghost" size="sm">
            <RotateCcw size={13} /> Rebuild
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-12">
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
              Why these questions
            </p>
            <div className="mt-4 space-y-3">
              {paper.analysis?.topics.slice(0, 4).map((t, i) => (
                <div key={t.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10.5px]">{t.name}</span>
                    <span className="mono text-[9px] text-muted">{t.prediction}%</span>
                  </div>
                  <div className="mt-1 h-[3px] w-full bg-paper-3">
                    <div
                      className={cn("h-full", i === 0 ? "bg-accent" : "bg-ink/60")}
                      style={{ width: `${t.prediction}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <dl className="space-y-2">
                {[
                  ["Questions", String(paper.sections.reduce((n, s) => n + s.questions.length, 0))],
                  ["Marks", String(paper.totalMarks)],
                  ["Time", `${paper.durationMin} min`],
                  ["Chapters", String(paper.topics.length)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[10.5px]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="mono">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Button onClick={practice} className="mt-5 w-full">
              <Play size={13} /> Sit this paper
            </Button>
          </div>
          <p className="mt-4 px-1 text-[10px] leading-relaxed text-muted">
            Built from the pattern, not a fixed template. Rebuild to draw a
            different paper from the same blueprint.
          </p>
        </aside>
      </div>

      {toast && (
        <div className="anim-rise fixed bottom-6 right-6 z-50 border border-line bg-ink px-4 py-3 text-[12px] text-paper-2 shadow-sheet">
          {toast}
        </div>
      )}
    </div>
  );
}
