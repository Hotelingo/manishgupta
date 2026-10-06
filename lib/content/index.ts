import "server-only";
import { cache } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { bookUrl } from "@/lib/site";
import { seedContent } from "./seed";
import type {
  Appearance,
  Book,
  CareerItem,
  Course,
  Discipline,
  Offer,
  Platform,
  PodcastPage,
  Project,
  RecordItem,
  Session,
  SiteContent,
  SiteSettings,
} from "./types";

type Row = Record<string, unknown>;

function client(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const strOrNull = (v: unknown) => (typeof v === "string" && v.trim() ? v : null);

/** Reads one published, ordered collection. Returns null when it cannot be read or is empty. */
async function list(db: SupabaseClient, table: string): Promise<Row[] | null> {
  try {
    const { data, error } = await db.from(table).select("*").eq("published", true).order("sort_order");
    if (error || !data || data.length === 0) return null;
    return data as Row[];
  } catch {
    return null;
  }
}

async function readSettings(db: SupabaseClient): Promise<SiteSettings | null> {
  try {
    const { data, error } = await db.from("portfolio_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data) return null;
    const r = data as Row;
    const d = seedContent.settings;
    return {
      heroEyebrow: str(r.hero_eyebrow, d.heroEyebrow),
      heroBefore: str(r.hero_before, d.heroBefore),
      heroEmphasis: str(r.hero_emphasis, d.heroEmphasis),
      heroAfter: str(r.hero_after, d.heroAfter),
      heroIntro: str(r.hero_intro, d.heroIntro),
      nowCaption: str(r.now_caption, d.nowCaption),
      portraitUrl: strOrNull(r.portrait_url),
      recordCheckedOn: str(r.record_checked_on, d.recordCheckedOn),
      aboutHeading: str(r.about_heading, d.aboutHeading),
      aboutIntro: str(r.about_intro, d.aboutIntro),
      contactEmail: str(r.contact_email, d.contactEmail),
      linkedinUrl: strOrNull(r.linkedin_url),
      speakingTopics: Array.isArray(r.speaking_topics) ? (r.speaking_topics as string[]) : d.speakingTopics,
    };
  } catch {
    return null;
  }
}

// The shelf is its own short list (title, theme, link) rather than a read of the
// book site's catalogue tables: some books there still live in code, and the
// portfolio should never depend on the book site's internal schema.
async function readBooks(db: SupabaseClient): Promise<Book[] | null> {
  const rows = await list(db, "portfolio_books");
  if (!rows) return null;
  return rows.map((r) => ({
    slug: str(r.slug),
    title: str(r.title),
    theme: str(r.theme, "reporting"),
    url: strOrNull(r.url) ?? bookUrl(str(r.slug)),
  }));
}

const mapRecord = (r: Row): RecordItem => ({
  label: str(r.label),
  value: str(r.value),
  isTotal: r.is_total === true,
  sourceUrl: strOrNull(r.source_url),
});
const mapDiscipline = (r: Row): Discipline => ({ label: str(r.label), proof: str(r.proof) });
const mapOffer = (r: Row): Offer => ({
  audience: str(r.audience),
  title: str(r.title),
  description: str(r.description),
  formats: str(r.formats),
  status: r.status === "waitlist" ? "waitlist" : "open",
  ctaLabel: str(r.cta_label, "Get in touch"),
  ctaUrl: str(r.cta_url, "#notes"),
  waitlistNote: strOrNull(r.waitlist_note),
});
const mapSession = (r: Row): Session => ({
  title: str(r.title),
  audience: str(r.audience),
  dateLabel: str(r.date_label),
  status: r.status === "recorded" ? "recorded" : "upcoming",
  url: strOrNull(r.url),
});
const mapProject = (r: Row): Project => ({
  name: str(r.name),
  status: (["idea", "prototype", "beta", "live"].includes(str(r.status)) ? r.status : "prototype") as Project["status"],
  summary: str(r.summary),
  url: strOrNull(r.url),
  urlLabel: strOrNull(r.url_label),
  caseStudyUrl: strOrNull(r.case_study_url),
  featured: r.featured === true,
});
const mapPlatform = (r: Row): Platform => ({ platform: str(r.platform), summary: str(r.summary), url: strOrNull(r.url) });
const mapCourse = (r: Row): Course => ({
  platform: str(r.platform),
  title: str(r.title),
  stats: str(r.stats),
  referralUrl: strOrNull(r.referral_url),
  publicUrl: strOrNull(r.public_url),
});
const mapAppearance = (r: Row): Appearance => ({ showName: str(r.show_name), linkLabel: str(r.link_label, "Listen"), url: strOrNull(r.url) });
const mapCareer = (r: Row): CareerItem => ({ period: str(r.period), role: str(r.role), detail: str(r.detail) });
const mapPodcast = (r: Row): PodcastPage => ({
  slug: str(r.slug),
  showName: str(r.show_name),
  intro: str(r.intro),
  resources: Array.isArray(r.resources) ? (r.resources as PodcastPage["resources"]) : [],
});

/**
 * All site content. Each list comes from the database when it has published rows,
 * otherwise from the built-in sample content, so a half-filled database never
 * leaves an empty section.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  const db = client();
  if (!db) return seedContent;

  const [settings, record, disciplines, offers, sessions, projects, platforms, courses, books, appearances, career, podcastPages] =
    await Promise.all([
      readSettings(db),
      list(db, "portfolio_record_items"),
      list(db, "portfolio_disciplines"),
      list(db, "portfolio_offers"),
      list(db, "portfolio_sessions"),
      list(db, "portfolio_projects"),
      list(db, "portfolio_platforms"),
      list(db, "portfolio_courses"),
      readBooks(db),
      list(db, "portfolio_appearances"),
      list(db, "portfolio_career"),
      list(db, "portfolio_podcast_pages"),
    ]);

  const anyFromDb = [settings, record, disciplines, offers, sessions, projects, platforms, courses, books, appearances, career, podcastPages].some(Boolean);

  return {
    source: anyFromDb ? "database" : "sample",
    settings: settings ?? seedContent.settings,
    record: record?.map(mapRecord) ?? seedContent.record,
    disciplines: disciplines?.map(mapDiscipline) ?? seedContent.disciplines,
    offers: offers?.map(mapOffer) ?? seedContent.offers,
    sessions: sessions?.map(mapSession) ?? seedContent.sessions,
    projects: projects?.map(mapProject) ?? seedContent.projects,
    platforms: platforms?.map(mapPlatform) ?? seedContent.platforms,
    courses: courses?.map(mapCourse) ?? seedContent.courses,
    books: books ?? seedContent.books,
    appearances: appearances?.map(mapAppearance) ?? seedContent.appearances,
    career: career?.map(mapCareer) ?? seedContent.career,
    podcastPages: podcastPages?.map(mapPodcast) ?? seedContent.podcastPages,
  };
});

/** The link a course card uses: the instructor referral link when there is one. */
export function courseHref(course: Course) {
  return course.referralUrl ?? course.publicUrl;
}
