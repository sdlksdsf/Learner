/**
 * Semantic helpers for the marker.
 *
 * Everything here is deterministic and offline: no model call, no network.
 * That is a deliberate constraint — a mark must be reproducible and the same
 * answer must always score the same.
 */

/** Numbers written as words, so "twelve" and "12" are the same answer. */
const NUMBER_WORDS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
  eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
  fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
  nineteen: 19, twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50,
  sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000,
};

export function numbersToDigits(text: string): string {
  return text.replace(
    /\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)\b/g,
    (word) => String(NUMBER_WORDS[word] ?? word)
  );
}

/**
 * Synonym groups. Each group is one concept; any member satisfies any other.
 * Kept to terms that appear in the indexed schemes, so the matcher does not
 * invent equivalences it cannot justify.
 */
const SYNONYM_GROUPS: string[][] = [
  ["velocity", "speed"],
  ["accelerate", "acceleration", "accelerates"],
  ["mass", "weight"],
  ["force", "thrust"],
  ["energy", "energies"],
  ["temperature", "thermal", "heat", "hotter", "warmer"],
  ["current", "amperage"],
  ["voltage", "potential difference", "p.d.", "pd", "emf"],
  ["resistance", "resistor", "resistive"],
  ["charge", "charged"],
  ["frequency", "frequencies"],
  ["wavelength", "wave length"],
  ["concentration", "concentrated", "molarity"],
  ["mole", "moles", "molar"],
  ["acid", "acidic", "acidity"],
  ["alkali", "alkaline", "base", "basic"],
  ["oxidation", "oxidised", "oxidized", "oxidising", "oxidizing"],
  ["reduction", "reduced", "reducing"],
  ["enzyme", "enzymes", "catalyst", "catalysts", "catalyse", "catalyze"],
  ["diffusion", "diffuse", "diffuses"],
  ["osmosis", "osmotic"],
  ["respiration", "respire", "respires"],
  ["photosynthesis", "photosynthesise", "photosynthesize"],
  ["chlorophyll", "chloroplast", "chloroplasts"],
  ["mitosis", "mitotic"],
  ["meiosis", "meiotic"],
  ["allele", "alleles", "gene", "genes", "genotype"],
  ["dominant", "dominance"],
  ["recessive", "recessiveness"],
  ["increase", "increases", "increased", "rise", "rises", "higher", "greater", "grow", "grows"],
  ["decrease", "decreases", "decreased", "fall", "falls", "lower", "smaller", "reduce", "reduces", "drop"],
  ["proportional", "proportionally", "proportionate", "directly proportional"],
  ["inverse", "inversely"],
  ["because", "since", "as", "due to"],
  ["therefore", "hence", "thus", "so", "consequently"],
  ["equals", "equal", "=", "is equal to", "equals to"],
  ["multiplied by", "times", "product", "x"],
  ["divided by", "over", "per"],
  ["plus", "added to", "sum", "and"],
  ["minus", "subtract", "subtracted", "difference", "less"],
  ["squared", "square", "power of 2", "^2"],
  ["cubed", "cube", "power of 3", "^3"],
  ["demand", "demanded"],
  ["supply", "supplied"],
  ["elastic", "elasticity", "inelastic"],
  ["inflation", "inflationary"],
  ["unemployment", "unemployed"],
  ["profit", "profits", "profitable"],
  ["revenue", "turnover", "sales"],
  ["opportunity cost", "opportunity costs"],
  ["externality", "externalities"],
  ["subsidy", "subsidies", "subsidise"],
  ["tariff", "tariffs", "quota", "quotas"],
  ["sustainable", "sustainability"],
  ["pollution", "pollutant", "pollutants", "polluting"],
  ["climate change", "global warming"],
  ["irrigation", "irrigate", "irrigated"],
  ["waterlogging", "water logging", "salinisation", "salinization", "salinity"],
  ["monsoon", "monsoons"],
  ["population", "populations", "demographic"],
  ["migration", "migrate", "migrant", "migrants"],
  ["urbanisation", "urbanization", "urban"],
  ["independence", "independent"],
  ["partition", "partitioned"],
  ["constitution", "constitutional"],
  ["agreement", "treaty", "accord", "pact"],
  ["trade", "trading", "commerce"],
  ["transport", "transportation", "transported"],
  ["binary", "base 2", "base-2"],
  ["algorithm", "algorithms", "procedure"],
  ["recursion", "recursive", "recursively"],
  ["database", "databases"],
  ["encryption", "encrypt", "encrypted", "cipher"],
  ["protocol", "protocols"],
];


/**
 * Physical quantities. A scheme point written as a formula ("Uses Q = It") can
 * only be matched from prose if we know what the symbols stand for, so the
 * mapping is written out explicitly rather than guessed.
 */
