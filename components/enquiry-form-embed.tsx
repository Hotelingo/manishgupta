"use client";

import Script from "next/script";

type Props = {
  formId: string;
  title: string;
};

export function EnquiryFormEmbed({ formId, title }: Props) {
  const formUrl = `https://form.jotform.com/${formId}`;

  function resizeForm() {
    const handler = (window as Window & {
      jotformEmbedHandler?: (selector: string, host: string) => void;
    }).jotformEmbedHandler;
    handler?.(`iframe[id='JotFormIFrame-${formId}']`, "https://form.jotform.com/");
  }

  return (
    <div className="enquiry-form-shell">
      <iframe
        id={`JotFormIFrame-${formId}`}
        title={title}
        src={formUrl}
        className="enquiry-form-frame"
        loading="lazy"
        scrolling="yes"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onReady={resizeForm}
      />
      <p className="small muted enquiry-form-note">
        Enquiries are collected using Jotform. If this form does not display correctly,{" "}
        <a href={formUrl} target="_blank" rel="noopener noreferrer">
          open it in a full browser page ↗
        </a>
      </p>
    </div>
  );
}
