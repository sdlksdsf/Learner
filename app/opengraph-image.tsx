import { ImageResponse } from "next/og";
import { allQuestions } from "@/lib/data";
import { archiveEntries } from "@/lib/data/archive";
import { subjects } from "@/lib/data/subjects";
import { catalogue } from "@/lib/data/syllabus";

export const runtime = "nodejs";
export const alt = "Papertrail — past papers, read for patterns";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3efe4",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #17150f",
            paddingBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 34,
                height: 40,
                border: "3px solid #17150f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 3,
                  background: "#b93a2b",
                  transform: "rotate(-45deg)",
                }}
              />
            </div>
            <div style={{ fontSize: 38, color: "#17150f" }}>Papertrail</div>
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              color: "#6e6759",
              textTransform: "uppercase",
            }}
          >
            Study paper
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, color: "#17150f", lineHeight: 1.05 }}>
            Every past paper.
          </div>
          <div style={{ fontSize: 82, color: "#b93a2b", fontStyle: "italic" }}>
            One pattern.
          </div>
          <div style={{ fontSize: 26, color: "#4a463b", marginTop: 28 }}>
            Pattern-read papers, official-style marking.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 0,
            borderTop: "1px solid #d8d1c1",
            paddingTop: 24,
            fontSize: 20,
            color: "#6e6759",
          }}
        >
          <div style={{ display: "flex", gap: 40 }}>
            <span>{allQuestions.length} questions</span>
            <span>{archiveEntries.length.toLocaleString()} papers</span>
            <span>{catalogue.length} syllabuses</span>
            <span>IGCSE · O Level · AS · A Level</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
