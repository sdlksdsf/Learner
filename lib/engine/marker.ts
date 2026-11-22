import type {
  AttemptResult,
  MarkPointResult,
  Part,
  PartResult,
  Paper,
  QuestionResult,
  TopicResult,
} from "@/lib/types";
import { getSubject } from "@/lib/data/subjects";
import { gradeFor } from "@/lib/engine/grade";
import { clamp, pct } from "@/lib/format";
import {
  coverage,
  stem,
  isPlausibleAttempt,
  looksLikeKeywordSalad,
  namesFormulaQuantities,
  numbersToDigits,
  sameRootSet,
} from "@/lib/engine/semantic";

const SUPERSCRIPTS: Record<string, string> = {
  "⁻": "-",
  "⁺": "+",
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
};

export const normalize = (input: string): string =>
  numbersToDigits(
    input
      .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => SUPERSCRIPTS[c] ?? c)
    .replace(/[^\p{L}\p{N}\s+\-*/=().,%×÷^:'"°]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
  );

export const extractNumbers = (input: string): number[] => {
  const clean = input
    .replace(/[,\s](?=\d{3}\b)/g, "")
    .replace(/[−–]/g, "-");
  const out: number[] = [];
  // fractions are written as a/b in most schemes; keep the quotient too
  const frac = /(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g;
  let f: RegExpExecArray | null;
  while ((f = frac.exec(clean))) {
    const den = Number(f[2]);
    if (den !== 0) {
      const value = Number(f[1]) / den;
      if (Number.isFinite(value)) out.push(value);
    }
  }
  const re = /-?\d+(?:\.\d+)?(?:\s*×\s*10\s*\^?\s*-?\d+)?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean))) {
    const raw = m[0].replace(/\s+/g, "");
    if (raw.includes("×10")) {
      const [base, exp] = raw.split("×10");
      const e = Number(exp.replace(/\^/g, ""));
      const value = Number(base) * Math.pow(10, e);
      if (Number.isFinite(value)) out.push(value);
    } else {
      const value = Number(raw);
      if (Number.isFinite(value)) out.push(value);
    }
  }
  return out;
};

const matchesNumeric = (value: number, point: number, tol?: number): boolean => {
  const tolerance = tol ?? Math.max(0.01, Math.abs(point) * 0.005);
  return Math.abs(value - point) <= tolerance;
};

const matchesKeywords = (
  normalized: string,
  keywords: string[]
): { hits: number; matched: string[] } => {
  let hits = 0;
  const matched: string[] = [];
  const tokens = new Set(normalized.split(/[^\p{L}\p{N}^*.+\/=°-]+/u).filter(Boolean));
  // Words after inflection is stripped, so "memorised" answers "memorise".
  // Prefix matching alone is not enough ("memoris" is a fragment), so keep the
  // full stem too. Word-level stems still reject "powerhouse" for "power".
  const stems = new Set([...tokens].map((t) => stem(t)));
  for (const t of [...tokens]) for (const w of t.split(/[^\p{L}\p{N}]+/u)) if (w) stems.add(stem(w));
  for (const kw of keywords) {
    const alternatives = kw
      .split("|")
      .map((a) => normalize(a))
      .filter(Boolean);
    const hit = alternatives.some((a) => {
      if (a.includes(" ")) return normalized.includes(a);
      // A lone word must be a word. Substring matching let "power" match
      // "powerhouse", which credited an answer that said nothing of the sort.
      if (/^[\p{L}\p{N}]+$/u.test(a)) {
        const target = stem(a);
        // A whole word must match a whole word, then their stems must agree.
        // Substrings are refused: "power" must not answer "powerhouse".
        if (tokens.has(a)) return true;
        for (const t of tokens) {
          for (const w of t.split(/[^\p{L}\p{N}]+/u)) {
            if (!w) continue;
            const ws = stem(w);
            if (ws === target) return true;
            // A scheme fragment ("memoris") may match its inflections, but only
            // when what follows is a suffix and nothing else. "power" therefore
            // cannot swallow "powerhouse", while "memoris" reaches "memorised".
            if (target.length >= 4 && ws.startsWith(target)) {
              const tail = ws.slice(target.length);
              if (/^(e|d|ed|es|ing|s|y|ation|ise|ize|al|ally)$/.test(tail)) return true;
            }
          }
        }
        return false;
      }
      return normalized.includes(a);
    });
    if (hit) {
      hits += 1;
      matched.push(kw);
    }
  }
  return { hits, matched };
};