const QUANTITY_WORDS: Record<string, string[]> = {
  q: ["charge", "coulombs", "coulomb"],
  i: ["current", "amps", "ampere", "amperes"],
  t: ["time", "seconds", "second", "s"],
  v: ["voltage", "potential difference", "volts", "volt", "p.d."],
  r: ["resistance", "ohms", "ohm"],
  f: ["force", "newtons", "newton"],
  m: ["mass", "kilograms", "kilogram", "kg"],
  a: ["acceleration", "metres per second squared"],
  e: ["energy", "joules", "joule"],
  p: ["power", "watts", "watt", "pressure", "pascals"],
  w: ["work", "energy", "joules"],
  n: ["moles", "mole", "mol"],
  c: ["concentration", "speed of light"],
  g: ["gravitational field strength", "grams", "gram"],
};

/** Symbols named in a formula point, e.g. "Q = It" -> ["q","t"] plus I. */
export function formulaQuantities(point: string): string[] {
  if (!/[=]/.test(point)) return [];
  const tokens = point
    .replace(/[^A-Za-z=\/+\-\s]/g, " ")
    .split(/[^A-Za-z]+/)
    .map((w) => w.toLowerCase())
    .filter(Boolean);

  const symbols: string[] = [];
  for (const token of tokens) {
    if (token.length === 1 && QUANTITY_WORDS[token]) {
      symbols.push(token);
      continue;
    }
    // Products are written run together: "It" is I × t, "Pt" is P × t.
    if (token.length <= 3 && [...token].every((ch) => QUANTITY_WORDS[ch])) {
      symbols.push(...token);
    }
  }
  return Array.from(new Set(symbols));
}

/** Is every quantity in the formula named, in words or symbols, by the answer? */
export function namesFormulaQuantities(answer: string, point: string): boolean {
  const needed = formulaQuantities(point);
  if (needed.length === 0) return false;
  const words = new Set(contentWords(answer));
  const raw = ` ${numbersToDigits(answer.toLowerCase())} `;
  let named = 0;
  for (const sym of needed) {
    const alternatives = QUANTITY_WORDS[sym] ?? [];
    const hit =
      alternatives.some((alt) => words.has(stem(alt)) || raw.includes(` ${alt}`)) ||
      new RegExp(`(^|[^a-z])${sym}([^a-z]|$)`).test(raw);
    if (hit) named += 1;
  }
  return named >= Math.max(2, needed.length - 1);
}

const canonical = new Map<string, string>();
for (const group of SYNONYM_GROUPS) {
  const key = group[0];
  for (const member of group) canonical.set(member, key);
}

const STOP_WORDS = new Set([
  "the", "and", "from", "with", "that", "this", "for", "into", "was", "were",
  "are", "has", "have", "had", "its", "their", "there", "which", "where",
  "when", "what", "will", "would", "can", "could", "should", "may", "might",
  "must", "shall", "than", "then", "them", "they", "you", "your", "our",
  "his", "her", "him", "she", "he", "it", "not", "but", "all", "any", "each",
  "more", "most", "some", "such", "only", "also", "very", "just", "about",
  "between", "over", "under", "after", "before", "during", "because", "since",
  "obtains", "obtain", "uses", "use", "states", "state", "finds", "find",
  "calculates", "calculate", "shows", "show", "writes", "write", "gives",
  "give", "correct", "correctly", "answer", "value", "final", "form", "using",
  "given", "hence", "total", "number", "make", "made", "makes",
]);

/** Crude stemmer: enough to match "collides"/"collision" and "ions"/"ion". */
export function stem(word: string): string {
  // never stem a one- or two-character token: A, B, I, Q are labels here
  if (word.length <= 2) return word;
  let w = word;
  if (w.length > 5 && w.endsWith("ation")) return w.slice(0, -5);
  if (w.length > 5 && w.endsWith("ising")) w = w.slice(0, -5) + "ise";
  else if (w.length > 5 && w.endsWith("izing")) w = w.slice(0, -5) + "ize";
  if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 4 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
  else if (w.length > 4 && w.endsWith("es")) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  return w;
}

export function contentWords(text: string): string[] {
  return numbersToDigits(text)
    .split(/[^\p{L}\p{N}^.*+\/=°-]+/u)
    .map((w) => w.trim())
    // single digits and single letters count: "0" answers a truth table, and
    // "A B D C" is a traversal order
    .filter((w) => !STOP_WORDS.has(w))
    .map((w) => stem(w))
    .filter(Boolean);
}

export function conceptOf(word: string): string {
  const direct = canonical.get(word);
  if (direct) return stem(direct);
  const stemmed = stem(word);
  return canonical.get(stemmed) ? stem(canonical.get(stemmed)!) : stemmed;
}

/**
 * How much of a scheme point's content the answer actually covers, 0–1.
 * Concept-aware, so "the particles collide more often" covers a point that
 * says "collisions become more frequent".
 */
export function coverage(
  answer: string,
  point: string
): { ratio: number; hits: string[]; total: number } {
  const pointWords = contentWords(point).map(conceptOf);
  const unique = Array.from(new Set(pointWords));
  if (unique.length === 0) return { ratio: 0, hits: [], total: 0 };

  const answerWords = new Set(contentWords(answer).map(conceptOf));
  const answerText = ` ${contentWords(answer).join(" ")} `;
  const hits = unique.filter(
    (w) => answerWords.has(w) || (w.length > 4 && answerText.includes(w))
  );
  return { ratio: hits.length / unique.length, hits, total: unique.length };
}

