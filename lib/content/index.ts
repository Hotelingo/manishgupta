import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { IMAGE_HOST, bookUrl } from "@/lib/site";
import type { SiteContent } from "./types";

// All site content comes from content/site.yaml, read when the site is built.
// No database: to change the site, edit that file and commit. A mistake in the
// file stops the build with a message naming the problem, and the live site
// keeps running the previous version.

const FILE = path.join(process.cwd(), "content", "site.yaml");

class ContentError extends Error {
  constructor(where: string, problem: string) {
    super(`content/site.yaml → ${where}: ${problem}`);
  }
}

type Obj = Record<string, unknown>;

function obj(value: unknown, where: string): Obj {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ContentError(where, "expected a group of fields");
  return value as Obj;
}

function arr(value: unknown, where: string): Obj[] {
  if (!Array.isArray(value)) throw new ContentError(where, "expected a list (items starting with \"- \")");
  return value.map((item, i) => obj(item, `${where}[${i + 1}]`));
}

function text(o: Obj, key: string, where: string): string {
  const v = o[key];
  if (typeof v === "number") return String(v);
  if (typeof v !== "string") throw new ContentError(`${where}.${key}`, "missing or not text (put it in quotes)");
  return v;
}

function optional(o: Obj, key: string, where: string): string | null {
  const v = o[key];
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string") throw new ContentError(`${where}.${key}`, "must be text in quotes, or null");
  return v;
}

function flag(o: Obj, key: string): boolean {
  return o[key] === true;
}

function oneOf<T extends string>(o: Obj, key: string, allowed: readonly T[], where: string): T {
  const v = text(o, key, where);
  if (!allowed.includes(v as T)) throw new ContentError(`${where}.${key}`, `"${v}" is not one of ${allowed.map((a) => `"${a}"`).join(", ")}`);
  return v as T;
}

