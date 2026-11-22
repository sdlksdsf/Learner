import { PenLine, ScanSearch, SlidersHorizontal } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "Set the paper",
    body: "Subject, level, board and chapters. Topical or full length. Pick the marks you have time for.",
    icon: SlidersHorizontal,
  },
  {
    n: "02",
    title: "Read the pattern",
    body: "Five years of frequency, recurrence, command words and mark weight — before a single question is chosen.",
    icon: ScanSearch,
  },
  {
    n: "03",
    title: "Sit it, then get marked",
    body: "Answer on screen or print the pack. Every mark is checked against the scheme, point by point.",
    icon: PenLine,
  },
];

export function HowItWorks() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="display mt-5 text-[clamp(38px,4.6vw,56px)]">
              Three steps.
              <br />
              <span className="serif-italic text-muted">One paper.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-muted">
              The generator does not invent questions at random. It starts from
              the pattern, then assembles a paper that behaves like the series
              you are sitting.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
              <span className="mono text-[10px] uppercase tracking-[0.16em] text-line-strong">
                Engine
              </span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="text-[12px] text-muted">
                Pattern extraction → blueprint → assembly → marking
              </span>
            </div>
          </Reveal>
        </div>

        <div className="border-y border-line">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.n}
                delay={i * 90}
                className="group grid grid-cols-[42px_1fr] gap-4 py-6 sm:grid-cols-[56px_1fr_40px] sm:items-start sm:gap-6"
              >
                <div className="border-b border-line pb-4 sm:border-b-0 sm:pb-0">
                  <span className="mono text-[11px] text-accent">{step.n}</span>
                </div>
                <div className="pb-6 sm:pb-0">
                  <h3 className="font-display text-[24px] leading-tight tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>
                <div className="col-span-2 flex justify-end sm:col-span-1">
                  <span className="grid h-10 w-10 place-items-center border border-line text-muted transition-colors duration-300 group-hover:border-ink group-hover:text-ink">
                    <Icon size={17} strokeWidth={1.6} />
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
