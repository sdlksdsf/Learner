import type { Metadata } from "next";
import { PrintView } from "@/components/print/print-view";

export const metadata: Metadata = {
  title: "Print paper",
  robots: { index: false, follow: false },
};

export default async function PrintPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  return (
    <PrintView
      paperId={id}
      initialScheme={sp.scheme === "1"}
      initialReport={sp.report === "1"}
    />
  );
}