const STOP = new Set([
  "obtains", "obtain", "uses", "use", "states", "state", "finds", "find",
  "calculates", "calculate", "shows", "show", "the", "and", "from", "with",
  "that", "this", "for", "into", "value", "answer", "final", "hence",
  "correct", "correctly", "giving", "give", "gives", "writes", "write",
  "form", "using", "given", "which", "where", "when", "there", "their",
  "or", "of", "to", "in", "on", "is", "are", "be", "by", "as", "an",
  "a", "it", "its", "at", "so", "then", "both", "each", "all", "any",
]);

const SQUASH: Record<string, string[]> = {
  "÷": ["/"], "−": ["-"], "–": ["-"], "×": ["*", "x"], "²": ["^2"],
  "³": ["^3"], "⁻¹": ["^-1"], "½": ["1/2"],
};

/** Split a response into signed units: words, numbers and algebra terms keep
 *  their sign, so "+8x" never matches "−8x". */
const tokenize = (input: string): string[] => {
  let text = normalize(input);
  for (const [symbol, alts] of Object.entries(SQUASH)) {
    for (const alt of alts) text = text.split(symbol).join(` ${alt} `);
  }
  const tokens: string[] = [];
  let sign = "";
  let current = "";
  const flush = () => {
    const clean = current.replace(/^[.]+|[.]+$/g, "");
    if (clean && !STOP.has(clean)) {
      const token = sign + clean;
      if (!tokens.includes(token)) tokens.push(token);
    }
    sign = "";
    current = "";
  };
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "+" || ch === "-") {
      const prev = text[i - 1];
      if (prev === "^" || prev === "*") {
        current += ch;
        continue;
      }
      flush();
      sign = ch === "-" ? "-" : "+";
      continue;
    }
    if (/\s/.test(ch)) {
      // keep a pending sign across the space in "- 8x"
      if (current) flush();
      continue;
    }
    if (/[\p{L}\p{N}./^*°]/u.test(ch)) {
      current += ch;
    } else {
      flush();
    }
  }
  flush();
  return tokens.map((t) => t.replace(/\^/g, ""));
};

const isNumericLike = (token: string): boolean => /^[+-]?\d+(\.\d+)?$/.test(token);

const signedNumber = (token: string): number | null => {
  if (!/^[+-]?\d+(\.\d+)?$/.test(token)) return null;
  const value = Number(token);
  return Number.isFinite(value) ? value : null;
};

/** Phrase containment that respects token boundaries, so "+5" does not match
 *  inside "12" and "5" does not match inside "50". */
