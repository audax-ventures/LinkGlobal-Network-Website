# LinkGlobal Network Website — Handoff

Written to let a fresh chat pick up this project without re-deriving context.
Read this file first, then the codebase, before making changes.

# >>> LATEST UPDATE (Sept 2026) — READ THIS BLOCK FIRST <<<

Everything in this block supersedes the older sections below wherever they
conflict (the older text is from Aug 2026). Last commit at time of writing:
`6c3aec4`.

## Workflow (unchanged, plus one addition)
- Never run anything locally (no dev server/build/npm install). Commit + push
  straight to `main`; Vercel auto-deploys; verify on the live site in the
  Browser pane. Wait ~90-120s after a push (ScheduleWakeup works well).
- Commit messages end with a `Co-Authored-By: Claude <model> <noreply@anthropic.com>` line naming the model actually in use.
- Deploy status without hammering the site: poll GitHub's public commit
  status API (`api.github.com/repos/audax-ventures/LinkGlobal-Network-Website/commits/<sha>/status`)
  until `success`, then check the live site in the Browser pane. The Vercel
  MCP connector can't see this project (lists no teams/projects).
- Riley (the user) types briefly and expects execution; ask only real
  decision-blocking questions (AskUserQuestion).
- Task-tracking tools (TaskCreate etc.) may be unavailable; just work.

## Environment gotchas learned (save yourself the time)
- **Pasted chat images are NOT on disk.** Ask Riley to save them to
  ~/Downloads (they arrive as "ChatGPT Image <date>.png"). macOS
  screenshot filenames contain U+202F (narrow no-break space) before AM/PM —
  match with Python `glob`, never a literal space.
- Image tooling: Python 3.9 + PIL only (no numpy/opencv/brew/potrace). For
  screenshots/mockups: crop, resize (LANCZOS), palette-quantize to 256 colors
  (128 caused visible gradient banding), keep alpha separate. Flood-fill from
  the borders to cut flat backgrounds without punching holes in white UI.
  I wrote a pure-PIL Moore-neighbor contour tracer to trace the logo globe.
- PDFs: `pip3 install --user pypdf pymupdf` is done; render pages with
  `fitz` to PNGs in the scratchpad and Read them. (Read's built-in PDF paging
  needs poppler, which isn't installed. A "383 pages" estimate was wrong —
  the revision PDF is 13 pages.)
- **Browser pane quirks:** frequently stuck/blank screenshots after scroll or
  DOM changes (retry, fresh tab, or use DOM checks); `zoom` region-crop is
  unsupported; framer-motion/GSAP animations tick very slowly or stay at
  their initial `opacity:0` (force with a getComputedStyle loop setting
  opacity 1 / transform none for verification only); the first screenshot
  after load sometimes misses lazily painted images — re-screenshot. On the
  loading screen, `window.innerWidth` may read 0, which makes
  `useViewportSize` hide the side devices in the DOM even though the real
  paint is fine — trust screenshots there.
- **True-size legibility:** small SVG/logo work must be judged by
  rasterizing the SVG to a canvas at its real rendered size, then magnifying
  that raster (nearest-neighbor) — scaling the vector up hides problems.
- **Framer Motion clobbers Tailwind transform classes** on the same element
  (`-translate-x-1/2`, `translate-y-full` etc. are overwritten). Put static
  positioning/centering on a plain wrapper div and animate an inner
  `motion.div`. (Bit us in LearningJourney cards and the nav preview.)
- `object-contain` on a mismatched aspect dumps the whole gap as one black
  bar (looked broken); `object-cover` with a small even side crop is better.

## What was built/changed since the Aug handoff (all live on main)
- **Logo** (`src/components/Logo.tsx`): globe continent path is *traced from
  the client's real asset* (no white gap ring exists in the real logo). The
  globe group spins continuously via `@keyframes lg-globe-spin` in
  `src/index.css` (bubble + tail stay fixed). Logo links home in nav + footer.
- **Nav** (`FloatingNav.tsx`): colored per-route icon chips; hover shows a
  preview panel (that page's own hero image + one-line blurb via
  `ROUTE_META`). Client chose "static thumbnail" over live iframe; we reuse
  each page's existing hero image since screenshots can't be saved to disk here.
