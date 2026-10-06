import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: "Chartered Accountant, Group CFO and author: 23 years across hotel finance, operations and technology.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const c = await getContent();
  const s = c.settings;
  return (
    <>
      <section className="wrap section" aria-labelledby="about-h" style={{ paddingBottom: 48 }}>
        <div className="section-head" style={{ maxWidth: "48em" }}>
          <span className="kicker">About</span>
          <h1 id="about-h" className="display h1" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{s.aboutHeading}</h1>
          <p className="lead">{s.aboutIntro}</p>
        </div>
      </section>

      <section className="disciplines" aria-label="Areas of expertise">
        <div className="wrap disciplines__row">
          {c.disciplines.map((d) => (
            <div className="discipline" key={d.label}>
              <span className="discipline__label">{d.label}</span>
              <span className="discipline__proof">{d.proof}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section" aria-labelledby="career-h">
        <div className="split">
          <div className="section-head" style={{ flex: "1 1 300px" }}>
            <span className="kicker">Career</span>
            <h2 id="career-h" className="display h2">From audit in Delhi to Group CFO.</h2>
          </div>
          <ol className="career" style={{ flex: "999 1 560px" }}>
            {c.career.map((item) => (
              <li key={item.period + item.role}>
                <span className="career__period">{item.period}</span>
                <span className="career__body"><strong>{item.role}</strong>, {item.detail}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="actions">
          <Link href="/#work" className="btn btn--primary">Work with me →</Link>
          <Link href="/#notes" className="btn btn--outline">Get the monthly notes</Link>
        </div>
      </section>
    </>
  );
}
