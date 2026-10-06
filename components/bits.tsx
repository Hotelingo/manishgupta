import type { Course, ProofIcon } from "@/lib/content/types";

const ICON_PATHS: Record<ProofIcon, React.ReactNode> = {
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
    </>
  ),
  years: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
    </>
  ),
};

export function ProofGlyph({ icon }: { icon: ProofIcon }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[icon]}
    </svg>
  );
}

export function PlayGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
      <path d="M4 2.5 L11.5 7 L4 11.5 Z" fill="currentColor" />
    </svg>
  );
}

/** "Watch the preview" link, shown only when a video link is set. Opens in a new tab. */
export function VideoLink({ url, label }: { url: string; label: string }) {
  return (
    <a href={url} className="video-link" target="_blank" rel="noopener noreferrer">
      <span className="video-link__dot"><PlayGlyph size={9} /></span>
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function formatCount(n: number) {
  return n.toLocaleString("en-US");
}

/** One course card, used on the home page and on /courses. */
export function CourseCard({ course }: { course: Course }) {
  const learners = course.learners !== null ? `${formatCount(course.learners)} learners` : null;
  return (
    <article className={`course-card course-card--${course.platform.toLowerCase()}`}>
      <div className={`course-card__band${course.videoUrl ? " course-card__band--video" : ""}`}>
        {course.videoUrl && (
          <a href={course.videoUrl} className="course-card__play" target="_blank" rel="noopener noreferrer" aria-label={`Watch the preview: ${course.title} (opens in a new tab)`}>
            <PlayGlyph size={15} />
          </a>
        )}
      </div>
      <div className="course-card__body">
        <div className="course-card__meta">
          <span>{course.platform}</span>
          <span>{course.topic}</span>
        </div>
        <h3 className="course-card__title">{course.title}</h3>
        <div className="course-card__foot">
          <span className="course-card__stats">
            {learners && <span className="course-card__learners">{learners}</span>}
            {course.rating && <span>{course.rating}</span>}
          </span>
          {course.href && (
            <a href={course.href} className="course-card__cta">
              Enrol on {course.platform} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
