import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { bookUrl } from "@/lib/site";
import type { Course, SiteContent } from "./types";

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

export function loadContent(source: string): SiteContent {
  let raw: unknown;
  try {
    raw = parse(source);
  } catch (error) {
    throw new Error(`content/site.yaml could not be read: ${(error as Error).message}`);
  }
  const root = obj(raw, "file");
  const s = obj(root.settings, "settings");
  const topics = s.speakingTopics;
  if (!Array.isArray(topics)) throw new ContentError("settings.speakingTopics", "expected a list");

  return {
    settings: {
      heroEyebrow: text(s, "heroEyebrow", "settings"),
      heroBefore: text(s, "heroBefore", "settings"),
      heroEmphasis: text(s, "heroEmphasis", "settings"),
      heroAfter: text(s, "heroAfter", "settings"),
      heroIntro: text(s, "heroIntro", "settings"),
      nowCaption: text(s, "nowCaption", "settings"),
      portraitUrl: optional(s, "portraitUrl", "settings"),
      recordCheckedOn: text(s, "recordCheckedOn", "settings"),
      aboutHeading: text(s, "aboutHeading", "settings"),
      aboutIntro: text(s, "aboutIntro", "settings"),
      contactEmail: text(s, "contactEmail", "settings"),
      linkedinUrl: optional(s, "linkedinUrl", "settings"),
      speakingTopics: topics.map((t) => String(t)),
    },
    record: arr(root.record, "record").map((r, i) => ({
      label: text(r, "label", `record[${i + 1}]`),
      value: text(r, "value", `record[${i + 1}]`),
      isTotal: flag(r, "isTotal"),
      sourceUrl: optional(r, "sourceUrl", `record[${i + 1}]`),
    })),
    disciplines: arr(root.disciplines, "disciplines").map((r, i) => ({
      label: text(r, "label", `disciplines[${i + 1}]`),
      proof: text(r, "proof", `disciplines[${i + 1}]`),
    })),
    offers: arr(root.offers, "offers").map((r, i) => {
      const w = `offers[${i + 1}]`;
      return {
        audience: text(r, "audience", w),
        title: text(r, "title", w),
        description: text(r, "description", w),
        formats: text(r, "formats", w),
        status: oneOf(r, "status", ["open", "waitlist"] as const, w),
        ctaLabel: text(r, "ctaLabel", w),
        ctaUrl: text(r, "ctaUrl", w),
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
        url: optional(r, "url", w),
      };
    }),
    projects: arr(root.projects, "projects").map((r, i) => {
      const w = `projects[${i + 1}]`;
      return {
        name: text(r, "name", w),
        status: oneOf(r, "status", ["idea", "prototype", "beta", "live"] as const, w),
        summary: optional(r, "summary", w) ?? "",
        url: optional(r, "url", w),
        urlLabel: optional(r, "urlLabel", w),
        caseStudyUrl: optional(r, "caseStudyUrl", w),
        featured: flag(r, "featured"),
      };
    }),
    platforms: arr(root.platforms, "platforms").map((r, i) => ({
      platform: text(r, "platform", `platforms[${i + 1}]`),
      summary: text(r, "summary", `platforms[${i + 1}]`),
      url: optional(r, "url", `platforms[${i + 1}]`),
    })),
    courses: arr(root.courses, "courses").map((r, i) => {
      const w = `courses[${i + 1}]`;
      return {
        platform: text(r, "platform", w),
        title: text(r, "title", w),
        stats: text(r, "stats", w),
        referralUrl: optional(r, "referralUrl", w),
        publicUrl: optional(r, "publicUrl", w),
      };
    }),
    books: arr(root.books, "books").map((r, i) => {
      const w = `books[${i + 1}]`;
      const slug = text(r, "slug", w);
      return {
        slug,
        title: text(r, "title", w),
        theme: oneOf(r, "theme", ["reporting", "budgeting", "playbook", "leadership", "independent", "ai"] as const, w),
        url: optional(r, "url", w) ?? bookUrl(slug),
      };
    }),
    appearances: arr(root.appearances, "appearances").map((r, i) => ({
      showName: text(r, "showName", `appearances[${i + 1}]`),
      linkLabel: text(r, "linkLabel", `appearances[${i + 1}]`),
      url: optional(r, "url", `appearances[${i + 1}]`),
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
        resources: arr(r.resources, `${w}.resources`).map((x, j) => ({
          kind: text(x, "kind", `${w}.resources[${j + 1}]`),
          title: text(x, "title", `${w}.resources[${j + 1}]`),
          label: text(x, "label", `${w}.resources[${j + 1}]`),
          url: text(x, "url", `${w}.resources[${j + 1}]`),
        })),
      };
    }),
  };
}

export const getContent = cache(async (): Promise<SiteContent> => loadContent(readFileSync(FILE, "utf8")));

/** The link a course card uses: the instructor referral link when there is one. */
export function courseHref(course: Course) {
  return course.referralUrl ?? course.publicUrl;
}
