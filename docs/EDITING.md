# Editing the site

Everything you see on the site — text, figures, links, sessions, projects,
podcast pages — lives in one file: **`content/site.yaml`**. There is no database.

## Change some text

1. On GitHub, open `content/site.yaml` in the `main` branch.
2. Click the **pencil** icon (Edit this file).
3. Change the text. Keep the two-space indentation exactly as it is.
4. Click **Commit changes**, write a short note such as "Update session dates", commit.
5. Vercel rebuilds the site in about two minutes.

If you made a mistake (a missing quote, a wrong status word), the build stops and
the live site **stays as it was**. Vercel emails you, and its build log shows a line
like:

```
content/site.yaml → projects[1].status: "betaa" is not one of "idea", "prototype", "beta", "live"
```

Fix that line and commit again.

### Writing YAML safely

- Put text in double quotes: `title: "AI sessions"`. Always safe.
- Inside double quotes, write a double quote as `\"`. Apostrophes are fine as they are.
- A list item starts with `- ` at the same indentation as its neighbours.
- `null` means "nothing here" (no link, no photo yet).
- `true` / `false` without quotes for yes/no fields such as `featured` and `isTotal`.

## What each section controls

| On the site | In `site.yaml` | Notes |
|---|---|---|
| Hero, About text, contact email, LinkedIn, speaking topics | `settings` | Headline = `heroBefore` + *`heroEmphasis`* (italic) + `heroAfter`. |
| Four areas under the hero | `disciplines` | |
| "The record" figures | `record` | `isTotal: true` on the row that adds up the rows above it. Update `settings.recordCheckedOn` when you recheck figures. |
| Work with me | `offers` | `status`: `open` or `waitlist`. Switch Advisory to `open` when ready. |
| Sessions | `sessions` | `status`: `upcoming` (shows Register) or `recorded` (shows Watch). |
| AI Lab projects | `projects` | `status`: `idea`, `prototype`, `beta` or `live`. `featured: true` shows one large. |
| Teaching list | `platforms` | |
| "Start here" courses | `courses` | Udemy referral link goes in `referralUrl` (see below). |
| Book shelf | `books` | `theme` sets the cover colour. Links go to the book site. |
| Recent appearances | `appearances` | |
| Career | `career` | |
| Podcast pages | `podcastPages` | See below. |

The order on the page is the order in the file. To hide something, delete its
item (it stays in GitHub's history if you want it back).

## Photos and images

1. On GitHub, open the folder `public/images` → **Add file → Upload files**.
   Use simple names without spaces, e.g. `portrait.jpg`.
2. In `site.yaml`, point to it with a path that starts at `/images`:
   `portraitUrl: "/images/portrait.jpg"`
3. Portrait: a 4:5 photo, at least 1200 px tall, under 500 KB.

## Udemy referral links

Udemy pays the instructor 97% of a sale made through the instructor's referral
link, against 37% otherwise, but only if the student buys within 24 hours of the
click. So:
- link to individual courses, not your profile page;
- put the referral link in `referralUrl`; the site uses it instead of `publicUrl`;
- use the same links in your emails.

## A page for a podcast appearance

Add an item under `podcastPages`, for example:

```yaml
  - slug: "valiant"
    showName: "Valiant CEO"
    intro: "Thanks for listening. Here is everything we talked about."
    resources:
      - kind: "Guide"
        title: "13-Week Cash Flow for Hotels"
        label: "eHMS Press"
        url: "https://book.ehotelmanagementschool.com/decision-guides"
```

After the rebuild it lives at camanishgupta.com/podcast/valiant. Keep the slug
short and easy to say on air.

## Email sign-ups

The site stores nothing itself. The form forwards each sign-up to a list kept
elsewhere. Until that is set up, the form politely says sign-ups open soon. Two ways
to switch it on:

**A. Use the book site's list (one list for everything).** Needs a small change in
the book site so portfolio sign-ups are stored under their own type and do not
start the hotel-book chapter emails. Then set on Vercel:
`LEADS_ENDPOINT=https://book.ehotelmanagementschool.com/api/leads`,
`PRIVACY_POLICY_VERSION` (the book site's current policy version) and
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the book site's key, with camanishgupta.com added
to its allowed hostnames in Cloudflare).

**B. Use an email service** (for example MailerLite, Kit or Buttondown). Simpler,
and it sends the monthly notes for you, but it is a second list next to the book
site's.

## Figures you publish

Keep figures that are yours to publish: learner counts, course counts, years,
recognition. Revenue, asset values and savings at current or past employers are
their information; publish them only with their consent.
