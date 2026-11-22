import type { Analysis, Level, Mode, TopicStat } from "@/lib/types";
import { getSubject, topicsForLevel } from "@/lib/data/subjects";
import { questionsFor, totalMarks } from "@/lib/data";
import { clamp } from "@/lib/format";

const trendLabel = (trend: string): string =>
  trend === "up" ? "rising" : trend === "down" ? "falling" : "steady";

export function analyse(
  subjectId: string,
  level: Level,
  mode: Mode = "full",
  topicIds: string[] = []
): Analysis {
  const subject = getSubject(subjectId);
  if (!subject) {
    return {
      subjectId,
      level,
      mode,
      topics: [],
      commands: [],
      avgMarks: 0,
      longShare: 0,
      seriesAnalyzed: 0,
      questionsAnalyzed: 0,
      notes: [],
    };
  }

  const selected = new Set(topicIds);
  const topics = topicsForLevel(subject, level).filter(
    (t) => selected.size === 0 || selected.has(t.id)
  );
  const bank = questionsFor(subjectId, level).filter(
    (q) => selected.size === 0 || selected.has(q.topicId)
  );

  const maxAvg = Math.max(1, ...topics.map((t) => t.avgMarks));

  const stats: TopicStat[] = topics
    .map((t) => {
      const year = Number(t.lastSeen) || 2020;
      const recency = clamp(1 - (2025 - year) / 6, 0, 1);
      const trendScore = t.trend === "up" ? 1 : t.trend === "flat" ? 0.6 : 0.25;
      const prediction = Math.round(
        100 *
          (0.4 * (t.frequency / 10) +
            0.25 * recency +
            0.2 * trendScore +
            0.15 * (t.avgMarks / maxAvg))
      );
      const marks = bank
        .filter((q) => q.topicId === t.id)
        .reduce((sum, q) => sum + totalMarks(q), 0);
      return {
        id: t.id,
        name: t.name,
        code: t.code,
        frequency: t.frequency,
        lastSeen: t.lastSeen,
        trend: t.trend,
        avgMarks: t.avgMarks,
        prediction,
        bankMarks: marks,
      };
    })
    .sort((a, b) => b.prediction - a.prediction);

  const commandCount = new Map<string, number>();
  for (const q of bank) {
    commandCount.set(q.command, (commandCount.get(q.command) ?? 0) + 1);
  }
  const commands = [...commandCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      pct: bank.length ? Math.round((count / bank.length) * 100) : 0,
    }));

  const avgMarks = bank.length
    ? bank.reduce((sum, q) => sum + totalMarks(q), 0) / bank.length
    : 0;
  const longShare = bank.length
    ? Math.round(
        (bank.filter((q) => totalMarks(q) >= 6).length / bank.length) * 100
      )
    : 0;

  const notes: string[] = [];
  if (stats[0]) {
    const top = stats[0];
    notes.push(
      `${top.name} is the strongest signal: it has appeared in ${top.frequency} of the last ten series and is ${trendLabel(top.trend)}.`
    );
  }
  const due = stats.find((t) => t.frequency >= 7 && Number(t.lastSeen) <= 2023);
  if (due) {
    notes.push(
      `${due.name} has not been seen since ${due.lastSeen} — a classic due topic.`
    );
  }
  if (commands[0]) {
    notes.push(
      `${commands[0].name} questions make up ${commands[0].pct}% of this bank — the paper will demand method, not just answers.`
    );
  }
  if (longShare > 0) {
    notes.push(
      `Long questions carry ${longShare}% of the marks; the back section is where grades are won.`
    );
  }

  return {
    subjectId,
    level,
    mode,
    topics: stats,
    commands,
    avgMarks: Math.round(avgMarks * 10) / 10,
    longShare,
    seriesAnalyzed: 24,
    questionsAnalyzed: bank.length,
    notes,
  };
}
