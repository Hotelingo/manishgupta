import Link from "next/link";
import { APP_URL, BOOK_SITE_URL, EHMS_URL } from "@/lib/site";
import type { SiteContent } from "@/lib/content/types";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__in">
        <Link href="/" className="brand">
          <span className="brand__name">Manish Gupta</span>
          <span className="brand__role">CA · GROUP CFO</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#work">AI sessions</Link>
          <Link href="/#work">Mentoring</Link>
          <Link href="/#work">Advisory</Link>
          <Link href="/#hospitality">Hospitality</Link>
          <Link href="/about">About</Link>
          <Link href="/#notes" className="nav__cta">Monthly notes</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ content }: { content: SiteContent }) {
  const { settings, platforms } = content;
  const elsewhere = platforms.filter((p) => p.url && p.platform !== "eHMS");
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__in">
        <div className="site-footer__brand">
          <span className="brand__name" style={{ color: "var(--navy)" }}>Manish Gupta</span>
          <span className="muted small">Group CFO · Chartered Accountant · Author</span>
          <span className="site-footer__email">{settings.contactEmail}</span>
        </div>
        <nav aria-label="Work">
          <span className="kicker">Work</span>
          <Link href="/#work">AI sessions</Link>
          <Link href="/#work">Mentoring</Link>
          <Link href="/#work">Advisory</Link>
          <Link href="/#speaking">Speaking</Link>
        </nav>
        <nav aria-label="Hospitality">
          <span className="kicker">Hospitality</span>
          <a href={BOOK_SITE_URL}>eHMS Press ↗</a>
          <a href={APP_URL}>Finance Workspace ↗</a>
          <a href={EHMS_URL}>eHotel Management School ↗</a>
        </nav>
        <nav aria-label="Elsewhere">
          <span className="kicker">Elsewhere</span>
          {settings.linkedinUrl && <a href={settings.linkedinUrl}>LinkedIn ↗</a>}
          {elsewhere.map((p) => (
            <a key={p.url} href={p.url!}>{p.platform} ↗</a>
          ))}
        </nav>
      </div>
      <div className="wrap site-footer__base">© {new Date().getFullYear()} Manish Gupta</div>
    </footer>
  );
}

const STATUS_LABEL: Record<string, string> = {
  idea: "Idea",
  prototype: "Prototype",
  beta: "Beta",
  live: "Live",
  waitlist: "Limited · Waitlist",
  open: "Taking clients",
};

export function StatusChip({ status }: { status: string }) {
  return <span className={`chip chip--${status}`}>{STATUS_LABEL[status] ?? status}</span>;
}
