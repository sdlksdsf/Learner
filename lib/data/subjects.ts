import type { GradeBand, Level, PaperSpec, Stage, Subject, Topic } from "@/lib/types";

const paperSpecs = (prefix: string): PaperSpec[] => [
  {
    id: `${prefix}-structured`,
    label: "Structured paper",
    marks: 60,
    minutes: 90,
    description: "Short and medium answer questions across the syllabus.",
  },
  {
    id: `${prefix}-extended`,
    label: "Extended paper",
    marks: 80,
    minutes: 120,
    description: "Longer structured questions with extended responses.",
  },
];

const igcseSpecs = paperSpecs("igcse");
const asSpecs = paperSpecs("as");
const alevelSpecs = paperSpecs("alevel");

const igcseThresholds: GradeBand[] = [
  { grade: "A*", pct: 82 },
  { grade: "A", pct: 68 },
  { grade: "B", pct: 57 },
  { grade: "C", pct: 46 },
  { grade: "D", pct: 36 },
  { grade: "E", pct: 26 },
  { grade: "F", pct: 16 },
  { grade: "G", pct: 6 },
];

const asThresholds: GradeBand[] = [
  { grade: "A", pct: 80 },
  { grade: "B", pct: 68 },
  { grade: "C", pct: 58 },
  { grade: "D", pct: 48 },
  { grade: "E", pct: 38 },
];

const alevelThresholds: GradeBand[] = [
  { grade: "A*", pct: 85 },
  { grade: "A", pct: 72 },
  { grade: "B", pct: 60 },
  { grade: "C", pct: 49 },
  { grade: "D", pct: 39 },
  { grade: "E", pct: 29 },
];

const t = (
  id: string,
  name: string,
  code: string,
  frequency: number,
  lastSeen: string,
  trend: Topic["trend"],
  avgMarks: number,
  blurb: string
): Topic => ({ id, name, code, frequency, lastSeen, trend, avgMarks, blurb });

/* ---------------------------------- Maths --------------------------------- */

const mathsIgcseTopics: Topic[] = [
  t("num", "Number & ratio", "C1", 9, "2025", "up", 9, "Percentages, ratio, proportional change and money."),
  t("alg", "Algebra & graphs", "C2", 10, "2025", "flat", 13, "Expressions, equations, sequences and function notation."),
  t("geo", "Geometry & trigonometry", "C3", 8, "2024", "flat", 11, "Circle theorems, similarity, sine and cosine rules, bearings."),
  t("stat", "Statistics & probability", "C4", 7, "2025", "up", 9, "Averages, cumulative frequency, box plots and probability trees."),
];

const mathsAdvancedTopics: Topic[] = [
  t("quad", "Quadratics & functions", "P1 §1–3", 9, "2025", "flat", 8, "Discriminants, transformations, composite and inverse functions."),
  t("trig", "Trigonometry", "P1 §5 · P3 §3", 8, "2025", "up", 8, "Identities, equations and the harmonic form."),
  t("calc", "Calculus", "P1 §7–8 · P3 §5–6", 10, "2025", "flat", 13, "Rates of change, optimisation, area and differential equations."),
  t("vec", "Vectors & coordinate geometry", "P1 §9 · P3 §4", 7, "2024", "flat", 8, "Lines, planes, intersections and vector proofs."),
  t("stat", "Probability & statistics", "P1 §6 · P5–P6", 8, "2025", "up", 8, "Binomial, normal, sampling and hypothesis tests."),
];

/* --------------------------------- Physics -------------------------------- */

const physicsIgcseTopics: Topic[] = [
  t("forces", "Forces & motion", "C1–2", 10, "2025", "flat", 10, "Motion graphs, Newton's laws, momentum and turning forces."),
  t("energy", "Energy & work", "C3", 9, "2025", "up", 9, "Work, power, efficiency and energy stores."),
  t("waves", "Waves & light", "C4", 8, "2024", "flat", 9, "Wave behaviour, reflection, refraction and the electromagnetic spectrum."),
  t("elec", "Electricity & magnetism", "C5–6", 9, "2025", "up", 10, "Charge, current, resistance, circuits and electromagnetism."),
  t("therm", "Thermal physics", "C7", 6, "2024", "flat", 7, "Particles, heat capacity and changes of state."),
];

