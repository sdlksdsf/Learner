"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { loadSaved } from "@/lib/storage";
import { cn } from "@/lib/format";

const links = [
  { href: "/create", label: "Build", index: "01" },
  { href: "/library", label: "Archive", index: "02" },
  { href: "/method", label: "Method", index: "03" },
  { href: "/saved", label: "Saved", index: "04" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const update = () => setSavedCount(loadSaved().length);
    update();
    window.addEventListener("pt:saved", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("pt:saved", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative flex items-baseline gap-1 py-2 text-[13px] font-medium transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                <span className="mono text-[9px] text-faint transition-colors group-hover:text-accent">
                  {link.index}
                </span>
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/saved"
            className="btn btn-ghost btn-sm hidden gap-1.5 sm:inline-flex"
            aria-label={`Saved papers${savedCount ? ` (${savedCount})` : ""}`}
          >
            <Bookmark size={14} strokeWidth={1.8} />
            <span className="hidden lg:inline">Saved</span>
            {savedCount > 0 && (
              <span className="mono grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[9px] text-paper-2">
                {savedCount}
              </span>
            )}
          </Link>
          <Link href="/create" className="btn btn-primary btn-sm">
            Build a paper
          </Link>
          <button
            className="grid h-9 w-9 place-items-center border border-line-strong md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="container-x flex flex-col py-3" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-baseline gap-3 border-b border-line/60 py-3.5 last:border-b-0"
              >
                <span className="mono text-[10px] text-faint">{link.index}</span>
                <span className="font-display text-2xl">{link.label}</span>
              </Link>
            ))}
            <Link href="/saved" className="mt-2 flex items-center gap-2 py-2 text-sm text-muted">
              <Bookmark size={14} /> Saved papers ({savedCount})
            </Link>
            <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3">
              <span className="field-label">Appearance</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
