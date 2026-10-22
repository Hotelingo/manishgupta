"use client";

import Script from "next/script";

const formId = "262941412631048";
const formUrl = `https://form.jotform.com/${formId}`;

/**
 * Jotform's Classic Form is embedded with its official iframe resize helper.
 * A direct form link remains available if an ad/privacy blocker blocks embeds.
 */
export function CohortFormEmbed() {
  function activateResize() {
    const handler = (window as Window & {
      jotformEmbedHandler?: (selector: string, host: string) => void;
    }).jotformEmbedHandler;

    handler?.(`iframe[id='JotFormIFrame-${formId}']`, "https://form.jotform.com/");
  }

  return (
    <div className="cohort-form-wrap">
      <iframe
        id={`JotFormIFrame-${formId}`}
        title="Live cohort course priority interest registration"
        src={formUrl}
        loading="lazy"
        className="cohort-form"
        scrolling="yes"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onReady={activateResize}
      />
      <p className="small muted cohort-form-help">
        Your details are collected by Jotform. If the form does not load or is
        difficult to use on your device,{" "}
        <a href={formUrl} target="_blank" rel="noopener noreferrer">
          open the registration form in a full page ↗
        </a>
        .
      </p>
    </div>
  );
}
