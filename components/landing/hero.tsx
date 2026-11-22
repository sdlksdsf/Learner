import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { subjects } from "@/lib/data/subjects";
import { archiveEntries as entries } from "@/lib/data/archive";
import { allQuestions } from "@/lib/data";

const bars = [
  { label: "Calculus", value: 94, marks: 13 },
  { label: "Quadratics", value: 81, marks: 8 },
  { label: "Trigonometry", value: 76, marks: 8 },
];

function Specimen() {
  return (
    <div className="relative mx-auto w-full max-w-[470px] lg:ml-auto">
      {/* soft halo */}
      <div
        className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(185,58,43,0.13), rgba(185,58,43,0.03) 55%, transparent 75%)",
        }}
        aria-hidden
      />

      {/* back card */}
      <div className="sheet absolute -right-6 -top-8 hidden w-[236px] rotate-[3.2deg] p-4 xl:block">
        <p className="mono text-[9px] uppercase tracking-[0.18em] text-line-strong">
          Mark scheme · 9709/42
        </p>
        <div className="mt-4 space-y-3">
          {[
            ["M1", "Uses the chain rule"],
            ["A1", "Obtains 30x(3x² + 1)⁴"],
            ["B1", "States the constant of integration"],
          ].map(([code, text], i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mono mt-0.5 text-[9px] text-green">{code}</span>
              <p className="text-[10.5px] leading-snug text-muted">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-line pt-3">
          <div className="flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M2 8.5l4 4L14 3"
                stroke="#1F6B4A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mono text-[10px] text-green">3 / 3</span>
          </div>
        </div>
      </div>

      {/* main paper */}
      <div className="sheet anim-float relative z-10 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mono text-[9px] uppercase tracking-[0.18em] text-line-strong">
              Specimen<span className="hidden sm:inline"> · predicted pattern</span>
            </p>
            <p className="mt-1.5 font-display text-[21px] leading-none tracking-[-0.02em] sm:text-[22px]">
              Mathematics 9709
            </p>
          </div>
          <span className="stamp anim-stamp shrink-0">Predicted</span>
        </div>

        <div className="mt-6 border-y border-line py-3">
          <p className="font-display text-[17px] italic leading-snug">
            Topical paper — Calculus
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Differentiation", "Integration", "Area", "Optimisation"].map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Topic frequency
            </p>
            <p className="mono text-[9px] text-line-strong">10 series</p>
          </div>
          <div className="space-y-3">
            {bars.map((bar, i) => (
              <div key={bar.label}>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-[11px] font-medium">{bar.label}</span>
                  <span className="mono text-[10px] text-muted">
                    {bar.value}% · {bar.marks} marks
                  </span>
                </div>
                <div className="h-[5px] w-full overflow-hidden bg-paper-3">
                  <div
                    className="anim-bar h-full bg-ink"
                    style={{
                      width: `${bar.value}%`,
                      ["--delay" as string]: `${400 + i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-line pt-4">
          {[
            ["25", "marks"],
            ["38", "minutes"],
            ["5", "questions"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-[26px] leading-none">{n}</p>
              <p className="mono mt-1 text-[9px] uppercase tracking-[0.12em] text-muted">
                {l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="text-[11px] text-muted">Pattern matched · ready to sit</span>
          <span className="mono text-[10px] text-accent">v.2</span>
        </div>
      </div>

      {/* small annotation */}
      <div className="mt-3 hidden items-center gap-2 sm:flex">
        <span className="h-px w-8 bg-accent" />
        <span className="mono text-[9px] uppercase tracking-[0.14em] text-accent">
          Built from 24 papers · 4 questions in scope
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const totalQuestions = allQuestions.length;
  const totalPapers = entries.length;

  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(184,177,156,0.16) 1px, transparent 1px)",
          backgroundSize: "25% 100%",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(43,76,126,0.10), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container-x relative grid gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8 lg:py-24">
        <div>
          <p className="eyebrow anim-rise">Past-paper intelligence</p>

          <h1 className="display mt-6 text-[clamp(46px,7.2vw,88px)] text-balance">
            Every past paper.
            <br />
            <span className="serif-italic text-accent">One pattern.</span>
          </h1>

          <p className="anim-rise mt-6 max-w-[520px] text-[15px] leading-[1.7] text-muted" style={{ ["--delay" as string]: "120ms" }}>
            Papertrail reads the last five years of exam papers, finds the questions
            examiners keep returning to, and builds the paper you actually need
            — topical or full length, with a mark scheme and marking that
            behaves like an examiner.
          </p>

          <div className="anim-rise mt-8 flex flex-wrap gap-3" style={{ ["--delay" as string]: "220ms" }}>
            <ButtonLink href="/create" size="lg">
              Build a paper <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/library" variant="ghost" size="lg">
              Browse the archive
              <ArrowUpRight size={15} className="text-muted" />
            </ButtonLink>
          </div>

          <div className="anim-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-5" style={{ ["--delay" as string]: "320ms" }}>
            <span className="mono text-[10px] uppercase tracking-[0.16em] text-line-strong">
              CAIE · Edexcel · AQA · OCR
            </span>
            <span className="ml-auto text-[11px] text-muted">
              {subjects.length} subjects · {totalPapers} papers indexed ·{" "}
              {totalQuestions} questions
            </span>
          </div>
        </div>

        <div className="anim-fade" style={{ ["--delay" as string]: "260ms" }}>
          <Specimen />
        </div>
      </div>
    </section>
  );
}