- **Loading screen** (`SpinningWorld.tsx`): monitor (`MonitorMockup`, 16:10,
  object-cover) + globe + tablet (client image
  `public/gallery/tablet-dashboard-mockup.png`, 1200px) with phone
  (`mobile-dashboard-mockup.png`, 500px) overlapping. Dismiss bug fixed:
  wheel/touch listeners are removed the instant dismiss triggers and a 1.5s
  safety timeout guarantees completion (backgrounded-tab rAF throttling could
  strand scroll-blocking). `LaptopMockup` is 16:10 object-cover (Hero).
- **Home order** (`pages/Home.tsx`): Hero, GlobalCommunity, LearningJourney,
  SplitSection on `#f8fbff` (RESET_LIGHT), then a FADE_TO_DARK gradient
  wrapper around PlatformGallery + GlobalReach + CtaBand (needed because the
  shared PageShell gradient was too dark by that point). Anything inside that
  wrapper must be solid-white-card + dark-text (translucent white text was
  unreadable) — PlatformGallery intro and GlobalReach are already fixed.
- **Hero**: "Real Conversations." forced on one line; headline uses fluid
  `text-[length:clamp(...)]` sizes so it doesn't overlap the laptop (1024px)
  or clip on phones. Pushed but NOT yet verified at 375/768/1024/1440 widths
  (resize_window tool can set them; measure span right edge vs laptop left).
- **Learning Journey**: step cards/photos slide in from their side on scroll
  (wrapper-div pattern). Photos are real product screenshots
  `public/photos/journey-app-1..5.png` (left-aligned 3:2 crops).
- **Pricing** (`pages/Pricing.tsx`): real approved pricing, NOT placeholder:
  Starter $39, Growth $89 (Most Popular), Intensive $159 per month, features
  per the client PDF; prices count up on scroll (local `PriceCountUp`,
  GSAP ScrollTrigger); pay-per-session and Institutions are separate showcased
  cards (contact-based, no price). Currency is unknown — never state one.
- **Global Reach** testimonials: continuous CSS marquee (`.lg-marquee-track`,
  two copies, -50% loop, pause on hover, edge-fade mask).
- **Removed** duplicate product-screenshot galleries from About and Pricing.
  About's "See It In Action" is now text + CTA only.
- **CTAs**: every CtaBand primary label is "Start Your Journey" -> /try-now;
  Home has a closing CtaBand. Platform Gallery has a "Learn More" -> /about.
- **Photos**: `learners.jpg`, `educators.jpg` (Home split), `learners-hero.jpg`,
  `educators-hero.jpg`, `institutions.jpg` (For You) are AI-generated
  (ChatGPT) — the client wants them replaced with real photography later.
- **AI chatbot "Intuitina"** (`src/components/chat/ChatWidget.tsx`,
  `api/chat.ts`, `public/mascot/assistant-mascot.svg`): fixed bottom-right
  spinning-mascot launcher (mascot SVG has a prefers-reduced-motion rule),
  chat panel with suggestion chips/typing dots/graceful errors, mounted in
  `App.tsx` after the loading screen. Backend calls the Anthropic Messages API
  (`claude-haiku-4-5-20251001`) via fetch, system prompt limited to confirmed
  facts (keep in sync with Pricing.tsx), input caps, 400 max tokens, best-effort
  in-memory rate limit (20 per 10 min per IP). Without `ANTHROPIC_API_KEY`
  in Vercel it returns 503 `not_configured` and the widget shows a friendly
  "contact the team" message — verified end to end. **Riley must add the key
  in Vercel and redeploy**; I must never handle the key. "Intuitina" is
  assumed to be the assistant's name (constant `ASSISTANT_NAME` in
  ChatWidget.tsx + persona line in api/chat.ts) — unconfirmed with Riley.
  The real LLM path and 400-validation path are untested until the key exists.

## The client revision document (13 pages)
`~/Downloads/LinkGlobal Network Revision Document Updated 2.0-2.pdf`
(sections 1-10). Riley's decisions: chatbot key later; will supply corrected
Dilip screenshots, HD screenshots, cinematic globe hero image/video, real
photos, and the journey character design later; claims in the doc are
accurate (build the visuals, keep "SAMPLE" labels on illustrative cards);
pricing is real; nav preview = static (done); journey character should walk
the line as you scroll; journey style = Lingoda's straight line whose color
saturation increases with scroll; pay-per-session stays contact-based but
prominent.

