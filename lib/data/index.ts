import type { Level, Question, Stage } from "@/lib/types";
import { mathsIgcse } from "@/lib/data/questions/maths-igcse";
import { mathsAdvanced } from "@/lib/data/questions/maths-advanced";
import { physicsIgcse } from "@/lib/data/questions/physics-igcse";
import { physicsAdvanced } from "@/lib/data/questions/physics-advanced";
import { chemIgcse } from "@/lib/data/questions/chem-igcse";
import { chemAdvanced } from "@/lib/data/questions/chem-advanced";
import { bioIgcse } from "@/lib/data/questions/bio-igcse";
import { bioAdvanced } from "@/lib/data/questions/bio-advanced";
import { csQuestions } from "@/lib/data/questions/cs";
import { econQuestions } from "@/lib/data/questions/econ";
import {
  withExtras,
  mathsIgcseExtras,
  mathsAdvancedExtras,
} from "@/lib/data/questions/extensions-maths";
import {
  physicsIgcseExtras,
  physicsAdvancedExtras,
  chemIgcseExtras,
  chemAdvancedExtras,
  bioIgcseExtras,
  bioAdvancedExtras,
} from "@/lib/data/questions/extensions-science";
import { csExtras, econExtras } from "@/lib/data/questions/extensions-humanities";
import { econExtras2 } from "@/lib/data/questions/extensions-econ";
import { mathsA2, physicsA2, chemA2, bioA2 } from "@/lib/data/questions/a2-bank";

export const questionBank: Record<string, Question[]> = {
  maths: [
    ...withExtras(mathsIgcse, mathsIgcseExtras),
    ...withExtras(mathsAdvanced, mathsAdvancedExtras),
    ...mathsA2,
  ],
  physics: [
    ...withExtras(physicsIgcse, physicsIgcseExtras),
    ...withExtras(physicsAdvanced, physicsAdvancedExtras),
    ...physicsA2,
  ],
  chem: [
    ...withExtras(chemIgcse, chemIgcseExtras),
    ...withExtras(chemAdvanced, chemAdvancedExtras),
    ...chemA2,
  ],
  bio: [
    ...withExtras(bioIgcse, bioIgcseExtras),
    ...withExtras(bioAdvanced, bioAdvancedExtras),
    ...bioA2,
  ],
  cs: withExtras(csQuestions, csExtras),
  econ: withExtras(withExtras(econQuestions, econExtras), econExtras2),
};

export const allQuestions: Question[] = Object.values(questionBank).flat();

export const stagesForLevel = (level: Level): Stage[] => {
  if (level === "IGCSE" || level === "GCSE" || level === "O Level") return ["IGCSE"];
  if (level === "AS") return ["AS"];
  return ["AS", "A2"];
};

export const questionsFor = (subjectId: string, level: Level): Question[] => {
  const stages = new Set(stagesForLevel(level));
  return (questionBank[subjectId] ?? []).filter((q) => stages.has(q.stage));
};

export const totalMarks = (q: Question): number =>
  q.parts.reduce((sum, p) => sum + p.marks, 0);

export const bankMarks = (subjectId: string, level: Level, topicId?: string): number =>
  questionsFor(subjectId, level)
    .filter((q) => !topicId || q.topicId === topicId)
    .reduce((sum, q) => sum + totalMarks(q), 0);
