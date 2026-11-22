import type { Metadata } from "next";
import { Studio } from "@/components/studio/studio";

export const metadata: Metadata = {
  title: "Build a paper",
  description:
    "Choose a subject, level and chapters. Papertrail reads the past-paper pattern and builds a topical or full-length paper with a mark scheme.",
};

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  return (
    <Studio
      initial={{
        subject: params.subject,
        level: params.level,
        mode: params.mode,
        topic: params.topic,
      }}
    />
  );
}
