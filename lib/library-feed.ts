// Latest articles from the book site's RSS feed. Nothing is copied into this
// repo: the home page reads the feed and links each article back to the book
// site, so new articles appear here on their own.

export const FEED_URL = "https://book.ehotelmanagementschool.com/rss.xml";

export interface Article {
  title: string;
  url: string;
  summary: string;
  category: string;
  date: string | null;
}

function field(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!match) return "";
  const value = match[1].trim();
  const cdata = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return (cdata ? cdata[1] : value)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function shortDate(value: string): string | null {
  const time = Date.parse(value);
  if (!Number.isFinite(time)) return null;
  const d = new Date(time);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function clip(text: string, max = 180): string {
  const plain = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Parses RSS 2.0 items, newest first as published. */
export function parseFeed(xml: string, limit: number): Article[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items
    .map((item) => ({
      title: field(item, "title"),
      url: field(item, "link"),
      summary: clip(field(item, "description")),
      category: field(item, "category").replace(/\bAi\b/g, "AI"),
      date: shortDate(field(item, "pubDate")),
    }))
    .filter((a) => a.title && a.url.startsWith("https://"))
    .slice(0, limit);
}

/** Never throws: if the feed cannot be read, the section is simply left out. */
export async function getLatestArticles(limit = 3): Promise<Article[]> {
  try {
    const response = await fetch(process.env.LIBRARY_FEED_URL || FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    return parseFeed(await response.text(), limit);
  } catch {
    return [];
  }
}
