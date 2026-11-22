import Link from "next/link";
import { cn } from "@/lib/format";

export function Logo({
  className,
  href = "/",
  compact = false,
}: {
  className?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Papertrail home"
    >
      <svg
        width="23"
        height="27"
        viewBox="0 0 24 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:-rotate-3"
      >
        <path
          d="M2 1.5h13.5L22 8v18.5H2V1.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 1.5V8H22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 16.5l3.5 3.5 7-8"
          stroke="#B93A2B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="font-display text-[21px] leading-none tracking-[-0.03em]">
          Papertrail
        </span>
      )}
    </Link>
  );
}