### DONE Sept 23 2026 (commits c6e3319, 14e274f) — verified live, desktop + 375px
Home order is now: Hero, **LinkGlobalLoop** (GlobalCommunity was removed at
Riley's request Sept 23; the Loop has fades in from the hero and out to the light sections), then on
RESET_LIGHT: **LearningJourney**, **JourneyDashboard**, **SeeWhereItHappens**,
SplitSection; then the FADE_TO_DARK group as before.
- `journey/LearningJourney.tsx` fully rewritten: straight line, plain grid
  rows (no absolute positioning / SVG stretching anymore, so the old
  measurement notes below are obsolete), fill height = scroll head at 55%
  of viewport, gradient sized to full line so saturation deepens as it
  travels; steps before the head are colored, later ones `saturate-0`.
  The journey marker uses `public/mascot/assistant-mascot-static.svg` (no
  spin, per Riley); only the chat launcher uses the spinning original.
  Steps: Discover / Understand / Plan / Converse / Grow. Character slot =
  `characterRef` div riding the head; currently the assistant mascot SVG —
  swap only the `<img>` when Riley's character design arrives.
- `loop/LinkGlobalLoop.tsx`: 260vh section with sticky panel; arc + orbit
  dot driven by scroll; nodes light when reached; Before/During/After copy
  (client's exact wording). Followed by a 160px navy->#f8fbff fade div.
- `dashboard/JourneyDashboard.tsx`: tabs auto-advance every 6s while in
  view (timer bar), stop once clicked; dark product card per tab.
- `dashboard/SeeWhereItHappens.tsx`: Leyla roadmap / teacher briefing /
  B1->C1 chart (draws on view), all SAMPLE-tagged. Dashboard visuals were
  kept deliberately different from these cards (client: no repeated blocks).
- Open question for Riley: PlatformGallery ("Inside the Platform") now
  partly overlaps the new Dashboard section in purpose; consider trimming.

### Loading screen REPLACED (Sept 23 2026, cbc01cf + 0ef9f8f) — Riley's call
The globe + monitor/tablet/phone intro (SpinningWorld, MonitorMockup) is
gone. `loading/IntroSplash.tsx` is an Avid-Golf-style brand splash (Riley's
reference: avid-golf-homepage.riley847668.chatgpt.site): navy, spinning
logo mark, letter-by-letter LINKGLOBAL / NETWORK, greetings run (Hello ->
Namaste, 380ms each, no tagline — Riley removed it), Skip intro, bottom
progress bar, ~4s total (Riley asked for 4s on Sept 26; was 2s). Ends early on click/key/wheel/touch. Plays once
per session (`sessionStorage` key `lg-intro-seen`); `?intro=1` forces a
replay for testing, `?debugPhase=done` skips.
Sept 26: the splash now plays over Riley's supplied animated globe
(`src/lib/globeBackground.js` + `.d.ts`; original lived in
~/Documents/Codex/2026-09-26/can/outputs). Converted from a window global
to an ES export (verified it runs under module strict mode). Options in
IntroSplash: brightness .85, speed 1.4, scale .95, longitude -40.
Don't put a scale transform on its container — the script sizes the
canvas from getBoundingClientRect and would draw off-centre. StylizedGlobe/LazyStylizedGlobe
and data/countryGreetings are now unused (kept in case the cinematic globe
hero comes back). Verification tip: when the Browser pane is hidden,
rAF doesn't run, so framer animations freeze — check timing via DOM text
polling, not opacity. Item 7 below (intro length) is superseded.

### Revision-doc cleanup (Sept 23 2026)
- Try Now cards rebuilt: no photos, icon badge inside a tinted header,
  numbered 3-step path + one perk. Buttons still inert (no signup backend).
- PlatformGallery (+ MockScreen, Lightbox) deleted; client called it filler.
- For Learners: removed the caption-less onboarding+dashboard screenshot
  pair. Pricing header = journey-app-2.png (placement conversation) — do
  NOT use journey-app-4.png there, it shows $30/$40 session prices.
  About "Tutors, not algorithms" = journey-1.jpg; Contact photo removed.
- Global Reach heading un-boxed to match other sections; CtaBand heading
  now font-extrabold sm:text-5xl site-wide.
- Still repeated (needs Riley's real photos): For You cards reuse
  learners.jpg/educators.jpg from the Home split; hero-learner.jpg is on
  both For You (header) and About. Nav hover previews reuse page heroes on
  purpose.

### Site-wide look = homepage look (Sept 24 2026) — supersedes older "Design system" notes
- PageShell is now a flat light base (#f8fbff) + soft fade into a dark
  footer (#050f1f); the old page-length white->sky-blue gradient is gone.
  Home and Try Now pass `footerFade={false}` (they end dark themselves).
- `components/NavyBand.tsx`: full-width #081b33 section with solid-blue
  fade ramps in/out (translucent midpoints looked grey — don't go back).
  Inside: white headings (font-extrabold), brand-cyan eyebrows, dark cards
  as `bg-white/5 ring-1 ring-white/10`, or white cards for contrast.
- Where it's used: About (stats + What We Believe), For You (Educators
  row), For Learners (See Your Progress), For Educators (four steps),
  Pricing (pay-per-session + institutions), Try Now (path cards).
  Contact's email card is a solid navy card.

### STILL TO DO — can start now (no assets needed), suggested order
(Items 1-4 below are DONE — see above.)
1. **Learning Journey rebuild** (item 6): straight vertical line, saturation
   increasing as you scroll (Lingoda "Your learning journey starts here"),
   minimal steps like the reference "Your path, step by step" (Discover /
   Understand ... short titles, one-line copy, no scattered shapes/paragraphs,
   pictures only if they add value), numbered nodes; build a character slot
   that will track scroll position along the line (placeholder until
   Riley's design arrives). Keep the measured-layout approach — do NOT guess
   heights (see older LearningJourney notes below; SVG viewBox stretching
   rules still apply).
2. **"The LinkGlobal Loop" section** (item 5): circular diagram (AI analyzes
   -> Teacher briefed -> You converse) with scroll-synced Before/During/After
   your session copy: Before: "The AI briefs your teacher on what you've
   mastered and what you're still avoiding." During: "No diagnosis, no
   level-guessing. The conversation starts where you need it." After:
   "Everything that happened feeds back into your roadmap, which adjusts
   before your next lesson."
3. **"Your journey has a dashboard"** (item 8): tabbed/scroll-synced 01 Your
   Roadmap / 02 Live Sessions / 03 Your Progress with a matching visual.
4. **"See where it happens" / progress graph** (item 8): sample learner
   ("Leyla") roadmap, teacher briefing, progress line (e.g. B1 -> C1 in ~2-3
   months), labeled SAMPLE, animated.
5. **Try Now card polish** (item 9, PDF p.11-12): the icon badges are cropped
   at the photo's bottom edge and the copy below is flat/unengaging.
6. **Section flow** (item 5): sections currently read like slides; make them
   flow (continuous backgrounds, overlapping transitions, scroll cues).
7. **Intro length** (item 4): the opening globe screen should run longer
   before handing off (currently dismisses on the first scroll tick).
8. **Repeated visuals** (item 9): the same four screenshots appear on the
   loading screen, Hero, Platform Gallery and nav previews — cut/vary.
9. Verify the Hero headline fix at several widths; re-check scroll-back bug
   in a real browser with Riley (couldn't reproduce here; fix is defensive).

### BLOCKED on Riley
Corrected "Dilip" screenshots (session-details.png literally shows "Hi, Riley
Peterson" in its pixels; site source has no "Riley"), HD screenshots, cinematic
globe hero asset (reference: dark night-earth with glowing connection lines,
text sequence "Every opportunity begins with a conversation." -> "Right now,
millions of people are finding their voice." -> "Today, let's find yours."
+ Begin CTA), real photos, journey character, ANTHROPIC_API_KEY, confirm
"Intuitina" name. **Unanswered question to Riley:** which elements are "the
two small info blocks in the platform preview section" (item 2, PDF p.1) —
I couldn't identify them; don't guess, ask again.

### Design rules reminder
Solid white cards (no translucent/backdrop-blur except modal overlays), dark
navy text on light backgrounds, illustrated avatars, Playfair only on the
Split headline, screenshots at 1000/540, "Start Your Journey" as the one CTA
label, no invented claims (only facts confirmed by Riley/the PDF).

# >>> END LATEST UPDATE — older Aug 2026 notes follow <<<

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
