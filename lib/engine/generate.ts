import type {
  ArchiveEntry,
  Board,
  Level,
  Mode,
  Paper,
  PaperConfig,
  PaperQuestion,
  PaperSection,
  Question,
} from "@/lib/types";
import {
  getSubject,
  specsForLevel,
  syllabusFor,
  topicsForLevel,
} from "@/lib/data/subjects";
import { questionsFor, totalMarks } from "@/lib/data";
import { analyse } from "@/lib/engine/analysis";
import { mulberry32, randomSeed } from "@/lib/engine/rng";
import { clamp } from "@/lib/format";

interface BuildOptions {
  seed?: number;
  id?: string;
  createdAt?: number;
  meta?: Paper["meta"];
  mode?: Mode | "archive";
}

const instructionsFor = (totalMarks: number): string[] => [
  "Answer all questions.",
  "Write your name and centre number on the answer booklet.",
  "Show all your working. Marks are given for method as well as the final answer.",
  `The total mark for this paper is ${totalMarks}.`,
  "The number of marks is given in brackets [ ] at the end of each question or part question.",
  "You may use a calculator.",
];

const difficultyFit = (
  q: Question,
  difficulty: PaperConfig["difficulty"]
): number => {
  if (difficulty === "core") return q.difficulty <= 2 ? 1.2 : 0.35;
  if (difficulty === "challenge") return q.difficulty >= 2 ? 1.25 : 0.45;
  return 1;
};

const stageFit = (q: Question, level: Level): number => {
  if (level === "A Level") return q.stage === "A2" ? 1.1 : 0.95;
  if (level === "AS") return q.stage === "AS" ? 1.1 : 0.9;
  return q.stage === "IGCSE" ? 1.1 : 0.9;
};

export function generatePaper(
  config: PaperConfig,
  opts: BuildOptions = {}
): Paper {
  const subject = getSubject(config.subjectId);
  if (!subject) throw new Error("Unknown subject");

  const seed = opts.seed ?? randomSeed();
  const rng = mulberry32(seed);
  const level = config.level;
  const mode = opts.mode ?? config.mode;
  const specs = specsForLevel(subject, level);
  const spec =
    specs.find((s) => s.id === config.specId) ?? specs[0] ?? {
      id: "custom",
      label: "Practice paper",
      marks: config.targetMarks,
      minutes: Math.round(config.targetMarks * 1.5),
      description: "",
    };

  const bank = questionsFor(config.subjectId, level);
  const topicList = topicsForLevel(subject, level);
  const selectedTopics = new Set(config.topicIds);
  const pool = bank.filter(
    (q) => selectedTopics.size === 0 || selectedTopics.has(q.topicId)
  );
  const available = pool.reduce((sum, q) => sum + totalMarks(q), 0);
  const target = clamp(
    mode === "topical" ? config.targetMarks : spec.marks,
    10,
    Math.max(10, available)
  );

  const analysis = analyse(
    config.subjectId,
    level,
    config.mode === "topical" ? "topical" : "full",
    config.topicIds
  );
  const pred = new Map(analysis.topics.map((t) => [t.id, t.prediction]));

  const usedCommands = new Map<string, number>();
  const keys = pool.map((q) => {
    const prediction = pred.get(q.topicId) ?? 45;
    const commandReuse = usedCommands.get(q.command) ?? 0;
    usedCommands.set(q.command, commandReuse + 1);
    const weight =
      1 +
      prediction / 25 +
      difficultyFit(q, config.difficulty) +
      stageFit(q, level) -
      Math.min(0.6, commandReuse * 0.12);
    return { q, key: Math.pow(rng(), 1 / Math.max(0.2, weight)) };
  });

  keys.sort((a, b) => b.key - a.key);

  const chosen: Question[] = [];
  const chosenIds = new Set<string>();
  let running = 0;
  for (const { q } of keys) {
    if (chosenIds.has(q.id)) continue;
    if (running + totalMarks(q) <= target) {
      chosen.push(q);
      chosenIds.add(q.id);
      running += totalMarks(q);
    }
  }

  // Second pass: accept a near-fit question if the paper is still short.
  if (running < target - 2) {
    const remaining = target - running;
    const extra = keys
      .filter(({ q }) => !chosenIds.has(q.id))
      .filter(({ q }) => totalMarks(q) <= remaining + 2)
      .sort((a, b) => Math.abs(totalMarks(a.q) - remaining) - Math.abs(totalMarks(b.q) - remaining))[0];
    if (extra) {
      chosen.push(extra.q);
      running += totalMarks(extra.q);
    }
  }

  // Guarantee at least a little coverage of each selected topic where possible.
  if (selectedTopics.size > 1) {
    for (const topicId of selectedTopics) {
      if (!chosen.some((q) => q.topicId === topicId)) {
        const candidate = keys
          .map((k) => k.q)
          .find((q) => q.topicId === topicId && !chosenIds.has(q.id));
        if (candidate) {
          chosen.push(candidate);
          chosenIds.add(candidate.id);
          running += totalMarks(candidate);
        }
      }
    }
  }

  const short = chosen.filter((q) => totalMarks(q) <= 4).sort((a, b) => a.difficulty - b.difficulty || a.id.localeCompare(b.id));
  const long = chosen.filter((q) => totalMarks(q) > 4).sort((a, b) => totalMarks(a) - totalMarks(b));

  let sections: PaperSection[];
  let number = 1;
  const build = (label: string, note: string, qs: Question[]): PaperSection => {
    const questions: PaperQuestion[] = qs.map((q) => ({
      ...q,
      marks: totalMarks(q),
      number: number++,
    }));
    return {
      label,
      note,
      questions,
      marks: questions.reduce((s, q) => s + q.marks, 0),
    };
  };

  if (short.length && long.length) {
    sections = [
      build("Section A — short answer", "Answer all questions in this section.", short),
      build("Section B — structured", "Answer all questions in this section. Show your working.", long),
    ];
  } else {
    sections = [build("Section A — answer all questions", "Show your working.", [...short, ...long])];
  }

  const total = sections.reduce((s, sec) => s + sec.marks, 0);
  const topicBreakdown = topicList
    .map((t) => {
      const qs = chosen.filter((q) => q.topicId === t.id);
      return {
        id: t.id,
        name: t.name,
        marks: qs.reduce((s, q) => s + totalMarks(q), 0),
        questions: qs.length,
      };
    })
    .filter((t) => t.questions > 0);

  const durationMin =
    mode === "topical"
      ? Math.max(20, Math.round(total * 1.5))
      : spec.minutes;

  const topicNames = topicBreakdown.map((t) => t.name);
  const topicalLabel =
    topicNames.length === 1
      ? topicNames[0]
      : topicNames.length <= 3
        ? topicNames.join(" & ")
        : `${topicNames[0]} +${topicNames.length - 1} more`;

  const title =
    mode === "topical"
      ? `${subject.name} — ${topicalLabel}`
      : `${subject.name} ${spec.label}`;
  const subtitle =
    mode === "topical"
      ? `Topical paper · ${level} · ${config.board} · ${total} marks · ${durationMin} min`
      : `${syllabusFor(subject, level)} · ${level} · ${config.board} · ${total} marks · ${durationMin} min`;

  const createdAt = opts.createdAt ?? Date.now();
  const id = opts.id ?? `pt_${seed.toString(36)}_${createdAt.toString(36)}`;

  return {
    id,
    title,
    subtitle,
    subjectId: subject.id,
    subjectName: subject.name,
    level,
    board: config.board,
    mode,
    totalMarks: total,
    durationMin,
    createdAt,
    seed,
    config,
    instructions: instructionsFor(total),
    sections,
    topics: topicBreakdown,
    analysis,
    meta: opts.meta,
  };
}

