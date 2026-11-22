import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="container-x pb-4 pt-8">
      <div className="relative overflow-hidden bg-ink px-7 py-14 text-paper sm:px-12 sm:py-16 lg:px-16">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.14]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #faf7ef 0 1px, transparent 1px 44px)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10"
          aria-hidden
        />

        <div className="relative">
          <p className="eyebrow !text-invert-ink/65">Before the exam</p>
          <h2 className="display mt-5 max-w-2xl text-[clamp(36px,5vw,64px)] text-paper">
            Your next paper is already in the pattern.
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/create" variant="accent" size="lg">
              Build a paper <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/method" variant="light" size="lg">
              How it works
            </ButtonLink>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.14em] text-invert-ink/60">
            <span>No account</span>
            <span>No card</span>
            <span>Papers saved on your device</span>
          </div>
        </div>
      </div>
    </section>
  );
}
