import type { Metadata } from "next";
import { formatCount } from "@/components/bits";
import { CourseExplorer } from "@/components/course-tabs";
import { getContent, reachTotal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore self-paced courses by Manish Gupta across Udemy, Coursera, Alison and MYCPE ONE, including professional CPE/CE options.",
  alternates: { canonical: "/courses" },
};

export default async function CoursesPage() {
  const c = await getContent();
  const total = reachTotal(c.reach);
  return (
    <>
      <section className="wrap section" aria-labelledby="courses-h" style={{ paddingBottom: 32, gap: 28 }}>
        <div className="section-head" style={{ maxWidth: "44em" }}>
          <span className="kicker">Courses</span>
          <h1 id="courses-h" className="display h1" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Learn on the platform that works for you.</h1>
          <p className="lead">Explore a selection of my hotel finance, financial analysis, AI and professional development courses on Udemy, Coursera, Alison and MYCPE ONE.</p>
        </div>
        <dl className="stat-row">
          <div>
            <dt>enrolments, all platforms</dt>
            <dd>{formatCount(total)}</dd>
          </div>
          {c.reach.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{formatCount(r.learners)}</dd>
            </div>
          ))}
        </dl>
        <p className="small muted">The learner figures above cover the four existing channel profiles listed, checked {c.settings.figuresCheckedOn}. MYCPE ONE learner figures are not included because no verified total is available.</p>
        <div className="enquiry-callout" style={{maxWidth:"100%", padding:"18px 24px", borderLeft:"3px solid var(--gold)", background:"var(--mist)"}}>
          <p className="small" style={{color:"var(--body)", lineHeight:1.6}}><strong>Need continuing professional education?</strong> Browse selected MYCPE ONE on-demand courses below, or <a href="https://my-cpe.com/continuing-education/manish-gupta" target="_blank" rel="noopener noreferrer">view my full MYCPE instructor profile ↗</a>. CPE/CE credit acceptance and access conditions depend on the course, qualification and platform subscription.</p>
        </div>
      </section>
      <section className="wrap" aria-label="Course list" style={{ paddingBottom: 96 }}>
        <CourseExplorer courses={c.courses} />
      </section>
    </>
  );
}
