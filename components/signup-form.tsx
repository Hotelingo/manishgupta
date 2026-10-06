"use client";

import Script from "next/script";
import { useId, useState, type FormEvent } from "react";
import { PRIVACY_URL } from "@/lib/site";

type Status = { kind: "idle" | "sending" | "done" | "error"; message: string };

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Email sign-up for the monthly notes. Posts to /api/subscribe, which forwards
 * to the book site's lead store so there is a single email list.
 */
export function SignupForm({
  source,
  interest,
  buttonLabel = "Send me the notes",
}: {
  source: string;
  interest?: string;
  buttonLabel?: string;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "sending", message: "Sending…" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
          turnstileToken: form.get("cf-turnstile-response"),
          source,
          interest,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        setStatus({ kind: "error", message: data.message ?? "That did not go through. Please try again." });
        return;
      }
      setStatus({ kind: "done", message: data.message ?? "Thank you. Check your inbox to confirm." });
      event.currentTarget?.reset();
    } catch {
      setStatus({ kind: "error", message: "No connection. Please try again." });
    }
  }

  return (
    <form className="signup" onSubmit={onSubmit} noValidate={false}>
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
      )}
      <label htmlFor={`${id}-email`}>Email address</label>
      <div className="signup__row">
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        <button type="submit" className="btn btn--gold" disabled={status.kind === "sending"}>
          {buttonLabel}
        </button>
      </div>
      <label className="signup__check" htmlFor={`${id}-consent`}>
        <input id={`${id}-consent`} name="consent" type="checkbox" required />
        <span>
          Send me the monthly notes. I can unsubscribe at any time. See the <a href={PRIVACY_URL}>privacy policy</a>.
        </span>
      </label>
      <div className="signup__honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {turnstileSiteKey && <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />}
      <p className={`signup__status${status.kind === "error" ? " signup__status--error" : ""}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
