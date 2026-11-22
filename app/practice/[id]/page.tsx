import type { Metadata } from "next";
import { Practice } from "@/components/practice/practice";

export const metadata: Metadata = {
  title: "Practice paper",
  description: "Sit a Papertrail paper and get it marked against the scheme.",
  robots: { index: false, follow: false },
};

export default async function PracticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Practice paperId={id} />;
}
