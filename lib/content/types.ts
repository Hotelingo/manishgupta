// Shapes of everything the site displays. Each type matches one section of
// content/site.yaml, which is checked against these when the site is built.

export type ProjectStatus = "idea" | "prototype" | "beta" | "live";
export type OfferStatus = "open" | "waitlist";
export type SessionStatus = "upcoming" | "recorded";
export type ProofIcon = "years" | "book" | "award";
export type WayStyle = "light" | "dark";
export type CohortTheme = "teal" | "navy" | "wine" | "olive";
export type CoursePlatform = "Udemy" | "Coursera" | "Alison";

export interface SiteSettings {
  heroEyebrow: string;
  /** Headline is rendered as: before + <em>emphasis</em> + after. */
  heroBefore: string;
  heroEmphasis: string;
  heroAfter: string;
  heroIntro: string;
  portraitUrl: string | null;
  introVideoUrl: string | null;
  nowCaption: string;
  figuresCheckedOn: string;
  aboutHeading: string;
  aboutIntro: string;
  contactEmail: string;
  linkedinUrl: string | null;
  notesHeading: string;
  notesText: string;
}

export interface ReachItem {
  label: string;
  learners: number;
  sourceUrl: string | null;
}

export interface ProofItem {
  value: string;
  label: string;
  icon: ProofIcon;
}

export interface Discipline {
  label: string;
  proof: string;
}

export interface StoryBeat {
  when: string;
  title: string;
  text: string;
}

export interface Story {
  title: string;
  beats: StoryBeat[];
}

export interface WayIn {
  step: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaUrl: string;
  style: WayStyle;
}

export interface Cohort {
  audience: string;
  title: string;
  promise: string;
  weeks: string | null;
  nextCohort: string | null;
  videoUrl: string | null;
  theme: CohortTheme;
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
  /** Name shown in the footer, e.g. "Udemy · Hotel Management School". */
  label: string;
  summary: string;
  url: string | null;
}

export interface Course {
  platform: CoursePlatform;
  topic: string;
  title: string;
  learners: number | null;
  rating: string | null;
  featured: boolean;
  /** Where the card links: referral link, else public link, else the platform profile. */
  href: string | null;
  videoUrl: string | null;
}

export interface Book {
  slug: string;
  title: string;
  summary: string;
  theme: string;
  url: string;
  coverUrl: string | null;
  videoUrl: string | null;
}

export interface Guide {
  title: string;
  subtitle: string;
  url: string;
  coverUrl: string | null;
}

export interface SpeakingTopic {
  tag: string;
  title: string;
  text: string;
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
  reach: ReachItem[];
  proof: ProofItem[];
  disciplines: Discipline[];
  story: Story;
  waysIn: WayIn[];
  cohorts: Cohort[];
  offers: Offer[];
  sessions: Session[];
  projects: Project[];
  platforms: Platform[];
  courses: Course[];
  books: Book[];
  guides: Guide[];
  speakingTopics: SpeakingTopic[];
  appearances: Appearance[];
  career: CareerItem[];
  podcastPages: PodcastPage[];
}
