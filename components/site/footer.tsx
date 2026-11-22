import Link from "next/link";
import { Logo } from "@/components/site/logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-2/40">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted">
            A study tool that reads the pattern behind past papers, builds a
            paper to that pattern, and marks it against the scheme. Built for
            the week before the exam.
          </p>
          <p className="mono mt-5 text-[10px] uppercase tracking-[0.16em] text-line-strong">
            CAIE · Edexcel · AQA · OCR
          </p>
        </div>

        <div>
          <p className="mono text-[10px] uppercase tracking-[0.16em] text-line-strong">
            Studio
          </p>
          <ul className="mt-4 space-y-2.5 text-[13px]">
            <li><Link href="/create" className="link-underline">Build a paper</Link></li>
            <li><Link href="/library" className="link-underline">Paper archive</Link></li>
            <li><Link href="/saved" className="link-underline">Saved papers</Link></li>
          </ul>
        </div>

        <div>
          <p className="mono text-[10px] uppercase tracking-[0.16em] text-line-strong">
            Reference
          </p>
          <ul className="mt-4 space-y-2.5 text-[13px]">
            <li><Link href="/method" className="link-underline">How the engine works</Link></li>
            <li><Link href="/method#limits" className="link-underline">What it can and cannot do</Link></li>
            <li>
              <a
                href="https://www.cambridgeinternational.org/programmes-and-qualifications/recognition-and-acceptance/past-papers/"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Official past papers ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container-x flex flex-col gap-2 py-5 text-[11px] text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Papertrail. A study tool, not an exam board.</p>
          <p className="max-w-xl md:text-right">
            Not affiliated with Cambridge, Pearson, AQA or OCR. Official past
            papers and mark schemes remain the copyright of their boards.
          </p>
        </div>
      </div>
    </footer>
  );
}
