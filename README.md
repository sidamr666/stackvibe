# StackVibe - stackvibe.fyi

Light, modern marketing site + project-request flow for the **StackVibe** software studio:
apps, desktop software, web and AI products - built for clients, not placeholders.

Built with **Vite 8 + React 19 + Tailwind CSS v4**. Static output, deploys to GitHub Pages.

---

## Quick start

```bash
npm install       # install dependencies
npm run og        # generate og-image.png + app icons
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Environment

Copy `.env.example` to `.env.local` and fill the Firebase web config (public values).
Never commit `.env.local`.

GitHub Actions needs the same 6 values as repository secrets (`VITE_FIREBASE_*`) or the
production form cannot reach Firestore.

## Edit content (no code required)

- `src/data/site.js` - brand, nav, hero, services, work, packages, FAQs, audiences, form options.
- `src/data/pricing.js` - pricing engine: base prices per service, add-ons, timeline factors.
- `src/lib/estimate.js` - live price range + budget comparison.

## Firebase

- Firestore database `(default)` in `europe-west1`.
- `firestore.rules` - anonymous clients can only create a request; the admin can read/update.
- Deploy rules: `firebase deploy --only firestore:rules --project stackvibe-901ee`.
- Grant the admin app access by creating a doc at `admins/<auth-uid>`.

## Admin app

A Flutter app in `admin/` (iOS + macOS only) reviews requests, budgets and estimates.
See `admin/README.md`.

## Project structure

```
src/
  components/       React UI (Header, Hero, Services, Work, Pricing, FAQ, RequestWizard, ...)
  hooks/            useReveal, useScrollSpy, useScrollLock, useScrolled, usePointerGlow
  data/             site.js (content), pricing.js (price engine)
  lib/              firebase.js, submitRequest.js, estimate.js
  pages/            PrivacyPage, NotFoundPage
  styles/index.css  Tailwind v4 tokens + white glass/gradient utilities
scripts/
  generate-og.mjs   sharp -> og-image.png + app icons
public/             favicon, manifest, robots.txt, sitemap.xml, CNAME
```

---

**Design system:** white background `#ffffff`, ink `#0b0f17`, hairline borders `#e6e9f0`,
indigo/violet/cyan accents, white glassmorphism cards, scroll-reveal animations, and a
`prefers-reduced-motion` fallback for accessibility.
