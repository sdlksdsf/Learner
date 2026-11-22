import type { Topic } from "@/lib/types";
import type { SyllabusTopic } from "@/lib/data/syllabus";

/**
 * Turns a verified syllabus chapter list into the candidates the paper builder
 * samples from. A chapter without a question bank entry still appears, marked
 * with zero coverage, so the interface never suggests questions it cannot
 * produce.
 */
export function topicsFromSyllabus(topics: SyllabusTopic[]): Topic[] {
  return topics.map((topic, i) => ({
    id: topic.code.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: topic.name,
    code: topic.code,
    frequency: Math.max(3, 9 - i),
    lastSeen: "2025",
    trend: "flat",
    avgMarks: 8,
    blurb: topic.points.slice(0, 3).join(" · "),
  }));
}
