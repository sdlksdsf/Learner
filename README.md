# Papertrail

**Past papers, read for patterns.**

Papertrail is a study workspace for exam students. It reads the shape of a paper — the chapters that keep appearing, the marks they carry, the command words that order them — and builds a paper to that shape, then marks your answers against the scheme for that exact paper.

Built for CAIE / Cambridge (IGCSE, O Level, AS, A Level), with GCSE, Edexcel, AQA and OCR shapes in the same engine.

---

## What it does

| | |
| --- | --- |
| **Custom paper** | Pick board, level, subject and either a set of chapters (topical) or the whole syllabus (full length). Set the marks. The engine assembles a paper that matches the pattern. |
| **Pattern analysis** | Before a question is chosen, the app shows what the series keeps asking: topic frequency over the last ten series, recency, trend, mark weight and a weighted prediction score. |
| **Paper** | A real exam-shaped sheet: cover, instructions, sections, numbered parts, mark brackets, ruled answer space, totals. |
| **Mark scheme** | Every part carries its scheme points and a model answer, written in examiner language. |
| **Practice on screen** | Type your answers in the ruled space. A timer runs, work autosaves, and the paper marks itself when you submit. |
| **Examiner-style marking** | Each mark is tied to a named scheme point. Calculations accept numeric answers within tolerance, theory points look for the ideas the scheme names, and extended answers are flagged as indicative. Every part can be adjusted by hand. |
| **Report** | Score, percentage, indicative grade, marks by chapter, weakest chapters, a per-question breakdown, and a focus list that builds the next drill. |
| **Print / PDF** | A4 pack: cover, paper, optional mark scheme, optional marked report. Prints clean with page breaks that respect the answer space. |
| **Saved** | Papers and attempts stay on the device in local storage. No account, no upload. |
| **Archive** | Series by subject, level and year, each with a paper, mark scheme, print pack and the official board link. |

---

## Method

The engine is deterministic and rule-based — there is no runtime model call, so a paper is reproducible and the site stays fast on any device.

**1. Index.** Each subject carries a question bank with mark-scheme points, plus a reading of 24 recent series: which chapters appeared, their marks, command words and difficulty.

**2. Pattern score.** For every chapter:

```
score = 0.40 × frequency
      + 0.25 × recency
      + 0.20 × trend
      + 0.15 × mark weight
```

**3. Blueprint.** The paper is split into sections (short answer, then structured), with target marks per chapter and a command-word mix taken from the series.

**4. Assembly.** Questions are drawn with Efraimidis–Spirakis weighted sampling without replacement, so a chapter's weight drives selection but no question repeats. The paper stops at the available marks rather than padding with filler.

**5. Marking.** A submitted answer is normalised (unicode, signs, superscripts, fractions) and then checked point by point:

- numeric points match within tolerance, or 0.5% by default;
- fractions are read as their quotient (`27/3` → `9`);
- algebra is compared term by term with signs preserved, so `+8x` never passes for `−8x`;
- theory points look for the concepts named in the scheme;
- a single correct final numeric answer implies the method marks (CAIE convention);
- a response that reproduces the model answer exactly earns every point;
- extended responses are marked indicatively and flagged.

Verified against every part in the bank: a full working answer scores 100%, a wrong answer scores zero, and a bare wrong number is never credited.

---

## Stack

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · lucide-react · Fraunces / Inter / JetBrains Mono via Fontsource.

Motion is CSS transitions and `IntersectionObserver` only — no animation library, no layout thrash, and `prefers-reduced-motion` is respected.

```
app/
  (site)/            marketing + product routes with header/footer
    page.tsx         landing
    create/          the studio
    library/         archive index + [slug]
    practice/[id]    sit a paper, get marked
    print/[id]       A4 pack
    saved/           device storage
    method/          how the engine works
  layout.tsx         fonts, metadata, grain
  globals.css        design tokens, primitives, print rules
components/
  landing/ studio/ paper/ practice/ print/ library/ saved/ site/ ui/
lib/
  engine/            rng, analysis, generate, marker, grade
  data/              subjects, question banks, archive
  storage.ts         local persistence
```

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

No environment variables, no database, no API keys.

## Deploy

The repo deploys to Vercel with zero configuration — the root directory is the
app, the framework preset is Next.js, and there is nothing to provision.

```bash
# from the repo root
npx vercel --prod        # or import the repo at vercel.com/new
```

Production: **https://papertrail-ten-gilt.vercel.app** (open this one — it is the
public alias). The project's own alias, `papertrail-platematch1.vercel.app`,
resolves to the same deployment but currently answers with Vercel's login page
because Deployment Protection is on for this account.

What each route needs in production, and why:

| Route | Rendering | Note |
| --- | --- | --- |
| `/`, `/library`, `/method`, `/saved` | static | no server state |
| `/library/[slug]` | SSG, 288 pages | prerendered at build |
| `/create` | client | generates the paper in the browser |
| `/practice/[id]`, `/print/[id]` | client | reads the paper from `localStorage` |

Because papers live in `localStorage` keyed by paper id, a generated paper opens
on the same device and browser that made it. Nothing sensitive is stored, and
there is no account system to break.

Optional: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://papertrail.study`) in the
Vercel project to point canonical URLs, `sitemap.xml` and Open Graph tags at a
custom domain. Without it, the app derives the origin from Vercel's own
environment variables, so previews and production are always correct on their
own host.

**Deployment Protection is the one setting that matters here.** While Vercel
Authentication is on for this account, the `papertrail-*.vercel.app` project
urls answer with a Vercel login page instead of the app. A custom domain is not
subject to it, and the stable public alias
`papertrail-ten-gilt.vercel.app` also serves without a login, which is why that
is the URL above.

To serve on the project url as well, turn protection off under
*Project → Settings → Deployment Protection → Vercel Authentication → Disabled*.
It can be read through the API (`ssoProtection` on the project) but not changed
with the tools this repo's setup exposes, so it is a one-click step in the
dashboard.

---

## Honest limits

- **Not a prediction.** A pattern score is a prior. The real paper can and does surprise.
- **Not the official paper.** Archive entries are study reconstructions built to the syllabus blueprint and series pattern. Official papers and mark schemes stay with their boards, and each archive page links out to them.
- **Not a teacher.** Extended-response marking is indicative. Adjust the marks, or check with someone who teaches the subject.
- **Six subjects today.** Mathematics, Physics, Chemistry, Biology, Computer Science, Economics. The bank grows subject by subject.
- **Local, not cloud.** Saved papers live in the browser on that device.

Papertrail is a study aid. It is not affiliated with, endorsed by, or connected to Cambridge International, Pearson Edexcel, AQA or OCR.