const physicsAdvancedTopics: Topic[] = [
  t("mech", "Mechanics", "AS §1–4", 10, "2025", "flat", 12, "Kinematics, dynamics, moments, work, energy and power."),
  t("elec", "Electricity & circuits", "AS §8–11", 9, "2025", "up", 9, "Charge, potential difference, resistance and Kirchhoff's laws."),
  t("waves", "Waves & superposition", "AS §12–14", 8, "2025", "flat", 8, "Progressive and stationary waves, interference and diffraction."),
  t("mat", "Materials & matter", "AS §6–7", 6, "2024", "down", 6, "Density, elasticity, Young modulus and pressure."),
  t("nuc", "Nuclear & quantum", "A2 §23–26", 8, "2025", "up", 8, "Photons, energy levels, decay, fission and fusion."),
];

/* -------------------------------- Chemistry ------------------------------- */

const chemIgcseTopics: Topic[] = [
  t("atom", "Atomic structure & bonding", "C2–4", 9, "2025", "flat", 8, "Ions, ionic and covalent bonding, giant structures."),
  t("mole", "Stoichiometry & moles", "C5", 10, "2025", "up", 9, "Moles, concentrations, yields and electrolysis calculations."),
  t("acids", "Acids, bases & salts", "C8–9", 8, "2024", "flat", 8, "Titrations, pH, solubility and salt preparation."),
  t("org", "Organic chemistry", "C14", 7, "2025", "up", 8, "Hydrocarbons, alcohols, carboxylic acids and polymers."),
  t("metals", "Metals & reactivity", "C10", 6, "2024", "flat", 7, "Reactivity series, extraction and alloys."),
];

const chemAdvancedTopics: Topic[] = [
  t("struct", "Structure & bonding", "AS §1–4", 8, "2025", "flat", 7, "Bonding, shapes, intermolecular forces and lattice energy."),
  t("energetics", "Energetics", "AS §5", 8, "2025", "up", 7, "Enthalpy changes, Hess cycles and Born–Haber cycles."),
  t("kin", "Kinetics & equilibria", "AS §6–8", 9, "2025", "flat", 8, "Rate equations, catalysis and Le Chatelier."),
  t("org", "Organic chemistry", "AS §10–15", 10, "2025", "up", 9, "Mechanisms, functional groups and analysis."),
  t("redox", "Redox, acids & electrochemistry", "A2 §21–24", 7, "2024", "flat", 7, "Oxidation states, electrolysis, buffers and pH."),
];

/* --------------------------------- Biology -------------------------------- */

const bioIgcseTopics: Topic[] = [
  t("cells", "Cells & organisation", "C1–2", 9, "2025", "flat", 8, "Cell structure, specialisation and organisation."),
  t("transport", "Transport in plants & animals", "C7–9", 8, "2024", "flat", 9, "Diffusion, osmosis, active transport and circulatory systems."),
  t("energy", "Respiration & photosynthesis", "C5–6", 8, "2025", "up", 8, "Enzymes, photosynthesis and aerobic respiration."),
  t("genetics", "Genetics & inheritance", "C16–18", 9, "2025", "flat", 8, "DNA, mitosis, meiosis, inheritance and variation."),
  t("ecology", "Ecology & ecosystems", "C19–20", 7, "2024", "flat", 7, "Food chains, cycles, populations and human impact."),
];

const bioAdvancedTopics: Topic[] = [
  t("cells", "Cell structure & membranes", "AS §1–5", 9, "2025", "flat", 8, "Ultrastructure, membranes, cell division and immunity."),
  t("gas", "Gas exchange & transport", "AS §7–9", 8, "2025", "flat", 8, "Exchange surfaces, blood, vessels and the heart."),
  t("genetics", "Genetics & inheritance", "A2 §16–18", 9, "2025", "up", 8, "Nucleic acids, protein synthesis, inheritance and selection."),
  t("homeo", "Homeostasis & coordination", "AS §11–14", 8, "2025", "flat", 8, "Nervous and hormonal control, homeostasis and plant responses."),
  t("eco", "Ecology & evolution", "A2 §19–21", 7, "2024", "flat", 7, "Energy flow, populations, succession and conservation."),
];

