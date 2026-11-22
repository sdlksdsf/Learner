"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/format";

/**
 * Theme toggle. Renders a fixed-size placeholder until mounted so the header
 * never shifts, and announces the state to assistive tech.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "group relative grid h-9 w-9 place-items-center border border-line-strong text-muted transition-colors hover:border-ink hover:text-ink",
        className
      )}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={mounted ? dark : undefined}
      title={dark ? "Light theme" : "Dark theme"}
    >
      <span
        className={cn(
          "absolute inset-0 grid place-items-center transition-all duration-300",
          mounted && dark ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
        aria-hidden="true"
      >
        <Sun size={15} strokeWidth={1.8} />
      </span>
      <span
        className={cn(
          "absolute inset-0 grid place-items-center transition-all duration-300",
          mounted && !dark ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
        aria-hidden="true"
      >
        <Moon size={15} strokeWidth={1.8} />
      </span>
    </button>
  );
}
