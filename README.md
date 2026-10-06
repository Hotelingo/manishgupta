# camanishgupta.com

Personal site of Manish Gupta: AI sessions, mentoring, advisory, speaking, and a
hub that links to the eHMS books, app and tools.

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Hosting:** Vercel
- **Content:** one file, `content/site.yaml`. No database. Every page is built as a
  static page, so the site is fast and has nothing to break or pay for.
- **Library:** books, decision guides and the latest articles link to the book site;
  articles come from its RSS feed automatically.
- **Email sign-ups:** forwarded to the book site's list (see `docs/EDITING.md`).

## Change the content

Edit `content/site.yaml` on GitHub and commit. Vercel rebuilds in about two
minutes. Step-by-step guide: `docs/EDITING.md`.

## Run it locally

```bash
corepack enable
pnpm install
pnpm dev                     # http://localhost:3000
```

Checks before pushing: `pnpm typecheck && pnpm lint && pnpm build`.

## Deploy on Vercel

1. In Vercel, **Add New → Project** and import `Hotelingo/manishgupta`. The defaults
   (Next.js, `pnpm install`, `pnpm build`) are correct.
2. Add the environment variable `ENABLE_EXPERIMENTAL_COREPACK=1`, so Vercel uses the pnpm
   version pinned in `package.json`. The variables in `.env.example` are optional.
3. Deploy. Every push to `main` deploys to production; every branch gets a preview link.
4. Add the domain `camanishgupta.com` under **Settings → Domains** and follow the DNS steps.

## Where things live

| Path | What it is |
|---|---|
| `content/site.yaml` | All text, figures and links |
| `public/images/` | Photos and screenshots used by the site |
| `app/page.tsx` | Home page, section by section |
| `app/about`, `app/podcast` | About page, podcast landing pages (`/podcast` and `/podcast/<show>`) |
| `app/api/subscribe` | Forwards sign-ups to the book site |
| `app/globals.css` | Design tokens (navy, gold, type) and all styles |
| `lib/content/` | Reads and checks `content/site.yaml` |
| `docs/EDITING.md` | How to change text, numbers, images and links |

## When to add a back end

Not yet. Two later steps, only if needed:
1. **An editing screen without a database:** a Git-based CMS such as Keystatic gives
   an `/admin` page with forms that save to `content/site.yaml` for you.
2. **A database:** only if the site gains accounts, payments or frequent
   user-generated content. The design for sharing the book site's Supabase project
   safely is in this repo's history (first commit of `site-v1`).