/* ----------------------------- Computer science --------------------------- */

const csTopics: Topic[] = [
  t("data", "Data representation", "AS §1", 8, "2025", "flat", 6, "Binary, hex, ASCII, Unicode, images and sound."),
  t("algo", "Algorithms & programming", "AS §2 · A2 §11", 10, "2025", "up", 9, "Pseudocode, abstraction, recursion and recursion traces."),
  t("struct", "Data structures & recursion", "AS §4 · A2 §11", 8, "2024", "flat", 7, "Arrays, stacks, queues, linked lists and graphs."),
  t("logic", "Logic, networks & security", "AS §8–10", 8, "2025", "flat", 7, "Boolean algebra, gates, protocols and encryption."),
];

/* -------------------------------- Economics ------------------------------- */

const econTopics: Topic[] = [
  t("micro", "Demand, supply & elasticity", "AS §1–3", 10, "2025", "flat", 9, "Price mechanism, elasticity and market equilibrium."),
  t("failure", "Market failure & government", "AS §4–6", 9, "2025", "up", 8, "Externalities, public goods and policy failure."),
  t("macro", "National income & macro policy", "A2 §7–12", 9, "2025", "flat", 9, "GDP, inflation, unemployment and policy tools."),
  t("trade", "International trade & development", "A2 §13–15", 8, "2024", "flat", 8, "Comparative advantage, protectionism and development."),
];

/* --------------------------------- Subjects ------------------------------- */

export const subjects: Subject[] = [
  {
    id: "maths",
    name: "Mathematics",
    short: "Maths",
    accent: "#2B4C7E",
    levels: ["IGCSE", "GCSE", "O Level", "AS", "A Level"],
    boards: ["CAIE", "Edexcel", "AQA"],
    syllabus: { IGCSE: "0580", GCSE: "4MA1", "O Level": "4024", AS: "9709", "A Level": "9709" },
    description: "The paper that rewards method as much as the answer.",
    topics: { IGCSE: mathsIgcseTopics, AS: mathsAdvancedTopics, A2: mathsAdvancedTopics },
    specs: { IGCSE: igcseSpecs, GCSE: igcseSpecs, "O Level": igcseSpecs, AS: asSpecs, "A Level": alevelSpecs },
    thresholds: { IGCSE: igcseThresholds, AS: asThresholds, "A Level": alevelThresholds },
  },
  {
    id: "physics",
    name: "Physics",
    short: "Physics",
    accent: "#8A4B2A",
    levels: ["IGCSE", "GCSE", "O Level", "AS", "A Level"],
    boards: ["CAIE", "Edexcel", "AQA"],
    syllabus: { IGCSE: "0625", GCSE: "1PH0", "O Level": "5054", AS: "9702", "A Level": "9702" },
    description: "Model the physical world, then defend the model.",
    topics: { IGCSE: physicsIgcseTopics, AS: physicsAdvancedTopics, A2: physicsAdvancedTopics },
    specs: { IGCSE: igcseSpecs, GCSE: igcseSpecs, "O Level": igcseSpecs, AS: asSpecs, "A Level": alevelSpecs },
    thresholds: { IGCSE: igcseThresholds, AS: asThresholds, "A Level": alevelThresholds },
  },
  {
    id: "chem",
    name: "Chemistry",
    short: "Chemistry",
    accent: "#2F6B4F",
    levels: ["IGCSE", "GCSE", "O Level", "AS", "A Level"],
    boards: ["CAIE", "Edexcel", "AQA"],
    syllabus: { IGCSE: "0620", GCSE: "1CH0", "O Level": "5070", AS: "9701", "A Level": "9701" },
    description: "Structure, energy and change at the scale of the mole.",
    topics: { IGCSE: chemIgcseTopics, AS: chemAdvancedTopics, A2: chemAdvancedTopics },
    specs: { IGCSE: igcseSpecs, GCSE: igcseSpecs, "O Level": igcseSpecs, AS: asSpecs, "A Level": alevelSpecs },
    thresholds: { IGCSE: igcseThresholds, AS: asThresholds, "A Level": alevelThresholds },
  },
  {
    id: "bio",
    name: "Biology",
    short: "Biology",
    accent: "#3E6B63",
    levels: ["IGCSE", "GCSE", "O Level", "AS", "A Level"],
    boards: ["CAIE", "Edexcel", "AQA"],
    syllabus: { IGCSE: "0610", GCSE: "1BI0", "O Level": "5090", AS: "9700", "A Level": "9700" },
    description: "Systems, evidence and explanation.",
    topics: { IGCSE: bioIgcseTopics, AS: bioAdvancedTopics, A2: bioAdvancedTopics },
    specs: { IGCSE: igcseSpecs, GCSE: igcseSpecs, "O Level": igcseSpecs, AS: asSpecs, "A Level": alevelSpecs },
    thresholds: { IGCSE: igcseThresholds, AS: asThresholds, "A Level": alevelThresholds },
  },
  {
    id: "cs",
    name: "Computer Science",
    short: "CS",
    accent: "#4A4A6A",
    levels: ["AS", "A Level"],
    boards: ["CAIE", "Edexcel"],
    syllabus: { AS: "9618", "A Level": "9618" },
    description: "Abstract the problem, then make it run.",
    topics: { IGCSE: [], AS: csTopics, A2: csTopics },
    specs: { AS: asSpecs, "A Level": alevelSpecs },
    thresholds: { IGCSE: igcseThresholds, AS: asThresholds, "A Level": alevelThresholds },
  },
  {
    id: "econ",
    name: "Economics",
    short: "Economics",
    accent: "#8A6A2F",
    levels: ["AS", "A Level"],
    boards: ["CAIE", "Edexcel"],
    syllabus: { AS: "9708", "A Level": "9708" },
    description: "Choices, incentives and the numbers behind them.",
    topics: { IGCSE: [], AS: econTopics, A2: econTopics },
    specs: { AS: asSpecs, "A Level": alevelSpecs },
    thresholds: { IGCSE: igcseThresholds, AS: asThresholds, "A Level": alevelThresholds },
  },
];

