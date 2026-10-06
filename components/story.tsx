import Link from "next/link";
import type { Story } from "@/lib/content/types";

/** "The story" strip: four short steps. On the About page the link is left out. */
export function StoryStrip({ story, withLink = true }: { story: Story; withLink?: boolean }) {
  const last = story.beats.length - 1;
  return (
    <section className="wrap story" aria-labelledby="story-h">
      <div className="story__head">
        <span className="kicker">The story</span>
        <h2 id="story-h" className="display story__title">{story.title}</h2>
        {withLink && <Link href="/about" className="text-link">Read the full story →</Link>}
      </div>
      <ol className="story__beats">
        {story.beats.map((b, i) => (
          <li key={b.title} className={`beat${i === last ? " beat--last" : i === last - 1 ? " beat--turn" : ""}`}>
            <span className="beat__when">{b.when}</span>
            <span className="beat__title">{b.title}</span>
            <span className="beat__text">{b.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
