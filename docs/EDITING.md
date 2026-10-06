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
- `true` / `false` without quotes for yes/no fields such as `featured`.
- Numbers such as `learners` without quotes or commas: `learners: 146065`.

## What each section controls

| On the site | In `site.yaml` | Notes |
|---|---|---|
| Headline, intro, portrait, intro video, About text, contact email, monthly-notes heading | `settings` | Headline = `heroBefore` + *`heroEmphasis`* (gold italics) + `heroAfter`. Set `introVideoUrl` to show "Watch the 60-second intro". |
| Learner bar chart | `reach` | Up to four platforms. `learners` is a plain number (`146065`, no commas). The total is added up for you. Update `settings.figuresCheckedOn` when you recheck. |
| Three tiles beside the chart | `proof` | `icon`: `years`, `book` or `award`. |
| Four areas under the chart | `disciplines` | |
| The story (home and About pages) | `story` | A title and four short steps. |
| Ways in | `waysIn` | `style`: `light` or `dark`. `ctaUrl` can be a section (`#cohorts`) or a page (`/courses`). |
| Signature cohorts | `cohorts` | Leave `weeks` and `nextCohort` as `null` until set; the card says "Dates to be announced". `theme`: `teal`, `navy`, `wine` or `olive`. `videoUrl` adds a play button. |
| Books tab | `books` | `coverUrl` is the cover image. `videoUrl` adds "1-minute look inside". Each book links to its page on the book site, where samples, Amazon and direct-purchase links live. |
| Decision guides tab | `guides` | Title, subtitle, link and cover. |
| Latest articles tab | nothing to edit | The three newest articles come from the book site's RSS feed, refreshed every hour. |
| Courses (home page and /courses) | `courses` | `platform`: `Udemy`, `Coursera` or `Alison`. `featured: true` shows it on the home page. `topic` groups courses on /courses. Udemy referral link goes in `referralUrl` (see below). With no link, the card links to your profile on that platform. |
| AI Lab sessions | `sessions` | `status`: `upcoming` (shows Register) or `recorded` (shows Watch). |
| AI Lab projects | `projects` | `status`: `idea`, `prototype`, `beta` or `live`. `featured: true` shows one large. |
| Work with me | `offers` | `status`: `open` or `waitlist`. Switch Advisory to `open` when ready. |
| Speaking topics | `speakingTopics` | A tag, a title and one line each. |
| Recent appearances | `appearances` | Hidden while the list is empty (`[]`). Add shows as you do them. |
| Footer platform links | `platforms` | `label` is the name shown. |
| Career (About page) | `career` | |
| Podcast pages | `podcastPages` | See below. |

The order on the page is the order in the file. To hide something, delete its
item (it stays in GitHub's history if you want it back).

## Videos

Upload the video to YouTube (unlisted is fine) or Vimeo and paste the link into
the `videoUrl` of a book, course or cohort, or `settings.introVideoUrl`. A play
button appears; with `null` the site shows no video button at all.

## Photos and images

1. On GitHub, open the folder `public/images` → **Add file → Upload files**.
   Use simple names without spaces, e.g. `portrait.jpg`.
2. In `site.yaml`, point to it with a path that starts at `/images`:
   `portraitUrl: "/images/portrait.jpg"`
3. Portrait: a 4:5 or 3:4 photo, at least 1200 px tall, under 500 KB.
4. Book and guide covers can also point at the book site's storage
   (`https://lriyamltlgbrhsocyzrv.supabase.co/storage/v1/object/public/...`);
   any other web address is refused by the build, because the site only
   resizes images from those two places.

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

The site stores nothing itself. Each sign-up is forwarded to the book site's list
(`reader_leads` in Supabase) with type `portfolio`, so it does not start the
hotel-book chapter emails, and its `source` shows which page it came from
(for example `camanishgupta.com/podcast/valiant`).

To switch it on (once):
1. Merge hotel-finance-book PR #307 and let the book site deploy. The database
   change is already applied.
2. On Vercel, set `LEADS_ENDPOINT=https://book.ehotelmanagementschool.com/api/leads`.
3. If the book site uses Cloudflare Turnstile (its Render settings have
   `TURNSTILE_SECRET_KEY`): copy its `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to Vercel, and
   in Cloudflare add `camanishgupta.com` to that widget's allowed hostnames.
4. Redeploy on Vercel, sign up with your own address, and check the new row in
   `reader_leads` (type `portfolio`).

Until step 2 is done, the form politely says sign-ups open soon. If the book
site's privacy policy version changes, set `PRIVACY_POLICY_VERSION` to match.

## Figures you publish

Keep figures that are yours to publish: learner counts, course counts, years,
recognition. Revenue, asset values and savings at current or past employers are
their information; publish them only with their consent.