function link(o: Obj, key: string, where: string): string | null {
  const v = optional(o, key, where);
  if (v && !/^(https:\/\/|\/|#)/.test(v)) {
    throw new ContentError(`${where}.${key}`, "a link must start with https://, / (a page on this site) or # (a section)");
  }
  return v;
}

function count(o: Obj, key: string, where: string): number | null {
  const v = o[key];
  if (v === null || v === undefined) return null;
  if (typeof v !== "number" || !Number.isInteger(v) || v < 0) {
    throw new ContentError(`${where}.${key}`, "must be a whole number without commas or quotes, e.g. 146065, or null");
  }
  return v;
}

function image(o: Obj, key: string, where: string): string | null {
  const v = optional(o, key, where);
  if (v && !v.startsWith("/images/") && !v.startsWith(IMAGE_HOST)) {
    throw new ContentError(`${where}.${key}`, "images must be uploaded to public/images (write \"/images/name.jpg\") or come from the book site's storage");
  }
  return v;
}

const COURSE_PLATFORMS = ["Udemy", "Coursera", "Alison"] as const;

export function loadContent(source: string): SiteContent {
  let raw: unknown;
  try {
    raw = parse(source);
  } catch (error) {
    throw new Error(`content/site.yaml could not be read: ${(error as Error).message}`);
  }
  const root = obj(raw, "file");
  const s = obj(root.settings, "settings");
  const st = obj(root.story, "story");

  const platforms = arr(root.platforms, "platforms").map((r, i) => ({
    platform: text(r, "platform", `platforms[${i + 1}]`),
    label: optional(r, "label", `platforms[${i + 1}]`) ?? text(r, "platform", `platforms[${i + 1}]`),
    summary: text(r, "summary", `platforms[${i + 1}]`),
    url: link(r, "url", `platforms[${i + 1}]`),
  }));
  const profileFor = (platform: string) => platforms.find((p) => p.platform === platform && p.url)?.url ?? null;

  const reach = arr(root.reach, "reach").map((r, i) => {
    const w = `reach[${i + 1}]`;
    const learners = count(r, "learners", w);
    if (learners === null) throw new ContentError(`${w}.learners`, "is missing");
    return { label: text(r, "label", w), learners, sourceUrl: link(r, "sourceUrl", w) };
  });
  if (reach.length < 1 || reach.length > 4) throw new ContentError("reach", "the chart shows between one and four platforms");

  return {
    settings: {
      heroEyebrow: text(s, "heroEyebrow", "settings"),
      heroBefore: text(s, "heroBefore", "settings"),
      heroEmphasis: text(s, "heroEmphasis", "settings"),
      heroAfter: text(s, "heroAfter", "settings"),
      heroIntro: text(s, "heroIntro", "settings"),
      portraitUrl: image(s, "portraitUrl", "settings"),
      introVideoUrl: link(s, "introVideoUrl", "settings"),
      nowCaption: text(s, "nowCaption", "settings"),
      figuresCheckedOn: text(s, "figuresCheckedOn", "settings"),
      aboutHeading: text(s, "aboutHeading", "settings"),
      aboutIntro: text(s, "aboutIntro", "settings"),
      contactEmail: text(s, "contactEmail", "settings"),
      linkedinUrl: link(s, "linkedinUrl", "settings"),
      notesHeading: text(s, "notesHeading", "settings"),
      notesText: text(s, "notesText", "settings"),
    },
    reach,
    proof: arr(root.proof, "proof").map((r, i) => {
      const w = `proof[${i + 1}]`;
      return { value: text(r, "value", w), label: text(r, "label", w), icon: oneOf(r, "icon", ["years", "book", "award"] as const, w) };
    }),
    disciplines: arr(root.disciplines, "disciplines").map((r, i) => ({
      label: text(r, "label", `disciplines[${i + 1}]`),
      proof: text(r, "proof", `disciplines[${i + 1}]`),
    })),
    story: {
      title: text(st, "title", "story"),
      beats: arr(st.beats, "story.beats").map((r, i) => {
        const w = `story.beats[${i + 1}]`;
        return { when: text(r, "when", w), title: text(r, "title", w), text: text(r, "text", w) };
      }),
    },
    waysIn: arr(root.waysIn, "waysIn").map((r, i) => {
      const w = `waysIn[${i + 1}]`;
      return {
        step: text(r, "step", w),
        title: text(r, "title", w),
        text: text(r, "text", w),
        ctaLabel: text(r, "ctaLabel", w),
        ctaUrl: link(r, "ctaUrl", w) ?? "#notes",
        style: oneOf(r, "style", ["light", "dark"] as const, w),
      };
    }),
    cohorts: arr(root.cohorts, "cohorts").map((r, i) => {
      const w = `cohorts[${i + 1}]`;
      return {
        audience: text(r, "audience", w),
        title: text(r, "title", w),
        promise: text(r, "promise", w),
        weeks: optional(r, "weeks", w),
        nextCohort: optional(r, "nextCohort", w),
        videoUrl: link(r, "videoUrl", w),
        theme: oneOf(r, "theme", ["teal", "navy", "wine", "olive"] as const, w),
      };
    }),
    offers: arr(root.offers, "offers").map((r, i) => {
      const w = `offers[${i + 1}]`;
      return {
        audience: text(r, "audience", w),
        title: text(r, "title", w),
        description: text(r, "description", w),
        formats: text(r, "formats", w),
        status: oneOf(r, "status", ["open", "waitlist"] as const, w),
        ctaLabel: text(r, "ctaLabel", w),
        ctaUrl: link(r, "ctaUrl", w) ?? "#notes",
        waitlistNote: optional(r, "waitlistNote", w),
      };
    }),
    sessions: arr(root.sessions, "sessions").map((r, i) => {
      const w = `sessions[${i + 1}]`;
      return {
        title: text(r, "title", w),
        audience: text(r, "audience", w),
        dateLabel: text(r, "dateLabel", w),
        status: oneOf(r, "status", ["upcoming", "recorded"] as const, w),
        url: link(r, "url", w),
      };
    }),
    projects: arr(root.projects, "projects").map((r, i) => {
      const w = `projects[${i + 1}]`;
      return {
        name: text(r, "name", w),
        status: oneOf(r, "status", ["idea", "prototype", "beta", "live"] as const, w),
        summary: optional(r, "summary", w) ?? "",
        url: link(r, "url", w),
        urlLabel: optional(r, "urlLabel", w),
        caseStudyUrl: link(r, "caseStudyUrl", w),
        featured: flag(r, "featured"),
      };
    }),
    platforms,
    courses: arr(root.courses, "courses").map((r, i) => {
      const w = `courses[${i + 1}]`;
      const platform = oneOf(r, "platform", COURSE_PLATFORMS, w);
      return {
        platform,
        topic: text(r, "topic", w),
        title: text(r, "title", w),
        learners: count(r, "learners", w),
        rating: optional(r, "rating", w),
        featured: flag(r, "featured"),
        href: link(r, "referralUrl", w) ?? link(r, "publicUrl", w) ?? profileFor(platform),
        videoUrl: link(r, "videoUrl", w),
      };
    }),
    books: arr(root.books, "books").map((r, i) => {
      const w = `books[${i + 1}]`;
      const slug = text(r, "slug", w);
      return {
        slug,
        title: text(r, "title", w),
        summary: text(r, "summary", w),
        theme: oneOf(r, "theme", ["reporting", "budgeting", "playbook", "leadership", "independent", "ai"] as const, w),
        url: link(r, "url", w) ?? bookUrl(slug),
        coverUrl: image(r, "coverUrl", w),
        videoUrl: link(r, "videoUrl", w),
      };
    }),
    guides: arr(root.guides, "guides").map((r, i) => {
      const w = `guides[${i + 1}]`;
      const url = link(r, "url", w);
      if (!url) throw new ContentError(`${w}.url`, "is missing");
      return { title: text(r, "title", w), subtitle: text(r, "subtitle", w), url, coverUrl: image(r, "coverUrl", w) };
    }),
    speakingTopics: arr(root.speakingTopics, "speakingTopics").map((r, i) => {
      const w = `speakingTopics[${i + 1}]`;
      return { tag: text(r, "tag", w), title: text(r, "title", w), text: text(r, "text", w) };
    }),
    appearances: arr(root.appearances ?? [], "appearances").map((r, i) => ({
      showName: text(r, "showName", `appearances[${i + 1}]`),
      linkLabel: text(r, "linkLabel", `appearances[${i + 1}]`),
      url: link(r, "url", `appearances[${i + 1}]`),
    })),
    career: arr(root.career, "career").map((r, i) => ({
      period: text(r, "period", `career[${i + 1}]`),
      role: text(r, "role", `career[${i + 1}]`),
      detail: text(r, "detail", `career[${i + 1}]`),
    })),
    podcastPages: arr(root.podcastPages, "podcastPages").map((r, i) => {
      const w = `podcastPages[${i + 1}]`;
      const slug = text(r, "slug", w);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new ContentError(`${w}.slug`, "use lower-case letters, numbers and hyphens only");
      return {
        slug,
        showName: text(r, "showName", w),
        intro: text(r, "intro", w),
        resources: arr(r.resources, `${w}.resources`).map((x, j) => {
          const wx = `${w}.resources[${j + 1}]`;
          const url = link(x, "url", wx);
          if (!url) throw new ContentError(`${wx}.url`, "is missing");
          return { kind: text(x, "kind", wx), title: text(x, "title", wx), label: text(x, "label", wx), url };
        }),
      };
    }),
  };
}

export const getContent = cache(async (): Promise<SiteContent> => loadContent(readFileSync(FILE, "utf8")));

/** Total learners across the reach chart. */
export function reachTotal(reach: { learners: number }[]) {
  return reach.reduce((sum, r) => sum + r.learners, 0);
}
