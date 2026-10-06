import type { Metadata } from "next";
import { PodcastLanding } from "@/components/podcast-page";
import { getContent } from "@/lib/content";
import { seedContent } from "@/lib/content/seed";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "For podcast listeners",
  description: "Links from the episode, plus the free First Budget template for independent hotels.",
  alternates: { canonical: "/podcast" },
};

export default async function PodcastPage() {
  const c = await getContent();
  const page = c.podcastPages.find((p) => p.slug === "default") ?? seedContent.podcastPages[0];
  return <PodcastLanding page={page} settings={c.settings} path="/podcast" />;
}
