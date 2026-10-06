import { APP_URL, BOOK_SITE_URL, bookUrl } from "@/lib/site";
import type { SiteContent } from "./types";

// Built-in content. The site shows this until the Supabase tables exist and the
// environment variables are set; after that, the database wins for every list
// that has published rows. Square-bracket text is a placeholder to replace.

export const seedContent: SiteContent = {
  source: "sample",
  settings: {
    heroEyebrow: "Group CFO · Chartered Accountant · Author",
    heroBefore: "The CFO who has also ",
    heroEmphasis: "run the hotel",
    heroAfter: ".",
    heroIntro:
      "Twenty-three years across hotel finance, operations and technology, from Shangri-La to Group CFO. I write the Hotel Finance Practice Library and help finance teams put AI to work without losing their judgement.",
    nowCaption: "Group CFO, CHIC, NAIA & Muzuri · hotels, real estate and retail, DRC",
    portraitUrl: null,
    recordCheckedOn: "6 Oct 2026",
    aboutHeading: "Accountant by training, operator by habit.",
    aboutIntro:
      "I am a Chartered Accountant and Company Secretary with 23 years in finance: audit in Delhi, Shangri-La in Bangkok and Chiang Mai, then CFO roles in Myanmar and the DRC. Along the way I have run hotel operations as well as their books. I care less about finance as compliance and more about finance as a decision system: clear numbers, useful analysis, accountability and action.",
    contactEmail: "[hello@camanishgupta.com]",
    linkedinUrl: null,
    speakingTopics: [
      "How finance teams can use AI without losing judgement",
      "From reporting numbers to influencing decisions",
      "What hospitality teaches us about operating discipline",
      "Turning experience into books, courses and tools",
    ],
  },
  record: [
    { label: "Learners on Udemy", value: "146,065", isTotal: false, sourceUrl: "https://www.udemy.com/user/manish-224/" },
    { label: "Learners on Alison", value: "114,925", isTotal: false, sourceUrl: "https://alison.com/publisher/manish-gupta" },
    { label: "Enrolments, Udemy and Alison", value: "260,990", isTotal: true, sourceUrl: null },
    { label: "Courses on Coursera", value: "19", isTotal: false, sourceUrl: "https://www.coursera.org/instructor/~139904014" },
    { label: "Years in finance, 17 of them in hotels", value: "23", isTotal: false, sourceUrl: null },
    { label: "Hotel Finance Practice Library", value: "5 books · 4 guides", isTotal: false, sourceUrl: BOOK_SITE_URL },
    { label: "Recognition", value: "Top 10 CFOs in Asia, 2024", isTotal: false, sourceUrl: null },
  ],
  disciplines: [
    { label: "Hotel finance", proof: "Assistant FC at Shangri-La Bangkok to Group CFO across hotels, malls and retail." },
    { label: "Operations", proof: "Task-force Resident Manager for Shangri-La. Ran hotel operations in the CEO's absence from 2021." },
    { label: "Technology", proof: "Led an ERP rollout across 15 hotels and brought in revenue management systems." },
    { label: "AI", proof: "GenAI finance courses on Coursera. Building the Hotel Finance Workspace and close automations." },
  ],
  offers: [
    {
      audience: "For finance teams",
      title: "AI sessions",
      description:
        "Talks and workshops on using AI for analysis, forecasting and reporting, with the review controls finance work needs.",
      formats: "Keynote · Half-day workshop · Team programme",
      status: "open",
      ctaLabel: "Plan a session",
      ctaUrl: "#sessions",
      waitlistNote: null,
    },
    {
      audience: "For finance managers",
      title: "Mentoring",
      description:
        "One-to-one support for finance managers moving toward CFO: commercial judgement, owner and board reporting, leadership presence.",
      formats: "[FORMAT, e.g. monthly 1:1 over six months]",
      status: "open",
      ctaLabel: "Apply for mentoring",
      ctaUrl: "#notes",
      waitlistNote: null,
    },
    {
      audience: "For owners",
      title: "Advisory",
      description:
        "Selective finance advisory for hotel owners and growing businesses: reporting that owners can act on, budgets, cash and controls.",
      formats: "Reporting review · Budget and forecast · Fractional CFO",
      status: "waitlist",
      ctaLabel: "Join the waitlist",
      ctaUrl: "#notes",
      waitlistNote: "Opening [MONTH YEAR]. Join the list to hear first.",
    },
  ],
  sessions: [
    { title: "GenAI for financial forecasting and planning", audience: "Live online · Finance teams", dateLabel: "[DATE]", status: "upcoming", url: null },
    { title: "Using AI in the month-end close", audience: "Workshop · Controllers and accountants", dateLabel: "[DATE]", status: "upcoming", url: null },
    { title: "GenAI for financial data analysis", audience: "Recording and slides", dateLabel: "Recorded", status: "recorded", url: null },
  ],
  projects: [
    {
      name: "eHMS Hotel Finance Workspace",
      status: "beta",
      summary:
        "Budget, forecast, actuals and owner reporting for independent hotels, in one place instead of a dozen spreadsheets.",
      url: APP_URL,
      urlLabel: "Try the demo",
      caseStudyUrl: null,
      featured: true,
    },
    { name: "Month-end close assistant", status: "prototype", summary: "", url: null, urlLabel: null, caseStudyUrl: null, featured: false },
    { name: "Supplier reconciliation to Xero journals", status: "prototype", summary: "", url: null, urlLabel: null, caseStudyUrl: null, featured: false },
  ],
  platforms: [
    {
      platform: "Udemy",
      summary: "146,065 learners and 2,368 reviews, from hotel finance to financial analysis",
      url: "https://www.udemy.com/user/manish-224/",
    },
    { platform: "Udemy", summary: "Hotel Management School profile · [LEARNERS AND COURSES]", url: null },
    {
      platform: "Coursera",
      summary: "19 courses with Starweaver, from Mastering Hotel Financials to GenAI for Financial Forecasting",
      url: "https://www.coursera.org/instructor/~139904014",
    },
    {
      platform: "Alison",
      summary: "9 courses, 114,925 learners, including data analysis with Power BI and hospitality cash management",
      url: "https://alison.com/publisher/manish-gupta",
    },
    { platform: "eHMS", summary: "Hotel Menu Engineering · How to Read a Hotel P&L in 20 Minutes", url: BOOK_SITE_URL },
  ],
  courses: [
    { platform: "Udemy", title: "[Top Udemy course]", stats: "[learners] · [rating]", referralUrl: null, publicUrl: null },
    {
      platform: "Coursera",
      title: "Mastering Hotel Financials",
      stats: "4,256 learners · 4.8 from 17 reviews",
      referralUrl: null,
      publicUrl: "https://coursera.org/learn/mastering-hotel-financials",
    },
    {
      platform: "Alison",
      title: "Financial Modelling in Decision-Making and Business Planning",
      stats: "24,787 learners",
      referralUrl: null,
      publicUrl: "https://alison.com/publisher/manish-gupta",
    },
  ],
  books: [
    { slug: "hotel-financial-reporting-in-practice", title: "Hotel Financial Reporting in Practice", theme: "reporting", url: bookUrl("hotel-financial-reporting-in-practice") },
    { slug: "hotel-budgeting-and-forecasting", title: "Hotel Budgeting and Forecasting in Practice", theme: "budgeting", url: bookUrl("hotel-budgeting-and-forecasting") },
    { slug: "hotel-operations-financial-playbook", title: "Hotel Operations Financial Playbook", theme: "playbook", url: bookUrl("hotel-operations-financial-playbook") },
    { slug: "from-finance-manager-to-cfo", title: "From Finance Manager to CFO", theme: "leadership", url: bookUrl("from-finance-manager-to-cfo") },
    { slug: "independent-hotel-finance-made-simple", title: "Independent Hotel Finance Made Simple", theme: "independent", url: bookUrl("independent-hotel-finance-made-simple") },
  ],
  appearances: [
    { showName: "Daily Mastermind", linkLabel: "Listen", url: null },
    { showName: "Valiant CEO", linkLabel: "Read", url: null },
  ],
  career: [
    { period: "2025–now", role: "Group CFO", detail: "CHIC, NAIA & Muzuri, DRC. Hotels operated by Accor, malls, residential and franchised retail." },
    { period: "2017–2025", role: "CFO", detail: "Myanmar Treasure Hotel and Resort. ERP across 15 hotels; ran operations in the CEO's absence from 2021." },
    { period: "2009–2016", role: "Shangri-La Hotels and Resorts", detail: "Assistant FC in Bangkok, Financial Controller in Chiang Mai, task-force Resident Manager in Yangon, Manila and Boracay." },
    { period: "2001–2009", role: "Audit and finance", detail: "Delhi. T R Chadha & Co. and Basundhra Properties." },
    { period: "Alongside", role: "Founder", detail: "eHotel Management School and eHMS Press." },
  ],
  podcastPages: [
    {
      slug: "default",
      showName: "podcast",
      intro: "Everything I mentioned on the episode is below, plus one free thing I promised.",
      resources: [
        { kind: "Guide", title: "13-Week Cash Flow for Hotels", label: "eHMS Press", url: `${BOOK_SITE_URL}/decision-guides` },
        { kind: "Tool", title: "Hotel Finance Workspace demo", label: "Beta", url: APP_URL },
        { kind: "Session", title: "How finance teams can use AI without losing judgement", label: "AI sessions", url: "/#sessions" },
      ],
    },
  ],
};
