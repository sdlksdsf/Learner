import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { LibraryExplorer } from "@/components/library/library-explorer";
import { ButtonLink } from "@/components/ui/button";
import { archiveEntries, archiveYears } from "@/lib/data/archive";

export const metadata: Metadata = {
  title: "Paper archive",
  description:
    "Browse Cambridge past-paper reconstructions by subject, level and year. Every paper comes with a mark scheme and can be sat on screen.",
};

export default function LibraryPage() {
  return (
    <div className="container-x py-10 lg:py-14">
      <header className="anim-rise flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">The archive</p>
          <h1 className="display mt-4 text-[clamp(38px,5vw,62px)]">
            Every series.
            <br />
            <span className="serif-italic text-muted">Both papers.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-muted">
            Filter by subject, level and year. Each entry is a reconstruction
            built to the syllabus blueprint, with the series pattern and mark
            scheme attached.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="mono text-right text-[10px] uppercase tracking-[0.14em] text-muted">
            <p>{archiveEntries.length} papers indexed</p>
            <p className="mt-1">CAIE · {Math.min(...archiveYears)} — {Math.max(...archiveYears)}</p>
          </div>
          <ButtonLink href="/create" size="sm">
            Build a custom paper <ArrowRight size={14} />
          </ButtonLink>
        </div>
      </header>

      <div className="mt-8">
        <LibraryExplorer />
      </div>
    </div>
  );
}
