import { allTopics, getSubject } from "@/lib/data/subjects";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, n));

export const formatDuration = (totalSec: number): string => {
  const sec = Math.max(0, Math.round(totalSec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
};

export const formatClock = (totalSec: number): string => {
  const sec = Math.max(0, Math.round(totalSec));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return [h, m, s].map((n) => n.toString().padStart(2, "0")).join(":");
  return [m, s].map((n) => n.toString().padStart(2, "0")).join(":");
};

export const formatDate = (ts: number): string => {
  try {
    return new Date(ts).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export const formatDateLong = (ts: number): string => {
  try {
    return new Date(ts).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export const hashString = (str: string): number => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const plural = (n: number, one: string, many = `${one}s`): string =>
  `${n} ${n === 1 ? one : many}`;

export const pct = (n: number, d: number): number => (d > 0 ? Math.round((n / d) * 100) : 0);

export const topicName = (subjectId: string, topicId: string): string => {
  const subject = getSubject(subjectId);
  if (!subject) return topicId;
  return allTopics(subject).find((t) => t.id === topicId)?.name ?? topicId;
};
