import type { Attempt, Paper } from "@/lib/types";

const PAPERS_KEY = "papertrail:papers";
const ATTEMPTS_KEY = "papertrail:attempts";
const SAVED_KEY = "papertrail:saved";
const HISTORY_KEY = "papertrail:history";

export interface SavedRecord {
  paperId: string;
  savedAt: number;
  score?: number;
  total?: number;
}

const canStore = (): boolean => typeof window !== "undefined";

const read = <T,>(key: string, fallback: T): T => {
  if (!canStore()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown): void => {
  if (!canStore()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — the app still works for this session
  }
};

export const loadPapers = (): Record<string, Paper> => read<Record<string, Paper>>(PAPERS_KEY, {});

export const savePaper = (paper: Paper): void => {
  const papers = loadPapers();
  papers[paper.id] = paper;
  const entries = Object.values(papers).sort((a, b) => b.createdAt - a.createdAt);
  const trimmed = entries.slice(0, 30);
  write(
    PAPERS_KEY,
    Object.fromEntries(trimmed.map((p) => [p.id, p]))
  );
};

export const getPaper = (id: string): Paper | null => loadPapers()[id] ?? null;

export const deletePaper = (id: string): void => {
  const papers = loadPapers();
  delete papers[id];
  write(PAPERS_KEY, papers);
};

export const loadAttempts = (): Record<string, Attempt> =>
  read<Record<string, Attempt>>(ATTEMPTS_KEY, {});

export const saveAttempt = (attempt: Attempt): void => {
  const attempts = loadAttempts();
  attempts[attempt.paperId] = attempt;
  const entries = Object.values(attempts).sort((a, b) => b.startedAt - a.startedAt);
  write(
    ATTEMPTS_KEY,
    Object.fromEntries(entries.slice(0, 30).map((a) => [a.paperId, a]))
  );
};

export const getAttempt = (paperId: string): Attempt | null =>
  loadAttempts()[paperId] ?? null;

/**
 * One line per completed paper. Attempts are keyed by paper id so re-taking a
 * paper overwrites it; this log keeps every sitting, which is what makes
 * "am I improving?" answerable.
 */
export interface HistoryEntry {
  at: number;
  paperId: string;
  subjectId: string;
  level: string;
  score: number;
  total: number;
  pct: number;
  grade: string;
}

export const loadHistory = (): HistoryEntry[] => read<HistoryEntry[]>(HISTORY_KEY, []);

export const recordHistory = (entry: HistoryEntry): void => {
  const next = [entry, ...loadHistory().filter((h) => !(h.paperId === entry.paperId && h.at === entry.at))];
  write(HISTORY_KEY, next.slice(0, 200));
  if (canStore()) window.dispatchEvent(new Event("pt:history"));
};

export const loadSaved = (): SavedRecord[] => read<SavedRecord[]>(SAVED_KEY, []);

export const isSaved = (paperId: string): boolean =>
  loadSaved().some((s) => s.paperId === paperId);

export const toggleSaved = (paperId: string, score?: number, total?: number): boolean => {
  const saved = loadSaved();
  const exists = saved.some((s) => s.paperId === paperId);
  const next = exists
    ? saved.filter((s) => s.paperId !== paperId)
    : [{ paperId, savedAt: Date.now(), score, total }, ...saved].slice(0, 40);
  write(SAVED_KEY, next);
  if (canStore()) window.dispatchEvent(new Event("pt:saved"));
  return !exists;
};

export const updateSavedScore = (paperId: string, score: number, total: number): void => {
  const saved = loadSaved();
  const idx = saved.findIndex((s) => s.paperId === paperId);
  if (idx === -1) return;
  saved[idx] = { ...saved[idx], score, total };
  write(SAVED_KEY, saved);
  if (canStore()) window.dispatchEvent(new Event("pt:saved"));
};
