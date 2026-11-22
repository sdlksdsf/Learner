import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { archiveEntries } from "@/lib/data/archive";

function Card({ entry }: { entry: (typeof archiveEntries)[number] }) {
  return (
    <Link
      href={`/library/${entry.slug}`}
      className="group w-[228px] shrink-0 border border-white/10 bg-white/[0.035] p-4 transition-colors duration-300 hover:bg-white/[0.075]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="mono text-[10px] tracking-wide text-paper-3/70">
          {entry.paperCode}
        </span>
        <span className="mono text-[9px] text-paper-3/40">
          {entry.year} · {entry.session}
        </span>
      </div>
      <p className="mt-5 font-display text-[19px] leading-tight text-paper-2">
        {entry.title}
      </p>
      <p className="mt-1.5 text-[10.5px] text-paper-3/50">
        {entry.level} · {entry.marks} marks · {entry.minutes} min
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="mono text-[9px] uppercase tracking-[0.1em] text-paper-3/40">
          {entry.topics[0]}
        </span>
        <ArrowUpRight
          size={13}
          className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}

export function ArchiveStrip() {
  const items = archiveEntries.slice(0, 10);

  return (
    <section className="border-y border-line bg-ink text-paper-2">
      <div className="container-x flex flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow !text-paper-3/50">The archive</p>
          <h2 className="display mt-4 text-[clamp(34px,4vw,48px)] text-paper-2">
            Every series. Both papers.
          </h2>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-paper-3/55">
            Filter by subject, level and year. Open the reconstruction, print
            the pack, or sit it on screen.
          </p>
        </div>
        <Link href="/library" className="btn btn-light btn-sm shrink-0 self-start sm:self-auto">
          Open the archive <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="marquee relative overflow-hidden border-t border-white/10 py-6">
        <div className="marquee-track flex w-max gap-4 pl-4">
          {[...items, ...items].map((entry, i) => (
            <Card key={`${entry.slug}-${i}`} entry={entry} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <div className="container-x flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/10 py-4 text-[10px] uppercase tracking-[0.14em] text-paper-3/40">
        <span>Cambridge · CAIE</span>
        <span>{Math.min(...archiveEntries.map((e) => e.year))} — {Math.max(...archiveEntries.map((e) => e.year))}</span>
        <span>May/June & Oct/Nov</span>
        <span className="ml-auto">{archiveEntries.length} papers indexed</span>
      </div>
    </section>
  );
}
