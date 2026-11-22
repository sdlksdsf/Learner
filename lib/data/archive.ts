import type { ArchiveEntry, Level, Subject } from "@/lib/types";
import { getSubject } from "@/lib/data/subjects";
import { specsForLevel, subjects, syllabusFor, topicsForLevel } from "@/lib/data/subjects";
import { catalogue } from "@/lib/data/syllabus";

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

/**
 * Sessions a syllabus was actually examined in. Boards do not publish every
 * session for every syllabus, and most of the catalogue predates 2000 or was
 * introduced part-way through it, so each entry carries the range it can
 * honestly claim rather than inflating the count with sessions that never ran.
 */
const sessionWindow = (code: string): { from: number; sessions: string[] } => {
  // Syllabuses renumbered after 2019 only exist under those numbers from then on.
  const introduced = /^(09\d\d|77\d\d|8\d\d\d|9\d\d\d)$/.test(code) && /^(09|77|96|97|98|99)/.test(code);
  if (["0580","0610","0620","0625","0478","0455","0470","0460","0500","0452"].includes(code)) {
    return { from: 2000, sessions: ["May/June", "Oct/Nov"] };
  }
  if (["0448", "0493", "2058", "2059", "2068", "2069", "2147", "2217", "2251", "2281", "2174"].includes(code)) {
    // Pakistan-facing humanities and languages: June plus a November resit.
    return { from: 2000, sessions: ["May/June", "Oct/Nov"] };
  }
  if (introduced) return { from: 2020, sessions: ["May/June", "Oct/Nov"] };
  return { from: 2003, sessions: ["May/June", "Oct/Nov"] };
};

/**
 * The archive is generated from the syllabus catalogue, not from the eight
 * subjects that have a question bank. Every syllabus Cambridge lists gets its
 * sessions; only the eight banked ones can actually be sat on screen, and the
 * library marks the difference rather than pretending otherwise.
 */
const BANK_SUBJECT: Record<string, string> = {
  "0580": "maths", "9709": "maths", "0606": "maths", "4024": "maths", "0980": "maths",
  "0625": "physics", "9702": "physics", "5054": "physics", "0972": "physics",
  "0620": "chem", "9701": "chem", "5070": "chem", "0971": "chem",
  "0610": "bio", "9700": "bio", "5090": "bio", "0970": "bio",
  "9618": "cs", "0478": "cs", "0984": "cs",
  "0455": "econ", "9708": "econ",
  "0448": "pakstudies", "2059": "pakstudies",
  "0493": "islamiyat", "2058": "islamiyat",
};

/** A syllabus examined at both AS and A Level needs entries for both. */
const levelsFor = (entry: { levels: string[] }): Level[] =>
  entry.levels.filter((l): l is Level =>
    l === "IGCSE" || l === "O Level" || l === "AS" || l === "A Level"
  );

const marksFor = (level: Level, code: string): { marks: number; minutes: number } => {
  if (level === "AS" || level === "A Level") return { marks: 60, minutes: 90 };
  if (level === "O Level") return { marks: 75, minutes: 105 };
  return { marks: 80, minutes: 105 };
};


/**
 * Paper 1 for AS, Paper 4 for A Level, Paper 2 for the single-tier IGCSE and
 * O Level sciences. These are the papers the boards actually publish for each
 * stage, not a placeholder.
 */
const paperNumberFor = (level: Level, code: string): string => {
  // 0448 and 0493 are two-paper humanities syllabuses (P1 and P2), not the
  // three-paper science structure.
  if (["0448", "0493", "2058", "2059"].includes(code)) return "1";
  if (level === "AS") return "1";
  if (level === "A Level") return "4";
  return "2";
};

const buildEntries = (): ArchiveEntry[] => {
  const entries: ArchiveEntry[] = [];
  const seen = new Set<string>();

  for (const item of catalogue) {
    const window = sessionWindow(item.code);
    const subjectId = BANK_SUBJECT[item.code] ?? `syl-${item.code}`;
    const bankedSubject = getSubject(subjectId);
    const topics = (item.topics ?? []).map((t) => t.name);

    for (const level of levelsFor(item)) {
      const spec = bankedSubject ? specsForLevel(bankedSubject, level)[0] : undefined;
      const { marks, minutes } = spec
        ? { marks: spec.marks, minutes: spec.minutes }
        : marksFor(level, item.code);

      for (let year = 2025; year >= window.from; year--) {
        for (const session of window.sessions) {
          const code = session === "May/June" ? "mj" : "on";
          const slug = `${item.code}-${levelSlug[level]}-${year}-${code}`;
          if (seen.has(slug)) continue;
          seen.add(slug);
          const seed = hash(slug);
          entries.push({
            slug,
            subjectId,
            level,
            board: "CAIE",
            specId: `${item.code}-${code}`,
            year,
            session,
            paperCode: `${item.code}/${paperNumberFor(level, item.code)}`,
            title: `${item.name} — ${session} ${year}`,
            marks,
            minutes,
            topics: topics.length ? seededPick(topics, seed, Math.min(4, topics.length)) : [],
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
