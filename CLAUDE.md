# CLAUDE.md — Somnific Studios

*This file lives in the repository root. Claude Code reads it at the start of every session. It is the single source of truth for this project. Keep it current.*

---

## What this project is

The website for **Somnific Studios** — Madelyn Greco's sleep and meditation YouTube channel. A single-page cinematic brochure site plus three AI micro-apps. This is the studio's first real training build on the stack.

**Owner / director:** Scott Fray. He directs builds and reviews everything; he does not write code. Propose architecture before building. Build one piece at a time. Test in browser after each piece.

**Aesthetic standard (non-negotiable):** launches credibly competitive with established alternatives. "Minimum impressive," never "minimum viable." One chance to impress.

---

## Stack (do not deviate)

- **Framework:** Next.js 14 (App Router) + React
- **Styling:** Tailwind CSS + shadcn/ui + the brand tokens below
- **Database / auth / storage:** Supabase (only if a feature needs it — most of this site doesn't)
- **Payments:** Stripe (not needed for Somnific v1)
- **Transactional email:** Resend
- **Marketing email:** Brevo (newsletter signup connects here)
- **AI features:** Anthropic Claude API
- **Errors:** Sentry
- **Analytics:** Plausible (add at first deploy)
- **Hosting:** Vercel (GitHub push → auto-deploy)

No WordPress. No page builders. Every secret in environment variables, never in the repo.

---

## Brand tokens

```css
--primary:        345 25% 70%;   /* dusty rose */
--secondary:      230 30% 70%;   /* dusty periwinkle */
--hero-bg:        210 60% 75%;   /* sky blue (hero) */
--content-bg:     225 50% 12%;   /* deep navy (content sections) */
--foreground:     40 25% 96%;    /* warm near-white */
```

- **Display font:** very thin, elegant, geometric sans — light, airy, distinctive. Matches the Somnific wordmark. NOT Inter, NOT a system font.
- **Body font:** warm humanist sans.
- **Script accent font:** handwritten-style, used sparingly for section labels only (see "YouTube", "Newsletter" labels in the mockup).
- **Mood:** cinematic, atmospheric, dusk-to-night, painterly. Never clinical. The signature move is the sky-blue hero dissolving into deep navy as you scroll.

---

## Voice

Poetic, gentle, unhurried. Speaks to someone winding down at night. Invitational, never instructional. Never gives medical or clinical advice. Think "dream dispatch," not "sleep hygiene tips."

---

## Page structure — single scrolling page, 12 sections

1. **Sticky nav** — transparent over hero, solid navy on scroll. Logo left; links right (Home, Videos, About, Newsletter). Smooth-scroll anchors.
2. **Hero** — full width. Logo + hero image (floating bed in clouds, crescent moon). Tagline (from Madelyn). Single CTA ("Watch on YouTube").
3. **What We Do** — three columns: Sleep · Meditation · Dream. Two-line description each.
4. **Featured Video** — one embedded YouTube video, autoplay off, click to play.
5. **YouTube Grid** — 6 most recent videos, 3×2, thumbnails link to channel. **Pull dynamically from YouTube Data API v3** so it self-updates on publish.
6. **Sleep Personality Quiz** — AI micro-app (spec below).
7. **Tonight's Dream Widget** — AI micro-app (spec below).
8. **Sound Preview Player** — 60–90s audio sample, minimal dark UI, soft waveform/pulse, play/pause, progress. Link below: "Watch the full session on YouTube."
9. **About Madelyn** — one warm paragraph + one striking photo (red-hair photo from mockup). Personal, not a resume.
10. **Social Proof Strip** — subscriber count or one compelling viewer comment. Static, manually updated at first.
11. **Newsletter Signup** — first name + email → Brevo. One line: "Weekly dream dispatches. No noise." Thank-you on submit.
12. **Footer** — wordmark, © 2026 Somnific Studios · Archipelago International, Inc., Privacy Policy link, social icons (YouTube, Instagram).

**Visual reference:** the Claude Design mockup ("Somnific Studios.html"). Match its composition, color transition, and typographic feel. Treat it as the design target.

---

## Micro-app specifications

### Sleep Personality Quiz (section 6)
- 4–5 questions about sleep patterns. Examples: Do you fall asleep easily but wake at 3am? Sound or silence? Do you dream vividly? What brings you to Somnific (anxious / restless / grieving / just curious)?
- On submit, one Claude API call analyzes answers and recommends a specific Somnific video or playlist with a short, warm explanation of why.
- Result shown immediately. Optional "Email me my result" → captures to Brevo.
- System prompt: stay in Somnific's voice. Recommend, don't diagnose.

### Tonight's Dream Widget (section 7)
- User types one word/feeling (anxious, restless, hopeful, sad, lonely).
- One Claude API call. Responds as the Somnific voice: poetic, gentle, brief (2–3 sentences), framed as an invitation to dream. Never clinical, never advice.
- Anonymous, no login. Output beautiful enough to screenshot and share.

### Sound Preview Player (section 8)
- HTML5 audio, custom dark styling.
- 60–90s clip (Madelyn provides the file → `/public/audio`).
- Minimal UI: play/pause, progress, soft pulse or waveform.
- Link below: "This is from [Video Title] → Watch the full session on YouTube [link]"

---

## Integrations

| API | Used by | Env var |
|---|---|---|
| YouTube Data API v3 | Section 5 (video grid), Section 4 (featured) | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` |
| Anthropic Claude API | Sections 6 & 7 | `ANTHROPIC_API_KEY` |
| Brevo | Sections 6 & 11 (newsletter + quiz email capture) | `BREVO_API_KEY` |
| Resend | Transactional (if needed) | `RESEND_API_KEY` |

All Claude API calls go through Next.js server-side route handlers (never expose the key client-side). Rate-limit the public micro-apps to control cost.

---

## Content still needed from Madelyn (blocks build of those sections)

- [ ] Hero tagline
- [ ] Bio paragraph (1–3 sentences, warm, personal) — *note: a draft bio exists in the mockup; confirm or replace*
- [ ] Which video to feature as the single embed (section 4)
- [ ] YouTube channel URL / channel ID
- [ ] 60–90s audio sample (section 8)
- [ ] Mockup layout approval

*Build sections that don't depend on these first (nav, hero shell, what-we-do, footer, dream widget), then slot in content as it arrives.*

---

## Build order within this project

1. Project init: Next.js + Tailwind + tokens + fonts. Confirm the sky→navy scroll transition renders.
2. Static shell: nav, hero, what-we-do, about, social proof, footer.
3. Newsletter → Brevo (first real integration; small, good practice).
4. Tonight's Dream Widget (one Claude API call; simplest micro-app).
5. Sleep Quiz (multi-question Claude call + optional Brevo capture).
6. YouTube grid + featured video (YouTube Data API v3).
7. Sound Preview Player (needs Madelyn's audio file).
8. Polish: animations, mobile, Lighthouse, Plausible, Sentry. Deploy.

---

## Workflow rules (every session)

- Start in **Plan Mode** for any complex feature; propose architecture before code.
- Permission: start in **"Before Edits."** Switch to auto only when confident.
- Build one piece → test in browser → commit to GitHub → verify Vercel deploy.
- Use `/compact` when context fills; `/clear` + fresh brief for a new feature. Short focused sessions beat long ones.
- **Model:** Opus for architecture/hard problems, Sonnet for standard build, Haiku for small edits.

---

## Domain (urgent)

`somnificstudios.com` and `somnificstudio.com` — both at 007Names, **both expire August 2026. Renew now.** Primary: somnificstudios.com. Point `somnificstudio.com` as a redirect.

---

## Definition of done (v1 launch)

- [ ] All 12 sections present and matching the mockup's feel
- [ ] Dream widget + quiz return on-voice Claude responses, server-side, rate-limited
- [ ] YouTube grid pulls live and updates on publish
- [ ] Newsletter writes to Brevo, shows thank-you
- [ ] Sound player works with real audio
- [ ] Mobile responsive, Lighthouse ≥ 90, Sentry + Plausible live
- [ ] Deployed at somnificstudios.com over HTTPS
