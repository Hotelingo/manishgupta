import Image from "next/image";
import Link from "next/link";
import { PlayGlyph, ProofGlyph, formatCount } from "@/components/bits";
import { CourseTabs } from "@/components/course-tabs";
import { LibraryTabs } from "@/components/library-tabs";
import { SignupForm } from "@/components/signup-form";
import { StatusChip } from "@/components/site-chrome";
import { StoryStrip } from "@/components/story";
import { getContent, reachTotal } from "@/lib/content";
import { getLatestArticles } from "@/lib/library-feed";
import { BOOK_SITE_URL, SITE_URL } from "@/lib/site";

/** Fixed colour order for the reach chart, checked for contrast on navy. */
const REACH_COLOURS = ["#c98500", "#3987e5", "#d95926", "#199e70"];

function hostOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export default async function HomePage() {
  const [c, articles] = await Promise.all([getContent(), getLatestArticles(3)]);
  const s = c.settings;
  const total = reachTotal(c.reach);
  const reach = c.reach.map((r, i) => ({ ...r, colour: REACH_COLOURS[i], share: Math.round((r.learners / total) * 100) }));
  const featured = c.projects.find((p) => p.featured) ?? c.projects[0];
  const otherProjects = c.projects.filter((p) => p !== featured);
  const featuredCourses = c.courses.filter((x) => x.featured);
  // The contact email is still a placeholder while it is in [square brackets].
  const email = /^\[.*\]$/.test(s.contactEmail) ? null : s.contactEmail;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Manish Gupta",
    url: SITE_URL,
    image: s.portraitUrl?.startsWith("/") ? `${SITE_URL}${s.portraitUrl}` : s.portraitUrl ?? undefined,
    jobTitle: "Group CFO",
    description: s.heroIntro,
    hasCredential: "Chartered Accountant (ICAI)",
    sameAs: [s.linkedinUrl, ...c.platforms.map((p) => p.url), BOOK_SITE_URL].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Hero and reach, on navy */}
      <section className="hero-band" aria-labelledby="hero-h">
        <div className="wrap hero">
          <div className="hero__text">
            <span className="hero__eyebrow">{s.heroEyebrow}</span>
            <h1 id="hero-h" className="hero__title">
              {s.heroBefore}
              <em>{s.heroEmphasis}</em>
              {s.heroAfter}
            </h1>
            <p className="hero__lead">{s.heroIntro}</p>
            <div className="actions">
              <a href="#ways" className="btn btn--gold">Find your way in →</a>
              <a href="#cohorts" className="btn btn--ghost-light">Signature cohorts</a>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait__frame">
              {s.portraitUrl ? (
                <Image className="portrait__img" src={s.portraitUrl} alt="Manish Gupta" width={900} height={1200} priority sizes="(max-width: 620px) 90vw, 400px" />
              ) : (
                <div className="portrait__placeholder" role="img" aria-label="Portrait to be added">[ PORTRAIT ]</div>
              )}
              {s.introVideoUrl && (
                <a href={s.introVideoUrl} className="portrait__video" target="_blank" rel="noopener noreferrer">
                  <span className="portrait__video-dot"><PlayGlyph size={11} /></span>
                  Watch the 60-second intro
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
            <figcaption>{s.nowCaption}</figcaption>
          </figure>
        </div>

        <div className="wrap reach">
          <figure className="reach__chart">
            <figcaption className="reach__head">
              <span className="reach__total">{formatCount(total)}</span>
              <span className="reach__caption">enrolments in my courses, by platform · checked {s.figuresCheckedOn}</span>
            </figcaption>
            <div
              className="reach__bar"
              role="img"
              aria-label={`Enrolments by platform: ${reach.map((r) => `${r.label} ${formatCount(r.learners)}`).join("; ")}.`}
            >
              {reach.map((r) => (
                <span key={r.label} title={`${r.label}: ${formatCount(r.learners)} (${r.share}%)`} style={{ flexGrow: r.learners, background: r.colour }} />
              ))}
            </div>
            <ul className="reach__legend">
              {reach.map((r) => (
                <li key={r.label}>
                  <span className="reach__swatch" style={{ background: r.colour }} aria-hidden="true" />
                  <span className="reach__item">
                    {r.sourceUrl ? <a href={r.sourceUrl} className="reach__label">{r.label}</a> : <span className="reach__label">{r.label}</span>}
                    <span className="reach__value">
                      {formatCount(r.learners)} <span className="reach__share">· {r.share}%</span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </figure>
          <ul className="proof">
            {c.proof.map((p) => (
              <li key={p.value} className="proof__tile">
                <span className="proof__icon"><ProofGlyph icon={p.icon} /></span>
                <span className="proof__text">
                  <span className="proof__value">{p.value}</span>
                  <span className="proof__label">{p.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Four disciplines */}
      <section className="wrap disciplines" aria-label="Areas of expertise">
        {c.disciplines.map((d) => (
          <div className="discipline" key={d.label}>
            <span className="discipline__label">{d.label}</span>
            <span className="discipline__proof">{d.proof}</span>
          </div>
        ))}
      </section>

      <StoryStrip story={c.story} />

      {/* Ways in */}
      <section id="ways" className="wrap section" aria-labelledby="ways-h">
        <div className="section-head section-head--split">
          <div>
            <span className="kicker">Ways in</span>
            <h2 id="ways-h" className="display h2">Start with a book. Go as deep as you need.</h2>
          </div>
          <div className="ladder-hint" aria-hidden="true">
            <span>READ</span>
            <span className="ladder-hint__rule" />
            <span>WORK 1:1</span>
          </div>
        </div>
        <div className="ways">
          {c.waysIn.map((w) => (
            <article key={w.title} className={`way way--${w.style}`}>
              <span className="way__step">{w.step}</span>
              <h3 className="way__title">{w.title}</h3>
              <p className="way__text">{w.text}</p>
              <Link href={w.ctaUrl} className="way__cta">{w.ctaLabel} →</Link>
            </article>
          ))}
        </div>
      </section>

      {/* Signature cohorts */}
      <section id="cohorts" className="band-navy" aria-labelledby="cohorts-h">
        <div className="wrap section">
          <div className="section-head">
            <span className="kicker kicker--gold">Signature cohorts · live, small groups</span>
            <h2 id="cohorts-h" className="display h2 on-navy">Learn it with me, live, alongside people doing the same job.</h2>
          </div>
          <div className="cohorts">
            {c.cohorts.map((k) => (
              <article key={k.title} className="cohort">
                <div className={`cohort__band cohort__band--${k.theme}${k.videoUrl ? " cohort__band--video" : ""}`}>
                  {k.videoUrl && (
                    <a href={k.videoUrl} className="cohort__play" target="_blank" rel="noopener noreferrer" aria-label={`Watch the preview: ${k.title} (opens in a new tab)`}>
                      <PlayGlyph size={18} />
                    </a>
                  )}
                </div>
                <div className="cohort__body">
                  <span className="cohort__audience">{k.audience}</span>
                  <h3 className="cohort__title">{k.title}</h3>
                  <p className="cohort__promise">{k.promise}</p>
                  <div className="chips">
                    <span className="pill">Live online</span>
                    {k.weeks && <span className="pill">{k.weeks} weeks</span>}
                    <span className="pill">Certificate</span>
                  </div>
                  <div className="cohort__foot">
                    <span className="small muted">
                      {k.nextCohort ? <>Next cohort <strong>{k.nextCohort}</strong></> : "Dates to be announced"}
                    </span>
                    <a href="#notes" className="text-link text-link--tight">Join the waitlist →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Library: books, guides and articles, all on the book site */}
      <section id="library" className="section--mist" aria-labelledby="library-h">
        <div className="wrap section">
          <div className="section-head">
            <span className="kicker">The library · on eHMS Press</span>
            <h2 id="library-h" className="display h2">Hotel finance you can act on.</h2>
          </div>
          <LibraryTabs books={c.books} guides={c.guides} articles={articles} />
        </div>
      </section>

      {/* Self-paced courses */}
      <section id="courses" className="wrap section" aria-labelledby="courses-h">
        <div className="section-head">
          <span className="kicker">Self-paced courses</span>
          <h2 id="courses-h" className="display h2">Learn with me where you already learn.</h2>
        </div>
        <CourseTabs courses={featuredCourses} />
        <Link href="/courses" className="btn btn--primary" style={{ alignSelf: "flex-start" }}>See all courses →</Link>
      </section>

      {/* AI Lab */}
      <section id="ai-lab" className="section--mist" aria-labelledby="lab-h">
        <div className="wrap section">
          <div className="section-head">
            <span className="kicker">AI Lab</span>
            <h2 id="lab-h" className="display h2">What I am building and teaching right now.</h2>
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
                  {(p.caseStudyUrl || p.url) && <a href={p.caseStudyUrl ?? p.url ?? undefined} className="plain-link">{p.caseStudyUrl ? "Case study" : p.urlLabel ?? "Open"}</a>}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work with me */}
      <section id="work" className="wrap section" aria-labelledby="work-h">
        <div className="section-head">
          <span className="kicker">Work with me</span>
          <h2 id="work-h" className="display h2">From my chair to yours, one to one.</h2>
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

      {/* Speaking and podcasts */}
      <section id="speaking" className="section--mist" aria-labelledby="speak-h">
        <div className="wrap section speaking">
          <div className="speaking__intro">
            <span className="kicker">Speaking and podcasts</span>
            <h2 id="speak-h" className="display h2">Topics I want to talk about.</h2>
            <p className="muted-body">For podcasts, conferences and in-house sessions. Each topic comes with a one-page outline and slides.</p>
            {email && (
              <div className="actions">
                <a href={`mailto:${email}?subject=Speaking%20invitation`} className="btn btn--primary">Invite me to speak</a>
              </div>
            )}
            {c.appearances.length > 0 && (
              <div className="appearances">
                <h3 className="panel__title">Recent appearances</h3>
                {c.appearances.map((a) => (
                  <div className="appearance" key={a.showName}>
                    <span style={{ fontWeight: 600, color: "var(--navy)" }}>{a.showName}</span>
                    {a.url ? <a href={a.url} className="plain-link" style={{ minHeight: 0 }}>{a.linkLabel}</a> : <span className="muted">{a.linkLabel}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="topics">
            {c.speakingTopics.map((t) => (
              <div key={t.title} className="topic">
                <span className="topic__tag">{t.tag}</span>
                <span className="topic__title">{t.title}</span>
                <span className="topic__text">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly notes */}
      <section id="notes" className="band-navy" aria-labelledby="notes-h">
        <div className="wrap notes">
          <div className="notes__text">
            <span className="kicker kicker--gold">Monthly notes</span>
            <h2 id="notes-h" className="display h2">{s.notesHeading}</h2>
            <p>{s.notesText}</p>
          </div>
          <SignupForm source="/#notes" interest="monthly-notes" />
        </div>
      </section>
    </>
  );
}
