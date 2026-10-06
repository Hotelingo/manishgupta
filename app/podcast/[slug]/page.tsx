import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PodcastLanding } from "@/components/podcast-page";
import { getContent } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const c = await getContent();
  return c.podcastPages.filter((p) => p.slug !== "default").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const page = c.podcastPages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: `For ${page.showName} listeners`,
    description: page.intro,
    alternates: { canonical: `/podcast/${slug}` },
  };
}

export default async function ShowPage({ params }: Params) {
  const { slug } = await params;
  const c = await getContent();
  const page = c.podcastPages.find((p) => p.slug === slug && p.slug !== "default");
  if (!page) notFound();
  return <PodcastLanding page={page} settings={c.settings} path={`/podcast/${slug}`} />;
}
