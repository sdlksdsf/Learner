import { Bookmark, Printer, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const features = [
  {
    icon: Printer,
    title: "Print packs",
    body: "Paper, answer booklet and mark scheme in one A4 pack. Print it or save it as a PDF for the bus.",
  },
  {
    icon: Bookmark,
    title: "Saved on your device",
    body: "Every paper you build stays on the device. No account, no upload — come back to it the night before.",
  },
  {
    icon: Target,
    title: "Focus drills",
    body: "Results turn into a short list of weak chapters. One tap builds the next topical paper around them.",
  },
];

export function Features() {
  return (
    <section className="container-x py-20 lg:py-24">
      <Reveal>
        <div className="mb-8 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">In the box</p>
            <h2 className="mt-3 font-display text-[clamp(26px,3.2vw,38px)] tracking-[-0.02em]">
              Built around the sitting, not just the paper.
            </h2>
          </div>
          <p className="max-w-[280px] text-[11.5px] leading-relaxed text-muted sm:text-right">
            Print it, keep it, or turn the result into the next drill.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={i * 90} variant="scale">
              <div className="group h-full border border-line bg-paper-2/60 p-6 transition-all duration-300 hover:border-line-strong hover:bg-paper-2 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] text-faint">0{i + 1}</span>
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-muted transition-colors group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-10 font-display text-[24px] leading-tight tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-muted">
                  {feature.body}
                </p>
                <div className="mt-6 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