export const getSubject = (id: string): Subject | undefined => subjects.find((s) => s.id === id);

export const stageForLevel = (level: Level): Stage | "A2" => {
  if (level === "IGCSE" || level === "GCSE" || level === "O Level") return "IGCSE";
  if (level === "AS") return "AS";
  return "A2";
};

export const stagesForLevel = (level: Level): Stage[] => {
  if (level === "IGCSE" || level === "GCSE" || level === "O Level") return ["IGCSE"];
  if (level === "AS") return ["AS"];
  return ["AS", "A2"];
};

export const topicsForLevel = (subject: Subject, level: Level): Topic[] => {
  const seen = new Map<string, Topic>();
  for (const stage of stagesForLevel(level)) {
    for (const topic of subject.topics[stage] ?? []) {
      if (!seen.has(topic.id)) seen.set(topic.id, topic);
    }
  }
  return [...seen.values()];
};

export const allTopics = (subject: Subject): Topic[] => {
  const seen = new Map<string, Topic>();
  for (const stage of ["IGCSE", "AS", "A2"] as Stage[]) {
    for (const topic of subject.topics[stage] ?? []) {
      if (!seen.has(topic.id)) seen.set(topic.id, topic);
    }
  }
  return [...seen.values()];
};

export const levelsForSubject = (subject: Subject): Level[] => subject.levels;

export const specsForLevel = (subject: Subject, level: Level): PaperSpec[] =>
  subject.specs[level] ?? subject.specs.IGCSE ?? subject.specs["A Level"] ?? [];

export const syllabusFor = (subject: Subject, level: Level): string =>
  subject.syllabus[level] ?? subject.syllabus["A Level"] ?? subject.syllabus.AS ?? "";

export const thresholdsFor = (subject: Subject, level: Level): GradeBand[] => {
  if (level === "IGCSE" || level === "GCSE" || level === "O Level") return subject.thresholds.IGCSE;
  if (level === "AS") return subject.thresholds.AS;
  return subject.thresholds["A Level"];
};