/**
 * Is the answer a plausible attempt at the question, rather than noise?
 * Used to keep an empty or unrelated response from earning scheme-wording
 * marks through incidental word overlap.
 */
export function isPlausibleAttempt(answer: string, prompt: string, point: string): boolean {
  const answerWords = new Set(contentWords(answer).map(conceptOf));
  if (answerWords.size === 0) return false;
  const context = Array.from(
    new Set([...contentWords(prompt), ...contentWords(point)].map(conceptOf))
  );
  if (context.length === 0) return true;
  const overlap = context.filter((w) => answerWords.has(w)).length;
  return overlap > 0 || answerWords.size >= 6;
}

/* ------------------------------ Algebra ---------------------------------- */

/**
 * Reads a factorised product into its roots: "(x - 4)(x - 5)" -> [4, 5] and
 * "x = 4 or x = 5" -> [4, 5]. Two different-looking correct forms of the same
 * answer then compare equal.
 */
export function rootsOf(text: string): number[] | null {
  const t = numbersToDigits(text.replace(/−/g, "-")).toLowerCase();

  // x = 4 or x = 5  |  x = 4, 5  |  x=4 and x=5
  const equations = [...t.matchAll(/x\s*=\s*(-?\d+(?:\.\d+)?)/g)].map((m) => Number(m[1]));
  if (equations.length >= 2) return Array.from(new Set(equations)).sort((a, b) => a - b);

  // (x - 4)(x + 5)  |  (x minus 4)(x minus 5)  |  (x-4)(x-5)
  const factors = [
    ...t.matchAll(/\(\s*x\s*(?:([+-])\s*(\d+(?:\.\d+)?)|(minus|plus)\s*(\d+(?:\.\d+)?))\s*\)/g),
  ].map((m) =>
    m[1] !== undefined
      ? [m[1], m[2]]
      : [m[3] === "minus" ? "-" : "+", m[4]]
  );
  if (factors.length >= 2) {
    const roots = factors.map(([sign, value]) =>
      sign === "-" ? Number(value) : -Number(value)
    );
    return Array.from(new Set(roots)).sort((a, b) => a - b);
  }
  return null;
}

/** Exact, order-independent comparison of two algebraic answers. */
export function sameRootSet(a: string, b: string): boolean {
  const ra = rootsOf(a);
  const rb = rootsOf(b);
  if (!ra || !rb) return false;
  if (ra.length !== rb.length) return false;
  return ra.every((v, i) => Math.abs(v - rb[i]) < 1e-9);
}


/**
 * A restatement of the question is not an answer.
 *
 * Word overlap alone is a poor test: "Atoms of the same element with the same
 * number of protons" answers a question phrased in similar words. What makes a
 * restatement useless is that it supplies nothing the scheme asks for, so the
 * caller passes the scheme and this only fires when nothing in the scheme is
 * present.
 */
export function isRestatement(answer: string, prompt: string): boolean {
  // Only prose can echo a question. A formula, a list of roots or a value
  // written in the question's own notation is an answer, so leave it alone.
  if (/[=\^\/()×÷]|⁻|²|³/.test(answer)) return false;
  if ((answer.match(/\d/g) ?? []).length > 1) return false;

  const isWord = (w: string) => /^[\p{L}]{2,}$/u.test(w);
  const words = Array.from(new Set(contentWords(answer).map(conceptOf))).filter(isWord);
  if (words.length === 0) return false;

  // Compare against the question's own vocabulary. Any word the answer brings
  // that the question does not contain is new information, and the normal
  // scoring decides whether it earns a mark.
  const asked = new Set(contentWords(prompt).map(conceptOf).filter(isWord));
  if (asked.size === 0) return false;

  const novel = words.filter((w) => !asked.has(w));
  return novel.length === 0 && words.length <= asked.size + 2;
}

/**
 * Keyword stuffing: a list of scheme terms with no sentence carrying them.
 * Detected by checking that the answer's words are mostly scheme keywords and
 * that it has little structure (short, no verbs of reasoning).
 */
export function looksLikeKeywordSalad(
  answer: string,
  keywords: string[],
  pointText = ""
): boolean {
  const words = contentWords(answer);
  if (words.length === 0) return false;
  const kwWords = new Set(keywords.flatMap((k) => contentWords(k)).map(conceptOf));
  if (kwWords.size === 0) return false;
  const inside = words.filter((w) => kwWords.has(conceptOf(w))).length;
  const scheme = new Set(contentWords(pointText).map(conceptOf));
  const contributes = words.filter((w) => scheme.has(conceptOf(w))).length;
  if (contributes > 0) return false;
  const connecting = /\b(because|so|therefore|which|when|as|since|means|equal|gives|makes|causes|due|allows|results)\b/i.test(answer);
  return inside / words.length > 0.6 && !connecting && words.length < 40;
}
