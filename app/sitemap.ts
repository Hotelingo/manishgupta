import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent();
  const shows = c.podcastPages.filter((p) => p.slug !== "default").map((p) => `/podcast/${p.slug}`);
  return ["/", "/courses", "/about", "/podcast", ...shows].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
