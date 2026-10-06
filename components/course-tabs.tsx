"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/bits";
import type { Course } from "@/lib/content/types";

const ALL = "All";

function Segmented({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

/** Home page: the featured courses, one platform at a time. */
export function CourseTabs({ courses }: { courses: Course[] }) {
  const platforms = useMemo<string[]>(() => [...new Set(courses.map((c) => c.platform))], [courses]);
  const [platform, setPlatform] = useState<string>(platforms[0] ?? "");
  const shown = courses.filter((c) => c.platform === platform);
  return (
    <div className="stack" style={{ gap: 24 }}>
      <Segmented label="Platform" options={platforms} value={platform} onChange={setPlatform} />
      <div className="course-grid">
        {shown.map((c) => <CourseCard key={c.title} course={c} />)}
      </div>
    </div>
  );
}

/** /courses: every course, filtered by topic and platform, most-enrolled first. */
export function CourseExplorer({ courses }: { courses: Course[] }) {
  const sorted = useMemo(() => [...courses].sort((a, b) => (b.learners ?? -1) - (a.learners ?? -1)), [courses]);
  const topics = useMemo(() => [ALL, ...new Set(courses.map((c) => c.topic))], [courses]);
  const platforms = useMemo(() => [ALL, ...new Set(courses.map((c) => c.platform))], [courses]);
  const [topic, setTopic] = useState(ALL);
  const [platform, setPlatform] = useState(ALL);
  const shown = sorted.filter((c) => (topic === ALL || c.topic === topic) && (platform === ALL || c.platform === platform));

  return (
    <div className="stack" style={{ gap: 24 }}>
      <div className="filters">
        <Segmented label="Topic" options={topics} value={topic} onChange={setTopic} />
        <Segmented label="Platform" options={platforms} value={platform} onChange={setPlatform} />
      </div>
      <p className="small muted" role="status">
        {shown.length === 1 ? "1 course" : `${shown.length} courses, most-enrolled first`}
      </p>
      <div className="course-grid">
        {shown.map((c) => <CourseCard key={c.title} course={c} />)}
      </div>
    </div>
  );
}
