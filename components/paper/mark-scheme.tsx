import type { Paper } from "@/lib/types";

export function MarkScheme({ paper }: { paper: Paper }) {
  const questions = paper.sections.flatMap((s) => s.questions);

  return (
    <div>
      <div className="mb-5 border border-line bg-paper-2 p-4">
        <p className="mono text-[8.5px] uppercase tracking-[0.16em] text-muted">
          Mark scheme · {paper.title}
        </p>
        <p className="mt-1.5 text-[10.5px] leading-relaxed text-muted">
          Award the marks shown for each point. Alternative correct wording
          earns the mark. Method marks (M) and accuracy marks (A) are shown as
          the scheme intends.
        </p>
      </div>

      <div className="space-y-7">
        {questions.map((q) => (
          <div key={q.id} className="border-t border-line pt-4">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-display text-[19px] tracking-[-0.01em]">
                Question {q.number}
              </h4>
              <span className="mono text-[9px] uppercase tracking-[0.1em] text-muted">
                {q.marks} marks
              </span>
            </div>
            <div className="mt-3 space-y-4">
              {q.parts.map((part) => (
                <div key={part.id} className="border-l-2 border-line pl-3.5">
                  <p className="mono text-[8px] uppercase tracking-[0.14em] text-muted">
                    {part.label || "Answer"}
                  </p>
                  <p className="mt-1.5 text-[11.5px] font-medium leading-relaxed">
                    {part.answer}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {part.scheme.map((point, i) => (
                      <li key={i} className="flex gap-2 text-[10.5px] leading-relaxed text-muted">
                        <span className="mono w-6 shrink-0 text-accent">
                          [{point.marks}]
                        </span>
                        <span>{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-line pt-3">
        <p className="mono text-[8px] uppercase tracking-[0.12em] text-muted">
          Total · {paper.totalMarks} marks
        </p>
      </div>
    </div>
  );
}
