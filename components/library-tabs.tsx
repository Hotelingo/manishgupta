"use client";

import { useState } from "react";
import { VideoLink } from "@/components/bits";
import { Cover } from "@/components/cover";
import type { Book, Guide } from "@/lib/content/types";
import type { Article } from "@/lib/library-feed";

type View = "books" | "guides" | "articles";

/** Books, decision guides and the latest articles, one view at a time. */
export function LibraryTabs({ books, guides, articles }: { books: Book[]; guides: Guide[]; articles: Article[] }) {
  const [view, setView] = useState<View>("books");
  const views: { id: View; label: string }[] = [
    { id: "books", label: "Books" },
    { id: "guides", label: "Decision guides" },
    ...(articles.length > 0 ? [{ id: "articles" as const, label: "Latest articles" }] : []),
  ];

  return (
    <div className="stack" style={{ gap: 32 }}>
      <div className="segmented" role="group" aria-label="Show">
        {views.map((v) => (
          <button key={v.id} type="button" aria-pressed={view === v.id} onClick={() => setView(v.id)}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "books" && (
        <div className="shelf">
          {books.map((b) => (
            <article key={b.slug} className="book">
              <a href={b.url} className="book__cover-link" aria-label={`${b.title}: read a sample or buy`}>
                <Cover title={b.title} theme={b.theme} coverUrl={b.coverUrl} sizes="(max-width: 620px) 45vw, 220px" />
              </a>
              <a href={b.url} className="book__title">{b.title}</a>
              <span className="book__summary">{b.summary}</span>
              {b.videoUrl && <VideoLink url={b.videoUrl} label="1-minute look inside" />}
              <a href={b.url} className="book__cta">Read a sample or buy <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      )}

      {view === "guides" && (
        <div className="guide-grid">
          {guides.map((g) => (
            <a key={g.url} href={g.url} className="guide">
              <span className="guide__cover">
                <Cover title={g.title} theme="reporting" coverUrl={g.coverUrl} sizes="72px" compact />
              </span>
              <span className="guide__text">
                <span className="guide__title">{g.title}</span>
                <span className="guide__subtitle">{g.subtitle}</span>
              </span>
            </a>
          ))}
        </div>
      )}

      {view === "articles" && (
        <ul className="entries">
          {articles.map((a) => (
            <li key={a.url}>
              <a href={a.url} className="entry">
                <span className="entry__meta">{[a.category, a.date].filter(Boolean).join(" · ")}</span>
                <span className="entry__title">{a.title}</span>
                <span className="entry__text">{a.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
