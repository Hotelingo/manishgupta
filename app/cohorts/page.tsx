import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Cohorts & Practical Workshops",
  description: "Help choose our next live AI, business finance and hotel finance workshops. Register interest in a practical 2-hour masterclass or a multi-session cohort. Dates to be announced.",
  alternates: { canonical: "/cohorts" },
};

const tracks = [
  {
    tag: "AI · Business & leadership",
    title: "AI Productivity, ChatGPT Projects & Agents",
    audience: "Managers, entrepreneurs and professionals",
    masterclass: "Build a working AI productivity system: research, custom instructions, reusable prompts, projects and scheduled workflows.",
    workshop: "Build and test role-specific assistants, connect work tools where available, design automations and apply privacy and human-review controls.",
    outcomes: ["Reusable prompt and project templates", "A working role-specific workflow", "A review and safety checklist"],
  },
  {
    tag: "AI · Finance",
    title: "AI for Finance: FP&A, Forecasting & Reporting",
    audience: "Finance managers, controllers and CFO teams",
    masterclass: "Use AI to interpret P&L movements, explore budget variances, write management commentary and challenge a forecast.",
    workshop: "Work on sample financial data: variance drivers, scenarios, dashboards, board narrative and controlled AI-assisted analysis.",
    outcomes: ["Variance analysis pack", "Forecast assumptions and scenarios", "Management report with source checks"],
  },
  {
    tag: "Hospitality · Finance",
    title: "Hotel Budgeting, Forecasting & Profit Control",
    audience: "Hotel owners, GMs, finance and revenue leaders",
    masterclass: "Understand occupancy, ADR, RevPAR, departmental margin and the key levers behind hotel profitability.",
    workshop: "Build a departmental budget, model demand and cost scenarios, compare actuals with plan and present owner-ready actions.",
    outcomes: ["Hotel budget model", "Scenario-based rolling forecast", "Owner-facing action plan"],
  },
  {
    tag: "AI · Accounting profession",
    title: "AI for CPAs, Audit, Tax & Client Advisory",
    audience: "CPAs, accountants, auditors and CAS teams",
    masterclass: "See practical AI use cases for working papers, research, client communications and advisory, with confidentiality and verification.",
    workshop: "Prototype a reviewed workflow for client intake, document analysis, audit planning or management advisory using synthetic client examples.",
    outcomes: ["Client engagement workflow", "Reviewable evidence trail", "Firm-level AI control checklist"],
  },
];

const extras = [
  "Hotel P&L, USALI & Department Profitability",
  "Business Dashboards: Excel, Power BI & Financial Modelling",
  "Hotel Cash Flow, Working Capital & Owner Reporting",
  "Finance Manager to CFO: Leadership & Advisory",
];

const formUrl = "https://form.jotform.com/262941412631048";

