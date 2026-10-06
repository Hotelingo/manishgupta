import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section" style={{ minHeight: "50vh" }}>
      <span className="kicker">Not found</span>
      <h1 className="display h2">That page is not here.</h1>
      <p className="muted">It may have moved. The home page has everything else.</p>
      <Link href="/" className="text-link">Go to the home page →</Link>
    </section>
  );
}
