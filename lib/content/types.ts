// Shapes of everything the site displays. Each type matches one section of
// content/site.yaml, which is checked against these when the site is built.

export type ProjectStatus = "idea" | "prototype" | "beta" | "live";
export type OfferStatus = "open" | "waitlist";
export type SessionStatus = "upcoming" | "recorded";

export interface SiteSettings {
  heroEyebrow: string;
  /** Headline is rendered as: before + <em>emphasis</em> + after. */
  heroBefore: string;
  heroEmphasis: string;
  heroAfter: string;
  heroIntro: string;
  nowCaption: string;
  portraitUrl: string | null;
  recordCheckedOn: string;
  aboutHeading: string;
  aboutIntro: string;
  contactEmail: string;
  linkedinUrl: string | null;
  speakingTopics: string[];
}

export interface RecordItem {
  label: string;
  value: string;
  isTotal: boolean;
  sourceUrl: string | null;
}

export interface Discipline {
  label: string;
  proof: string;
}

export interface Offer {
  audience: string;
  title: string;
  description: string;
  formats: string;
  status: OfferStatus;
  ctaLabel: string;
  ctaUrl: string;
  waitlistNote: string | null;
}

export interface Session {
  title: string;
  audience: string;
  dateLabel: string;
  status: SessionStatus;
  url: string | null;
}

export interface Project {
  name: string;
  status: ProjectStatus;
  summary: string;
  url: string | null;
  urlLabel: string | null;
  caseStudyUrl: string | null;
  featured: boolean;
}

export interface Platform {
  platform: string;
  summary: string;
  url: string | null;
}

export interface Course {
  platform: string;
  title: string;
  stats: string;
  /** Instructor referral link. Used instead of publicUrl when present. */
  referralUrl: string | null;
  publicUrl: string | null;
}

export interface Book {
  slug: string;
  title: string;
  summary: string;
  theme: string;
  url: string;
}

export interface Guide {
  title: string;
  subtitle: string;
  url: string;
}

export interface Appearance {
  showName: string;
  linkLabel: string;
  url: string | null;
}

export interface CareerItem {
  period: string;
  role: string;
  detail: string;
}

export interface PodcastResource {
  kind: string;
  title: string;
  label: string;
  url: string;
}

export interface PodcastPage {
  slug: string;
  showName: string;
  intro: string;
  resources: PodcastResource[];
}

export interface SiteContent {
  settings: SiteSettings;
  record: RecordItem[];
  disciplines: Discipline[];
  offers: Offer[];
  sessions: Session[];
  projects: Project[];
  platforms: Platform[];
  courses: Course[];
  books: Book[];
  guides: Guide[];
  appearances: Appearance[];
  career: CareerItem[];
  podcastPages: PodcastPage[];
}
