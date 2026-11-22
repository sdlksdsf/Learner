import type { Paper, PaperQuestion } from "@/lib/types";
import { cn } from "@/lib/format";

function QuestionBlock({ q }: { q: PaperQuestion }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex items-start gap-3">
        <span className="w-5 shrink-0 font-display text-[19px] leading-none">
          {q.number}
        </span>
        <div className="min-w-0 flex-1">
          {q.context && (
            <p className="whitespace-pre-line text-[11.5px] leading-relaxed text-ink-2">
              {q.context}
            </p>
          )}
          <div className="space-y-4">
            {q.parts.map((part) => (
              <div key={part.id}>
                <div className="flex items-start gap-2">
                  {part.label ? (
                    <span className="mono w-7 shrink-0 text-[11px] leading-[1.6]">
                      {part.label}
                    </span>
                  ) : (
                    <span className="hidden w-0 sm:block" />
                  )}
                  <p className="flex-1 whitespace-pre-line text-[11.5px] leading-[1.65] text-ink-2">
                    {part.prompt}
                  </p>
                  <span className="mono shrink-0 text-[10.5px] text-muted">
                    [{part.marks}]
                  </span>
                </div>
                <div
                  className="answer-lines ml-9"
                  style={{ height: `${Math.max(2, part.lines ?? 2) * 32}px` }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end border-t border-dotted border-line pt-1.5">
            <span className="mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
              Total for question {q.number}: [{q.marks}]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaperSheet({
  paper,
  className,
  meta,
}: {
  paper: Paper;
  className?: string;
  meta?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "sheet relative mx-auto w-full max-w-[760px] bg-paper-2 text-ink",
        className
      )}
    >
      <div className="p-5 sm:p-9">
        <header>
          <div className="flex items-start justify-between gap-5 border-b border-ink pb-4">
            <div className="min-w-0">
              <p className="mono text-[8.5px] uppercase tracking-[0.2em] text-muted">
                Papertrail · {paper.board}
              </p>
              <h2 className="mt-2 font-display text-[25px] leading-[1.05] tracking-[-0.02em] sm:text-[32px]">
                {paper.title}
              </h2>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">{paper.subtitle}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
                {paper.level}
              </p>
              <p className="mono mt-1 text-[22px] leading-none">{paper.totalMarks}</p>
              <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">marks</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border border-line bg-paper/50 p-3.5 sm:grid-cols-4">
            {[
              ["Subject", paper.subjectName],
              ["Board", paper.board],
              ["Time", `${paper.durationMin} min`],
              ["Questions", String(paper.sections.reduce((n, s) => n + s.questions.length, 0))],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="mono text-[7.5px] uppercase tracking-[0.12em] text-muted">{k}</p>
                <p className="mt-0.5 text-[10.5px] font-medium">{v}</p>
              </div>
            ))}
          </div>

          {meta}
        </header>

        <div className="mt-4 border border-line bg-paper/40 p-3.5">
          <p className="mono text-[8px] uppercase tracking-[0.18em] text-muted">
            Instructions
          </p>
          <ul className="mt-2 space-y-1 text-[9.5px] leading-relaxed text-ink-2">
            {paper.instructions.map((instruction) => (
              <li key={instruction} className="flex gap-1.5">
                <span className="text-faint">·</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {paper.sections.map((section) => (
          <section key={section.label} className="mt-7">
            <div className="flex items-baseline justify-between border-b border-ink pb-1.5">
              <h3 className="font-display text-[15px] italic">{section.label}</h3>
              <span className="mono text-[9px] text-muted">{section.marks} marks</span>
            </div>
            <p className="mt-1.5 text-[9px] italic text-muted">{section.note}</p>
            <div className="mt-4 space-y-6">
              {section.questions.map((q) => (
                <QuestionBlock key={q.id} q={q} />
              ))}
            </div>
          </section>
        ))}

        <footer className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-3">
          <span className="mono text-[8px] uppercase tracking-[0.12em] text-muted">
            Papertrail · {paper.title}
          </span>
          <span className="mono text-[8px] uppercase tracking-[0.12em] text-muted">
            {paper.totalMarks} marks · {paper.durationMin} min
          </span>
        </footer>
      </div>
    </article>
  );
}
