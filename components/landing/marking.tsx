import { ArrowRight, Check, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const points = [
  ["Mark-scheme points", "Every mark is tied to a named point, not a keyword guess."],
  ["Per-question feedback", "See exactly which point was missed and what the examiner wanted."],
  ["Topic report", "Your score is split by chapter, so the next session has a target."],
];

export function Marking() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal variant="scale">
          <div className="relative mx-auto max-w-[500px]">
            <div className="sheet rotate-[-1.4deg] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  Candidate response · Q4
                </p>
                <span className="mono text-[10px] text-accent">Marked</span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <p className="text-[12.5px] leading-relaxed text-ink-2">
                    The rate increases because the particles have more kinetic
                    energy and collide more often with energy above the
                    activation energy.
                  </p>
                  <Check size={18} className="mt-0.5 shrink-0 text-green" strokeWidth={2.4} />
                </div>
                <div className="ml-7 border-l-2 border-green pl-3">
                  <p className="mono text-[10px] text-green">3 / 3 · all points matched</p>
                </div>

                <div className="flex items-start gap-3 border-t border-line pt-4">
                  <p className="text-[12.5px] leading-relaxed text-ink-2">
                    The temperature makes the reaction go faster.
                  </p>
                  <X size={18} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.4} />
                </div>
                <div className="ml-7 border-l-2 border-accent pl-3">
                  <p className="mono text-[10px] text-accent">
                    1 / 2 · missing: particles have more energy
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                    Examiner comment: name the particle change, not just the
                    temperature.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  Total for question
                </span>
                <span className="font-display text-[24px] leading-none">4 / 5</span>
              </div>
            </div>

            <div className="sheet absolute -bottom-6 -right-2 rotate-[2.2deg] p-4 sm:-right-5">
              <p className="mono text-[8.5px] uppercase tracking-[0.16em] text-muted">
                Topic report
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[30px] leading-none">78%</span>
                <span className="mono text-[9px] text-green">+12 vs last</span>
              </div>
              <div className="mt-2 h-[3px] w-24 overflow-hidden bg-paper-3">
                <div className="h-full w-[78%] bg-accent" />
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Examiner-style marking</p>
            <h2 className="display mt-5 text-[clamp(36px,4.4vw,54px)]">
              Marked against the scheme,{" "}
              <span className="serif-italic text-muted">not a guess.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 max-w-lg text-[14px] leading-relaxed text-muted">
              The marker reads the mark scheme for the exact paper you sat. It
              awards method and accuracy points, flags what is missing, and
              turns the result into a revision list instead of a number.
            </p>
          </Reveal>

          <div className="mt-8 space-y-0 border-y border-line">
            {points.map(([title, body], i) => (
              <Reveal
                key={title}
                delay={120 + i * 80}
                className="grid grid-cols-[30px_1fr] gap-3 border-b border-line py-4 last:border-b-0"
              >
                <span className="mono text-[10px] text-line-strong">0{i + 1}</span>
                <div>
                  <p className="text-[13px] font-semibold">{title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8">
              <ButtonLink href="/create" variant="ghost">
                See it on your paper <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
