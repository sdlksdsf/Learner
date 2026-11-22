import type { Level, Subject } from "@/lib/types";
import { thresholdsFor } from "@/lib/data/subjects";

export function gradeFor(pct: number, level: Level, subject: Subject): string {
  const bands = thresholdsFor(subject, level);
  const band = bands.find((b) => pct >= b.pct);
  return band?.grade ?? "U";
}

export function nextBand(pct: number, level: Level, subject: Subject): { grade: string; needed: number } | null {
  const bands = thresholdsFor(subject, level).slice().reverse();
  const band = bands.find((b) => b.pct > pct);
  if (!band) return null;
  return { grade: band.grade, needed: band.pct - pct };
}
