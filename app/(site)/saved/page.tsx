import type { Metadata } from "next";
import { SavedPapers } from "@/components/saved/saved-papers";

export const metadata: Metadata = {
  title: "Saved papers",
  description: "Papers you have built and saved on this device.",
};

export default function SavedPage() {
  return <SavedPapers />;
}
