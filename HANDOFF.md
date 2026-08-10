# LinkGlobal Network Website — Handoff

Written to let a fresh chat pick up this project without re-deriving context.
Read this file first, then the codebase, before making changes.

## What this is

Marketing site for LinkGlobal Network (language-learning platform connecting
learners with real tutors globally), built by Audax Ventures as a client
project. **Separate repo from the main Audax Ventures site — don't confuse
the two.**

## Repo & deployment

- Local path: `/Users/rileypeterson/LinkGlobal-Network-Website`
- GitHub: `audax-ventures/LinkGlobal-Network-Website` (personal account, not
  an org)
- Vercel: team `audax-ventures-inc`, project `link-global-network-website-v1`,
  live at https://link-global-network-website-v1.vercel.app
- Local git identity for this repo: `user.name "LinkGlobal Network"`,
  `user.email info@linkglobalnetwork.ca` (different from the main Audax
  identity — already configured locally, don't change it)
- Push auth: remote is `https://audax-ventures@github.com/...`, osxkeychain
  caches a classic PAT. If push ever fails on auth, the fix is a fresh
  **classic** PAT (not fine-grained) from the audax-ventures GitHub account —
  walk the user through generating it and running `git push` themselves in
  Terminal; don't try to handle credentials directly.

## Standing workflow rules (non-negotiable)

- **Never run anything locally.** No dev server, no local `npm install`, no
  local build. Ever.
- Every meaningful change gets committed and **pushed directly to `main`** —
  Vercel auto-deploys. No PR workflow.
- Verify changes by checking the live Vercel deployment, not by running
  anything locally.

## Critical environment gotchas

**1. Vercel's bot-protection "Security Checkpoint" blocks `curl`, not real
browser navigation.**
Repeated automated `curl`/`Bash` HTTP requests against the live site (e.g.
polling for a new deploy hash) will start getting silently 403'd with a
"Vercel Security Checkpoint" HTML page after enough requests in a session.
This is **not** a real outage — a real browser (the Browser pane tool)
passes through fine, auto-resolving via a JS challenge on the first load.
**Always use the Browser pane (`navigate` / `javascript_exec` /
`read_network_requests`) to verify deploys, never a `curl` polling loop.**
To wait for a deploy without hammering the site, use `ScheduleWakeup` with a
prompt to check the asset hash in the Browser pane after a delay (~75-90s is
usually enough for a Vite build), or a single well-spaced `Monitor` loop —
not tight `curl` polling.

**2. The Browser pane's tab is `document.hidden = true` permanently.**
It never becomes a real foreground tab, so `requestAnimationFrame` never
ticks there. This means:
- GSAP tweens, ScrollTrigger scrub, Framer Motion animations, and the globe's
  rotation **never actually progress** in that tab.
- `window.innerWidth`/`innerHeight`, `matchMedia`, and CSS `vh` units can
  report broken/near-zero values in JS, even though the **actual rendered
  layout is correct** at real desktop width (confirmed repeatedly via
  screenshots showing a proper wide layout despite `innerWidth: 0`).
- **Trust DOM geometry** (`getBoundingClientRect`, `getComputedStyle`,
  computed `aspect-ratio`, network/console logs) **over screenshots** for
  verifying anything animation-gated or viewport-width-dependent. Screenshots
  are still useful for static first-paint layout sanity checks (e.g. "does
  this section look roughly right"), just not authoritative for animated
  state or exact viewport-relative math.
- For real visual/UX sign-off on anything animated, the user needs to check
  their own browser — say so explicitly rather than claiming a screenshot
  proves it.
- Debug URL params on the homepage (`LoadingScreen.tsx`): `?debugPhase=world`
  jumps straight to the spinning-globe screen, `?debugPhase=done` skips
  loading entirely. Both are intentionally left in the code as harmless
  testing aids — don't remove them.

**3. Bash's working directory occasionally resets to home (`~`) between
calls in this environment.** Always `cd` into the repo explicitly (or use
absolute paths) rather than assuming persisted `cd` state.

## Tech stack

Vite + React + TypeScript + Tailwind CSS. `react-router-dom` (client-side
routing, `BrowserRouter`/`Routes` in `App.tsx`; SPA rewrite configured in
`vercel.json` so direct loads of `/about` etc. don't 404). GSAP +
ScrollTrigger for scroll animation. Framer Motion for micro-interactions.
`react-globe.gl` (three.js) for the 3D globe, lazy-loaded via
`LazyStylizedGlobe.tsx` — do not undo the lazy-loading, it's its own ~1.8MB
chunk split out of the main bundle. `topojson-client` + a public world-atlas
CDN dataset for country polygons, fetched once and cached at module scope in
`StylizedGlobe.tsx` (shared between the loading screen and the homepage's
Global Reach section — don't reintroduce a duplicate fetch).

## Site structure

**Home (`/`)** — `src/pages/Home.tsx`: Loading screen (spinning globe,
scroll-to-dismiss) → `FloatingNav` → `Hero` → `GlobalCommunity` →
`LearningJourney` → `SplitSection` → `PlatformGallery` → `GlobalReach` →
`Footer`.

**Other routes**, each using the shared `PageHeader` (hero image + text) +
page-specific content, most ending in a `CtaBand`:
- `/about` — mission, stats, "What We Believe" values grid (photo cards)
- `/for-you` — hub page covering Learners/Educators/Institutions
- `/learners` — feature grid + progress-report screenshot section
- `/educators` — feature grid + 4-step "become a tutor" flow
- `/try-now` — two-path (learner/tutor) landing page, CTAs intentionally
  inert (no signup backend was requested)
- `/pricing` — 3 placeholder tiers (Starter/Premium/Institutions) — **prices
  are placeholders**, not real, flagged to the user as swap-in-later
- `/contact` — **real working form** (see Contact form section below)

## Design system (current state)

This went through several rounds — the version below is final as of this
handoff.

- **Background**: one continuous gradient on `<main>` (light near-white top
  → deep saturated blue bottom), not per-section banded colors — **except**
  `GlobalCommunity` on the homepage, which is a deliberate solid dark navy
  band (`#081b33`), built to match a specific reference image the user
  provided. That's an intentional, explicit exception, not a mistake to
  "fix" back to the gradient rule.
- **No translucent/backdrop-blur boxes anywhere.** Every card across every
  page is solid white (`bg-white`) or solid colored, with a real box-shadow
  for depth. This was an explicit, repeated instruction — if you see a
  `bg-white/NN` or `backdrop-blur` on anything that isn't a modal overlay
  (the gallery `Lightbox`'s backdrop is fine, that's a real overlay) or a
  button hover state, it's a bug, not a feature.
- **Color palette** for icon badges/accents/theming, used as a rotating set
  across feature grids and step indicators: `#1ba3e0` (brand blue), `#f5a623`
  (amber), `#2dd4bf` (teal), `#a78bfa` (violet), `#f472b6` (rose), `#4ade80`
  (green). The Split section uses `#7c3aed` (purple) specifically for the
  Educators theme (paired with `#1ba3e0` blue for Learners).
- **Fonts**: Inter (`font-sans`, default, everything) and Playfair Display
  (`font-display`, a serif loaded via Google Fonts in `index.html` +
  registered in `tailwind.config.js`) — used **only** for the Split
  section's headline as a deliberate one-off editorial accent, not a
  site-wide typography change. Don't spread it elsewhere without being asked.
- **Illustrated avatars only** (`src/components/AvatarIllustration.tsx` —
  colored circle + silhouette shape), never stock photos for generic
  "person" placeholders (testimonial avatars, map pins, trust-bar avatars).
  This is a locked design rule from early in the project.
- **Real product screenshots** (`public/gallery/`: `dashboard.png`,
  `onboarding.png`, `practice-report.png`, `session-details.png` — all
  1000×540px) reused throughout for platform-preview credibility. **Always
  match aspect-ratio containers to `1000/540` exactly for these** — forcing
  them into a different ratio (e.g. `4/3` or `16/10`) crops real UI content
  off the edges. This exact bug has been hit and fixed twice already (loading
  screen laptop mockups, Try Now / Pricing page headers) — check any new
  usage of these images against this before shipping.
- **Real stock photos** (`public/photos/`: `hero-learner.jpg`,
  `about-founders.jpg`, `learners.jpg`, `educators.jpg`, `journey-1.jpg`
  through `journey-5.jpg`) sourced from Pexels (free, no attribution
  required). Workflow for new photos: search Pexels via the Browser pane,
  present 2-3 candidates to the user via `AskUserQuestion` with image
  previews, download the chosen one via `curl` + resize with `sips` (target
  ~1400px on the long edge, ~150-300KB) before committing — never commit a
  multi-MB original.

## Learning Journey — architecture notes (if touching this file again)

`src/components/journey/LearningJourney.tsx` is the most fragile component
in the codebase — it's been the source of three real bugs, all fixed:

1. **Row spacing must be measured, never guessed.** Card/photo heights are
   measured live via `ResizeObserver` (`cardRefs`, `photoRefs`) and
   milestone vertical positions (`centers`) are computed from real rendered
   heights, not fixed percentages or hardcoded pixel gaps. If you add
   content that could change a card's height, this system handles it
   automatically — don't reintroduce guessed spacing constants.
2. **The scroll-drawn line's SVG viewBox (`0 0 100 500`) is intentionally
   stretched non-uniformly** (`preserveAspectRatio="none"`) to fit its much-
   taller-than-wide container — fine for the decorative squiggle, but
   anything else drawn inside that same `<svg>` inherits the distortion. The
   numbered step circles used to be SVG `<circle>` elements and rendered as
   **ovals**, not circles, because of this. They're now plain HTML `<div>`s
   positioned by percentage `left`/`top` (set imperatively in a `useEffect`,
   computed from `path.getPointAtLength`), which resolves against the
   container's real, undistorted box. **Never put anything that needs to
   look geometrically correct (circles, squares) inside that stretched SVG.**
3. **Text alignment must be `text-left` on every card, always** — a leftover
   `text-right` for cards on the page's left side (matching an older, plainer
   layout convention) caused the inline "Step N" pill to float to the wrong
   edge and collide with the absolutely-positioned icon badge, which is
   always pinned top-right regardless of side.

Also: photo aspect ratio is `3/2` (was `4/3`, widened because the 4:3 crop
was trimming real content off the source Pexels photos, some of which are
already fairly tight compositions).

## Recent major work (chronological, most recent last)

1. Built all 7 secondary pages with `react-router-dom` routing.
2. Contact page got a real form (`api/contact.ts`, a Vercel serverless
   function calling the Resend REST API directly via `fetch` — no `resend`
   npm package needed). **`RESEND_API_KEY` was never configured in Vercel's
   environment variables** — the endpoint currently returns a graceful "not
   configured yet" error instead of actually sending email. This is the
   single biggest open item — see below.
3. Multiple design-iteration rounds: an "add more structure/boxes" pass,
   then a full reversal ("remove all translucent boxes"), landing on the
   solid-white-card system described above.
4. **Full Home page rebuild** to match a series of mockup images the user
   provided directly in chat:
   - **Hero**: replaced the single-photo layout with a laptop+phone device
     mockup composite (real screenshots), gradient-accented 3-line headline,
     illustrated avatar row, "Learn More" secondary button. Dropped the old
     4-stat CountUp row from the hero itself.
   - **GlobalCommunity** (new component, replaced the old `AboutIntro`):
     dark navy band, "Learn From Anywhere / Connect Everywhere" headline,
     120+ Countries stat, flag row, wireframe globe/network SVG with
     illustrated avatar pins on arcs.
   - **StylizedGlobe.tsx** (shared by loading screen + Global Reach)
     restyled: light gray/silver continents (was translucent cyan
     wireframe), ~30 glowing "city light" points added, white greeting
     pills with per-language colored icons (was a two-part dark
     pill+separate avatar tail), graticule grid lines removed.
   - **Loading screen**: laptop mockup width now computed dynamically from
     real available space (not guessed breakpoint values — this had been
     "make it bigger" iterated on ~4 times before switching to a computed
     approach that's correct by construction). Aspect ratio fixed to
     `1000/540` to stop cropping the screenshots. Decorative orbital ring
     added. Heading restyled to match the new Hero's eyebrow-pill/gradient
     treatment. Globe rotation itself untouched.
   - **Learning Journey**: full mockup-matching restyle — see the dedicated
     section above for the architecture/bug notes. Numbered circle nodes,
     per-step icon badges, floating contextual UI overlay chips on each
     photo (language list / level progress / lesson checklist / rating /
     achievement badge), glowing gradient line, condensed vertical spacing.
   - **Split section** (For Learners/For Educators): full rebuild — Playfair
     Display serif headline, floating UI chips per card (testimonial +
     progress for Learners; earnings + next-lesson for Educators), colored
     accent bar, feature-chip row, gradient CTA button, trust bar with
     avatars at the bottom.

## Known open items / next steps

- **Contact form needs a real `RESEND_API_KEY`.** User needs to sign up at
  resend.com (free tier is fine), get an API key, add it to the Vercel
  project's environment variables (Settings → Environment Variables), and
  redeploy. Currently sends from Resend's shared test address
  (`onboarding@resend.dev`) — once `linkglobalnetwork.ca` is verified as a
  sending domain in Resend, that can be switched to a real domain address.
- **Visual language mismatch between Home and the 7 inner pages.** Home just
  went through an elaborate mockup-matching rebuild (device mockups, serif
  headline accent, floating UI chips, wireframe globe). The inner pages
  (About/For You/For Learners/For Educators/Try Now/Pricing/Contact) are
  still on the *earlier* design pass (solid white cards + colored icon
  badges, no device mockups or serif accents). If the user provides more
  mockups or asks to extend the new look, the inner pages are the natural
  next target — flag this proactively if it comes up.
- **Nav (`FloatingNav.tsx`) and Footer haven't been touched** during the
  mockup-matching rebuild — still the icon-chip nav style from an earlier
  round. The reference mockups the user provided showed a plain top nav with
  text links, but that was for style reference on Hero/Journey/Split
  specifically, not necessarily a request to change the nav. Don't assume
  it needs to change without being asked.
- **Platform Gallery and Global Reach** (the last two homepage sections)
  haven't been part of the mockup-matching pass — only Hero, GlobalCommunity,
  LearningJourney, and SplitSection have been redone to match user-provided
  reference images so far.
- Pricing numbers are explicitly placeholders — don't treat them as real
  when discussing the site with the user.
