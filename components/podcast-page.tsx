import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import type { PodcastPage, SiteSettings } from "@/lib/content/types";

/** Landing page for listeners of one show. One page per show keeps the address short to say on air. */
export function PodcastLanding({ page, settings, path }: { page: PodcastPage; settings: SiteSettings; path: string }) {
  const named = page.slug !== "default";
  return (
    <>
      <section className="wrap narrow hero" aria-labelledby="pod-h" style={{ paddingBlock: "72px 56px" }}>
        <div className="hero__text" style={{ flexBasis: 480 }}>
          <div className="eyebrow">
            <span className="eyebrow__rule" aria-hidden="true" />
            <span>camanishgupta.com{path}</span>
          </div>
          <h1 id="pod-h" className="display h1" style={{ fontSize: "clamp(40px, 5.5vw, 64px)" }}>
            Welcome, {named ? <em>{page.showName}</em> : null} {named ? "listeners." : "podcast listeners."}
          </h1>
          <p className="lead">{page.intro}</p>
        </div>
        <div className="portrait" style={{ flex: "1 1 220px", maxWidth: 280 }}>
          {settings.portraitUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.portraitUrl} alt="Manish Gupta" className="portrait__img" style={{ aspectRatio: "1 / 1", borderRadius: 4 }} />
          ) : (
            <div className="portrait__placeholder" style={{ aspectRatio: "1 / 1", borderRadius: 4 }} role="img" aria-label="Portrait to be added">[ PORTRAIT ]</div>
          )}
        </div>
      </section>

      <section className="band-navy" aria-labelledby="free-h">
        <div className="wrap narrow notes" style={{ paddingBlock: 56 }}>
          <div className="notes__text" style={{ flexBasis: 360 }}>
            <span className="kicker kicker--gold">Free for listeners</span>
            <h2 id="free-h" className="display" style={{ fontSize: 34, lineHeight: 1.12 }}>The First Budget template, and my monthly notes.</h2>
            <p>A simple budget template for independent hotels, then one email a month on finance and AI.</p>
          </div>
          <SignupForm source={path} interest="first-budget-template" buttonLabel="Send me the template" />
        </div>
      </section>

      <section className="wrap narrow section" aria-labelledby="mentioned-h" style={{ paddingBlock: "72px 56px", gap: 24 }}>
        <span className="kicker">Mentioned on the episode</span>
        <h2 id="mentioned-h" className="display h2" style={{ fontSize: 36 }}>Links from the conversation</h2>
        <div style={{ borderBottom: "1px solid var(--line)" }}>
          {page.resources.map((r) => (
            <a key={r.title} href={r.url} className="resource">
              <span className="resource__kind">{r.kind}</span>
              <span className="resource__title">{r.title}</span>
              <span className="resource__label">{r.label} ↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section--mist" aria-labelledby="who-h">
        <div className="wrap narrow split" style={{ paddingBlock: "56px 64px", gap: "28px 56px" }}>
          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 id="who-h" className="display" style={{ fontSize: 30, lineHeight: 1.15 }}>Who you just heard</h2>
            <p style={{ color: "var(--body)" }}>
              Group CFO of a hotel, real estate and retail group, Chartered Accountant, and author of the Hotel Finance Practice Library. I teach finance people to use AI well and mentor those moving toward CFO.
            </p>
          </div>
          <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 10, alignSelf: "center" }}>
            <Link href="/#work" className="btn btn--primary">Bring me in for an AI session</Link>
            <Link href="/#work" className="btn btn--outline">Ask about mentoring</Link>
          </div>
        </div>
      </section>
    </>
  );
}
