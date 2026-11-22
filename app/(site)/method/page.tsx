import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { allQuestions } from "@/lib/data";
import { archiveEntries } from "@/lib/data/archive";

export const metadata: Metadata = {
  title: "Method",
  description:
    "How Papertrail reads past-paper patterns, assembles a paper, and marks it against the scheme — and what it cannot do.",
};

const sections = [
  {
    id: "corpus",
    n: "01",
    title: "The corpus",
    body: [
      "The index covers six subjects across IGCSE, AS and A Level, with 24 recent series and more than 160 questions carrying their mark-scheme points.",
      "What is indexed is the structure of each series: which chapters appear, how many marks they carry, which command words dominate, and how often a question type returns. The archive pages are study reconstructions built to that structure — the official papers remain with their boards.",
    ],
  },
  {
    id: "pattern",
    n: "02",
    title: "Pattern extraction",
    body: [
      "Every chapter gets a pattern score from four signals: how often it appeared across the indexed series, how recently it was seen, whether it is trending up or down, and how many marks it typically carries.",
      "The score is deliberately blunt. It is a prior, not a prophecy: it tells the assembler which chapters deserve marks before a single question is chosen.",
    ],
  },
  {
    id: "assembly",
    n: "03",
    title: "Assembly",
    body: [
      "The blueprint sets marks per chapter, the command-word mix and the difficulty spread. Questions are then drawn by weighted sampling without replacement, so a paper never repeats a question and still hits the target marks.",
      "Sections follow the shape of the exam: short answer first, structured questions behind them. If the bank for a level is thinner than the requested paper, the paper caps at the available marks rather than padding with filler.",
    ],
  },
  {
    id: "marking",
    n: "04",
    title: "Marking",
    body: [
      "Each question is scored against the mark scheme written for that exact paper. Calculation points accept numeric answers within tolerance; theory points look for the scheme's concepts, not a single string.",
      "Extended responses are indicative. The marker awards the scheme points it can evidence and flags the rest, and every part can be adjusted by hand if a teacher would award it differently.",
    ],
  },
];

export default function MethodPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <header className="anim-rise max-w-3xl border-b border-line pb-8">
        <p className="eyebrow">Method</p>
        <h1 className="display mt-4 text-[clamp(38px,5vw,62px)]">
          How the engine
          <br />
          <span className="serif-italic text-muted">reads a paper.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[13.5px] leading-relaxed text-muted">
          A paper is not a random selection of questions. It is a shape —
          marks per chapter, a command-word mix, a difficulty curve. Here is
          how Papertrail finds that shape, builds to it, and marks what comes
          back.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-20">
        <div className="max-w-2xl">
          <Reveal>
            <div className="border border-line bg-paper-2 p-5">
              <p className="mono text-[9px] uppercase tracking-[0.16em] text-faint">
                The pipeline
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px]">
                {["Index", "Pattern", "Blueprint", "Paper", "Marks"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="border border-line px-2.5 py-1.5 font-medium">
                      {step}
                    </span>
                    {i < 4 && <ArrowRight size={11} className="text-faint" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-px border border-line bg-line">
                {[
                  [String(archiveEntries.length), "archive papers"],
                  [String(allQuestions.length), "questions indexed"],
                  ["24", "series read"],
                ].map(([value, label]) => (
                  <div key={label} className="bg-paper-2 p-3">
                    <p className="font-display text-[24px] leading-none">{value}</p>
                    <p className="mono mt-1 text-[8px] uppercase tracking-[0.1em] text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <Reveal key={section.id} id={section.id}>
                <section id={section.id} className="scroll-mt-24 border-t border-line pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-[10px] text-accent">{section.n}</span>
                    <h2 className="font-display text-[30px] tracking-[-0.02em]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="mt-4 space-y-3.5 text-[13px] leading-[1.75] text-ink-2">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.id === "pattern" && (
                    <div className="mt-5 border border-line bg-paper-2 p-4">
                      <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-muted">
                        Pattern score
                      </p>
                      <p className="mono mt-2 text-[11px] leading-relaxed text-ink-2">
                        score = 0.40 × frequency + 0.25 × recency + 0.20 × trend
                        + 0.15 × mark weight
                      </p>
                    </div>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <div id="limits" className="mt-12 scroll-mt-24 border-t border-line pt-6">
            <p className="mono text-[10px] text-accent">05</p>
            <h2 className="mt-2 font-display text-[30px] tracking-[-0.02em]">
              What this is not
            </h2>
            <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">
              {[
                [
                  "Not a prediction",
                  "A pattern score is a prior, not a leak. The real paper can and does surprise.",
                ],
                [
                  "Not the official paper",
                  "Archive entries are reconstructions. Official papers and mark schemes stay with their boards.",
                ],
                [
                  "Not a teacher",
                  "Extended-response marking is indicative. Adjust the marks, or check with someone who teaches the subject.",
                ],
                [
                  "Not a replacement for the syllabus",
                  "Use the pattern to prioritise revision, then read the syllabus and the textbook.",
                ],
              ].map(([title, body]) => (
                <div key={title} className="bg-paper-2 p-5">
                  <p className="text-[12px] font-semibold">{title}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-line bg-paper-2 p-6">
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-faint">
              Request a subject
            </p>
            <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-muted">
              The bank grows subject by subject. If yours is missing, send the
              board, level and syllabus code and it goes on the list.
            </p>
            <a
              href="mailto:hello@papertrail.study?subject=Subject%20request"
              className="mt-4 inline-flex items-center gap-2 text-[12px] font-medium link-underline"
            >
              hello@papertrail.study <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
              On this page
            </p>
            <nav className="mt-3 space-y-1.5 border-l border-line">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block border-l border-transparent py-1 pl-3 text-[11px] text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  {section.title}
                </a>
              ))}
            </nav>
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[10px] leading-relaxed text-muted">
                The engine is deterministic. The same configuration and seed
                produce the same paper, so a rebuild is reproducible.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built for students. Not affiliated with any exam board.
        </p>
        <a href="#corpus" className="flex items-center gap-1.5 link-underline">
          Back to the top <ArrowDown size={12} className="rotate-180" />
        </a>
      </div>
    </div>
  );
}
