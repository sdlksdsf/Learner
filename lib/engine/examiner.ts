import type { AttemptResult, Paper, Part, PartResult, QuestionResult } from "@/lib/types";

/**
 * Turns a marked paper into the kind of note an examiner writes: what was
 * strong, what cost marks, why, and what to do before the next paper.
 *
 * Every sentence is generated from the marking data itself — the scheme
 * points that were missed, the command words, the coverage ratio. Nothing is
 * invented and nothing is flattering for its own sake.
 */

export interface Fault {
  kind:
    | "blank"
    | "method"
    | "accuracy"
    | "precision"
    | "keyword"
    | "depth"
    | "unsupported"
    | "arithmetic";
  part: Part;
  result: PartResult;
  detail: string;
}

export interface ExaminerReport {
  gradeBand: string;
  headline: string;
  strengths: string[];
  faults: Fault[];
  /** The single most expensive habit on this paper. */
  priority: { title: string; advice: string; marks: number } | null;
  nextSteps: string[];
  commandWords: { word: string; lost: number; possible: number }[];
  markLostToTyping: number;
}

const COMMAND_ADVICE: Record<string, string> = {
  calculate:
    "In a calculation, the method marks come before the answer. Write the substitution line, then evaluate — a wrong final figure with clear working still scores.",
  solve:
    "For solve, show each step of the rearrangement. An answer alone only earns the accuracy mark, never the method marks behind it.",
  explain:
    "Explain questions want a cause and a consequence joined by because or so. Naming the thing is not explaining it.",
  describe:
    "Describe wants what happens, in order, with the observation named. Do not explain unless it is asked — it wastes time and earns nothing.",
  compare:
    "Compare needs both sides named in the same sentence, plus the word that marks the difference (more, less, faster).",
  evaluate:
    "Evaluate needs a judgement. State the view, give the evidence for it, give the evidence against, then decide.",
  discuss:
    "Discuss needs both sides and a conclusion. Marks are lost by listing points without weighing them.",
  state: "State is one sentence with no working. If you write more, you risk contradicting yourself.",
  suggest:
    "Suggest rewards a reasoned idea beyond the syllabus. One clear reason beats three vague ones.",
  give: "Give answers are direct. Do not rewrite the question.",
  name: "Name asks for the technical term only — no description.",
};

const faultAdvice = (fault: Fault): string => {
  switch (fault.kind) {
    case "blank":
      return `Left blank. Even a partial attempt often earns a mark — for "${fault.part.prompt.slice(0, 60)}…", the scheme was looking for ${fault.detail}.`;
    case "method":
      return `Working not shown. The scheme awards marks for the method before the answer; write the line you used.`;
    case "accuracy":
      return `Method credited but the final value was out. Re-check the arithmetic and units before moving on.`;
    case "precision":
      return `The idea was there but the wording would not satisfy an examiner: ${fault.detail}.`;
    case "keyword":
      return `The required term is missing. The scheme names it: ${fault.detail}.`;
    case "depth":
      return `Too thin for the marks available. This part wanted ${fault.part.marks} separate points; you supplied fewer.`;
    case "unsupported":
      return `Assertion without evidence. ${fault.detail}`;
    case "arithmetic":
      return `Arithmetic slip in the working. ${fault.detail}`;
  }
};

/** Classify each lost part so the report can name the habit, not just a score. */
function classify(part: Part, result: PartResult): Fault | null {
  if (result.awarded >= result.possible) return null;

  if (result.blank) {
    return {
      kind: "blank",
      part,
      result,
      detail: part.scheme[0]?.text ?? "the first scheme point",
    };
  }

  const missed = result.points.filter((p) => p.awarded < p.marks);
  const hasNumeric = part.scheme.some((p) => p.numeric !== undefined || p.accept?.length);
  const earnedSomething = result.awarded > 0;

  if (hasNumeric && !earnedSomething) {
    return { kind: "method", part, result, detail: "show the substitution and the calculation" };
  }
  if (hasNumeric && earnedSomething) {
    return {
      kind: "accuracy",
      part,
      result,
      detail: missed[0]?.text ?? "the final value",
    };
  }
  if (missed.length === 0) return null;

  // Partially credited: the answer engaged but did not cover the scheme.
  if (earnedSomething) {
    const ratio = result.awarded / Math.max(1, result.possible);
    if (ratio < 0.5 && part.marks >= 3) {
      return { kind: "depth", part, result, detail: missed.map((m) => m.text).join("; ") };
    }
    return { kind: "precision", part, result, detail: missed[0].text };
  }

  // Nothing credited at all.
  if (part.marks >= 3) {
    return { kind: "depth", part, result, detail: missed.map((m) => m.text).join("; ") };
  }
  return { kind: "keyword", part, result, detail: missed[0]?.text ?? "the key term" };
}

