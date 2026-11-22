import type { Metadata } from "next";
import { SyllabusExplorer } from "@/components/syllabus/syllabus-explorer";
import { buildableCount, catalogue, verifiedCount } from "@/lib/data/syllabus";

export const metadata: Metadata = {
  title: "Syllabus index",
  description:
    "Every Cambridge IGCSE, O Level and AS & A Level subject with its official syllabus code, and the verified chapter list where it has been transcribed.",
};

export default function SyllabusPage() {
  return (
    <main className="container-x pb-24 pt-16">
      <p className="eyebrow">Syllabus index</p>
      <h1 className="display mt-5 max-w-3xl text-[clamp(2.4rem,6vw,4.2rem)]">
        The whole catalogue.
        <span className="block serif-italic text-accent">Codes, then chapters.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
        {catalogue.length} Cambridge subjects across IGCSE, O Level and AS &amp; A Level, each with
        the syllabus code from the board&rsquo;s own subject list. {buildableCount} have a question
        bank attached and can build a paper today; {verifiedCount} of those also carry a chapter
        list transcribed from the published syllabus. The rest are listed so the catalogue is
        honest about what exists rather than silently omitting it.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="tag tag-green">Verified chapters</span>
        <span className="tag">Code confirmed</span>
        <span className="tag">Paper builder open</span>
      </div>

      <SyllabusExplorer />

      <div className="mt-16 max-w-2xl border-t border-line pt-8">
        <p className="field-label">How this list is maintained</p>
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          Subject codes are read from Cambridge International&rsquo;s published subject lists for
          IGCSE, O Level and AS &amp; A Level. Chapter lists are transcribed from the syllabus PDF
          the board publishes for the current examination year, and the source document is recorded
          against each subject. When a board revises a syllabus — Pakistan Studies 0448 changes in
          2028 — the transcription is redone rather than edited, so the chapters always match the
          year being sat.
        </p>
      </div>
    </main>
  );
}
