import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryFormEmbed } from "@/components/enquiry-form-embed";
import "../enquiries.css";

export const metadata: Metadata = {
  title: "One-to-One Finance Leadership Mentorship",
  description: "Enquire about individual career mentoring for finance managers, controllers and aspiring CFOs, with practical hotel finance and leadership development.",
  alternates: { canonical: "/mentorship" },
};

const areas = [
  {
    name: "Finance Manager → CFO",
    description: "Assess the next skills and responsibilities you need, from ownership of reporting to financial strategy, commercial judgement and executive leadership.",
  },
  {
    name: "Leadership & communication",
    description: "Build confidence in presenting to boards and owners, influencing operational leaders and translating financial analysis into decisions.",
  },
  {
    name: "Practical career development",
    description: "Work through your professional goals, important skill gaps and real-life leadership challenges with accountability and resources suited to your role.",
  },
];

export default function MentorshipPage() {
  return (
    <>
      <section className="band-navy enquiry-hero" aria-labelledby="mentorship-title">
        <div className="wrap section">
          <span className="kicker kicker--gold">Personal mentorship · Finance careers & leadership</span>
          <h1 id="mentorship-title" className="display h1 on-navy" style={{ maxWidth: 920 }}>From finance manager to trusted business leader.</h1>
          <p className="lead">Individual mentoring for finance professionals ready to move beyond producing reports — toward commercial decisions, CFO responsibilities and leading people.</p>
          <div className="actions">
            <a href="#mentorship-enquiry" className="btn btn--gold">Enquire about mentorship →</a>
            <Link className="btn btn--ghost-light" href="/consulting">Need consulting for a hotel?</Link>
          </div>
          <p className="small" style={{color:"#d9e3f0"}}>Enquiries are reviewed individually. No mentoring places, dates or fees are confirmed at this stage.</p>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="mentorship-help">
        <div className="section-head">
          <span className="kicker">What we could work on</span>
          <h2 id="mentorship-help" className="display h2">Your next step, with real-world context.</h2>
          <p className="muted-body">Designed for aspiring CFOs, controllers, hotel finance professionals and experienced managers taking on broader responsibility.</p>
        </div>
        <div className="enquiry-grid">
          {areas.map((area) => <article className="enquiry-card" key={area.name}>
            <h3>{area.name}</h3>
            <p>{area.description}</p>
          </article>)}
        </div>
        <div className="enquiry-callout"><p><strong>Potential formats:</strong> a focused one-to-one career discussion or a recurring mentoring relationship with a roadmap, reflection and accountability. The structure and frequency are only agreed after a conversation.</p></div>
      </section>

      <section className="section--mist" aria-labelledby="mentorship-process">
        <div className="wrap section">
          <div className="section-head">
            <span className="kicker">The first step</span>
            <h2 id="mentorship-process" className="display h2">Tell me where you are and where you want to go.</h2>
          </div>
          <ol className="enquiry-steps">
            <li><strong>1. Share your goals</strong><p>Tell me about your role, professional background and the challenges you want to address.</p></li>
            <li><strong>2. I consider the fit</strong><p>I review your enquiry and think about whether a useful mentoring approach is possible.</p></li>
            <li><strong>3. Explore next steps</strong><p>If appropriate, we can discuss format, availability and any potential engagement details.</p></li>
          </ol>
        </div>
      </section>

      <section id="mentorship-enquiry" className="wrap section" aria-labelledby="mentorship-form-title">
        <div className="section-head" style={{maxWidth:760}}>
          <span className="kicker">Personal mentorship enquiry</span>
          <h2 id="mentorship-form-title" className="display h2">Start with a short introduction.</h2>
          <p className="muted-body">Share your current role and what you hope to accomplish. I will follow up after reviewing your enquiry if there is a potential fit. Submitting this form does not reserve a place or create a paid commitment.</p>
        </div>
        <EnquiryFormEmbed formId="262942893037062" title="Finance leadership mentorship enquiry" />
        <p className="small muted">Your information is used to respond to your enquiry. See the <a href="https://book.ehotelmanagementschool.com/legal/privacy">privacy policy</a>.</p>
        <Link href="/consulting" className="text-link">Looking for hotel finance consulting instead? →</Link>
      </section>
    </>
  );
}