export default function CohortsPage() {
  return (
    <>
      <section className="band-navy" aria-labelledby="cohort-title">
        <div className="wrap section" style={{paddingBlock: "76px 72px", gap: 20}}>
          <span className="kicker kicker--gold">Live, practical learning · Interest list open</span>
          <h1 id="cohort-title" className="display h1 on-navy" style={{maxWidth: 850}}>Help shape the next cohort.</h1>
          <p className="lead" style={{maxWidth: 720, color: "#d9e3f0"}}>AI for work, AI for finance, and hotel profitability — taught through practical exercises, not just slides. Choose the topics and format you would attend. We will schedule cohorts around genuine demand.</p>
          <div className="actions">
            <a className="btn btn--gold" href="#interest">Register your interest →</a>
            <a className="btn btn--ghost-light" href="#tracks">Explore the courses</a>
          </div>
          <p className="small" style={{color:"#d9e3f0"}}>No dates have been set. Expressing interest is free, does not reserve a place, and does not require payment.</p>
        </div>
      </section>

      <section className="wrap section" style={{gap:24}} aria-labelledby="formats-title">
        <div className="section-head">
          <span className="kicker">Choose your learning depth</span>
          <h2 id="formats-title" className="display h2">One focused session, or build something real.</h2>
        </div>
        <div className="cohort-format-grid">
          <article className="cohort-format">
            <span className="kicker">Focused live masterclass</span>
            <h3 className="display h2">2 hours</h3>
            <p className="cohort-price">$99 <span>indicative per participant</span></p>
            <p>One useful problem, a guided demonstration, examples you can reuse and live questions. Ideal for quickly applying a new technique.</p>
            <p className="small muted">Includes a worksheet or practical template, subject to the course.</p>
          </article>
          <article className="cohort-format">
            <span className="kicker">Hands-on implementation cohort</span>
            <h3 className="display h2">3–4 live sessions</h3>
            <p className="cohort-price">$249 <span>indicative per participant</span></p>
            <p>Typically spread across 2–3 weeks, with working examples, assignments, feedback and a practical deliverable you can use at work.</p>
            <p className="small muted">Format and total contact hours will be published before enrollment opens.</p>
          </article>
        </div>
        <p className="small muted">These are planning prices, not a payment offer. The form also asks your preferred budget to help design accessible cohorts.</p>
      </section>

      <section id="tracks" className="section--mist" aria-labelledby="tracks-title">
        <div className="wrap section">
          <div className="section-head">
            <span className="kicker">Proposed flagship tracks</span>
            <h2 id="tracks-title" className="display h2">Choose the skills you want to use next.</h2>
            <p className="muted-body">Each topic may run as a short masterclass or a longer project-based cohort. Final curricula will reflect participant needs.</p>
          </div>
          <div className="cohort-track-grid">
            {tracks.map((track) => (
              <article className="cohort-track" key={track.title}>
                <span className="kicker">{track.tag}</span>
                <h3 className="display h3">{track.title}</h3>
                <p className="small muted">{track.audience}</p>
                <div className="cohort-track-section"><strong>In a 2-hour masterclass</strong><p>{track.masterclass}</p></div>
                <div className="cohort-track-section"><strong>In a multi-session workshop</strong><p>{track.workshop}</p></div>
                <strong className="small">Practical takeaways</strong>
                <ul className="cohort-outcomes">{track.outcomes.map((x)=><li key={x}>{x}</li>)}</ul>
                <a href="#interest" className="btn btn--primary cohort-track-cta">Choose this topic →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="other-title">
        <div className="section-head">
          <span className="kicker">Also under consideration</span>
          <h2 className="display h2" id="other-title">Other topics you can vote for.</h2>
        </div>
        <div className="cohort-other-grid">{extras.map(t=><div key={t} className="cohort-other">{t}</div>)}</div>
        <a href="#interest" className="text-link">Suggest another topic or rank your priorities →</a>
      </section>

      <section id="interest" className="section--mist" aria-labelledby="interest-title">
        <div className="wrap section">
          <div className="section-head" style={{maxWidth:750}}>
            <span className="kicker">Priority interest list · Free</span>
            <h2 id="interest-title" className="display h2">Tell me what you would actually attend.</h2>
            <p className="muted-body">Rank the topics you want, tell us whether a focused masterclass or a hands-on workshop suits you, and share your price and scheduling preferences. We will contact you about relevant sessions when dates are confirmed.</p>
          </div>
          <div className="cohort-form-wrap">
            <iframe title="Live cohort course interest registration form" src={formUrl} loading="lazy" className="cohort-form" referrerPolicy="strict-origin-when-cross-origin" />
            <p className="small muted">The form is securely hosted by Jotform. If it does not appear in your browser, <a href={formUrl} target="_blank" rel="noopener noreferrer">open the registration form in a new tab ↗</a>.</p>
          </div>
          <p className="small muted">Registration is an expression of interest only. No confirmed dates, guaranteed seats or charges. Please review our <a href="https://book.ehotelmanagementschool.com/legal/privacy">privacy policy</a> before submitting.</p>
          <Link href="/courses" className="text-link">Prefer to start now? Explore the self-paced course library →</Link>
        </div>
      </section>
    </>
  );
}
