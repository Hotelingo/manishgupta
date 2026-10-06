"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A book or guide cover. The coloured typographic cover is always drawn; the
 * real cover image sits on top of it. If the image is missing or fails to
 * load, the typographic cover still shows, so the shelf never looks broken.
 */
export function Cover({
  title,
  theme,
  coverUrl,
  sizes,
  compact = false,
}: {
  title: string;
  theme: string;
  coverUrl: string | null;
  sizes: string;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`cover cover--${theme}${compact ? " cover--compact" : ""}`} aria-hidden="true">
      {!compact && (
        <>
          <span className="cover__rule" />
          <span className="cover__title">{title}</span>
          <span className="cover__imprint">EHMS PRESS</span>
        </>
      )}
      {coverUrl && !failed && <Image className="cover__img" src={coverUrl} alt="" fill sizes={sizes} onError={() => setFailed(true)} />}
    </span>
  );
}
