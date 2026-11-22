"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  BookmarkX,
  Clock,
  Printer,
  RotateCcw,
} from "lucide-react";
import type { Paper } from "@/lib/types";
import {
  getAttempt,
  getPaper,
  loadSaved,
  toggleSaved,
  type SavedRecord,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

interface Row {
  record: SavedRecord;
  paper: Paper | null;
  score?: number;
  total?: number;
}

export function SavedPapers() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const records = loadSaved();
    const next = records
      .map((record) => {
        const paper = getPaper(record.paperId);
        const attempt = paper ? getAttempt(paper.id) : null;
        return {
          record,
          paper,
          score: attempt?.result?.score ?? record.score,
          total: attempt?.result?.total ?? record.total,
        };
      })
      .filter((row) => row.paper);
    setRows(next);
    setLoaded(true);
  }, []);

  const remove = (paperId: string) => {
    toggleSaved(paperId);
    setRows((current) => current.filter((row) => row.record.paperId !== paperId));
  };

  const practice = (paper: Paper) => {
    router.push(`/practice/${paper.id}`);
  };

  return (
    <div className="container-x py-10 lg:py-14">
      <header className="anim-rise flex flex-col gap-5 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Your device</p>
          <h1 className="display mt-4 text-[clamp(38px,5vw,60px)]">
            Saved papers.
          </h1>
          <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-muted">
            Everything here is stored in this browser. No account, no sync —
            clear the browser data and it goes.
          </p>
        </div>
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {rows.length} paper{rows.length === 1 ? "" : "s"}
        </p>
      </header>

      {!loaded ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse bg-paper-3" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-10 border border-dashed border-line-strong py-24 text-center">
          <Bookmark size={26} className="mx-auto text-faint" strokeWidth={1.4} />
          <p className="mt-5 font-display text-[28px]">Nothing saved yet.</p>
          <p className="mx-auto mt-2 max-w-sm text-[12px] leading-relaxed text-muted">
            Build a paper, sit it, and save the result. It will wait here for
            the night before.
          </p>
          <div className="mt-7 flex justify-center gap-2">
            <Button onClick={() => router.push("/create")}>Build a paper</Button>
            <Button variant="ghost" onClick={() => router.push("/library")}>
              Browse the archive
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ record, paper, score, total }) => {
            if (!paper) return null;
            return (
              <article
                key={paper.id}
                className="group sheet flex flex-col p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                      {paper.subjectName} · {paper.level}
                    </p>
                    <h2 className="mt-2 font-display text-[20px] leading-tight tracking-[-0.015em]">
                      {paper.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => remove(paper.id)}
                    className="text-faint transition-colors hover:text-accent"
                    aria-label="Remove from saved"
                  >
                    <BookmarkX size={15} />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {paper.topics.slice(0, 3).map((topic) => (
                    <span key={topic.id} className="tag">
                      {topic.name}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-line pt-3">
                    <span className="mono text-[9px] text-muted">
                      Saved {formatDate(record.savedAt)}
                    </span>
                    {score !== undefined && total ? (
                      <span className="mono text-[10px] text-green">
                        {score}/{total}
                      </span>
                    ) : (
                      <span className="mono text-[9px] uppercase tracking-[0.1em] text-faint">
                        Not attempted
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button onClick={() => practice(paper)} size="sm" className="flex-1">
                      <RotateCcw size={12} /> {score !== undefined ? "Review" : "Sit it"}
                    </Button>
                    <Button
                      onClick={() => router.push(`/print/${paper.id}${score !== undefined ? "?report=1" : ""}`)}
                      variant="ghost"
                      size="sm"
                    >
                      <Printer size={12} />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-10 flex items-start gap-3 border-t border-line pt-5 text-[10.5px] leading-relaxed text-muted">
        <Clock size={13} className="mt-0.5 shrink-0" />
        <p>
          Saved papers live in this browser&apos;s local storage. They are not
          uploaded. Print a paper to keep a permanent copy.
        </p>
      </div>
    </div>
  );
}