const includesPhrase = (haystack: string, needle: string): boolean => {
  if (!needle) return false;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^\\p{L}\\p{N}.])${escaped}($|[^\\p{L}\\p{N}.])`, "u");
  return pattern.test(haystack);
};

/**
 * Inside a bracket, a sign is part of the term. "(x + 4)" and "(x − 4)" factor
 * different quadratics, so the sign must be compared, not stripped.
 */
const bracketsOf = (text: string): string[] =>
  (text.match(/\([^()]*\)/g) ?? []).map((b) => normalize(b).replace(/\s+/g, ""));

const signChanged = (answer: string, accepted: string): boolean => {
  const a = bracketsOf(answer);
  const b = bracketsOf(accepted);
  // Only a bracket-for-bracket comparison can judge a sign. A worked solution
  // legitimately contains other brackets on the way to the same factorisation.
  if (a.length === 0 || b.length === 0 || a.length !== b.length) return false;
  // Every bracket in the answer must appear in the accepted form with the same
  // signs. "(x + 4)(x + 5)" fails "(x - 4)(x - 5)" on both brackets.
  const pool = [...b];
  for (const bracket of a) {
    const idx = pool.indexOf(bracket);
    if (idx === -1) return true;
    pool.splice(idx, 1);
  }
  return false;
};

const tokenHit = (answerTokens: string[], token: string): boolean => {
  const bare = token.replace(/\^/g, "");
  if (answerTokens.includes(bare)) return true;
  const value = signedNumber(bare);
  if (value !== null) {
    return answerTokens.some((a) => {
      const other = signedNumber(a);
      return (
        other !== null &&
        Math.abs(other - value) <= Math.max(0.01, Math.abs(value) * 0.005) &&
        Math.sign(other) === Math.sign(value)
      );
    });
  }
  return false;
};

const pointResult = (
  part: Part,
  point: Part["scheme"][number],
  normalized: string,
  numbers: number[],
  impliedFinal: boolean,
  answerNumbers: number[],
  answerNormalized: string
): MarkPointResult => {
  let awarded = 0;
  const matched: string[] = [];

  if (point.numeric !== undefined) {
    const direct = numbers.some((n) => matchesNumeric(n, point.numeric as number, point.tol));
    if (direct || impliedFinal) {
      awarded = point.marks;
      matched.push(`${point.numeric}`);
    }
  }

  if (awarded === 0 && point.accept?.length) {
    if (
      point.accept.some(
        (a) =>
          includesPhrase(normalized, normalize(a)) &&
          !signChanged(normalized, normalize(a)) &&
          // a bare number in an accept list must be the whole value written
          !(/^[+-]?\d+(\.\d+)?$/.test(normalize(a)) && !numbers.some((n) => matchesNumeric(n, Number(normalize(a)))))
      )
    ) {
      awarded = point.marks;
      matched.push("accepted wording");
    }
  }

  if (awarded === 0 && point.keywords?.length) {
    const { hits, matched: kwMatched } = matchesKeywords(normalized, point.keywords);
    if (hits > 0) {
      matched.push(...kwMatched);
      const required = Math.min(
        point.hits ?? (point.marks >= 2 ? 2 : 1),
        point.keywords.length
      );
      if (hits >= required) awarded = point.marks;
      else awarded = Math.floor((point.marks * hits) / required);
    }
  }

  // Algebra written in a different but equivalent form: the factorised product
  // and the list of roots are the same answer, and either earns the marks.
  if (awarded === 0 && sameRootSet(normalized, normalize(point.text))) {
    awarded = point.marks;
    matched.push("equivalent form of the answer");
  }

  // A scheme point written as a formula ("Uses Q = It") matched from prose that
  // names the quantities rather than the symbols.
  if (awarded === 0 && point.marks <= 2 && namesFormulaQuantities(normalized, point.text)) {
    awarded = point.marks;
    matched.push("names the quantities in the formula");
  }

  // Semantic coverage: synonyms, stems and number words, so a correct idea
  // phrased differently is credited. Requires a plausible attempt at the
  // question, which stops an unrelated answer earning marks by accident.
  if (awarded === 0) {
    const cov = coverage(normalized, point.text);
    const threshold = point.marks >= 2 ? 0.55 : 0.5;
    // When the scheme point itself is written in brackets, the sign carries
    // the meaning and coverage must not paper over it.
    if (
      !signChanged(normalized, normalize(point.text)) &&
      cov.ratio >= threshold &&
      cov.hits.length >= (point.marks >= 2 ? 2 : 1) &&
      isPlausibleAttempt(normalized, part.prompt, point.text)
    ) {
      awarded = point.marks;
      matched.push(...cov.hits.slice(0, 4));
    }
  }

  // Examiner-style evidence match: the candidate must show the ideas the
  // scheme names, not merely restate the model answer.
  if (awarded === 0 && !signChanged(normalized, normalize(point.text))) {
    const answerTokens = tokenize(normalized);
    // "powerhouse" must not answer a point about "power": a token that runs
    // together with more letters is a different word, not the scheme's term.
    const answerSet = new Set(answerTokens);
    const isRealToken = (t: string) => {
      if (answerSet.has(t)) return true;
      if (t.length < 4) return false;
      return normalized.split(/[^\p{L}\p{N}]+/u).includes(t); // matched via a split of a compound
    };
    if (answerTokens.length > 0) {
      const meaningful = tokenize(point.text).filter(
        (t) => t.length > 1 || isNumericLike(t)
      );
      const hits = meaningful.filter((t) => isRealToken(t) && tokenHit(answerTokens, t));
      const required =
        meaningful.length <= 2
          ? meaningful.length
          : Math.max(2, Math.ceil(meaningful.length * 0.6));
      // a point naming algebra or a value needs every term: a sign flipped on
      // any term is a different expression, not a partial one
      const needsAll = meaningful.some((t) => isNumericLike(t) || t.length > 1);
      if (
        meaningful.length > 0 &&
        hits.length >= (needsAll ? meaningful.length : required)
      ) {
        awarded = point.marks;
        matched.push("scheme wording");
      }
    }
  }

  return {
    text: point.text,
    marks: point.marks,
    awarded: clamp(awarded, 0, point.marks),
    matched,
  };
};

const commentFor = (part: Part, points: MarkPointResult[], blank: boolean): string => {
  if (blank) return "No response recorded.";
  const awarded = points.reduce((s, p) => s + p.awarded, 0);
  if (awarded >= part.marks) {
    if (points.some((p) => p.matched.includes("implied by correct answer"))) {
      return "Full marks. The final answer is correct; working is implied.";
    }
    return "Full marks. Clear and complete.";
  }
  const missed = points.filter((p) => p.awarded < p.marks);
  if (missed.length === 0) return "Awarded.";
  const list = missed
    .slice(0, 2)
    .map((p) => p.text.replace(/\.$/, ""))
    .join("; ");
  return `The mark scheme also looks for: ${list}.`;
};

const confidenceFor = (part: Part, blank: boolean): PartResult["confidence"] => {
  if (blank) return "high";
  if (part.type === "extended") return "low";
  const hasNumeric = part.scheme.some((p) => p.numeric !== undefined || p.accept?.length);
  return hasNumeric ? "high" : "medium";
};

export function markPart(part: Part, answer: string): PartResult {
  const normalized = normalize(answer ?? "");
  const blank = normalized.length < 1;

  // A list of scheme terms with no sentence carrying them is not an answer.
  // Scoped narrowly: it needs a keyword-heavy short string with no reasoning
  // connective, so a one-word answer like "Acidic" is never caught.
  const salad =
    !blank &&
    normalized.split(/\s+/).length >= 6 &&
    looksLikeKeywordSalad(
      normalized,
      part.scheme.flatMap((p) => p.keywords ?? []),
      part.scheme.map((p) => p.text).join(" ")
    );

  if (salad) {
    return {
      partId: part.id,
      label: part.label,
      prompt: part.prompt,
      possible: part.marks,
      awarded: 0,
      points: part.scheme.map((p) => ({ text: p.text, marks: p.marks, awarded: 0, matched: [] })),
      confidence: "medium",
      blank: false,
      comment:
        "This is a list of terms rather than an answer. Write the reasoning that connects them.",
    };
  }

  const numbers = blank ? [] : extractNumbers(normalized);
  const numericPoints = part.scheme.filter((p) => p.numeric !== undefined);
  const finalPoint = numericPoints[numericPoints.length - 1];
  const impliedFinal =
    numbers.length === 1 &&
    finalPoint?.numeric !== undefined &&
    matchesNumeric(numbers[0], finalPoint.numeric, finalPoint.tol);

  const answerNormalized = normalize(part.answer ?? "");
  const answerNumbers = blank ? [] : extractNumbers(answerNormalized);

  const points = part.scheme.map((point) =>
    pointResult(part, point, normalized, numbers, impliedFinal, answerNumbers, answerNormalized)
  );

  // CAIE convention: a correct final answer with no working shown implies the
  // method marks, unless the question explicitly asks for working. Only the
  // final numeric point on the scheme can trigger this.
  const isCalculation =
    part.type === "calculation" ||
    part.scheme.some((p) => p.numeric !== undefined || p.accept?.length);
  const tokenCount = normalized ? normalized.split(" ").length : 0;
  // Only a single numeric answer can stand in for working (C1 convention).
  // Algebraic schemes are matched term by term instead.
  const correctFinalAnswer =
    finalPoint?.numeric !== undefined &&
    numbers.some((n) => matchesNumeric(n, finalPoint.numeric as number, finalPoint.tol));
  const impliedMethod =
    isCalculation &&
    !blank &&
    tokenCount <= 6 &&
    correctFinalAnswer &&
    points.some((p) => p.awarded < p.marks);

  if (impliedMethod) {
    for (const point of points) {
      if (point.awarded < point.marks) {
        point.awarded = point.marks;
        point.matched.push("implied by correct answer");
      }
    }
  }

  // A candidate who writes the model answer verbatim has shown every idea the
  // scheme names, even when the scheme lists them as separate points.
  const answerTokens = tokenize(answerNormalized);
  const writtenTokens = tokenize(normalized);
  const sameAnswer =
    !blank &&
    writtenTokens.length > 0 &&
    writtenTokens.length === answerTokens.length &&
    writtenTokens.every((t) => answerTokens.includes(t));

  if (sameAnswer && points.some((p) => p.awarded < p.marks)) {
    for (const point of points) {
      if (point.awarded < point.marks) {
        point.awarded = point.marks;
        point.matched.push("matches the model answer");
      }
    }
  }

  const awarded = Math.min(
    part.marks,
    points.reduce((s, p) => s + p.awarded, 0)
  );

  return {
    partId: part.id,
    label: part.label,
    prompt: part.prompt,
    possible: part.marks,
    awarded,
    points,
    confidence: confidenceFor(part, blank),
    blank,
    comment: commentFor(part, points, blank),
  };
}

export function markAttempt(
  paper: Paper,
  answers: Record<string, string>,
  adjustments: Record<string, number> = {}
): AttemptResult {
  const questions: QuestionResult[] = [];
  const topicMap = new Map<string, { possible: number; awarded: number }>();
  let hasExtended = false;
  let hasKeyword = false;

  for (const section of paper.sections) {
    for (const question of section.questions) {
      const parts: PartResult[] = [];
      let qPossible = 0;
      let qAwarded = 0;

      for (const part of question.parts) {
        let result = markPart(part, answers[part.id] ?? "");
        if (adjustments[part.id] !== undefined) {
          result = {
            ...result,
            awarded: clamp(Math.round(adjustments[part.id]), 0, part.marks),
          };
        }
        if (part.type === "extended") hasExtended = true;
        if (part.scheme.some((p) => p.keywords?.length)) hasKeyword = true;
        qPossible += result.possible;
        qAwarded += result.awarded;
        parts.push(result);

        const entry = topicMap.get(question.topicId) ?? { possible: 0, awarded: 0 };
        entry.possible += result.possible;
        entry.awarded += result.awarded;
        topicMap.set(question.topicId, entry);
      }

      const missed = parts
        .filter((p) => p.awarded < p.possible)
        .slice(0, 2)
        .map((p) => p.label || "part")
        .join(" and ");
      questions.push({
        questionId: question.id,
        topicId: question.topicId,
        possible: qPossible,
        awarded: qAwarded,
        parts,
        comment:
          qAwarded >= qPossible
            ? "All marks secured."
            : missed
              ? `Lost marks in ${missed}. ${parts.find((p) => p.awarded < p.possible)?.points.find((x) => x.awarded < x.marks)?.text ?? ""}`.trim()
              : "Check the mark scheme points.",
      });
    }
  }

  const total = questions.reduce((s, q) => s + q.possible, 0);
  const score = questions.reduce((s, q) => s + q.awarded, 0);
  const percentage = pct(score, total);
  const subject = getSubject(paper.subjectId);
  const grade = subject ? gradeFor(percentage, paper.level, subject) : "U";

  const topics: TopicResult[] = paper.topics
    .map((t) => {
      const entry = topicMap.get(t.id) ?? { possible: 0, awarded: 0 };
      return {
        id: t.id,
        name: t.name,
        possible: entry.possible,
        awarded: entry.awarded,
        pct: pct(entry.awarded, entry.possible),
      };
    })
    .filter((t) => t.possible > 0)
    .sort((a, b) => a.pct - b.pct);

  const focus = topics.filter((t) => t.pct < 65).slice(0, 3).map((t) => t.name);
  const weakest = topics[0];

  let summary = "";
  if (percentage >= 100) {
    summary = "Every mark secured. Move to a harder paper or another chapter.";
  } else if (percentage >= 85) {
    summary =
      weakest && weakest.pct < 70
        ? `A strong paper at ${percentage}%. ${weakest.name} is the only place worth another pass.`
        : `A strong paper at ${percentage}%. Keep the method sharp, then raise the difficulty.`;
  } else if (percentage >= 70) {
    summary = `A solid paper at ${percentage}%. ${weakest ? `Tighten ${weakest.name.toLowerCase()} before the next attempt.` : ""}`;
  } else if (percentage >= 50) {
    summary = `The foundations are there at ${percentage}%. ${weakest ? `Start with ${weakest.name.toLowerCase()} — the marks lost there are the cheapest to win back.` : ""}`;
  } else {
    summary = `This paper maps the work ahead at ${percentage}%. ${weakest ? `Rebuild ${weakest.name.toLowerCase()} from the notes, then try a shorter topical paper.` : ""}`;
  }

  return {
    score,
    total,
    pct: percentage,
    grade,
    questions,
    topics,
    confidence: hasExtended ? "low" : hasKeyword ? "medium" : "high",
    summary,
    focusTopics: focus,
  };
}
