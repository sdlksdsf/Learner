import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how";
import { ArchiveStrip } from "@/components/landing/archive-strip";
import { Marking } from "@/components/landing/marking";
import { SubjectsSection } from "@/components/landing/subjects";
import { Features } from "@/components/landing/features";
import { ClosingCta } from "@/components/landing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <ArchiveStrip />
      <Marking />
      <SubjectsSection />
      <Features />
      <ClosingCta />
    </>
  );
}
