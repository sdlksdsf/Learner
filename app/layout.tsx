import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Papertrail — Past papers, read for patterns",
    template: "%s — Papertrail",
  },
  description:
    "Papertrail reads five years of past papers, finds what examiners keep asking, and builds a topical or full-length paper with a mark scheme and examiner-style marking.",
  keywords: [
    "past papers",
    "topical past papers",
    "IGCSE",
    "A Level",
    "GCSE",
    "Cambridge",
    "CAIE",
    "exam practice",
    "marking",
  ],
  openGraph: {
    title: "Papertrail — Past papers, read for patterns",
    description:
      "Build a paper from the topics that keep coming back. Mark it against the scheme. Know what to revise next.",
    type: "website",
    siteName: "Papertrail",
  },
  twitter: {
    card: "summary_large_image",
    title: "Papertrail — Past papers, read for patterns",
    description:
      "Build a paper from the topics that keep coming back. Mark it against the scheme.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2e7" },
    { media: "(prefers-color-scheme: dark)", color: "#17150f" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{document.documentElement.classList.add("js");var s=localStorage.getItem("papertrail:theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="dark"||s==="light"?s:(m?"dark":"light");var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
