export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://camanishgupta.com").replace(/\/$/, "");
export const BOOK_SITE_URL = "https://book.ehotelmanagementschool.com";
export const APP_URL = "https://app.ehotelmanagementschool.com";
export const EHMS_URL = "https://www.ehotelmanagementschool.com";
export const PRIVACY_URL = `${BOOK_SITE_URL}/legal/privacy`;

export const SITE_NAME = "Manish Gupta";
export const SITE_TITLE = "Manish Gupta · Hotel CFO for finance, operations, technology and AI";
export const SITE_DESCRIPTION =
  "Group CFO, Chartered Accountant and author of the Hotel Finance Practice Library. AI sessions for finance teams, mentoring for future CFOs, and advisory.";

export function bookUrl(slug: string) {
  return `${BOOK_SITE_URL}/books/${slug}`;
}