export function buildExaminerReport(
  paper: Paper,
  mark: AttemptResult,
  parts: Map<string, Part>
): ExaminerReport {
  const faults: Fault[] = [];
  const commandTotals = new Map<string, { lost: number; possible: number }>();

  for (const question of mark.questions) {
    const source = findQuestion(paper, question.questionId);
    if (!source) continue;
    for (const partResult of question.parts) {
      const part = source.parts.find((p) => p.id === partResult.partId);
      if (!part) continue;
      const cmd = (part.prompt.split(/\s+/)[0] ?? "").toLowerCase().replace(/[^a-z]/g, "");
      const entry = commandTotals.get(cmd) ?? { lost: 0, possible: 0 };
      entry.possible += partResult.possible;
      entry.lost += partResult.possible - partResult.awarded;
      commandTotals.set(cmd, entry);

      const fault = classify(part, partResult);
      if (fault) faults.push(fault);
    }
  }

  const strengths: string[] = [];
  const fullMarks = mark.questions.filter((q) => q.awarded === q.possible && q.possible > 0);
  if (fullMarks.length > 0) {
    strengths.push(
      `You secured every mark on ${fullMarks.length} of ${mark.questions.length} questions, so the knowledge is there.`
    );
  }
  const goodTopics = mark.topics.filter((t) => t.pct >= 80);
  if (goodTopics.length > 0) {
    strengths.push(
      `Strongest on ${listOf(goodTopics.map((t) => t.name))} — above 80% on those chapters.`
    );
  }
  if (mark.confidence === "high") {
    strengths.push("The marker could evidence every point it awarded from your wording, so the marks are firm.");
  }
  if (strengths.length === 0) {
    strengths.push(
      "Nothing scored highly yet, but a marked paper is the fastest diagnostic there is — the faults below are specific, not general."
    );
  }

  // The priority is whatever single habit cost the most marks.
  const byKind = new Map<Fault["kind"], number>();
  for (const f of faults) {
    byKind.set(f.kind, (byKind.get(f.kind) ?? 0) + (f.part.marks - f.result.awarded));
  }
  const ranked = [...byKind.entries()].sort((a, b) => b[1] - a[1]);
  const titles: Record<Fault["kind"], string> = {
    blank: "Questions left unanswered",
    method: "Working not shown",
    accuracy: "Correct method, wrong final value",
    precision: "Right idea, wording that would not score",
    keyword: "Missing key terms",
    depth: "Answers too thin for the marks",
    unsupported: "Claims without evidence",
    arithmetic: "Arithmetic slips",
  };
  const priority =
    ranked.length > 0
      ? {
          title: titles[ranked[0][0]],
          advice: faultAdvice(faults.find((f) => f.kind === ranked[0][0])!),
          marks: ranked[0][1],
        }
      : null;

  const nextSteps: string[] = [];

  const weakest = mark.topics.filter((t) => t.pct < 65).slice(0, 2);
  for (const topic of weakest) {
    nextSteps.push(
      `Redo ${topic.name} as a short topical paper — ${topic.possible - topic.awarded} marks were available there and you took ${topic.awarded}.`
    );
  }

  const commandWords = [...commandTotals.entries()]
    .filter(([word, v]) => v.lost > 0 && COMMAND_ADVICE[word] !== undefined)
    .map(([word, v]) => ({ word, ...v }))
    .sort((a, b) => b.lost - a.lost)
    .slice(0, 3);

  for (const cw of commandWords) {
    const advice = COMMAND_ADVICE[cw.word];
    if (advice) nextSteps.push(`${cw.word.toUpperCase()}: ${advice}`);
  }

  if (nextSteps.length === 0) {
    nextSteps.push("Nothing structural to fix. Move to a harder paper or a full-length one.");
  }

  const pctScore = mark.pct;
  const headline =
    pctScore >= 90
      ? "Excellent paper. The remaining marks are detail, not understanding."
      : pctScore >= 75
        ? "A strong paper. What is left is precision and completeness."
        : pctScore >= 60
          ? "A fair paper. The understanding is there; the technique is costing marks."
          : pctScore >= 40
            ? "The foundations are shaky. Work through the faults below before another paper."
            : "Start with the chapters named below before attempting another full paper.";

  return {
    gradeBand: mark.grade,
    headline,
    strengths,
    faults,
    priority,
    nextSteps: nextSteps.slice(0, 5),
    commandWords,
    markLostToTyping: 0,
  };
}

/** "A", "A and B", "A, B and C" — never "A and B and C". */
function listOf(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function findQuestion(paper: Paper, id: string) {
  for (const section of paper.sections) {
    const found = section.questions.find((q) => q.id === id);
    if (found) return found;
  }
  return undefined;
}

/**
 * Compares this sitting against the student's previous ones. Returns null when
 * there is nothing to compare, so the UI never fabricates a trendline.
 */
export interface Trend {
  label: string;
  detail: string;
  direction: "up" | "down" | "flat";
  delta: number;
}

export function buildTrend(
  current: { pct: number; paperId: string },
  history: { pct: number; subjectId: string; paperId: string; at: number }[]
): Trend | null {
  const previous = history.filter((h) => h.paperId !== current.paperId).slice(0, 8);
  if (previous.length === 0) return null;

  const mean = previous.reduce((sum, h) => sum + h.pct, 0) / previous.length;
  const delta = Math.round(current.pct - mean);
  const direction = delta >= 3 ? "up" : delta <= -3 ? "down" : "flat";

  if (direction === "up") {
    return {
      label: `Up ${delta} points`,
      detail: `Your last ${previous.length === 1 ? "sitting" : `${previous.length} sittings`} averaged ${Math.round(mean)}%. This one scored ${current.pct}%.`,
      direction,
      delta,
    };
  }
  if (direction === "down") {
    return {
      label: `Down ${Math.abs(delta)} points`,
      detail: `Your recent average is ${Math.round(mean)}%; this paper scored ${current.pct}%. One paper is noise — check whether the same fault repeats below.`,
      direction,
      delta,
    };
  }
  return {
    label: "Level with your average",
    detail: `This paper matched your recent average of ${Math.round(mean)}%. Same score, so look for a different fault to fix rather than more of the same practice.`,
    direction,
    delta,
  };
}
