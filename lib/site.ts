/**
 * Resolves the canonical origin for absolute URLs (metadata, sitemap, robots).
 *
 * Order matters:
 *  1. NEXT_PUBLIC_SITE_URL — a custom domain, set once when you have one.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's stable production host,
 *     injected by Vercel automatically on every deployment.
 *  3. VERCEL_URL — the host of this particular deployment (previews included).
 *  4. Local development.
 */
export const siteUrl = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production.replace(/\/$/, "")}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview.replace(/\/$/, "")}`;

  return "http://localhost:3000";
};
