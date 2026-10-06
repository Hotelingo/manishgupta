import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { StatusChip } from "@/components/site-chrome";
import { courseHref, getContent } from "@/lib/content";
import { APP_URL, BOOK_SITE_URL, EHMS_URL, SITE_URL } from "@/lib/site";

function hostOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

// Rebuild the page from the database at most every five minutes.
export const revalidate = 300;

export default async function HomePage() {
  const c = await getContent();
  const s = c.settings;
  const featured = c.projects.find((p) => p.featured) ?? c.projects[0];
  const otherProjects = c.projects.filter((p) => p !== featured);
  const totalIndex = c.record.findIndex((r) => r.isTotal);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Manish Gupta",
    url: SITE_URL,
    jobTitle: "Group CFO",
    description: s.heroIntro,
    hasCredential: "Chartered Accountant (ICAI)",
    sameAs: [s.linkedinUrl, ...c.platforms.map((p) => p.url), BOOK_SITE_URL].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Hero */}
      <section className="wrap hero" aria-labelledby="hero-h">
        <div className="hero__text">
          <div className="eyebrow">
            <span className="eyebrow__rule" aria-hidden="true" />
            <span>{s.heroEyebrow}</span>
          </div>
          <h1 id="hero-h" className="display h1">
            {s.heroBefore}
            <em>{s.heroEmphasis}</em>
            {s.heroAfter}
          </h1>
          <p className="lead">{s.heroIntro}</p>
          <div className="actions">
            <Link href="#work" className="btn btn--primary">Work with me →</Link>
            <Link href="#notes" className="btn btn--outline">Get the monthly notes</Link>
          </div>
        </div>
        <figure className="portrait">
          {s.portraitUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="portrait__img" src={s.portraitUrl} alt="Manish Gupta" width={640} height={800} />
          ) : (
            <div className="portrait__placeholder" role="img" aria-label="Portrait to be added">[ PORTRAIT · 4:5 ]</div>
          )}
          <figcaption>
            <span className="kicker kicker--gold">Now</span>
            <span>{s.nowCaption}</span>
          </figcaption>
        </figure>
      </section>

      {/* Four disciplines */}
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

      {/* The record */}
      <section className="band-navy" aria-labelledby="record-h">
        <div className="wrap record">
          <div className="record__intro">
            <span className="kicker kicker--gold">The record</span>
            <h2 id="record-h" className="display">Checked figures, not adjectives.</h2>
            <p>Each figure is as published on the platform, with the date it was checked.</p>
          </div>
          <dl className="ledger">
            {c.record.map((r, i) => (
              <div
                key={r.label}
                className={`ledger__row${r.isTotal ? " ledger__row--total" : ""}${i === totalIndex - 1 ? " ledger__row--before-total" : ""}`}
              >
                <dt>{r.sourceUrl ? <a href={r.sourceUrl}>{r.label}</a> : r.label}</dt>
                <span className="ledger__leader" aria-hidden="true" />
                <dd>{r.value}</dd>
              </div>
            ))}
            <div className="ledger__note">Checked {s.recordCheckedOn} · follow a label for its source</div>
          </dl>
        </div>
      </section>

      {/* Work with me */}
      <section id="work" className="wrap section" aria-labelledby="work-h">
        <div className="section-head">
          <span className="kicker">Work with me</span>
          <h2 id="work-h" className="display h2">Three ways in, depending on where you sit.</h2>
        </div>
        <div className="offers">
          {c.offers.map((o) => (
            <article className="offer" key={o.title}>
              <div className="offer__top">
                <span className="kicker">{o.audience}</span>
                {o.status === "waitlist" && <StatusChip status="waitlist" />}
              </div>
              <h3 className="h3">{o.title}</h3>
              <p>{o.description}</p>
              <p className="offer__formats">{o.status === "waitlist" && o.waitlistNote ? o.waitlistNote : o.formats}</p>
              <a href={o.ctaUrl} className="text-link">{o.ctaLabel} →</a>
            </article>
          ))}
        </div>
      </section>

      {/* AI Lab */}
      <section id="sessions" className="section--mist" aria-labelledby="lab-h">
        <div className="wrap section">
          <div className="section-head section-head--split">
            <div>
              <span className="kicker">AI Lab</span>
              <h2 id="lab-h" className="display h2">What I am building and teaching right now.</h2>
            </div>
          </div>
          <div className="cols">
            <div className="panel panel--list">
              <h3 className="panel__title">Sessions</h3>
              {c.sessions.map((x) => (
                <div className="session" key={x.title}>
                  <span className={`session__date${x.status === "recorded" ? " session__date--past" : ""}`}>{x.dateLabel}</span>
                  <div className="session__body">
                    <span className="session__title">{x.title}</span>
                    <span className="small muted">{x.audience}</span>
                  </div>
                  <a href={x.url ?? "#notes"} className="plain-link">{x.status === "recorded" ? "Watch" : "Register"}</a>
                </div>
              ))}
            </div>
            <div className="stack">
              {featured && (
                <article className="panel project">
                  <div className="project__meta">
                    <StatusChip status={featured.status} />
                    {featured.url && <span className="small muted">{hostOf(featured.url)}</span>}
                  </div>
                  <h3 className="h3" style={{ fontSize: 26 }}>{featured.name}</h3>
                  {featured.summary && <p style={{ color: "var(--body)" }}>{featured.summary}</p>}
                  <div className="project__links">
                    {featured.url && <a href={featured.url} className="text-link">{featured.urlLabel ?? "Open"} ↗</a>}
                    {featured.caseStudyUrl && <a href={featured.caseStudyUrl} className="plain-link">Why I built it</a>}
                  </div>
                </article>
              )}
              {otherProjects.map((p) => (
                <article className="panel project project--compact" key={p.name}>
                  <StatusChip status={p.status} />
                  <span className="project__name">{p.name}</span>
                  {(p.caseStudyUrl || p.url) && <a href={(p.caseStudyUrl ?? p.url)!} className="plain-link">{p.caseStudyUrl ? "Case study" : p.urlLabel ?? "Open"}</a>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hospitality */}
      <section id="hospitality" className="wrap section" aria-labelledby="hosp-h">
        <div className="split" style={{ alignItems: "flex-end", gap: "24px 64px" }}>
          <div className="section-head" style={{ flex: "1 1 420px" }}>
            <span className="kicker">Where the practice comes from</span>
            <h2 id="hosp-h" className="display h2">Seventeen years of hotel finance, written down.</h2>
          </div>
          <p style={{ flex: "1 1 360px", color: "var(--body)" }}>
            Hotels are where I learned that a number only matters if it changes a decision. The books, guides and tools live at eHotel Management School.
          </p>
        </div>
        <div className="shelf">
          {c.books.map((b) => (
            <a key={b.slug} href={b.url} className={`cover cover--${b.theme}`} aria-label={`${b.title}, on eHMS Press`}>
              <span className="cover__rule" aria-hidden="true" />
              <span className="cover__title">{b.title}</span>
              <span className="cover__imprint">EHMS PRESS</span>
            </a>
          ))}
        </div>
        <div className="link-cards">
          <a href={BOOK_SITE_URL} className="link-card">
            <span className="link-card__title">Books, decision guides and articles ↗</span>
            <span className="link-card__sub">book.ehotelmanagementschool.com</span>
          </a>
          <a href={APP_URL} className="link-card">
            <span className="link-card__title">Hotel Finance Workspace ↗</span>
            <span className="link-card__sub">app.ehotelmanagementschool.com</span>
          </a>
          <a href={EHMS_URL} className="link-card">
            <span className="link-card__title">Tools and templates for hotels ↗</span>
            <span className="link-card__sub">ehotelmanagementschool.com</span>
          </a>
        </div>
      </section>

      {/* Teaching */}
      <section style={{ borderTop: "1px solid var(--line)" }} aria-labelledby="teach-h">
        <div className="wrap section">
          <div className="split">
            <div className="section-head" style={{ flex: "1 1 300px" }}>
              <span className="kicker">Teaching</span>
              <h2 id="teach-h" className="display h2">Learn with me on the platform you already use.</h2>
            </div>
            <div style={{ flex: "999 1 560px", display: "flex", flexDirection: "column", gap: 32 }}>
              <div className="platforms">
                {c.platforms.map((p, i) =>
                  p.url ? (
                    <a key={`${p.platform}-${i}`} href={p.url} className="platform">
                      <span className="platform__name">{p.platform}</span>
                      <span className="platform__summary">{p.summary}</span>
                      <span aria-hidden="true" style={{ fontWeight: 600 }}>↗</span>
                    </a>
                  ) : (
                    <div key={`${p.platform}-${i}`} className="platform">
                      <span className="platform__name">{p.platform}</span>
                      <span className="platform__summary">{p.summary}</span>
                    </div>
                  ),
                )}
              </div>
              <div className="stack" style={{ gap: 14 }}>
                <h3 className="kicker">Start here</h3>
                <div className="courses">
                  {c.courses.map((course) => {
                    const href = courseHref(course);
                    const inner = (
                      <>
                        <span className="course__platform">{course.platform}</span>
                        <span className="course__title">{course.title}</span>
                        <span className="course__stats">{course.stats}</span>
                      </>
                    );
                    return href ? (
                      <a key={course.title} href={href} className="course">{inner}</a>
                    ) : (
                      <div key={course.title} className="course">{inner}</div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts and speaking */}
      <section id="speaking" className="section--mist" aria-labelledby="speak-h">
        <div className="wrap section">
          <div className="split">
            <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 20 }}>
              <span className="kicker">Podcasts and speaking</span>
              <h2 id="speak-h" className="display h2">Topics I speak on</h2>
              <ol className="rule-list">
                {s.speakingTopics.map((t) => <li key={t}>{t}</li>)}
              </ol>
            </div>
            <div style={{ flex: "1 1 360px" }} className="stack">
              <div className="panel" style={{ padding: 24 }}>
                <h3 className="panel__title" style={{ paddingTop: 0 }}>Recent appearances</h3>
                {c.appearances.map((a) => (
                  <div className="appearance" key={a.showName}>
                    <span style={{ fontWeight: 600, color: "var(--navy)" }}>{a.showName}</span>
                    {a.url ? <a href={a.url} className="plain-link" style={{ minHeight: 0 }}>{a.linkLabel}</a> : <span className="muted">{a.linkLabel}</span>}
                  </div>
                ))}
              </div>
              <div className="host-kit">
                <h3>Hosting a show or event?</h3>
                <p>Bio in three lengths, headshots and topic notes in one host kit.</p>
                <div className="actions">
                  <Link href="/podcast" className="btn btn--gold">Invite me on your show</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="wrap section" aria-labelledby="about-h">
        <div className="split">
          <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="kicker">About</span>
            <h2 id="about-h" className="display h2">{s.aboutHeading}</h2>
            <p style={{ color: "var(--body)", maxWidth: "34em" }}>{s.aboutIntro}</p>
            <Link href="/about" className="text-link">Read the full story →</Link>
          </div>
          <ol className="career" aria-label="Career" style={{ flex: "1 1 420px" }}>
            {c.career.map((item) => (
              <li key={item.period + item.role}>
                <span className="career__period">{item.period}</span>
                <span className="career__body"><strong>{item.role}</strong>, {item.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Monthly notes */}
      <section id="notes" className="band-navy" aria-labelledby="notes-h">
        <div className="wrap notes">
          <div className="notes__text">
            <span className="kicker kicker--gold">Monthly notes</span>
            <h2 id="notes-h" className="display h2">One email a month from the CFO&apos;s desk.</h2>
            <p>One finance idea, one AI workflow, one lesson from hotels. Hotel owners also get the free First Budget template.</p>
          </div>
          <SignupForm source="/#notes" interest="monthly-notes" />
        </div>
      </section>
    </>
  );
}
