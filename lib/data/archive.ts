import type { ArchiveEntry, Level, Subject } from "@/lib/types";
import { specsForLevel, subjects, syllabusFor, topicsForLevel } from "@/lib/data/subjects";

/**
 * Sessions back to 2000. Cairo code: 06 = Oct/Nov (ON), 05 = May/June (MJ).
 * June-only subjects (Pakistan Studies 0448, Islamiyat 0493) list June alone.
 */
const series: { year: number; session: string; code: string }[] = [];
for (let year = 2025; year >= 2000; year--) {
  series.push({ year, session: "Oct/Nov", code: "on" });
  series.push({ year, session: "May/June", code: "mj" });
}

const levelSlug: Partial<Record<Level, string>> = {
  IGCSE: "igcse",
  GCSE: "gcse",
  "O Level": "olevel",
  AS: "as",
  "A Level": "alevel",
};

const hash = (str: string): number => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const seededPick = <T,>(items: T[], seed: number, count: number): T[] => {
  const arr = [...items];
  let s = seed || 1;
  const out: T[] = [];
  while (out.length < count && arr.length) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    out.push(arr.splice(s % arr.length, 1)[0]);
  }
  return out;
};

const boardPage = (board: ArchiveEntry["board"]): string => {
  switch (board) {
    case "Edexcel":
      return "https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html";
    case "AQA":
      return "https://www.aqa.org.uk/find-past-papers-and-mark-schemes";
    case "OCR":
      return "https://www.ocr.org.uk/qualifications/past-papers/";
    default:
      return "https://www.cambridgeinternational.org/programmes-and-qualifications/recognition-and-acceptance/past-papers/";
  }
};

const paperNumber = (subject: Subject, level: Level, specId: string): string => {
  const extended = specId.includes("extended");
  if (level === "IGCSE" || level === "GCSE" || level === "O Level") return extended ? "4" : "2";
  if (level === "AS") return extended ? "3" : "2";
  return extended ? "5" : "4";
};

const buildEntries = (): ArchiveEntry[] => {
  const entries: ArchiveEntry[] = [];
  for (const subject of subjects) {
    const levels = subject.levels.filter((l) => l === "IGCSE" || l === "AS" || l === "A Level");
    for (const level of levels) {
      const specs = specsForLevel(subject, level);
      const topics = topicsForLevel(subject, level);
      for (const spec of specs) {
        for (const s of series) {
          const slug = `${subject.id}-${levelSlug[level]}-${spec.id}-${s.year}-${s.code}`;
          const seed = hash(slug);
          entries.push({
            slug,
            subjectId: subject.id,
            level,
            board: "CAIE",
            specId: spec.id,
            year: s.year,
            session: s.session,
            paperCode: `${syllabusFor(subject, level)}/${paperNumber(subject, level, spec.id)}2`,
            title: `${subject.name} — ${spec.label}`,
            marks: spec.marks,
            minutes: spec.minutes,
            topics: seededPick(topics, seed, Math.min(4, topics.length)).map((t) => t.name),
            officialUrl: boardPage("CAIE"),
            seed,
          });
        }
      }
    }
  }
  return entries;
};

export const archiveEntries: ArchiveEntry[] = buildEntries();

export const getArchiveEntry = (slug: string): ArchiveEntry | undefined =>
  archiveEntries.find((e) => e.slug === slug);

export const archiveYears = [...new Set(archiveEntries.map((e) => e.year))].sort((a, b) => b - a);

export const archiveSubjects = subjects.filter((s) =>
  archiveEntries.some((e) => e.subjectId === s.id)
);

/** Human-readable span of the indexed sessions, derived so copy never drifts. */
export const archiveSpan = (() => {
  const years = archiveEntries.map((e) => e.year);
  const min = Math.min(...years);
  const max = Math.max(...years);
  return { min, max, label: `${min} — ${max}`, count: max - min + 1 };
})();
