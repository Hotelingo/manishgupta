# Editing the site's content

All content lives in Supabase tables whose names start with `portfolio_`.
Open the Supabase dashboard → **Table Editor**, pick a table, edit a cell, save.
The live site picks up changes within about five minutes.

## Which table holds what

| Section on the site | Table | Notes |
|---|---|---|
| Hero, About text, contact email, LinkedIn, speaking topics | `portfolio_settings` | One row only. The headline is `hero_before` + *`hero_emphasis`* (italic) + `hero_after`. |
| Four areas under the hero | `portfolio_disciplines` | |
| "The record" figures | `portfolio_record_items` | Set `is_total` on the row that adds up the ones above it. Update `record_checked_on` in settings when you recheck figures. |
| Work with me | `portfolio_offers` | `status` = `open` or `waitlist`. Switch Advisory to `open` when you are ready. |
| Sessions | `portfolio_sessions` | `status` = `upcoming` (shows Register) or `recorded` (shows Watch). |
| AI Lab projects | `portfolio_projects` | `status` = `idea`, `prototype`, `beta` or `live`. Tick `featured` on the one to show large. |
| Book shelf | `portfolio_books` | Titles and themes only; buying happens on the book site. |
| Teaching platforms | `portfolio_platforms` | |
| "Start here" courses | `portfolio_courses` | Put your Udemy instructor referral link in `referral_url`. |
| Recent appearances | `portfolio_appearances` | |
| Career | `portfolio_career` | |
| Podcast pages | `portfolio_podcast_pages` | See below. |

Every list table has:
- `sort_order` — smaller numbers come first. Leave gaps (10, 20, 30) so you can insert between.
- `published` — untick to hide a row without deleting it.

If a whole table is empty or every row is unpublished, the site shows its built-in
sample content for that section instead of an empty gap.

## Images

1. Supabase → **Storage** → bucket `portfolio` → upload (for the portrait use a 4:5
   photo at least 1200 px tall).
2. Click the file → **Get URL** (public URL).
3. Paste it into the right column, for example `portfolio_settings.portrait_url`.

## Udemy referral links

Udemy pays the instructor 97% of a sale made through the instructor's referral
link, against 37% otherwise, but only if the student buys within 24 hours of the
click. So:
- link to individual courses, not your profile page;
- put the referral link in `portfolio_courses.referral_url`; the site uses it
  instead of `public_url`;
- use the same links in the monthly notes.

## A page for a podcast appearance

Add a row to `portfolio_podcast_pages`:
- `slug`: short and easy to say, e.g. `valiant` → camanishgupta.com/podcast/valiant
- `show_name`: shown in the headline, e.g. `Valiant CEO`
- `intro`: one or two sentences
- `resources`: the links you mentioned, as a list, e.g.

```json
[
  {"kind": "Guide", "title": "13-Week Cash Flow for Hotels", "label": "eHMS Press", "url": "https://book.ehotelmanagementschool.com/decision-guides"},
  {"kind": "Tool", "title": "Hotel Finance Workspace demo", "label": "Beta", "url": "https://app.ehotelmanagementschool.com"}
]
```

The page works as soon as the row is saved and published (allow a few minutes).

## Figures you publish

Keep figures that are yours to publish: learner counts, course counts, years,
recognition. Revenue, asset values and savings at current or past employers are
their information; publish them only with their consent.
