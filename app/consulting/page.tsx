import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryFormEmbed } from "@/components/enquiry-form-embed";
import "../enquiries.css";

export const metadata: Metadata = {
  title: "Hotel Consulting & Financial Advisory",
  description: "Enquire about practical hotel finance, profitability, budgeting, owner reporting and finance transformation consulting from Manish Gupta.",
  alternates: { canonical: "/consulting" },
};

const areas = [
  {
    name: "Profitability & performance",
    description: "Review the hotel P&L, departmental profit, payroll and cost drivers, management reporting and owner-facing decisions. Move from explaining variances to acting on them.",
  },
  {
    name: "Budgets, forecasts & cash",
    description: "Set driver-based assumptions for rooms, F&B and costs; strengthen budget governance, rolling forecasts, cash-flow visibility and capital planning.",
  },
  {
    name: "Controls, systems & finance teams",
    description: "Improve internal controls, reporting processes and finance-team readiness. Explore practical ERP, PMS and financial-planning workflows without promising a one-size-fits-all implementation.",
  },
];

export default function ConsultingPage() {
  return (
    <>
      <section className="band-navy enquiry-hero" aria-labelledby="consulting-title">
        <div className="wrap section">
          <span className="kicker kicker--gold">Selective consulting · Hotel owners, GMs and teams</span>
          <h1 id="consulting-title" className="display h1 on-navy" style={{ maxWidth: 900 }}>Better hotel decisions start with clearer financial control.</h1>
          <p className="lead">Finance and operations advice grounded in hotel leadership — from stronger budgets and owner reporting to profitability, controls and practical systems improvements.</p>
          <div className="actions">
            <a href="#consulting-enquiry" className="btn btn--gold">Discuss your hotel’s challenge →</a>
            <Link href="/mentorship" className="btn btn--ghost-light">Looking for personal mentorship?</Link>
          </div>
          <p className="small" style={{ color: "#d9e3f0" }}>Initial enquiries are reviewed individually. Scope, format and fees are discussed only if there is a potential fit.</p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="consulting-services">
        <div className="section-head">
          <span className="kicker">Where I can help</span>
          <h2 id="consulting-services" className="display h2">Practical finance support for hotels and growing groups.</h2>
          <p className="muted-body">Engagements can be narrow — one reporting problem — or part of a wider planning or finance improvement programme. The scope is defined after understanding your priorities.</p>
        </div>
        <div className="enquiry-grid">
          {areas.map((area) => <article className="enquiry-card" key={area.name}>
            <h3>{area.name}</h3>
            <p>{area.description}</p>
          </article>)}
        </div>
        <div className="enquiry-callout"><p><strong>Typical starting point:</strong> a clear operational or financial question, a review of available information, and a discussion about the decisions you want to improve. No documents or confidential financial information are needed in the initial enquiry.</p></div>
      </section>

      <section className="section--mist" aria-labelledby="consulting-process">
        <div className="wrap section">
          <div className="section-head">
            <span className="kicker">How enquiries work</span>
            <h2 id="consulting-process" className="display h2">A simple first conversation, not a contract.</h2>
          </div>
          <ol className="enquiry-steps">
            <li><strong>1. Describe the challenge</strong><p>Share your hotel or portfolio context and the outcome you are looking for.</p></li>
            <li><strong>2. I review your enquiry</strong><p>I assess the problem and whether my experience is relevant to your needs.</p></li>
            <li><strong>3. Discuss a possible scope</strong><p>If it looks suitable, we can discuss next steps, remote or on-site options, timelines and fees.</p></li>
          </ol>
        </div>
      </section>

      <section id="consulting-enquiry" className="wrap section" aria-labelledby="consulting-form-title">
        <div className="section-head" style={{maxWidth:760}}>
          <span className="kicker">Consulting enquiry</span>
          <h2 id="consulting-form-title" className="display h2">Tell me about your hotel or business.</h2>
          <p className="muted-body">A few details are enough to begin. I will contact you after reviewing the request if there is a potential fit. This is not a confirmed engagement or booking.</p>
        </div>
        <EnquiryFormEmbed formId="262942872426061" title="Hotel finance consulting enquiry" />
        <p className="small muted">Please do not submit confidential business records or personal financial information. See the <a href="https://book.ehotelmanagementschool.com/legal/privacy">privacy policy</a>.</p>
        <Link className="text-link" href="/mentorship">Interested in one-to-one career mentorship instead? →</Link>
      </section>
    </>
  );
}
