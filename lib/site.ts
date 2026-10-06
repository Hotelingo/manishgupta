export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://camanishgupta.com").replace(/\/$/, "");
export const BOOK_SITE_URL = "https://book.ehotelmanagementschool.com";
export const APP_URL = "https://app.ehotelmanagementschool.com";
export const EHMS_URL = "https://www.ehotelmanagementschool.com";
export const PRIVACY_URL = `${BOOK_SITE_URL}/legal/privacy`;

/** Book-site storage. Covers from here are resized by the site (see next.config.ts). */
export const IMAGE_HOST = "https://lriyamltlgbrhsocyzrv.supabase.co/storage/v1/object/public/";

export const SITE_NAME = "Manish Gupta";
export const SITE_TITLE = "Manish Gupta · Hotel finance, operations and AI from the CFO's chair";
export const SITE_DESCRIPTION =
  "Hotel finance, operations and AI, learned in the CFO's chair and taught for yours. Books, courses, live cohorts, AI sessions, mentoring and advisory from Group CFO Manish Gupta.";

export function bookUrl(slug: string) {
  return `${BOOK_SITE_URL}/books/${slug}`;
}
