# StackVibe — stackvibe.fyi

Ultra-modern, dark-mode landing page & portfolio for the **StackVibe** software studio:
Android apps, Desktop SaaS products and web tools.

Built with **Vite 8 + React 19 + Tailwind CSS v4**. Ships as a fully static site, ready for
GitHub Pages, Netlify or Cloudflare Pages.

---

## Quick start

```bash
npm install       # install dependencies
npm run og        # generate og-image.png + app icons (needs to run once)
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Edit content (no code required)

All product names, copy, links, statuses and socials live in **`src/data/site.js`**.
Edit that file to swap placeholder products for your real ones — the entire site updates automatically.

Key fields:

- `site` — brand name, domain, contact email, tagline.
- `hero` — headline, subtitle, CTAs, stats.
- `androidApps` / `desktopProducts` — product cards (name, status, features, tech, links, `featured`).
- `techStack`, `stackGroups`, `principles`, `socials` — marquee, about section and footer.

Statuses: `live` · `beta` · `soon`. Accents: `cyan` · `violet` · `indigo` · `emerald`.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Enable **Settings → Pages → Source: GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow builds and deploys on every push to `main`.
4. For a custom domain: add `stackvibe.fyi` in **Pages → Custom domain** (the `CNAME` file is already included),
   then point your DNS `CNAME`/`ALIAS` record to `YOUR_USERNAME.github.io`.

## Project structure

```
src/
  components/     React UI (Header, Hero, ProductCard, Footer, ...)
  hooks/          useReveal, useScrollSpy, useScrollLock, useScrolled, usePointerGlow
  data/site.js    single source of truth for all content
  pages/          PrivacyPage, NotFoundPage
  styles/index.css  Tailwind v4 theme tokens + glass/glow utilities
scripts/
  generate-og.mjs  sharp -> og-image.png + app icons
public/            favicon, manifest, robots.txt, sitemap.xml, CNAME
```

---

**Design system:** deep-slate background `#05060b`, cyan→indigo→violet accent gradient,
glassmorphism cards, glow-on-hover, scroll-reveal animations, and a `prefers-reduced-motion`
fallback for accessibility.