/**
 * Syllabus-only entries (every subject without a question bank) cannot produce
 * a paper. Returning null keeps callers honest instead of fabricating
 * questions that were never written.
 */
export function canBuildArchivePaper(entry: ArchiveEntry): boolean {
  const subject = getSubject(entry.subjectId);
  if (!subject || !(entry.subjectId in BANKED_SUBJECT_IDS)) return false;
  // A banked subject at a level with no questions would yield an empty paper,
  // which is worse than saying plainly that it is not available.
  return questionsFor(subject.id, entry.level).length > 0;
}

const BANKED_SUBJECT_IDS: Record<string, true> = {
  maths: true, physics: true, chem: true, bio: true, cs: true, econ: true, pakstudies: true, islamiyat: true,
};

export function buildArchivePaper(entry: ArchiveEntry): Paper {
  const subject = getSubject(entry.subjectId);
  if (!subject || !(entry.subjectId in BANKED_SUBJECT_IDS)) {
    throw new Error("This syllabus has no question bank yet");
  }
  const topicIds = topicsForLevel(subject, entry.level)
    .filter((t) => entry.topics.includes(t.name))
    .map((t) => t.id);
  const config: PaperConfig = {
    subjectId: entry.subjectId,
    level: entry.level,
    board: "CAIE" as Board,
    mode: "topical",
    topicIds,
    targetMarks: entry.marks,
    difficulty: "mixed",
    specId: entry.specId,
  };
  const paper = generatePaper(config, {
    seed: entry.seed,
    id: `arc_${entry.slug}`,
    mode: "archive",
    createdAt: Date.UTC(entry.year, 4, 1),
    meta: {
      paperCode: entry.paperCode,
      series: `${entry.session} ${entry.year}`,
      year: entry.year,
      session: entry.session,
      source: "Archive reconstruction",
      officialUrl: entry.officialUrl,
    },
  });
  paper.title = `${subject.name} ${entry.paperCode}`;
  paper.subtitle = `${entry.session} ${entry.year} · ${syllabusFor(subject, entry.level)} · ${entry.marks} marks · ${entry.minutes} min`;
  paper.durationMin = entry.minutes;
  return paper;
}
