# Sharing the book site's database

This site uses the same Supabase project as book.ehotelmanagementschool.com
(`hotel-finance-book` repo). That keeps one account, one email list and one place
to edit content. Four rules keep it safe.

## 1. The portfolio never holds the service-role key

The book site's tables are reachable only with the service-role key, which can
read readers, payments and coupons. This site gets **only** the publishable key.
With it, visitors can read published rows of the `portfolio_*` tables and nothing
else (enforced by row-level security in the migration).

Vercel environment variables for this project:

```
NEXT_PUBLIC_SUPABASE_URL=https://lriyamltlgbrhsocyzrv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<the same publishable key the book site uses>
```

Never add `SUPABASE_SERVICE_ROLE_KEY` to this project.

## 2. One repo owns the migrations

Supabase records every migration it has applied. If two repos push migrations to
the same database, the next push from the other repo fails because it sees
migrations it does not know about. So:

1. Copy `supabase/proposed/20261006120000_portfolio_content.sql` into
   `hotel-finance-book/supabase/migrations/`.
2. Apply it from the book repo the way its other migrations are applied.
3. Never run `supabase db push` from this repo.

## 3. One email list, no hotel drip for portfolio sign-ups

On the book site, a `newsletter` sign-up also starts the chapter emails for two
hotel books. Portfolio subscribers should not get those, so they are stored in
the same `reader_leads` table with type `portfolio`. Two changes in the book repo:

- the migration above extends the `reader_leads.type` check to allow `portfolio`;
- in `app/api/leads/route.ts`, add `"portfolio"` to `allowedTypes`.

The sequence code only runs for `newsletter` and `book-launch`, so nothing else
changes. Then set on Vercel:

```
LEADS_ENDPOINT=https://book.ehotelmanagementschool.com/api/leads
PORTFOLIO_LEAD_TYPE=portfolio
PRIVACY_POLICY_VERSION=2026-09-08        # LEGAL_POLICY_VERSION in the book repo
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<the book site's Turnstile site key>
```

In Cloudflare Turnstile, add `camanishgupta.com` (and the Vercel preview domain if
you want to test there) to the widget's allowed hostnames. Until these are set,
the form politely says sign-ups open soon.

## 4. Editing

Phase 1: edit rows in the Supabase dashboard's **Table Editor** (see
`docs/EDITING.md`). Phase 2, optional: a Portfolio page inside the book site's
existing admin.

## Order of activation

1. Book repo: add the migration and the `allowedTypes` line, deploy the book site.
2. Supabase: confirm the `portfolio_*` tables exist and hold the starting rows.
3. Vercel: add the variables above and redeploy this site.
4. Check the live site, then submit a test sign-up and find it in `reader_leads`.
