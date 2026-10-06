# camanishgupta.com

Personal site of Manish Gupta: AI sessions, mentoring, advisory, speaking, and a
hub that links to the eHMS books, app and tools.

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Hosting:** Vercel
- **Content:** Supabase tables in the same project as book.ehotelmanagementschool.com,
  read with the publishable key only. Without database settings the site runs on
  the built-in sample content in `lib/content/seed.ts`.
- **Email sign-ups:** forwarded to the book site's lead store, so there is one list.

## Run it locally

```bash
corepack enable
pnpm install
cp .env.example .env.local   # values are optional for local work
pnpm dev                     # http://localhost:3000
```

Checks before pushing: `pnpm typecheck && pnpm lint && pnpm build`.

## Deploy on Vercel

1. In Vercel, **Add New → Project** and import `Hotelingo/manishgupta`. The defaults
   (Next.js, `pnpm install`, `pnpm build`) are correct.
2. Add the environment variable `ENABLE_EXPERIMENTAL_COREPACK=1`, so Vercel uses the pnpm
   version pinned in `package.json`. The variables in `.env.example` are optional at first.
3. Deploy. Every push to `main` deploys to production; every branch gets a preview link.
4. Add the domain `camanishgupta.com` under **Settings → Domains** and follow the DNS steps.

## Where things live

| Path | What it is |
|---|---|
| `app/page.tsx` | Home page, section by section |
| `app/about`, `app/podcast` | About page, podcast landing pages (`/podcast` and `/podcast/<show>`) |
| `app/api/subscribe` | Forwards sign-ups to the book site |
| `app/globals.css` | Design tokens (navy, gold, type) and all styles |
| `lib/content/types.ts` | The shape of every content list |
| `lib/content/seed.ts` | Built-in sample content |
| `lib/content/index.ts` | Reads Supabase, falls back to the sample content per list |
| `supabase/proposed/` | The database migration to add to the book repo |
| `docs/DATABASE.md` | Why and how this site shares the book site's database |
| `docs/EDITING.md` | How to change text, numbers, images and links |
