import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}

/**
 * Forwards a sign-up to the book site's lead endpoint (one shared email list).
 * The book site checks consent and Turnstile and stores the lead; this route
 * holds no database credentials at all.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }

  // Bots fill the hidden field; answer politely and drop the request.
  if (clean(body.website)) return NextResponse.json({ message: "Thank you." });

  const email = clean(body.email, 320).toLowerCase();
  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ message: "Tick the box to confirm you want the monthly notes." }, { status: 400 });
  }

  // Sign-ups switch on when LEADS_ENDPOINT is set on Vercel (see docs/EDITING.md).
  const endpoint = process.env.LEADS_ENDPOINT;
  // The privacy policy version the visitor accepts; must match the book site's
  // LEGAL_POLICY_VERSION in lib/legal.ts when that policy changes.
  const privacyVersion = process.env.PRIVACY_POLICY_VERSION || "2026-09-08";
  if (!endpoint) {
    return NextResponse.json(
      { message: "Sign-ups open very soon. Please check back in a few days." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": request.headers.get("x-forwarded-for") ?? "",
      },
      body: JSON.stringify({
        type: process.env.PORTFOLIO_LEAD_TYPE || "portfolio",
        email,
        interest: clean(body.interest, 160),
        source: `camanishgupta.com${clean(body.source, 200)}`,
        privacyAccepted: true,
        privacyVersion,
        marketingConsent: true,
        turnstileToken: clean(body.turnstileToken, 4000),
      }),
      cache: "no-store",
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    if (!response.ok) {
      return NextResponse.json({ message: data.message ?? "That did not go through. Please try again." }, { status: response.status });
    }
    return NextResponse.json({ message: "Thank you. The next notes will reach you shortly." });
  } catch {
    return NextResponse.json({ message: "The sign-up service is not reachable. Please try again later." }, { status: 502 });
  }
}
