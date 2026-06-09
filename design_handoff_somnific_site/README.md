# Handoff: Somnific Studios — One-Page Marketing Site

## Overview
Somnific Studios is a sleep / ambient-dreamscape brand (YouTube films + sleep stories). This is the **first incarnation of its website: a single-page, scroll-down marketing site** that:
1. Presents the brand (glowing hero wordmark)
2. Links out to the YouTube channel via a gallery of video cover thumbnails
3. Introduces the founder, Madelyn
4. Captures newsletter signups (intended provider: **Brevo** — not yet wired)
5. Links to social profiles (Facebook, Instagram, Pinterest, Patreon)

Future intent (not in scope yet): the site will later link out to web apps built with Claude Code. Build the nav/structure so adding more sections/pages later is easy.

## About the Design Files
The files in this bundle are **design references created in HTML/React+Babel** — a prototype showing the intended look and behavior. They are **not** meant to be shipped as-is. The task is to **recreate this design in a real codebase** using its established framework and patterns. If no codebase exists yet, a small static site is the right call — **Astro**, **Next.js (static export)**, or even hand-written HTML/CSS — since this is a brochure site with one light interactive form. Do not ship the Babel-in-the-browser setup to production (it's for prototyping only).

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, layout, and interactions are final and intended to be matched closely. Exact values are in the Design Tokens section below. The one deliberately open piece is the newsletter form's backend (see Interactions).

## Brand / Visual Style
- Mood: dreamy, nocturnal, calm. Periwinkle-blue daytime field up top transitioning into a deep navy "night" panel for the content.
- Two-font system:
  - **Montserrat** — body text, buttons, fine print.
  - **Montserrat Alternates** — the wordmark and the "geometric" label style.
  - **Caveat** — a handwritten script used for section headers ("YouTube", "Madelyn", "Newsletter") in the default styling. (There is an alternate "geometric" label mode that uses uppercase Montserrat Alternates instead — see Tweaks.)
- Subtle ambient motion is part of the brand feel (gentle float on the hero, soft pulsing glow), but everything must remain fully visible and usable with motion disabled / `prefers-reduced-motion`.

## Page Structure (top → bottom)
The page is one vertical scroll. Max content width **1180px**, centered, with 32px side padding (20px on mobile).

### 1. Hero
- Full-width, centered. Padding 40px top.
- **Default ("dream") variant:** the pre-rendered title PNG (`assets/hero-title-clean.png`) — a glowing "somnific studios" neon wordmark with a crescent moon, cloud, and bed — floating centered at `min(660px, 90vw)` wide, with a soft radial golden **glow** behind it (a blurred radial-gradient circle). Gentle vertical float animation (9s) + glow pulse (7s) when motion is on.
- **Alternate ("horizon") variant:** a full-bleed cinematic banner — `assets/sleeper.png` cover image in a 22px-radius rounded container `min(78vh, 720px)` tall, with the wordmark rendered as live text (neon text-shadow) centered on top. Slow 22s background drift.
- NOTE: `hero-title-clean.png` was hand-cleaned (cropped a reflection, feathered edges to transparent) so it melts into the periwinkle background. If you re-export brand art, preserve that transparent-edge treatment or the rectangle will show a hard seam.

### 2. Tagline
- Centered. Padding 30px top / 76px bottom.
- **H1:** "Serenity Through Sleep" — Montserrat Alternates, weight 300, `clamp(28px, 4.6vw, 52px)`, uppercase, letter-spacing `.22em`, color `#eaf1ff`.
- **Intro paragraph** below, max-width 720px, Montserrat weight 300, `clamp(16px,1.5vw,19px)`, line-height 1.8, color `rgba(244,247,254,.80)`. (Copy is placeholder-quality real copy; client may edit. Current text in `app.jsx`.)

### 3. Navy Panel (contains Videos + Bio + Newsletter)
- Background: vertical gradient `#0c1746 → #0a1440`. Padding 78px top / 90px bottom.
- This dark panel is the visual "night" half of the page and holds the three content blocks.

#### 3a. YouTube video gallery
- Section header "YouTube" (Caveat script, `clamp(34px,4vw,48px)`, color `#eef3ff`) + sub-label "Drift through our latest visual journeys." (`rgba(244,247,254,.62)`).
- **Default "grid" layout:** 3-column CSS grid, 22px gap, 5 thumbnails, each a 16:9 rounded (12px) card.
- **Alternate "featured" layout:** first card spans 2 rows / larger, remaining 4 fill a 2fr/1fr/1fr arrangement.
- Each card: `<a>` linking to the video/channel (currently `#` — **replace with real YouTube URLs**), opens in new tab. Cover image fills the card (`object-fit: cover`).
- Hover: card lifts (`translateY(-6px)`), image zooms (`scale(1.07)` over 0.9s) + brightens, a translucent circular **play button** (58px, blurred glass, white triangle) fades/scales in, and a subtle vignette overlay appears.

#### 3b. Madelyn bio
- A thin 1px bordered frame (`rgba(186,201,255,.34)`, 6px radius, 26px padding) wrapping an inner box (`#17215c` bg, 44×48px padding).
- Inner box is a 2-column grid: text (left) + portrait photo (right, fixed 220px col, 48px gap, vertically centered).
- **H3 "Madelyn"** (Caveat, 40px, `#eef3ff`), paragraph below (Montserrat 300, 16px, line-height 1.85, `rgba(244,247,254,.80)`).
- Photo: `assets/madelyn.jpg`, 3/4 aspect, 4px radius, drop shadow.
- Mobile (<860px): collapses to single column, photo centered above text at max 220px.

#### 3c. Newsletter + Dreamer
- 2-column grid, **bottom-aligned** (`align-items: end`), 30px gap.
- **Left — newsletter form:**
  - H3 "Newsletter" (Caveat, 44px).
  - Paragraph (`rgba(244,247,254,.62)`, max-width 420px).
  - Form (flex column, 14px gap, max-width 460px): a **Name** text input, an **Email** input (required), and a **Subscribe** button.
  - Inputs: bg `#131e54`, 1px border `rgba(186,201,255,.16)`, 4px radius, 16×18px padding, 15px text. Focus: border becomes the glow color + 3px glow ring.
  - Button: pill (40px radius), white→`#e9f0ff` gradient bg, navy text `#1a2b66`, Montserrat Alternates 14px uppercase letter-spacing `.16em`, 14×34px padding. Hover: lifts 2px + golden glow shadow.
  - On submit: currently just shows a success message ("Sweet dreams — you're on the list ✦") in the glow color. **This must be wired to Brevo** (see Interactions).
- **Right — dreamer illustration:** `assets/dreamer.png` (a floating sleeping figure), `min(440px, 86%)` wide, pinned **flush to the bottom edge of the navy panel** (achieved via `margin-bottom: -90px` on the `.dreamer` container so the art bleeds to the panel's bottom border). No animation on this image (deliberately static). On mobile it moves above the form (`order: -1`).

### 4. Footer
- Below the navy panel, back on the periwinkle background. Centered, padding 56px top / 64px bottom.
- Wordmark "somnific studios" (Montserrat Alternates 200, lowercase, letter-spacing `.42em`, `clamp(18px,2.4vw,26px)`, white).
- **Social row:** 4 circular icon buttons (42px, 1px white-40% border, white SVG glyph), 18px gap. Order: Facebook, Instagram, Pinterest, Patreon. Hover: lifts 3px, fills white-16%, border→full white. Links currently `#` — **replace with real profile URLs**. (Inline SVG path data for all four icons is in `app.jsx`'s `SOCIALS` array — reuse it.)
- Fine print line: "© {year} Somnific Studios · Serenity through sleep" (`rgba(255,255,255,.55)`, 12px).

## Interactions & Behavior
- **Scroll reveal:** sections fade/slide up (opacity 0→1, translateY 26px→0, 0.9s ease) as they enter the viewport via IntersectionObserver. IMPORTANT implementation detail: content is visible by **default**; the hidden state is only applied after JS confirms it's running (a `body.anim-ready` class), plus there's a 2s fallback timer and an immediate "already in view" check. This guarantees content is never stuck invisible if the observer fails. Reproduce this fail-safe pattern (or use a well-tested library) — do not naively set `opacity:0` in base CSS.
- **Newsletter submit (TODO):** wire to **Brevo** (formerly Sendinblue). Either use Brevo's hosted form embed or POST to their API/double-opt-in endpoint. On success show the inline confirmation; handle error state (show a retry message). Validate email format client-side before submit.
- **Reduced motion:** when `prefers-reduced-motion: reduce`, all keyframe animations are disabled and all reveal elements show immediately. Preserve this.
- **Responsive breakpoints:** 860px (bio + closer collapse to single column, videos → 2-col) and 560px (videos → 1-col, side padding shrinks to 20px).

## State Management
Minimal:
- Newsletter form: `submitted` boolean (+ in production: `loading`, `error`, field values).
- The rest is a static brochure page. (The prototype also has a "Tweaks" panel with design-variation state — that is a prototyping affordance and **should NOT be ported** to production. See note below.)

## Design Tokens
Pulled from `styles.css` `:root`.

**Colors**
- Background periwinkle: `#6498d8` (with a lighter radial `#6f9fdb` glow at top center)
- Navy panel gradient: `#0c1746` → `#0a1440`
- Bio inner box: `#17215c`
- Input field bg: `#131e54`
- Hairline border: `rgba(186,201,255,.34)`; input border `rgba(186,201,255,.16)`
- Text: `#f4f7fe` / dim `rgba(244,247,254,.80)` / faint `rgba(244,247,254,.62)`
- Heading tint: `#eaf1ff` / `#eef3ff`
- Accent **glow** (default "gold"): `#ffe9b0`, soft `rgba(255,233,176,.55)`. Alt accents: lavender `#d7c8ff`, rose `#ffc6da`.
- Button text navy: `#1a2b66`

**Typography**
- Body/UI: **Montserrat** (weights 200,300,400,500,600)
- Display/wordmark: **Montserrat Alternates** (200,300,400,500,600)
- Script labels: **Caveat** (500,600,700)
- Google Fonts import is in the HTML `<head>`.

**Spacing / radius / motion**
- Content max-width 1180px; side padding 32px (mobile 20px)
- Card radius 12px; hero-horizon radius 22px; inputs/boxes 4px; bio frame 6px; button pill 40px
- Standard easing: `cubic-bezier(.22,.61,.36,1)`
- Float anim 9s, glow pulse 7s, horizon drift 22s, reveal 0.9s

## Assets
All in `assets/` (provided by client, used as-is except where noted):
- `hero-title-clean.png` — hero wordmark art, **edge-feathered/cropped** version of the original `Somnific-titleHP.png` (transparent edges; use this one for the dream hero).
- `sleeper.png` — full-bleed cover for the "horizon" hero variant.
- `dreamer.png` — floating sleeper illustration (newsletter section, transparent bg).
- `madelyn.jpg` — founder portrait.
- `vid01.jpg`, `vid03.jpg`, `vid04.jpg`, `vid05.jpg`, `vid06.jpg` — YouTube cover thumbnails (5 videos).
- (Also present: `logo-footer.png` — a logo variant, currently unused; the footer uses a text wordmark. Available if you prefer an image logo.)
Replace video covers / add more as the channel grows. Titles in the prototype (`Above the Clouds`, `Still Water`, etc.) are placeholders — use real video titles.

## Tweaks panel — DO NOT PORT
The prototype includes a floating "Tweaks" panel (`tweaks-panel.jsx`) that toggles design variations: hero style (dream/horizon), video layout (grid/featured), label style (handwritten/geometric), background (periwinkle/twilight), glow color, and motion on/off. **This is a design-exploration tool, not a product feature.** Pick the chosen direction with the client (defaults are: dream hero, grid videos, handwritten labels, periwinkle bg, gold glow, motion on) and hardcode it. The variation logic lives in `app.jsx` keyed off `<body>` data-attributes (`data-bg`, `data-accent`, `data-labels`, `data-motion`) and CSS selectors in `styles.css` — useful as a reference for what each variant looks like, then drop the panel.

## Files in this bundle
- `Somnific Studios.html` — page shell (fonts, mount point, script tags).
- `styles.css` — all styling and tokens (`:root`). **Primary styling reference.**
- `app.jsx` — React components (Hero, Tagline, Videos, Bio, Newsletter, Footer), the `VIDEOS` and `SOCIALS` data arrays (incl. social icon SVG paths), and the reveal/tweak logic.
- `tweaks-panel.jsx` — prototyping panel (reference only; do not port).
- `assets/` — all images.

To preview the prototype: serve the folder over HTTP (e.g. `npx serve`) and open `Somnific Studios.html` — it needs to be served, not opened via `file://`, because of the Babel/asset loading.
