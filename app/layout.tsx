import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://papertrail.study"),
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
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe4",
  colorScheme: "light",
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
            __html: `document.documentElement.classList.add("js");`,
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
