import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { archiveEntries } from "@/lib/data/archive";



export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/create", "/library", "/method"].map((path) => ({
    url: `${siteUrl()}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === "/library" ? "daily" : "weekly") as
      | "daily"
      | "weekly",
    priority: path === "" ? 1 : path === "/create" ? 0.9 : 0.8,
  }));

  const archiveRoutes = archiveEntries.map((entry) => ({
    url: `${siteUrl()}/library/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...archiveRoutes];
}
