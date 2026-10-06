import type { Metadata } from "next";
import { formatCount } from "@/components/bits";
import { CourseExplorer } from "@/components/course-tabs";
import { getContent, reachTotal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Courses",
  description: "Hotel finance, financial analysis and AI for finance teams: every course on Udemy, Coursera and Alison in one place.",
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
          <h1 id="courses-h" className="display h1" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Every course, on the platform you already use.</h1>
          <p className="lead">Hotel finance, financial analysis and AI for finance teams. Pick a topic, then enrol on Udemy, Coursera or Alison.</p>
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
        <p className="small muted">Learner numbers as published on each platform, checked {c.settings.figuresCheckedOn}.</p>
      </section>
      <section className="wrap" aria-label="Course list" style={{ paddingBottom: 96 }}>
        <CourseExplorer courses={c.courses} />
      </section>
    </>
  );
}
