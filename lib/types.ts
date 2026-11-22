export type Stage = "IGCSE" | "AS" | "A2";

export type Level = "IGCSE" | "GCSE" | "O Level" | "AS" | "A Level";

export type Board = "CAIE" | "Edexcel" | "AQA" | "OCR";

export type Mode = "topical" | "full";

export type Trend = "up" | "flat" | "down";

export type PartType = "short" | "structured" | "extended" | "calculation";

export interface SchemePoint {
  /** What the mark is awarded for, in examiner language. */
  text: string;
  marks: number;
  /** Acceptable phrases. A phrase may contain "|" to mean alternatives. */
  keywords?: string[];
  /** Expected numeric value, if the point is a calculation. */
  numeric?: number;
  tol?: number;
  /** Exact strings that award the point (normalised, contains). */
  accept?: string[];
  /** Minimum keyword hits needed. Defaults to marks >= 2 ? 2 : 1. */
  hits?: number;
}

export interface Part {
  id: string;
  label: string;
  prompt: string;
  marks: number;
  type: PartType;
  scheme: SchemePoint[];
  /** Model answer shown in the mark scheme. */
  answer: string;
  lines?: number;
}

export interface Question {
  id: string;
  topicId: string;
  stage: Stage;
  difficulty: 1 | 2 | 3;
  command: string;
  source: string;
  context?: string;
  parts: Part[];
}

export interface Topic {
  id: string;
  name: string;
  code: string;
  /** Appearances across the last ten series (0–10). */
  frequency: number;
  lastSeen: string;
  trend: Trend;
  avgMarks: number;
  blurb: string;
}

export interface PaperSpec {
  id: string;
  label: string;
  marks: number;
  minutes: number;
  description: string;
}

export interface GradeBand {
  grade: string;
  pct: number;
}

export interface Subject {
  id: string;
  name: string;
  short: string;
  accent: string;
  levels: Level[];
  boards: Board[];
  syllabus: Partial<Record<Level, string>>;
  description: string;
  topics: Record<Stage, Topic[]>;
  specs: Partial<Record<Level, PaperSpec[]>>;
  thresholds: Record<"IGCSE" | "AS" | "A Level", GradeBand[]>;
}

export interface PaperConfig {
  subjectId: string;
  level: Level;
  board: Board;
  mode: Mode;
  topicIds: string[];
  targetMarks: number;
  difficulty: "mixed" | "core" | "challenge";
  specId?: string;
}

export interface PaperQuestion extends Question {
  /** Marks for the whole question. */
  marks: number;
  /** Global question number on the paper. */
  number: number;
}

export interface PaperSection {
  label: string;
  note: string;
  questions: PaperQuestion[];
  marks: number;
}

export interface PaperTopicBreakdown {
  id: string;
  name: string;
  marks: number;
  questions: number;
}

export interface Analysis {
  subjectId: string;
  level: Level;
  mode: Mode;
  topics: TopicStat[];
  commands: { name: string; pct: number }[];
  avgMarks: number;
  longShare: number;
  seriesAnalyzed: number;
  questionsAnalyzed: number;
  notes: string[];
}

export interface TopicStat {
  id: string;
  name: string;
  code: string;
  frequency: number;
  lastSeen: string;
  trend: Trend;
  avgMarks: number;
  prediction: number;
  bankMarks: number;
}

export interface Paper {
  id: string;
  title: string;
  subtitle: string;
  subjectId: string;
  subjectName: string;
  level: Level;
  board: Board;
  mode: Mode | "archive";
  totalMarks: number;
  durationMin: number;
  createdAt: number;
  seed: number;
  config: PaperConfig;
  instructions: string[];
  sections: PaperSection[];
  topics: PaperTopicBreakdown[];
  analysis?: Analysis;
  meta?: {
    paperCode?: string;
    series?: string;
    year?: number;
    session?: string;
    source?: string;
    officialUrl?: string;
  };
}

export interface MarkPointResult {
  text: string;
  marks: number;
  awarded: number;
  matched: string[];
}

export interface PartResult {
  partId: string;
  label: string;
  prompt: string;
  possible: number;
  awarded: number;
  points: MarkPointResult[];
  confidence: "high" | "medium" | "low";
  blank: boolean;
  comment: string;
}

export interface QuestionResult {
  questionId: string;
  topicId: string;
  possible: number;
  awarded: number;
  parts: PartResult[];
  comment: string;
}

export interface TopicResult {
  id: string;
  name: string;
  possible: number;
  awarded: number;
  pct: number;
}

export interface AttemptResult {
  score: number;
  total: number;
  pct: number;
  grade: string;
  questions: QuestionResult[];
  topics: TopicResult[];
  confidence: "high" | "medium" | "low";
  summary: string;
  focusTopics: string[];
}

export interface Attempt {
  paperId: string;
  answers: Record<string, string>;
  startedAt: number;
  elapsedSec: number;
  submitted: boolean;
  result?: AttemptResult;
  adjustments?: Record<string, number>;
}

export interface ArchiveEntry {
  slug: string;
  subjectId: string;
  level: Level;
  board: Board;
  specId: string;
  year: number;
  session: string;
  paperCode: string;
  title: string;
  marks: number;
  minutes: number;
  topics: string[];
  officialUrl: string;
  seed: number;
}
