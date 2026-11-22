import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { subjects } from "@/lib/data/subjects";
import { Reveal } from "@/components/ui/reveal";

export function SubjectsSection() {
  return (
    <section className="border-y border-line bg-paper-2/45">
      <div className="container-x py-16 lg:py-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Coverage</p>
            <h2 className="display mt-4 text-[clamp(34px,4vw,50px)]">
              Six subjects, indexed deep.
            </h2>
          </div>
          <Link href="/library" className="btn btn-ghost btn-sm self-start sm:self-auto">
            All papers <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-10 border-t border-line">
          {subjects.map((subject, i) => (
            <Reveal key={subject.id} delay={i * 40}>
              <Link
                href={`/create?subject=${subject.id}`}
                className="group grid gap-2 border-b border-line py-5 transition-colors duration-200 hover:bg-paper-2 sm:grid-cols-[38px_1.15fr_0.85fr_0.6fr_24px] sm:items-center sm:gap-5"
              >
                <span className="mono text-[10px] text-line-strong">
                  0{i + 1}
                </span>
                <div className="flex items-center gap-3">
                  <span
                    className="h-[7px] w-[7px] shrink-0 rounded-full"
                    style={{ background: subject.accent }}
                  />
                  <span className="font-display text-[23px] leading-none tracking-[-0.02em]">
                    {subject.name}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted">
                  {subject.levels.join(" · ")}
                </p>
                <p className="mono text-[10px] tracking-wide text-line-strong">
                  {subject.boards.join(" · ")}
                </p>
                <ArrowUpRight
                  size={16}
                  className="hidden text-line-strong transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                />
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-muted">
          More subjects are added as their banks are indexed. Request one from
          the method page.
        </p>
      </div>
    </section>
  );
}
