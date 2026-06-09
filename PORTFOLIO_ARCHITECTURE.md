# PORTFOLIO ARCHITECTURE
## The Studio Operating System

*A working manual for AI-assisted web development across all projects, brands, and client work.*

**Version 1.0** · *May 2026*
**Authored for:** Scott Fray (LivingBrush / Somnific Studios / NeurōTone / Soul Tiger / Harmonia / and beyond)
**Read by:** Scott (the product owner) and Claude Code (the developer)

---

## How to Use This Document

This is not a textbook. It is a working manual.

**At the start of every new project**, paste the relevant sections of this document into Claude Code's context. The "Start-of-Project Checklist" (Section 1) walks you through the first day. The "Project Type Templates" (Section 4) tell Claude Code which patterns apply to the kind of thing you're building.

**During development**, when Claude Code asks "how should I handle X?" — point it at the relevant section here. The patterns in this document are the answer. If Claude Code proposes something different, that's a flag: either the document needs updating, or Claude Code is drifting.

**When you encounter something this document doesn't cover**, write it down. Add it to this document. The document evolves with the studio. After the first three or four projects, this manual will reflect the reality of how you actually work — not a theoretical ideal.

**The document is opinionated.** It picks one way to do things and commits to it. The point is not that other approaches are wrong; the point is that consistency across projects compounds into speed, and inconsistency compounds into chaos. When in doubt, follow the pattern.

---

## Table of Contents

1. [Start-of-Project Checklist](#section-1)
2. [Studio Principles](#section-2)
3. [The Shared Stack](#section-3)
4. [Project Type Templates](#section-4)
5. [Account Separation Rules](#section-5)
6. [The Claude Code Workflow](#section-6)
7. [Design System Foundation](#section-7)
8. [Brand Tokens System](#section-8)
9. [Auth Pattern](#section-9)
10. [Payments Pattern (Stripe)](#section-10)
11. [Database Conventions](#section-11)
12. [AI Integration Pattern](#section-12)
13. [Email Pattern](#section-13)
14. [File Storage Pattern](#section-14)
15. [Admin Dashboard Pattern](#section-15)
16. [Content Pattern (MDX and CMS)](#section-16)
17. [Cross-Project Integration](#section-17)
18. [Deployment Workflow](#section-18)
19. [Security and Data Handling](#section-19)
20. [Legal and Compliance Patterns](#section-20)
21. [Maintenance and Update Workflow](#section-21)
22. [Client Engagement Patterns](#section-22)
23. [Cost Monitoring](#section-23)
24. [When to Deviate](#section-24)
25. [Reference: Component Library Inventory](#section-25)
26. [Reference: Environment Variables](#section-26)
27. [Reference: File and Folder Structure](#section-27)
28. [Living Document: Updates and Decisions](#section-28)

---

<a id="section-1"></a>
# 1. Start-of-Project Checklist

Use this checklist at the start of every new project. Do not skip steps. Do not reorder them. The order exists because each step depends on the ones before it.

## Day One: Decisions Before Code

Before writing any code, answer these questions in writing (a `PROJECT_BRIEF.md` file in the project's repo):

1. **What is the project?** One sentence.
2. **Who is the audience?** Specific. Not "consumers" — describe them.
3. **What is the launch-worthy standard?** Name the established competitor this product will be compared against by users. (NeurōTone vs Brain.fm. Harmonia vs Hooktheory. LivingBrush vs other artist portfolios. Client site vs whatever the client's competitors are.) The launch v1 must be credible against this comparison, not "minimum viable."
4. **What project type is this?** SaaS app / brochure site / content site / e-commerce site / client site / micro-app. (See Section 4.)
5. **What is the brand name and what brand tokens apply?** (See Section 8.)
6. **What is the domain?**
7. **What separate accounts/resources does this project need?** (See Section 5.)
8. **What cross-project integrations are planned?** (See Section 17.) Note: integrations are designed for, not built at, launch.
9. **What is the realistic build timeline?** Not the optimistic one. The honest one.
10. **What legal review is needed before launch?** (See Section 20.)

## Day One: Account Setup

Most accounts already exist at the studio level (GitHub org, Vercel, Cloudflare, Stripe, Anthropic, etc.). What's needed per-project:

- [ ] Domain purchased through Cloudflare Registrar
- [ ] DNS zone created in Cloudflare
- [ ] New GitHub repo created in the studio org (private by default)
- [ ] New Vercel project linked to the repo
- [ ] New Supabase project created (separate database — see Section 5)
- [ ] New Stripe Product + Price IDs created (if the project takes payment)
- [ ] New Resend sending domain configured (e.g., `noreply@projectname.com`)
- [ ] New Brevo list created with project-specific double opt-in
- [ ] New Anthropic API key created with descriptive name for cost tracking
- [ ] New Plausible site added under the studio account
- [ ] New Sentry project added under the studio org
- [ ] New PostHog project (when adopted) under the studio org
- [ ] New Cloudflare R2 bucket created with project-specific name
- [ ] Project-specific email alias configured in Google Workspace (`hello@projectname.com`)

## Day One: Repo Initialization

The new repo gets these files committed before the first feature is built:

- [ ] `README.md` — project description, links, runbook
- [ ] `PROJECT_BRIEF.md` — the answers to the Day One questions above
- [ ] `CLAUDE.md` — project-specific instructions for Claude Code (the project Bible)
- [ ] `ARCHITECTURE_REFERENCE.md` — a stub that points to this Portfolio Architecture document, plus any project-specific deviations
- [ ] `.env.example` — environment variable template (no secrets)
- [ ] `.gitignore` — standard Next.js + macOS + IDE patterns
- [ ] Next.js scaffold initialized (see Section 4 for the right template by project type)
- [ ] First commit pushed to GitHub
- [ ] First Vercel deploy confirmed working (even if the site is empty)

## Day One: Legal Engagement (Async)

For any project that handles user data, takes payment, or makes claims that could attract legal scrutiny:

- [ ] Email the attorney with the project brief and Section 20's legal checklist filled in
- [ ] Attorney engagement runs in parallel with development — do not wait for legal to start building, but do not launch until legal has cleared the relevant items

## Week One: Build Foundation Before Features

Before any feature work begins, the project must have:

- [ ] Brand tokens applied (colors, typography, spacing) per Section 8
- [ ] Base layout component working (header, footer, page shell)
- [ ] Design system components imported and themed
- [ ] Auth scaffold (if needed) per Section 9
- [ ] Stripe scaffold (if needed) per Section 10
- [ ] Admin route at `/admin` (even if empty) per Section 15
- [ ] Sentry initialized
- [ ] Plausible installed
- [ ] One real page deployed to production at the project's domain

Only after this foundation is in place should feature work begin.

---

<a id="section-2"></a>
# 2. Studio Principles

These are the rules that govern every decision in this document. When two patterns conflict, the principle wins.

## P1. Consistency over cleverness.

A consistent, well-known pattern executed across every project is more valuable than a clever, custom solution that only works in one place. Boring is good. Repeatable is good. "We've done this exact thing five times before" is the most valuable thing a studio can say.

## P2. The marketability principle.

Consumers do not grade on effort or newness. They compare every product against the best-established alternative in its category. Launch-worthy means "credibly competitive against the named alternative on day one." It does not mean "minimum viable." It does not mean "shipped fast." If a launch version cannot stand against the established competitor on the specific dimensions it claims to be better at, it is not launch-worthy yet. Wait.

## P3. Build foundations before features.

Reusable infrastructure compounds. Project #1 builds the auth scaffold; projects #2 through #8 inherit it. Project #1 builds the Stripe pattern; everyone inherits it. This means project #1 is slower than it would be if you cut corners, and projects #2 through #8 are dramatically faster. Honor the slowness of project #1.

## P4. One stack. One workflow.

Every project on Next.js + Vercel + Supabase + Stripe + Cloudflare + Resend + Brevo + Anthropic + Sentry + Plausible + Claude Code. No exceptions for "this small project" or "this client prefers WordPress." Either the project fits the stack, or the project doesn't get built here.

## P5. The product owner is the constraint.

Scott is the product owner, UX designer, QA tester, and the person who says "no, simpler." Claude Code is the developer. Claude Code will happily build whatever is asked of it, including things that should not be built. The discipline lives in Scott, not Claude Code. When in doubt, build less.

## P6. Brands are separate. Infrastructure is shared.

Each brand has its own identity, its own domain, its own database, its own audience, its own email list, its own privacy policy. But every brand draws from the same component library, the same design system foundation, the same auth pattern, the same Stripe pattern, the same admin framework. Separation lives at the brand layer; shared lives at the infrastructure layer.

## P7. Document decisions, not just code.

When a non-obvious decision is made — why we picked this library, why we structured this schema this way, why we deviated from the pattern — write it down. The architecture document is a living record. Future Scott and future Claude Code conversations need to know not just *what* was decided but *why*.

## P8. Validate technical assumptions early; trust audience demand.

For projects in proven categories (wellness, music education, weddings, oracle traditions, productivity), the audience exists. Skip audience-validation theater (waitlists, 200-signup gates). But always validate technical assumptions before building around them: does the audio engine actually produce the perceived effect, does the AI prompt actually produce usable output, does the OAuth flow actually work end-to-end. Build the technical core in isolation first; build the UI around a proven engine.

## P9. The launch bar is the brand bar.

LivingBrush is an internationally recognized fine art brand. Soul Tiger has visual identity work most companies would envy. Somnific has cinematic brand aesthetics. The technical infrastructure must match the brand quality. A beautifully branded product on a janky technical foundation is a betrayal of the brand. Aesthetics and engineering both ship at the brand's level.

## P10. Plan for replacement.

Every component, every integration, every vendor should be replaceable without rebuilding the rest of the system. If Stripe disappears, the payment pattern is abstracted enough that swapping payment processors is a contained project. If Anthropic raises prices 10x, the AI pattern is abstracted enough to swap providers. Vendor lock-in is a planning failure, not a feature.

---

<a id="section-3"></a>
# 3. The Shared Stack

This is the canonical stack. Every project uses these. Variations are documented in Section 24 (When to Deviate).

| Layer | Tool | Why this one |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | Full-stack React, API routes, server components, the most-supported framework in the AI-coding ecosystem |
| **Hosting** | Vercel | Zero-config deploy, edge functions, free tier handles Phase 1 for nearly any project |
| **Database** | Supabase (Postgres) | DB + auth + storage + realtime in one vendor; eliminates 3–4 separate services |
| **Auth** | Supabase Auth | Email magic link, Google OAuth, Apple OAuth, RLS for tier-based access |
| **File storage (small)** | Supabase Storage | When integrated with auth; first 1GB free |
| **File storage (large)** | Cloudflare R2 | When egress matters or volume is high; cheapest storage on the market |
| **Payments** | Stripe + Stripe Tax | Subscriptions, one-time payments, automated tax, gift cards, future Connect |
| **DNS / CDN / Security** | Cloudflare | Free DNS, free CDN, free DDoS protection |
| **Transactional Email** | Resend | Receipts, magic links, notifications; 3K/mo free |
| **Marketing Email** | Brevo | Waitlists, drip sequences, newsletters; free tier 300/day |
| **AI** | Anthropic Claude API | Primary reasoning and content generation across all projects |
| **Error monitoring** | Sentry | Free tier covers Phase 1; one org, multiple projects |
| **Web analytics** | Plausible | $9/mo flat across all sites; privacy-friendly, no cookie banner |
| **Product analytics** | PostHog (Phase 2) | Funnels, session replay, feature flags; free tier generous |
| **Background jobs** | Vercel Cron (Phase 1) → Upstash QStash (Phase 2) | Scheduled tasks, async work |
| **Code repository** | GitHub | Studio org, private repos |
| **AI development** | Claude Code | Primary build tool |
| **Documentation** | Notion + in-repo markdown | Strategic docs in Notion; technical reference in-repo |
| **Project management** | Linear | One workspace, project per app |

## Per-project-type additions

These add to the stack only when the project type calls for them:

| Addition | When needed |
|---|---|
| Sanity CMS | Client sites that require non-technical self-editing |
| Shotstack API | Video rendering (Memento AI) |
| Dropbox Sign | E-signatures (Let's Agree) |
| fal.ai or Replicate | Image generation (Luminary Arts) |
| Tone.js + Web Audio API | Browser-side audio synthesis (NeurōTone, Harmonia) |
| Swiss Ephemeris | Astronomical calculations (Soul Tiger) |
| Mapbox | Maps (Passport) |
| Printful | Print-on-demand (Luminary, Memento, Passport, LivingBrush prints) |
| Epidemic Sound | Licensed music (Memento, NeurōTone) |
| ElevenLabs | AI voice synthesis (Somnific × NeurōTone integration) |
| jsPDF or Puppeteer | PDF generation (Let's Agree, Soul Tiger, Memento) |

## What is explicitly excluded

These tools are not part of the stack. Do not adopt them without revisiting this document.

- WordPress (or any PHP CMS)
- Squarespace, Wix, Webflow for client work
- Kajabi, Teachable, Thinkific (for courses — we build them natively or use Stripe + Supabase auth gating)
- Mailchimp, ConvertKit, Klaviyo, ActiveCampaign (Brevo handles it)
- Google Analytics (privacy-hostile, Plausible is better)
- HubSpot, Salesforce, Pipedrive (no CRM until B2B sales motion exists)
- Intercom, Zendesk, Drift (Crisp free tier is enough until volume warrants)
- Auth0, Clerk, WorkOS (Supabase Auth handles it until enterprise SSO is required)
- AWS or GCP direct (Vercel + Supabase abstracts this until scale requires it)
- Firebase (Supabase is the better choice)
- MongoDB or any NoSQL (Postgres handles every use case in the portfolio)
- DocuSign (Dropbox Sign or Zoho Sign is 80% cheaper with equivalent capability)
- Pinecone, Weaviate, dedicated vector DB (Supabase pgvector covers semantic search needs)
- Native mobile app frameworks (Phase 3 for every project — PWA first)

---

<a id="section-4"></a>
# 4. Project Type Templates

Every project fits one of six types. Each type has a canonical structure, scaffold, and required components.

## Type A: SaaS Application

**Examples**: NeurōTone, Harmonia, Memento AI, Soul Tiger, Let's Agree, Time Tamer, Luminary Arts, Passport.

**Characteristics**: User accounts, payment processing, ongoing user-generated content or activity, recurring or transactional revenue.

**Required components from this document:**
- Auth (Section 9)
- Payments (Section 10)
- Database with tiered access via RLS (Section 11)
- AI integration (Section 12)
- Email (Section 13)
- File storage (Section 14)
- Admin dashboard (Section 15)
- Sentry error monitoring
- Plausible web analytics
- PostHog product analytics (Phase 2)

**Canonical folder structure:**
```
/app
  /(marketing)         ← public landing pages
    /page.tsx
    /pricing/page.tsx
    /about/page.tsx
  /(app)               ← authenticated app
    /dashboard/page.tsx
    /settings/page.tsx
  /(admin)             ← admin-only
    /admin/page.tsx
  /api                 ← API routes
    /auth/*
    /stripe/webhook/route.ts
    /ai/[task]/route.ts
/components
  /ui                  ← design system (shadcn)
  /marketing           ← landing page components
  /app                 ← app-specific components
  /admin               ← admin components
/lib
  /supabase/*          ← auth + DB clients
  /stripe/*            ← payment logic
  /ai/*                ← prompt templates + API wrapper
  /email/*             ← Resend + Brevo wrappers
/styles
  /tokens.css          ← brand tokens
  /globals.css
/public
  /brand               ← brand assets
```

**Phase 1 build order:**
1. Landing page + footer/header + brand tokens (Week 1)
2. Auth flow end-to-end (Week 2)
3. Stripe checkout + webhook + tier entitlement (Week 3)
4. Core product feature, in isolation (Weeks 4–N)
5. Admin dashboard basics (parallel)
6. Email automation (parallel)
7. Polish, copywriting, and pre-launch QA (final 2 weeks)

## Type B: Brochure Site

**Examples**: LivingBrush, Somnific Studios (Phase 1), most client work.

**Characteristics**: Primarily content presentation; minimal interaction; possibly email capture, contact form, light commerce (prints, bookings), but no user accounts in the SaaS sense.

**Required components:**
- Brand tokens (Section 8)
- Design system foundation (Section 7)
- Content via MDX or Sanity (Section 16)
- Contact form (typically Resend-based)
- Email capture to Brevo
- Light Stripe integration if selling anything (one-time payment, no subscriptions)
- Sentry, Plausible

**Not needed:**
- Auth (unless gating something specific)
- Admin dashboard
- Complex database schema (Supabase is still used for contact form submissions, but lightly)

**Canonical folder structure:**
```
/app
  /page.tsx
  /about/page.tsx
  /services/page.tsx
  /contact/page.tsx
  /shop/page.tsx        ← if selling
  /blog/
    /[slug]/page.tsx    ← MDX-driven
  /api
    /contact/route.ts
    /stripe/webhook/route.ts
/content                ← MDX files for blog, pages
/components
  /ui
  /sections             ← reusable page sections (Hero, FeatureGrid, etc.)
/lib
  /mdx/*
  /email/*
  /stripe/* (if shop)
/styles
  /tokens.css
/public
```

**Phase 1 build order:**
1. Brand tokens + design system theming
2. Page templates + content components
3. MDX setup for blog/content
4. Contact form + email capture
5. Shop (if applicable)
6. Polish + content migration

## Type C: Content Site

**Examples**: A future Somnific Studios content hub. Any project that's primarily about long-form content (blog, articles, podcast episodes, video) with light interaction.

**Characteristics**: Heavy content, SEO-driven, possibly RSS, possibly podcasting, occasional micro-apps embedded.

**Required components:**
- Brand tokens
- MDX content pipeline OR Sanity CMS
- SEO meta tag management
- RSS feed generation
- Open Graph image generation
- Email capture
- Light AI integration for content-related micro-apps (Section 12)

**Notes:**
- For client work where the client wants to self-edit, Sanity is the default.
- For projects you and Madelyn control, MDX-in-repo with Claude Code as the editor is faster and more durable.

## Type D: E-commerce Site

**Examples**: LivingBrush prints store (a sub-component of the LivingBrush brochure site), Luminary Arts (which is more SaaS+commerce hybrid), any client e-commerce work.

**Characteristics**: Product catalog, cart, checkout, order management, shipping integration.

**Required components:**
- Brand tokens, design system
- Stripe Checkout (preferred over building a custom cart)
- Product catalog (MDX, Sanity, or Supabase depending on size)
- Order management in Supabase
- Print-on-demand integration if applicable (Printful API)
- Admin order dashboard
- Email pattern (order confirmations, shipping notifications)

**Decision rule for product catalog:**
- ≤30 products, infrequent changes → MDX files in repo
- 30–500 products or non-technical editors → Sanity
- 500+ products or programmatic product management → Supabase

## Type E: Client Site

**Examples**: The 10-year-old WordPress site replacement; future client work.

**Characteristics**: Variable. Could be brochure, content, e-commerce, or a small custom app. The distinguishing feature is that the client is the customer and may need ongoing involvement.

**Required components:**
- Sanity CMS if the client needs to self-edit (default to yes unless they've explicitly said they don't want to touch it)
- Standard brand tokens applied to client's identity
- Light analytics on the client's domain (Plausible site under your account, or transferred to them if requested)
- Standard email capture, contact, light Stripe if needed

**Client engagement patterns:**
- See Section 22.
- One default offering: "Modern site rebuild with AI-powered updates. We host. You email us for changes. Changes happen within 48 hours typically."
- Alternative offering: "We build, we hand over the keys (Sanity admin, Vercel deploy, GitHub repo). You manage from there."
- Pricing model: project flat fee + optional monthly maintenance retainer.

## Type F: Micro-App

**Examples**: Somnific's "Night Descent Generator," Somnific's "Dream Residue Field," any small AI-powered tool that lives on a larger site.

**Characteristics**: Single-purpose, often AI-driven, no user accounts required, embedded in a parent site or standalone at a subdomain.

**Required components:**
- AI integration (Section 12)
- Brand tokens of parent site
- Minimal state (sessionStorage or anonymous Supabase record)
- Email capture as the "conversion" if applicable

**Notes:**
- Micro-apps should be built as components that can be embedded in the parent site, OR as standalone pages at `parentsite.com/tools/[micro-app-name]`.
- Do not build micro-apps with their own auth, their own database, their own anything. They inherit from the parent site.

---

<a id="section-5"></a>
# 5. Account Separation Rules

This section is the precise answer to "what is shared and what is separate" across all projects. Memorize this. When in doubt, look here.

## Always Shared (one studio account, used across all projects)

| Resource | Configuration |
|---|---|
| **GitHub** | One org. One repo per project. Private by default. |
| **Vercel** | One account. Separate Vercel project per app. |
| **Cloudflare** | One account. Separate zones per domain. |
| **Cloudflare R2** | One account. Separate bucket per project. |
| **Stripe** | One account. Separate Products + Price IDs per project. Separate webhook endpoints per project. |
| **Resend** | One account. Separate sending domains per project (e.g., `noreply@neurotone.app`, `noreply@livingbrush.com`). |
| **Brevo** | One account. Strictly separate lists per project. Never mix audiences across brands. |
| **Anthropic** | One account. Separate API keys per project for cost tracking and revocation isolation. |
| **Sentry** | One org. Separate Sentry projects per app. |
| **Plausible** | One $9/mo subscription. Separate site properties per domain. |
| **PostHog** | One org (when adopted). Separate PostHog projects per app. |
| **Google Workspace** | One workspace. Separate email aliases per brand (`hello@neurotone.app` routes to your main inbox). |
| **Linear** | One workspace. Separate Linear project per app. |
| **Notion** | One workspace. Separate page tree per project. |
| **Claude Code** | One subscription. |
| **Attorney** | One relationship. Project-specific reviews billed separately. |
| **CPA** | One relationship. Studio-level bookkeeping. |
| **Domain registrar** | All domains in the Cloudflare Registrar account. |

## Always Separate (one per project, never mixed)

| Resource | Why separate |
|---|---|
| **Domain** | Brand identity. |
| **Supabase project** | Data isolation. Different audiences. Different schemas. Security isolation. |
| **Cloudflare R2 bucket** | Privacy isolation. Cost tracking. |
| **Stripe Product/Price IDs** | Revenue tracking. Different tax categories. Different refund policies. |
| **Stripe webhook endpoint** | Separate event processing per project. |
| **Resend sending domain** | Email deliverability. Brand identity. Reply-to routing. |
| **Brevo list** | Different audiences. Different consent contexts. CAN-SPAM compliance. |
| **Anthropic API key** | Cost tracking. Revocation isolation. |
| **Sentry project** | Error isolation. Different alert routing. |
| **Plausible site property** | Clean analytics per brand. |
| **Privacy policy** | Each project collects different data with different purposes. |
| **Terms of service** | Project-specific terms. |
| **Social media accounts** | Brand identity. Different audiences. |
| **Email inbox / alias** | Brand identity. Reply routing. |
| **Brand tokens (colors, type)** | The whole point of separate brands. |

## Conditionally Shared (use studio account but design for separation)

| Resource | Rule |
|---|---|
| **Supabase organization** | Shared org account. Separate project per app inside it. |
| **Anthropic account** | Shared account. Separate API keys per project. |
| **Sentry org** | Shared org. Separate project per app. |
| **Crisp (when adopted)** | One account if support model is unified. Separate widgets per brand. |
| **Inngest / Upstash (when adopted)** | One account, project-scoped queues. |

## The data isolation rule (critical)

User data from one project never enters another project's database. If NeurōTone has a user named Alice and Alice signs up for Somnific Studios, those are two separate user records in two separate Supabase projects. They are not linked at the database level.

If cross-project features are needed (e.g., "log in to NeurōTone with your Somnific account"), they are handled at the application layer via OAuth-style flows, not by mixing databases. See Section 17 for cross-project integration patterns.

This rule exists because:
- Privacy policies differ per project
- Consent contexts differ per project
- A security breach in one project must not expose data in another project
- Brands need to remain legally separate entities for liability isolation

---

<a id="section-6"></a>
# 6. The Claude Code Workflow

Claude Code is the developer. Scott is the product owner. This section describes how those two work together to produce reliable code without drift.

## The disciplined-build cycle

Every feature follows this cycle. Do not skip steps. Do not let Claude Code skip steps. The discipline is the entire reason this works.

### Step 1: Write a feature brief

Before opening Claude Code for a feature, write a brief in plain English. One paragraph minimum, longer if the feature is complex. Include:
- What the feature does (user-facing)
- Where it lives in the app (route, component location)
- What components it depends on
- What it does NOT do (scope boundaries)
- What "done" looks like (acceptance criteria)

Save the brief in the repo as `briefs/[feature-name].md`. This brief is the source of truth for the feature. If Claude Code suggests something outside the brief, the answer is "not in this feature."

### Step 2: Have Claude Code propose an architecture

Open Claude Code. Paste the brief. Ask: "Propose the architecture for this feature: files to create, files to modify, database changes if any, API routes if any, component hierarchy. Do not write code yet."

Read the proposal. If it's overcomplicated, push back: "simpler." If it deviates from this Portfolio Architecture document, push back: "follow the auth pattern from Section 9" (or whichever section). If it's right, approve it and move to Step 3.

### Step 3: Build one piece at a time

Have Claude Code build ONE file or ONE function at a time. Not "build the whole feature." After each piece:
- Read the code
- Test it works
- Commit it to git

If Claude Code tries to build multiple files at once and they're related, that's sometimes okay — but always verify each one works before moving on. Never let Claude Code declare a feature "done" without testing.

### Step 4: Test, commit, push

After each working piece:
- Manual test in the browser
- Edge cases: what if the user is logged out, what if the input is empty, what if the API fails
- Mobile test (open in browser DevTools mobile mode)
- Commit with a clear message
- Push to GitHub

Vercel auto-deploys on push. Verify the deploy works.

### Step 5: When a bug appears, reproduce it before fixing

Do not let Claude Code "fix" a bug by guessing. The pattern is:
1. Reproduce the bug reliably
2. Tell Claude Code the exact steps and what should happen vs. what does happen
3. Ask Claude Code to explain the root cause before proposing a fix
4. Approve the fix
5. Apply the fix
6. Verify the bug is gone AND verify nothing else broke

The biggest risk in AI-assisted development is "fix one bug, create three." This discipline prevents it.

### Step 6: End every session with a state document

At the end of each Claude Code session, ask Claude Code to update `briefs/[feature-name].md` with what was completed, what remains, and any decisions made along the way. Commit this update. This is how future sessions (which lack memory of past sessions) can pick up where the last one left off.

## What Claude Code is good at

- Implementing a clearly-specified feature from a brief
- Writing standard CRUD operations
- Integrating well-documented APIs (Stripe, Supabase, Resend, Anthropic)
- Writing TypeScript types from a schema
- Generating tests for existing code
- Reformatting and refactoring within a clear scope
- Following an architectural pattern that's been shown to it
- Writing documentation for code

## What Claude Code is bad at

- Holding context across multiple sessions (it doesn't — that's why we have briefs and state documents)
- Saying "no, this is a bad idea." It will usually do what you ask.
- Pushing back on overengineering. It will happily build complex solutions to simple problems.
- Spotting architectural drift. If you don't enforce the pattern, it won't either.
- Knowing when to stop. It will keep building features past the launch-worthy line if you let it.
- Estimating its own progress accurately. "I'm 80% done" usually means 40%.

## How to direct Claude Code well

**Be specific.** "Add a contact form" is bad. "Add a contact form at /contact with name, email, message fields. Submit to /api/contact which uses Resend to email the form to `hello@projectname.com`. Show a success state after submission. Show validation errors inline. Brand tokens applied per Section 8 of the architecture document." is good.

**Reference the architecture document by section number.** "Use the auth pattern from Section 9" is more useful than "use the auth pattern." Claude Code can find Section 9 in the document you've pasted.

**Reject overengineering early.** When Claude Code proposes adding a new dependency, ask: "is this in the shared stack? If not, why are we adding it?" Most of the time the answer is "we don't need this; we have a simpler way."

**Read the code.** Don't trust without reading. Claude Code can generate plausible-looking code that doesn't actually work or that uses outdated patterns. Read what it writes. Ask questions if you don't understand.

**Keep a changelog.** Each feature brief becomes part of a project changelog. The changelog is the record of what was built and when. It also serves as the start-of-session context for future Claude Code sessions.

## Model selection within Claude Code

- **For architecture decisions, complex debugging, strategic conversations**: Use Opus. This is where reasoning matters more than throughput.
- **For straightforward feature implementation**: Use Sonnet. Sonnet handles 80% of build work excellently at much higher usage limits.
- **For simple edits, formatting, small refactors**: Use Haiku. Fast, cheap, fine for low-stakes work.

A typical project uses Opus for the first day (architecture, brief writing, planning) and then mostly Sonnet for the bulk of the build, with Opus brought back in for tricky problems.

## What Scott does, what Claude Code does

| Scott does | Claude Code does |
|---|---|
| Writes feature briefs | Implements feature briefs |
| Decides scope | Follows scope |
| Says "no, simpler" | Proposes architecture (Scott approves or pushes back) |
| Tests in browser | Writes the code |
| Spots brand/UX issues | Writes the code |
| Reads code Claude writes | Writes the code |
| Reads error messages | Diagnoses errors when Scott describes them |
| Makes strategic calls | Asks Scott when calls need making |
| Decides when launch-worthy | Builds toward what Scott specifies |
| Updates this architecture document | Asks Scott to clarify ambiguities |

---

<a id="section-7"></a>
# 7. Design System Foundation

The design system is one foundation, themed per brand via tokens. This section describes the foundation. Section 8 describes how brand tokens override it.

## Base library: shadcn/ui

Every project uses shadcn/ui as the component library foundation. shadcn is not a traditional component library — it's a set of high-quality, Tailwind-based components you copy into your project. This means:
- You own the components (no version conflicts, no library upgrades breaking things)
- Components are themeable via CSS variables (perfect for brand tokens)
- The pattern is Claude Code-fluent (it knows shadcn intimately)
- Accessibility is built in (Radix UI primitives underneath)

Install shadcn at the start of every project. Pull in components as needed: `Button`, `Card`, `Dialog`, `Input`, `Select`, `Tabs`, `Toast`, `Sheet`, `DropdownMenu`, etc.

## Base styling: Tailwind CSS

Tailwind is the styling layer. Brand-specific values live in CSS custom properties (variables) in `styles/tokens.css`. Tailwind references those variables. This is how one design system foundation themes across all brands.

Example pattern:

```css
/* styles/tokens.css */
:root {
  --color-primary: 215 60% 50%;   /* HSL values for NeurōTone deep blue */
  --color-background: 220 30% 8%;
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --radius: 0.5rem;
}
```

```js
// tailwind.config.js
{
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary))',
        background: 'hsl(var(--color-background))',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      }
    }
  }
}
```

Result: any component using `bg-primary` or `font-display` automatically takes on the brand. Change `tokens.css` for a new brand, the entire design system reflows.

## Core layout components

These are built once and reused (or copied with modifications) across every project. Their canonical implementations live in a `templates/` reference (to be assembled after the first 2–3 projects ship and patterns stabilize).

- `Layout` — page shell with header, footer, main content area
- `Header` — top navigation
- `Footer` — bottom of page with links, social, legal
- `Hero` — landing page hero section
- `Section` — page section with consistent padding, optional title, optional intro
- `FeatureGrid` — grid of features with icons + text
- `Pricing` — pricing tier display
- `Testimonial` — quote + attribution
- `CTABlock` — call-to-action block with button
- `BlogCard` — preview of a blog post
- `BlogPost` — full blog post layout
- `Container` — max-width wrapper with consistent padding

These are NOT design system primitives (those are shadcn's job). These are page-level composition components. They use shadcn primitives inside them.

## Typography rules

- **Display font**: Used for hero headings, major page titles. Brand-specific.
- **Body font**: Used for everything else. Brand-specific, but usually a workhorse serif or sans.
- **Mono font**: Used for code, technical content. JetBrains Mono is the default.
- **Type scale**: Use Tailwind's default scale (text-sm, text-base, text-lg, etc.). Override per project only if the brand demands it.
- **Line length**: Body text should never exceed 65 characters per line on desktop. Use `max-w-prose` on text containers.
- **Line height**: 1.5 for body, 1.2 for display.

## Color rules

- **HSL values in CSS variables**, not hex. HSL is easier to programmatically derive lighter/darker variants.
- **Semantic naming**: `--color-primary`, `--color-background`, `--color-text`, `--color-muted`, `--color-accent`, `--color-destructive`. Never `--color-blue`.
- **Dark mode**: Build every project to support dark mode by default. Use the `dark:` Tailwind variant. Even if the brand is fundamentally dark (like NeurōTone) or fundamentally light, building with dark/light awareness keeps options open.
- **Contrast**: All text must meet WCAG AA (4.5:1 for body, 3:1 for large text). No exceptions, even for "vibe" reasons.

## Spacing rules

- Use Tailwind's spacing scale (no arbitrary values like `mt-[17px]`)
- Section padding: `py-16 md:py-24` for desktop sections; `py-8` for mobile-first
- Container padding: `px-4 md:px-8 lg:px-12`
- Component gaps: `gap-4` or `gap-6` standard

## Imagery rules

- Use `next/image` for all photos. No `<img>` tags.
- Optimize all images before adding to repo. Aim for under 200KB per hero image.
- Provide alt text for every image. Decorative images use `alt=""`.
- Prefer vector (SVG) for logos and icons. Lucide React is the standard icon library.

## Animation rules

- Use Framer Motion or Tailwind's animation utilities. Don't write custom CSS animations.
- Subtle is almost always better than dramatic. Default to `transition-all duration-200`.
- Honor `prefers-reduced-motion`. All animations have a reduced-motion alternative.
- Page transitions: keep them minimal. Brand aesthetic is delivered through typography, color, and imagery — not animation.

---

<a id="section-8"></a>
# 8. Brand Tokens System

Each brand is defined by a small set of token values. Drop in the right token file at the start of a project and the entire design system retunes itself.

## Token file structure

Every project has a `styles/tokens.css` file. The structure is identical across projects; only the values differ.

```css
:root {
  /* Color tokens — HSL for easy variant derivation */
  --color-primary: 215 60% 50%;
  --color-primary-foreground: 0 0% 100%;
  --color-secondary: 280 50% 60%;
  --color-secondary-foreground: 0 0% 100%;
  --color-accent: 45 90% 60%;
  --color-accent-foreground: 0 0% 0%;

  --color-background: 220 30% 8%;
  --color-foreground: 0 0% 95%;
  --color-card: 220 25% 12%;
  --color-card-foreground: 0 0% 95%;
  --color-muted: 220 15% 30%;
  --color-muted-foreground: 220 10% 70%;

  --color-border: 220 15% 25%;
  --color-input: 220 15% 25%;
  --color-ring: 215 60% 50%;

  --color-destructive: 0 70% 50%;
  --color-destructive-foreground: 0 0% 100%;
  --color-success: 145 60% 45%;
  --color-warning: 35 90% 55%;

  /* Typography tokens */
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing tokens (rarely overridden) */
  --radius-sm: 0.25rem;
  --radius: 0.5rem;
  --radius-lg: 1rem;

  /* Brand-specific tokens */
  --brand-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --brand-gradient: linear-gradient(135deg, hsl(215 60% 50%), hsl(280 50% 60%));
}

.dark {
  /* Dark mode overrides — usually a subset of values */
}
```

## Brand-specific token sets

Each brand has its own tokens file. These are starting points; final values get refined during the brand application phase of each project.

### NeurōTone
Deep, electric, scientific. Dark by default.

- Primary: deep electric blue (~`215 70% 55%`)
- Background: very dark blue-black (~`220 30% 6%`)
- Foreground: near-white with slight cool tint
- Display font: a precise modern sans (Söhne, Inter Tight, or similar)
- Body font: Inter
- Aesthetic markers: subtle neon glows on interactive elements, oscilloscope-inspired patterns, deep gradients suggesting depth

### Harmonia
Considered, harmonic, slightly academic. Light or dark.

- Primary: rich teal (~`180 50% 35%`)
- Background: warm off-white or deep charcoal
- Display font: a refined serif (Crimson Pro or similar)
- Body font: Inter
- Aesthetic markers: musical notation accents, mathematical elegance

### Somnific Studios
Cinematic dusk. Soft pinks, dusty blues, painterly atmosphere. As seen in the FB covers — sleeping faces, clouds, bedrooms with sunset light.

- Primary: a desaturated dusty rose (~`345 25% 70%`)
- Secondary: dusty periwinkle (~`230 30% 70%`)
- Background: warm cream or soft dusk (depending on mode)
- Accent: very thin elegant linework
- Display font: an elegant thin sans (matches the Somnific wordmark — a very light geometric sans like Fraunces Light, Cormorant Light, or a custom-feeling thin sans)
- Body font: a warm humanist sans (Inter or similar)
- Aesthetic markers: painterly imagery, atmospheric gradients, generous whitespace, never sharp or technical

### LivingBrush
Fine art bodypainting. Bold, sophisticated, gallery-quality. Rich purples, electric, refined.

- Primary: refined deep purple (~`280 60% 35%`) — referencing the existing wordmark
- Accent: gold (~`45 70% 55%`) — for awards, distinctions, premium moments
- Background: gallery white or deep charcoal (depending on section)
- Display font: a refined modern serif or sophisticated sans (matching the existing thin elegant wordmark)
- Body font: a clean humanist sans
- Aesthetic markers: black-background gallery treatments for art, generous whitespace, museum-quality typography hierarchy, gold leaf accents for awards/championships

### Soul Tiger
Already specified extensively in the Soul Tiger audit. Dark parchment, gold, rich saturated colors for tradition-specific overlays.

- Primary: rich gold (~`42 65% 50%`)
- Background: dark parchment (~`30 25% 12%`)
- Foreground: warm cream
- Display font: a typographically refined serif evocative of old manuscripts
- Body font: a readable serif (Lora, Crimson Pro)
- Aesthetic markers: woodcut illustrations, parchment textures, gold leaf, careful manuscript-inspired typography

### Memento AI (when built)
Tender, emotionally aware, gentle. Soft, supportive aesthetics for grief and celebration contexts.

- Primary: a soft warm color (TBD per emotional context)
- Background: gentle warm light
- Display font: a humanist serif with warmth
- Aesthetic markers: gentle gradients, never sharp, never cold

### Let's Agree (when built)
Practical, trustworthy, approachable. Not legal-stuffy, not childish.

- Primary: a confident warm color (terracotta, deep ochre, or similar)
- Background: warm white
- Display font: friendly geometric sans
- Aesthetic markers: handshake imagery (subtle), clean typography, generous whitespace conveying clarity

### Time Tamer (when built)
Calm, precise, organized without being clinical.

- Primary: focused blue-green
- Background: warm off-white or soft dark
- Display font: precise modern sans
- Aesthetic markers: subtle grid patterns, time-based motifs, clean structure

### Passport (when built)
Warm, scrapbook-quality, travel-evocative. Aesthetic-driven.

- Primary: warm earth tone
- Background: soft cream
- Display font: a serif with character (perhaps something with travel/journal feel like Recoleta)
- Aesthetic markers: scrapbook textures, vintage postmark elements, hand-drawn accents

## How brand tokens are applied

When starting a new project:
1. Create `styles/tokens.css` from the brand's defined token set
2. Import it in `app/layout.tsx` via the global stylesheet
3. Confirm Tailwind config references the CSS variables
4. Test by rendering a Button — it should show the brand's primary color

Whenever brand decisions change:
1. Update `styles/tokens.css`
2. The entire site retunes automatically
3. No component code changes needed

This is the entire reason for the system. Brand changes cost minutes, not days.

## Logo and brand asset management

Each project has a `public/brand/` directory containing:
- Logo (SVG preferred, PNG fallback)
- Wordmark
- Brand mark / icon
- OpenGraph default image
- Favicon set
- Brand pattern or texture assets if applicable

Reference these by Next.js Image component or as direct SVG imports.

---

<a id="section-9"></a>
# 9. Auth Pattern

The auth pattern is identical across every SaaS project. Implementing it for project #1 takes a week. Reusing it for project #2 takes a day.

## Provider: Supabase Auth

Every project that needs user accounts uses Supabase Auth. Reasons:
- Email magic link out of the box
- Google OAuth and Apple OAuth supported
- Row Level Security (RLS) policies enforce per-user and per-tier access at the database layer
- No additional SaaS subscription required
- Well-supported by Claude Code

## Supported auth methods (per project, choose during PROJECT_BRIEF)

- **Magic link email** (default — passwordless, lowest friction)
- **Google OAuth** (default add — many users prefer this)
- **Apple OAuth** (add if iOS users are a significant audience — Somnific, NeurōTone yes; LivingBrush probably not)
- **Email + password** (avoid unless specifically required — magic link is better UX)

## The flow

1. User clicks "Sign in" → modal or page at `/auth`
2. User enters email OR clicks Google/Apple
3. If email: magic link sent via Supabase (which routes through configured SMTP — we use Resend)
4. User clicks link → returns to `/auth/callback` → Supabase establishes session → redirect to `/dashboard`
5. Session persists in HTTP-only cookie
6. Server components and route handlers use Supabase server client to check auth on every protected request

## Implementation outline

```
/lib/supabase/
  client.ts        ← browser client
  server.ts        ← server component client
  middleware.ts    ← session refresh middleware
  admin.ts         ← service-role client (admin operations only)
```

Standard files:
- `middleware.ts` at the project root handles session refresh on every request
- `/app/auth/page.tsx` is the sign-in page
- `/app/auth/callback/route.ts` handles the magic link return
- `/app/api/auth/signout/route.ts` handles sign-out

## Role-based access (tiered features)

Every project that has paid tiers needs role-based access. The pattern:

1. `users` table has a `subscription_tier` column ('free', 'pro', 'studio', etc.)
2. Stripe webhook updates `subscription_tier` whenever subscription status changes
3. RLS policies on protected tables check both `auth.uid()` AND `subscription_tier`
4. Server components check `subscription_tier` before rendering protected features
5. Client components receive `subscription_tier` from a server component and gate accordingly

Example RLS policy:
```sql
CREATE POLICY "Pro users can read advanced features"
  ON sessions FOR SELECT
  USING (
    auth.uid() = user_id
    AND (SELECT subscription_tier FROM users WHERE id = auth.uid()) IN ('pro', 'studio')
  );
```

## Account deletion (GDPR/CCPA)

Every auth-enabled project must support full account deletion. The pattern:

1. User clicks "Delete account" in settings
2. Confirmation modal explains what will be deleted
3. On confirm: API route triggers deletion
4. Deletion: anonymize or hard-delete user records, cancel Stripe subscription, remove from Brevo lists, delete files in R2
5. Email confirmation: "Your account has been deleted."

This is non-optional. It is a legal requirement and a trust requirement.

## Session management

- Sessions last 7 days by default
- Refresh happens via middleware on every request
- Logout invalidates the session immediately
- Multiple devices supported (no single-session restriction)

## What not to build

- Custom password reset flow (Supabase handles this if password auth is enabled)
- Custom email verification (Supabase handles this)
- Custom session storage (use Supabase's cookie-based sessions)
- Custom OAuth (use Supabase's OAuth providers)
- Custom rate limiting on auth (Supabase handles this)

---

<a id="section-10"></a>
# 10. Payments Pattern (Stripe)

Every project that takes payment uses Stripe. The pattern below is the canonical implementation; deviate only with explicit justification.

## Stripe account configuration

- One Stripe account for the entire studio
- Each project gets its own Stripe Product(s) and Price IDs
- Each project has its own webhook endpoint (`/api/stripe/webhook` on its own domain)
- Stripe Tax enabled from day one (configured at the account level, applies automatically)
- Stripe Customer Portal enabled (lets users self-manage subscriptions)
- Stripe Test Mode used during development; switch to Live Mode only at launch

## Product types

Stripe supports four product structures we use:

1. **One-time payment** (Memento AI per-project, Let's Agree per-agreement, Luminary export credits, LivingBrush print purchase, LivingBrush commission deposit)
2. **Recurring subscription** (NeurōTone Personal/Explorer, Harmonia Pro/Studio, Soul Tiger Explorer Membership, Time Tamer Pro/Freelancer, Passport Premium)
3. **Gift card** (Soul Tiger, Memento — Stripe handles gift cards through metadata + custom redemption logic)
4. **Metered/usage-based** (only when needed — Phase 3 for any project)

## Checkout flow

Default to **Stripe Checkout** (hosted) over Stripe Elements (embedded). Reasons:
- Apple Pay / Google Pay surfaced automatically (~22% conversion lift)
- PCI scope minimized (no card data touches our server)
- Mobile-optimized out of the box
- Stripe handles edge cases (3D Secure, declined cards, currency conversion)
- Build time: 1 day instead of 2 weeks

Use Stripe Elements only when the checkout UX needs to feel embedded in the app (rare for our portfolio).

## Standard implementation

```
/lib/stripe/
  server.ts           ← Stripe SDK initialized with secret key
  client.ts           ← Stripe SDK initialized with publishable key
  checkout.ts         ← createCheckoutSession() function
  portal.ts           ← createPortalSession() function
  webhooks.ts         ← webhook event handlers
  entitlements.ts     ← logic to determine what tier a user has access to
```

Standard routes:
- `/api/stripe/checkout` — creates a checkout session, redirects user to Stripe
- `/api/stripe/webhook` — receives Stripe events, updates database
- `/api/stripe/portal` — creates a customer portal session for self-management

## Webhook events to handle (minimum)

```
checkout.session.completed       → grant access
customer.subscription.created    → set subscription_tier
customer.subscription.updated    → update subscription_tier (upgrade/downgrade)
customer.subscription.deleted    → revert to free tier (at period end)
invoice.payment_succeeded        → log payment, extend access
invoice.payment_failed           → log failure, optional dunning email
charge.refunded                  → log refund, optional access revocation
```

Webhook handlers must be idempotent. Stripe occasionally sends duplicate events. Use the event ID to check if we've already processed an event before doing anything.

## Entitlement logic

The entitlement check happens in three places:
1. **Database (RLS)** — policies enforce who can read/write what
2. **Server components** — pages check `subscription_tier` and render appropriately
3. **API routes** — endpoints verify entitlement before performing the action

Never trust the client. Even if the UI hides a feature, the API must enforce access.

## Subscription tier conventions

Standard tier names across projects (deviate only if brand demands different naming):
- `free` — anonymous or signed-up but not paying
- `pro` — primary paid tier
- `studio` or `premium` — higher tier
- `enterprise` — custom-priced, manually configured (only when relevant)

The Stripe Product names should match (e.g., "NeurōTone Pro," "NeurōTone Explorer").

## Pricing strategy reminders

Pricing decisions live in each project's brief, not here. But the patterns:
- Always offer monthly AND annual. Annual is typically 2 months free (≈17% discount).
- Annual reduces churn and improves cash flow.
- Stripe Tax handles all sales tax / VAT automatically.
- Refund policy goes in ToS, not in the product. Most digital refunds within 7 days; physical products follow vendor policy (e.g., Printful).

## Apple Pay and Google Pay

Enable on Stripe Dashboard. Stripe Checkout surfaces them automatically when supported. No additional code needed.

## What not to build

- Custom cart (Stripe Checkout handles single-product flows; for multi-product, use Stripe Checkout's line_items)
- Custom subscription management UI (use Stripe Customer Portal)
- Custom invoicing (Stripe handles this automatically)
- Custom dunning emails (Stripe Smart Retries handles failed payments)
- Custom tax calculation (Stripe Tax)
- Custom 3DS / SCA handling (Stripe handles this)

## Multi-currency

Most projects launch USD-only. If international expansion happens:
- Stripe supports multi-currency Prices on the same Product
- Stripe Checkout displays the user's local currency automatically
- Stripe Tax handles VAT for EU customers automatically

This is configuration, not code.

---

<a id="section-11"></a>
# 11. Database Conventions

Every project's database lives in Supabase Postgres. The schema patterns below are consistent across projects.

## Standard tables (every project)

Every SaaS project starts with these tables:

```sql
-- users: extends auth.users with profile and subscription data
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- subscriptions: tracks Stripe subscription state
CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,  -- Stripe subscription ID
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  price_id TEXT NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- payments: every Stripe charge logged
CREATE TABLE payments (
  id TEXT PRIMARY KEY,  -- Stripe charge ID
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,  -- in cents
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- audit_logs: security and compliance
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- usage_logs: feature usage and AI cost tracking
CREATE TABLE usage_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  metadata JSONB,
  ai_tokens_used INTEGER,
  ai_cost_cents NUMERIC(10, 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- email_subscribers: marketing email list (synced with Brevo)
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  brevo_contact_id TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  tags TEXT[]
);
```

Every project adds its own tables on top of these. The project-specific tables go in the project's CLAUDE.md.

## Naming conventions

- **Tables**: lowercase, plural, snake_case (`users`, `sessions`, `payments`)
- **Columns**: lowercase, snake_case (`created_at`, `subscription_tier`)
- **Primary keys**: `id` (UUID for user-facing entities, BIGSERIAL for high-volume logs)
- **Foreign keys**: `[singular_table_name]_id` (`user_id`, `session_id`)
- **Timestamps**: `created_at`, `updated_at`, optionally `deleted_at` for soft deletes
- **Booleans**: prefixed with `is_` or `has_` (`is_active`, `has_paid`)

## Standard column patterns

Every table that represents user-owned data has:
- `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
- `user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE` (or `ON DELETE SET NULL` if data should survive user deletion)
- `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()` with a trigger to auto-update

## Row Level Security (RLS)

Every user-data table has RLS enabled. The default policies:

```sql
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own records"
  ON [table_name] FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own records"
  ON [table_name] FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own records"
  ON [table_name] FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own records"
  ON [table_name] FOR DELETE
  USING (auth.uid() = user_id);
```

For tier-gated reads, add the tier check:
```sql
CREATE POLICY "Pro features readable by paying users"
  ON [pro_table] FOR SELECT
  USING (
    auth.uid() = user_id
    AND (SELECT subscription_tier FROM users WHERE id = auth.uid()) IN ('pro', 'studio')
  );
```

Admin access uses the service-role client (bypasses RLS) and is restricted to specific server-side admin routes.

## Migration management

Use Supabase migrations (`supabase migration new [name]`). Every schema change is a migration file in the repo. Never edit the schema directly in the Supabase dashboard for production.

## Sensitive data

Some data is highly sensitive and gets additional protection:
- **Birth data** (Soul Tiger): Encrypted at rest using pgcrypto. Decrypt only when needed by authenticated server functions.
- **Journal entries** (Soul Tiger): Same encryption pattern.
- **Photos** (Memento, Luminary): Not stored in DB; stored in R2 with signed URLs and short retention.
- **Agreement content** (Let's Agree): Encrypted at rest.
- **Session history** (NeurōTone, when opt-in): Pseudonymized aggregates only; never linked to behavioral profiles for advertising.

## Backup and retention

Supabase auto-backs-up Pro tier databases daily. For Phase 1 (free tier), enable manual backups weekly via Supabase dashboard.

Retention rules:
- **Active users**: All data retained until account deletion.
- **Deleted accounts**: User-deletable data hard-deleted within 30 days. Records required for tax/legal retained 7 years in anonymized form.
- **Logs**: 90 days rolling for usage_logs and audit_logs. Backed up before deletion.

## Indexing

Index any column used in WHERE clauses frequently. Common indexes:
- `users.email` (UNIQUE)
- `subscriptions.user_id`
- `payments.user_id`
- `[table].created_at` for time-series queries
- Foreign keys (Postgres auto-indexes primary keys but not foreign keys)

---

<a id="section-12"></a>
# 12. AI Integration Pattern

Every project uses Anthropic's Claude API for AI features. The integration pattern is consistent across projects.

## Provider: Anthropic Claude API

Default model: `claude-sonnet-4-6` for most user-facing AI work. Switch to `claude-opus-4-7` for high-stakes synthesis (Soul Tiger readings, complex reasoning) or `claude-haiku-4-5` for high-volume, low-complexity tasks (autocomplete, classification).

## Standard implementation

```
/lib/ai/
  client.ts            ← Anthropic SDK initialized
  prompts/             ← prompt templates by feature
    [feature]/
      v1.ts            ← versioned prompt templates
      v2.ts
  call.ts              ← wrapper around Anthropic.messages.create
  cost.ts              ← token counting and cost tracking
  cache.ts             ← response caching for stable inputs
```

The wrapper handles:
- Model selection (Opus/Sonnet/Haiku based on task)
- Prompt template loading (versioned)
- Token counting
- Cost logging to `usage_logs` table
- Caching (where appropriate)
- Error handling and retries
- Streaming (where the UI supports it)

## Prompt template versioning

Every prompt template is versioned. Templates live in code, not in the database (so they're committed to git, reviewable in PRs, and easily rolled back).

Pattern:
```ts
// lib/ai/prompts/session-recommendation/v2.ts
export const SESSION_RECOMMENDATION_V2 = {
  version: 2,
  system: `You are NeurōTone's session recommendation engine...`,
  user: (context: SessionContext) => `User goal: ${context.goal}...`,
  outputSchema: SessionRecommendationSchema,  // zod schema for structured output
};
```

When iterating on a prompt:
1. Create a new version (`v3.ts`) — never edit the old one
2. Run both versions side-by-side on test inputs
3. Compare quality manually (or with a QA suite)
4. Switch the active version when v3 is clearly better
5. Old versions remain in the repo for rollback

## Structured outputs

For any AI output that the application uses programmatically (not just displays to the user), use Anthropic's tool-use API to enforce structured JSON output. Validate with Zod schemas. Reject any output that doesn't match the schema.

Never try to parse JSON from a prose response. Always use tool-use.

## Response caching

Cache AI responses when the input is stable and the output is deterministic enough to reuse. Examples:
- Soul Tiger's static archetype interpretations
- Harmonia's chord progression analysis (same input → same output)
- NeurōTone's session explanation for the same goal context

Don't cache:
- Highly personalized responses where freshness matters
- Anything tied to current time, weather, or external data

Cache TTL: typically 30 days. Use Supabase `kv_cache` table or Vercel KV when adopted.

## Cost monitoring

Every AI call logs:
- User ID (or null for anonymous)
- Project context
- Model used
- Tokens in / tokens out
- Cost in cents (calculated from token counts)
- Latency

Aggregate weekly: cost per user, cost per feature, cost per generation type. If cost exceeds revenue per user, that's a flag.

## Rate limiting and abuse prevention

Every project has tier-based AI call limits:
- Free tier: limited (specific limits per project)
- Pro tier: generous (specific limits per project)
- Studio tier: very high or unlimited

Implementation:
- Track `ai_calls_this_period` per user
- Check against tier limits before calling Anthropic
- Return rate-limit response if exceeded
- Reset counters monthly (or per billing period)

This prevents a single user from running up a massive bill.

## Prompt injection protection

User input that gets included in prompts can be a vector for prompt injection (user tries to override the system prompt). Defenses:
- Always put user input inside clearly delimited tags (e.g., `<user_input>...</user_input>`)
- Never let user input determine the system prompt
- Use Anthropic's prompt injection detection (when available)
- For high-stakes outputs (agreements, financial advice, medical content), additional output validation

## Streaming

For long responses (>2 seconds), stream the response to the UI. Anthropic's SDK supports streaming natively. Use it for:
- Soul Tiger readings
- Memento AI caption generation
- Long-form writing assistance
- Any response longer than a few sentences

Don't stream for:
- Structured outputs (full response needed for validation)
- Short responses
- Background jobs

## Quality monitoring

For high-stakes outputs (Soul Tiger readings, Memento captions, Let's Agree drafts), sample 1–5% of outputs for human review. Flag outputs that don't meet quality thresholds. Use those samples to refine prompts.

For low-stakes outputs (autocomplete suggestions, classifications), automated quality metrics (response length, schema compliance) are sufficient.

## Per-project prompt strategy

The Portfolio Architecture document does not contain the actual prompts. Those live in each project's repo (versioned, reviewable). What lives here:
- The pattern for writing prompts
- The structure (system message, user message, output schema)
- The conventions for versioning, caching, and monitoring
- The rule that prompts are treated as code, not as configuration

---

<a id="section-13"></a>
# 13. Email Pattern

Email serves two functions in every project: transactional (operational emails the user expects) and marketing (relationship-building emails the user opted into). These use different providers.

## Transactional Email: Resend

Resend handles every email that the user expects from the application:
- Magic link sign-in (sent by Supabase, configured to use Resend SMTP)
- Welcome email after signup
- Receipt / order confirmation
- Subscription renewal receipt
- Failed payment notice
- Password reset (if password auth enabled)
- Account deletion confirmation
- Product-specific notifications (e.g., NeurōTone session ready, Memento render complete)

Why Resend:
- Developer-friendly API
- Excellent deliverability
- React-based email templates (using React Email)
- Free tier covers 3K emails/month
- No marketing-platform bloat

## Marketing Email: Brevo

Brevo handles every email that's part of marketing or relationship-building:
- Waitlist signups
- Onboarding drip sequence (Day 1, Day 3, Day 7)
- Feature announcements
- Newsletter
- Re-engagement campaigns
- Birthday / event-triggered emails (Soul Tiger)

Why Brevo:
- Generous free tier (300 sends/day)
- Built-in automation workflows
- Contact-based pricing (not list-based)
- GDPR-compliant by design
- Separate list per project (CAN-SPAM compliance)

## Implementation pattern

```
/lib/email/
  resend.ts         ← Resend client
  brevo.ts          ← Brevo client
  templates/
    welcome.tsx     ← React Email template
    receipt.tsx
    [feature].tsx
  send.ts           ← unified send() function
```

Standard send function:
```ts
import { send } from '@/lib/email/send';

await send({
  to: user.email,
  template: 'welcome',
  data: { userName: user.full_name },
  type: 'transactional',  // or 'marketing'
});
```

Routes by `type`:
- `transactional` → Resend
- `marketing` → Brevo (with consent checks)

## Email templates

Use React Email for all transactional templates. Reasons:
- Templates are React components (Claude Code fluent)
- Versioned in git
- Previewable in dev (React Email Studio)
- Cross-client compatible (handles Outlook, Gmail, Apple Mail quirks)
- Brand tokens inherit from the design system

Standard template structure:
- Header: brand logo
- Greeting
- Main message (clear, brief)
- CTA button (if applicable)
- Footer: company address, unsubscribe (marketing only), social links

## Brand consistency across email

Every email's visual style matches the brand. Brand tokens in CSS get translated into inline styles for email compatibility. The same NeurōTone deep-blue header style appears in every NeurōTone email.

## Sending domain configuration

Each project has its own sending domain. Configuration:
- Domain: `email.projectname.com` (subdomain to keep main domain reputation isolated)
- SPF, DKIM, DMARC records in Cloudflare DNS
- From address: `hello@email.projectname.com` or `noreply@email.projectname.com`
- Reply-to: routes to project-specific inbox

Setup takes ~30 minutes per project. Do this on Day One of any project that will send email.

## Consent and compliance

- **Transactional emails**: no consent required (the user signed up; these are expected)
- **Marketing emails**: explicit opt-in required (checkbox at signup, separate from ToS acceptance)
- **Unsubscribe**: every marketing email has a one-click unsubscribe link
- **Suppression list**: maintained automatically by Brevo

For EU users, GDPR requires:
- Lawful basis documented (consent for marketing)
- Easy unsubscribe
- Data deletion on request
- Privacy policy explains email use

## Email-triggered automations

Brevo handles automation workflows:
- New signup → Day 1 welcome → Day 3 first-feature highlight → Day 7 upgrade nudge
- Subscription cancellation → 2-day win-back email
- Long-inactive user (30 days) → re-engagement email

These are configured in Brevo's automation UI, not in code. Code triggers events; Brevo handles the cadence.

## Project-specific email patterns

Each project has its own email playbook (in the project's CLAUDE.md). What lives here is the infrastructure pattern.

---

<a id="section-14"></a>
# 14. File Storage Pattern

Two storage layers:
- **Supabase Storage** for small, auth-gated files
- **Cloudflare R2** for large files or anything where egress matters

## When to use Supabase Storage

- User avatars
- Profile-related small assets
- Single-user files under 100MB
- When the file access pattern aligns with auth (auth-gated downloads)

Supabase Storage is integrated with Supabase Auth, so auth-gated download is one line:
```ts
const { data, error } = await supabase.storage
  .from('avatars')
  .download(`${userId}/avatar.png`);
```

Bucket policies enforce per-user access.

## When to use Cloudflare R2

- Large file generation outputs (Memento videos, Luminary high-res art, NeurōTone WAV exports)
- High-volume media (Passport photos, Memento user uploads)
- Anything where bandwidth costs matter (R2 has zero egress fees)
- Content delivered via signed URLs to authenticated users

R2 is S3-compatible. Use the AWS SDK with R2 endpoints.

## Standard implementation

```
/lib/storage/
  supabase.ts         ← Supabase Storage helpers
  r2.ts               ← R2 client + signed URL generation
  upload.ts           ← presigned upload URL generation
  delete.ts           ← deletion helpers (including media cleanup)
```

## Presigned upload pattern

For user uploads, never proxy through the server. Use presigned URLs:

1. Client requests an upload URL from `/api/upload/request`
2. Server checks auth and quota, generates a presigned URL (Supabase or R2)
3. Server returns the URL + the eventual public/signed URL
4. Client uploads directly to storage (browser → R2/Supabase, not via server)
5. Client confirms completion to `/api/upload/complete`
6. Server records the file in the database

This avoids server memory pressure and allows large uploads (videos, high-res photos).

## Privacy and retention

User-uploaded files often have privacy implications. Defaults:
- **Memento AI photos**: Deleted after render + 30-day grace period.
- **Luminary Arts photos**: Deleted immediately after generation (biometric data).
- **NeurōTone audio exports**: Retained until user deletes or account is deleted.
- **Passport photos**: Retained until user deletes (it's their travel scrapbook).

Each project's CLAUDE.md specifies retention. The pattern here is to make retention configurable per-bucket and enforce via scheduled cleanup jobs.

## Image optimization

For images served to users:
- Use `next/image` for automatic optimization
- Vercel's Image Optimization handles resizing, WebP/AVIF conversion, lazy loading
- For images stored in R2, configure a Cloudflare Worker or use `next/image`'s remote pattern

## Naming and bucket structure

Bucket naming: `projectname-purpose` (e.g., `neurotone-exports`, `memento-uploads`, `livingbrush-prints`).

Object key structure: `[user_id]/[entity_type]/[entity_id]/[filename]` (e.g., `abc123/sessions/xyz789/export.wav`).

This pattern:
- Enables per-user enumeration without listing the whole bucket
- Makes deletion on account removal straightforward (delete prefix)
- Avoids filename collisions

---

<a id="section-15"></a>
# 15. Admin Dashboard Pattern

Every project has an admin route at `/admin`. The admin dashboard is for Scott (or future team members). It is not a public feature.

## Why every project has one

The admin dashboard is how you (the operator) actually run the business:
- See user signups
- See revenue
- See AI costs
- Review flagged content
- Manually grant or revoke access
- Investigate support issues
- Monitor quality

Without it, you're flying blind. With it, you stay in control.

## Access control

`/admin/*` routes are gated by:
1. Authenticated user
2. User has `is_admin = true` in the `users` table

Implementation in middleware or route-level checks. There's no separate admin auth — admins log in as normal users, but their `is_admin` flag unlocks admin routes.

Setting `is_admin = true` is done manually in the Supabase dashboard for trusted accounts.

## Standard admin sections

Every project's admin starts with these views:

### Dashboard (`/admin`)
- Active users count (last 7 days, last 30 days)
- New signups today / this week / this month
- Revenue today / MRR / this month total
- AI cost today / this month total
- Active subscriptions by tier
- Recent signups (table)
- Recent payments (table)
- Recent errors from Sentry (embed or link)

### Users (`/admin/users`)
- Search by email
- View user details (signup date, last active, subscription tier, total revenue, usage stats)
- Manually adjust subscription tier (with audit log)
- Trigger password reset
- Delete account (with confirmation)

### Payments (`/admin/payments`)
- List of all payments
- Filter by date, user, status
- Link to Stripe dashboard for refunds and disputes

### Content/Moderation (`/admin/moderation`)
- Only for projects with user-generated content (Memento photos, Luminary uploads, Passport photos, Let's Agree agreements)
- Queue of flagged content
- Review and approve/reject
- Bulk actions

### AI Usage (`/admin/ai`)
- Total tokens used (today / week / month)
- Total cost (today / week / month)
- Top users by usage
- Top features by usage
- Average cost per user

### Email (`/admin/email`)
- Subscriber count per list
- Recent campaigns sent
- Open and click rates (pulled from Brevo)
- Link to Brevo for campaign management

## Implementation approach

Build the admin dashboard incrementally:
- Week 1: Static dashboard with the key metrics (just numbers, no editing)
- Week 2: User list with search
- Week 3: Add moderation if needed
- Week 4: Add edit/action capabilities

Use the same design system as the public app. Admin dashboards usually use a stripped-down version (no marketing flourishes — just data and actions).

## What not to build for admin

- A full custom CMS (use Sanity if content management is needed)
- A reporting system (Stripe Dashboard + PostHog handle this)
- A help desk (use a support inbox or Crisp)
- A user analytics platform (PostHog handles this)
- A finance dashboard (Stripe + CPA bookkeeping handle this)

The admin is for the 10% of operational needs not covered by external tools.

## Future: shared admin shell

After the first 2–3 projects, consider extracting the admin pattern into a shared package. Each project would install the package and configure project-specific views. This is a Phase 2 optimization, not Phase 1.

---

<a id="section-16"></a>
# 16. Content Pattern (MDX and CMS)

Content has two storage options. Choose per-project based on who edits the content.

## Option A: MDX in repo

**Use when**: Scott (or Madelyn) edits content via Claude Code. The content is part of the deployment.

**Pattern**:
- Content lives in `/content/[type]/[slug].mdx`
- Frontmatter at the top of each file (title, date, author, image, etc.)
- Rendered via Next.js MDX support
- Build-time generation (no database queries for content)

**Benefits**:
- Version-controlled in git
- AI-editable (talk to Claude Code: "update the workshops page to add the 2026 dates")
- Fast (static at build time)
- Free (no CMS subscription)
- Durable (no third-party dependency)

**Drawbacks**:
- Requires Claude Code or direct file editing to update
- Not friendly for non-technical editors

**Use cases**:
- LivingBrush blog and pages
- Somnific blog
- Soul Tiger symbol library pages
- NeurōTone science newsletter back-issues
- Any project where Scott controls content

## Option B: Sanity CMS

**Use when**: A non-technical person needs to edit content. Typically clients.

**Pattern**:
- Sanity Studio hosted at `/studio` route or sanity.io
- Schemas defined in code (versioned in git)
- Content stored in Sanity's cloud
- Fetched via Sanity's GROQ query language
- ISR (Incremental Static Regeneration) for fresh content without rebuilds

**Benefits**:
- Beautiful editing interface
- Live preview
- Image hotspot/crop UI
- Free tier covers most small sites
- Client doesn't touch code

**Drawbacks**:
- Adds a vendor
- Slightly slower than static MDX
- Sanity's free tier has limits (3 users, 100K API CDN requests/month)

**Use cases**:
- Client sites where the client wants to self-edit
- Any project with a non-technical content editor

## The decision tree

```
Does the content editor know how to edit text in a code editor or talk to Claude Code?
├─ Yes → MDX in repo
└─ No  → Sanity CMS
```

## MDX implementation

```
/content
  /blog
    /2026-05-23-first-post.mdx
  /pages
    /about.mdx
    /services.mdx
/lib/mdx
  /loader.ts          ← loads + parses MDX
  /components.tsx     ← components available inside MDX (Image, Video, Quote, etc.)
```

Standard MDX frontmatter:
```yaml
---
title: "Post Title"
date: "2026-05-23"
author: "Scott Fray"
description: "Short description for SEO"
image: "/content/blog/hero.jpg"
draft: false
---
```

Pages are generated at build time via `generateStaticParams`.

## Sanity implementation

```
/sanity
  /schemas
    /post.ts
    /page.ts
    /siteSettings.ts
  /sanity.config.ts
  /studio.tsx
```

Studio mounted at `/studio` for easy client access. Sanity's editor handles draft/publish workflow, scheduled publishing, and revision history.

## SEO and Open Graph

Every content page must have:
- Unique `<title>` tag (typically `[Page Title] | [Brand Name]`)
- Meta description (140–160 chars)
- Open Graph image (1200×630px)
- Canonical URL
- Structured data where appropriate (BlogPosting, Product, etc.)

Implement via Next.js metadata API.

## RSS and feeds

For content sites (blogs, newsletters), generate an RSS feed at `/feed.xml`. Use a library like `feed` or generate manually.

## Image handling in content

- Images live in `/public/content/[type]/[slug]/[image].jpg` for MDX
- Sanity handles its own image CDN
- Always provide alt text
- Always optimize before committing (TinyPNG, Squoosh, or `sharp` in build process)
- Use `next/image` for rendering

---

<a id="section-17"></a>
# 17. Cross-Project Integration

Each brand is separate. But projects can offer each other's services, embed each other's content, and eventually offer combined products — all without merging into a single platform.

## The principle

Cross-project integration happens at the **application layer**, not the **infrastructure layer**. Two projects can interoperate while:
- Maintaining separate databases
- Maintaining separate user accounts
- Maintaining separate Stripe products
- Maintaining separate brand identities
- Maintaining separate legal entities (if needed)

This preserves the ability to spin off, sell, or shut down any individual brand without affecting the others.

## Integration patterns

### Pattern 1: Mutual recommendation

The simplest integration. Each project links to the others where contextually relevant.

**Example**:
- NeurōTone has a "Soothing voice tracks?" link that goes to Somnific Studios.
- Somnific Studios has a "Custom binaural sessions?" link that goes to NeurōTone.
- Soul Tiger's dream-related readings link to Somnific Studios' Dream Residue Field.
- LivingBrush's reinvention coaching mentions Soul Tiger for self-knowledge.

**Implementation**: just HTML links. No technical integration.

**Why it matters**: each brand stays separate but the user discovers the studio's broader work.

### Pattern 2: Embedded content

One project embeds content (videos, audio, text) from another.

**Example**:
- LivingBrush's "Reinvention Coaching" page embeds a Somnific Studios meditation as a "prepare for your session" resource.
- NeurōTone's session library includes a "voiced by Madelyn" series that pulls audio from Somnific's catalog.
- Soul Tiger's daily oracle email occasionally includes a Somnific "night descent" link.

**Implementation**: a simple shared CDN (Cloudflare R2) for cross-project media, or direct embeds via iframe / native HTML5.

**Account separation maintained**: the content lives in its source-project's bucket, but is served publicly so other projects can embed.

### Pattern 3: Cross-project SSO (later phase)

A user signed into one project can access another without separate signup.

**Example**: A NeurōTone Pro user wants to comment on a Somnific blog post — they can use their NeurōTone account.

**Implementation**: OAuth provider pattern. One project (typically the most-used) becomes the "identity provider" for the studio. Others can offer "Sign in with NeurōTone" alongside Google/Apple.

**This is Phase 3 work.** Don't build until two projects are revenue-positive and users are asking for it.

### Pattern 4: Combined products

The most ambitious integration. A product that combines features from multiple projects, sold as a bundle, but built on the infrastructure of one or both.

**Example**: "Madelyn's Voice on NeurōTone" — a NeurōTone product where Madelyn's voice (or an authorized ElevenLabs replica) layers over binaural beats. The voice cadence entrains with the beat frequency. Sold within NeurōTone, but credited to and royalty-paid to Somnific Studios.

**Implementation**:
- The product lives in NeurōTone (one project owns it)
- Revenue split tracked manually or via Stripe Connect (Phase 3)
- Marketing happens on both sites
- The technical implementation lives in NeurōTone's codebase

**This is Phase 2-3 work** for any combined product. The audited business plans support these but don't depend on them.

### Pattern 5: Shared content library

Multiple projects pull from a shared content library (interviews, dream symbols, archetypes, etc.).

**Example**: Soul Tiger's dream symbol library (200+ entries) is large enough to be a standalone resource. Somnific Studios' Dream Residue Field could reference the same library when users ask for interpretation. The library lives in a shared location, both projects read from it.

**Implementation**: a shared Supabase project (read-only from other projects' service-role keys), or a static JSON file deployed to a shared CDN.

**This is Phase 2 work** at earliest.

## What to design for, build later

In each project's initial schema design, allow for the possibility of cross-project integration:
- `users` table allows for external_provider_id (for future SSO)
- `payments` table allows for `partner_project` metadata
- API routes can be designed as if they might one day be called from another project (use API keys, rate limiting, CORS)

But don't actually build the integrations until they're needed. The principle is: don't over-engineer for hypothetical futures, but don't make hypothetical futures impossible.

## Cross-brand marketing

The studio itself (you, Scott) can have a portfolio site that introduces all brands:
- A "Scott Fray Studios" landing page (or similar)
- Each brand presented with its identity intact
- Cross-recommendations highlighted
- This site lives at a separate domain (yourname.com or studio.com)

This is a Phase 2-3 project. Not urgent. But planned.

---

<a id="section-18"></a>
# 18. Deployment Workflow

Every project deploys to Vercel via GitHub. The workflow is identical across projects.

## The pipeline

```
Local development
  ↓
git commit (with clear message)
  ↓
git push to GitHub
  ↓
Vercel webhook triggers
  ↓
Vercel builds (Next.js build, type-checking, linting)
  ↓
Vercel deploys to preview URL (for non-main branches)
  ↓
On merge to main: Vercel deploys to production domain
  ↓
Sentry source maps uploaded automatically
```

## Branch strategy

- `main` — production. Deploys automatically to production domain.
- `dev` — staging. Deploys automatically to staging URL (configured in Vercel).
- `feature/[feature-name]` — feature branches. Deploy to preview URLs automatically.

For solo development with Claude Code, often `main` is the only branch and you commit frequently. That's fine. The pattern above is for when complexity demands it.

## Environment variables

Every project has three environments:
- **Development** (local): `.env.local` file, never committed
- **Preview** (Vercel preview deploys): configured in Vercel dashboard under "Preview"
- **Production**: configured in Vercel dashboard under "Production"

Standard env vars (see Section 26 for complete reference):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
BREVO_API_KEY=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET=
SENTRY_DSN=
NEXT_PUBLIC_SITE_URL=
```

Never commit secrets. Vercel and Claude Code both understand `.env.local` and respect `.gitignore`.

## Domain configuration

After Vercel deploy succeeds:
1. In Vercel project settings → Domains → add the project's domain
2. Vercel provides the DNS records to add
3. Add records in Cloudflare DNS (typically `A` record pointing to Vercel's IP, or `CNAME` for subdomains)
4. Set Cloudflare proxy to "DNS only" (gray cloud) — Vercel handles CDN
5. SSL provisioned automatically by Vercel

## Production checklist (before launching any project)

- [ ] Environment variables set for Production in Vercel
- [ ] Production domain configured and verified
- [ ] Stripe switched from Test Mode to Live Mode
- [ ] Stripe webhook endpoint configured for production URL
- [ ] Resend sending domain verified (SPF, DKIM, DMARC)
- [ ] Brevo sending domain verified
- [ ] Plausible site added and tracking script confirmed working
- [ ] Sentry release configured for production
- [ ] Privacy policy + ToS published and linked from footer
- [ ] Cookie consent banner (if EU users targeted)
- [ ] Open Graph image set for all key pages
- [ ] favicon set
- [ ] robots.txt and sitemap.xml configured
- [ ] Attorney sign-off received (where required)

## Rollback strategy

Vercel keeps every deployment. To roll back:
1. Go to Vercel project → Deployments
2. Find the last known-good deployment
3. Click "Promote to Production"
4. Done. Site is rolled back in <30 seconds.

Database rollbacks are harder. Use Supabase migrations and test in staging before applying to production.

## Zero-downtime database migrations

For schema changes:
- Additive changes (new columns, new tables) — safe to deploy any time
- Renames or column drops — deploy in two steps:
  1. Deploy code that works with both old and new schema
  2. Apply migration
  3. Deploy code that requires only new schema
- Data migrations — run as separate jobs, not as part of deploy

Always test migrations on a staging copy before production.

## Monitoring after deploy

After every production deploy, check:
- Vercel deployment status (green)
- Sentry for new errors in the last 15 minutes
- Plausible for sustained traffic (drops indicate problems)
- A manual smoke test on the production URL (sign in, navigate, make a key action work)

---

<a id="section-19"></a>
# 19. Security and Data Handling

Security is a baseline, not a feature. Every project gets it.

## The threat model

For a solo-founder studio building consumer SaaS, the realistic threats are:
- **Credential theft** (someone's Stripe key leaks, someone gets into a Vercel account)
- **Database breach** (someone gains access to a Supabase project)
- **User account compromise** (someone phishes a user's password)
- **Insider misuse** (rare for solo-founder, but consider for contractors)
- **Vendor breach** (Stripe, Supabase, etc. — out of your control, but defensive design helps)
- **Bot abuse** (mass account creation, API abuse, scraping)

The threats we don't realistically defend against:
- Nation-state actors
- Determined targeted attacks (these need real security teams)
- Physical security of data centers (vendors handle this)

## Secrets management

- All secrets in environment variables, never in code
- All secrets stored in Vercel for production
- Local development uses `.env.local` (gitignored)
- Rotation: rotate any leaked secret immediately; otherwise rotate quarterly for high-value secrets (Stripe, Anthropic)
- Never log secrets, even partially
- Never include secrets in error messages

## Authentication security

- Supabase Auth handles password hashing, session tokens, OAuth flows
- Magic link is preferred over passwords (eliminates phishing risk for the password specifically)
- Session cookies are HTTP-only, Secure, SameSite=Lax
- Rate limiting on auth endpoints (Supabase handles this)
- Failed login monitoring (Sentry alerts on unusual patterns)

## Database security

- Row Level Security enabled on every user-data table
- Service-role key used only in server-side code, never exposed to client
- Anon key used in client code (limited capabilities via RLS)
- No raw SQL constructed from user input (use parameterized queries via Supabase client)
- Sensitive columns encrypted at rest using pgcrypto (birth data, journal entries, agreement content)

## API security

- Every API route checks auth before performing actions
- Tier-based access checked at the API layer, not just the UI layer
- CORS configured to only allow the project's own domain (and any explicitly allowed cross-project integrations)
- Rate limiting on AI endpoints, upload endpoints, and any expensive operations
- Input validation with Zod schemas
- Never trust client-provided data (user IDs, prices, etc.)

## File upload security

- Presigned URLs scoped to the user's path
- File size limits enforced
- File type validation (don't accept arbitrary uploads)
- For images: server-side moderation (NSFW detection via AI) before exposing publicly
- For documents: virus scanning (Phase 2 if relevant)

## Webhook security

- Stripe webhook signatures verified on every request
- Webhook endpoints idempotent (handle duplicate events)
- Webhook endpoints don't trust the request body's identity claims; always verify via signature

## CSRF and XSS

- Next.js mitigates most CSRF/XSS by default
- Never use `dangerouslySetInnerHTML` with user content
- Sanitize any HTML from rich text editors (DOMPurify or rehype-sanitize)
- Use Content Security Policy headers via middleware

## Logging and monitoring

- Sentry catches errors and reports them
- Audit logs in Supabase track sensitive actions (account deletion, tier changes, admin actions)
- Never log PII (names, emails) into Sentry beyond what's necessary; use user IDs and reference DB
- Stripe Dashboard shows all payment-related events

## Privacy by design

- Collect only the data needed for the feature
- Delete data when no longer needed (photos after render, transient AI conversations after generation)
- Default to opt-out for non-essential data collection (session tracking, behavioral analytics)
- Privacy policy explains what's collected and why

## Account recovery

- Magic link works as both initial auth and recovery (user can always get back in via email)
- Email change requires re-authentication and confirmation email
- Account deletion has a 30-day grace period (account marked deleted but not hard-deleted) so users can recover from mistakes

## Vendor security

- Use vendors with strong security postures (Stripe, Supabase, Vercel, Anthropic, Cloudflare, Resend, Brevo all qualify)
- Review Data Processing Agreements (DPAs) where relevant for GDPR
- Don't put data in a vendor that doesn't have a DPA available

## When to bring in a security consultant

- Before pursuing enterprise contracts (Phase 3)
- After any actual security incident
- Before launching anything healthcare-adjacent or financial
- When user volume exceeds ~10,000 active accounts

For solo founder phase, the patterns above are sufficient.

---

<a id="section-20"></a>
# 20. Legal and Compliance Patterns

Legal compliance is project-specific. This section provides the framework; the actual legal documents are drafted by the attorney.

## The standard legal document set

Every project needs (at minimum):
- **Terms of Service** — contract between user and the project
- **Privacy Policy** — what data is collected, how it's used, user rights
- **Cookie Policy** (if EU users targeted) — cookie use disclosure

Projects with payments need:
- **Refund Policy** (usually a section in ToS)

Projects with user-generated content need:
- **Acceptable Use Policy** (usually a section in ToS)
- **DMCA Policy** (procedures for copyright complaints)

Projects with sensitive data need:
- **Data Processing Agreement** (for B2B partners)
- Specific disclaimers (medical, legal, financial — see below)

## Reusable template structure

The attorney drafts a master set of templates, then customizes for each project. Templates that are reusable:
- Base ToS structure (parties, account, payment, termination, disputes)
- Base Privacy Policy structure (data collection, use, sharing, rights, contact)
- DMCA boilerplate
- Acceptable use boilerplate
- Liability limitation boilerplate
- Governing law and arbitration clauses

Project-specific sections are added per project. The attorney bills for the project-specific customization, not for redrafting the whole document.

## Per-project legal review requirements

| Project | Critical legal areas | Estimated cost |
|---|---|---|
| **NeurōTone** | Health-adjacent disclaimers (no medical claims), epilepsy warning, FTC compliance | $1,500–3,500 |
| **Soul Tiger** | Birth/journal data sensitivity, spiritual guidance disclaimers, fortune-telling law (avoid in PA, certain states), trademark filing | $1,500–3,500 + ~$1,000 trademark |
| **Let's Agree** | UPL (Unauthorized Practice of Law) — non-negotiable attorney review, disclaimer architecture, state-specific compliance | $3,000–8,000 |
| **Memento AI** | Biometric data (BIPA), deceased persons' data, GDPR/CCPA, music licensing verification | $1,500–4,000 |
| **Luminary Arts** | Biometric data, image rights, AI-generated art IP, print fulfillment terms | $1,500–4,000 |
| **Harmonia** | Standard SaaS terms, audio upload + DMCA, music copyright | $500–1,500 |
| **Time Tamer** | Standard SaaS terms, AI conversation data sensitivity | $500–1,500 |
| **Passport** | Location data, UGC, affiliate disclosure (FTC), DMCA | $500–1,500 |
| **LivingBrush** | Standard service business terms, model release forms (already in place), workshop/coaching disclaimers | $500–1,500 |
| **Somnific Studios** | Standard content site terms, music/voice IP rights, sleep/wellness disclaimers | $500–1,500 |

## Standard disclaimers

Several disclaimers apply across multiple projects. These get drafted once and reused:

### "Not medical advice"
For NeurōTone, Memento (memorial context), Somnific:
> "[Product] is not a medical device. It is not intended to diagnose, treat, cure, or prevent any disease. Consult a qualified healthcare professional for medical concerns."

### "Not legal advice"
For Let's Agree, Soul Tiger:
> "[Product] does not provide legal advice and is not a substitute for a licensed attorney. Documents and outputs generated are for personal organization and informational purposes only."

### "Not financial advice"
For Time Tamer (when financial features added), Soul Tiger:
> "[Product] does not provide financial or investment advice. Consult a qualified financial advisor for financial decisions."

### "AI-generated content"
For all AI-driven products:
> "Content generated by [Product] is produced by artificial intelligence and may contain errors. Review all outputs before acting on them. [Project] does not guarantee accuracy."

### Epilepsy warning (NeurōTone-specific)
> "If you have a history of seizures, epilepsy, or photosensitive conditions, consult your doctor before using this product. Rhythmic auditory stimulation can in rare cases trigger seizures."

## GDPR / CCPA basics

For any project that may have EU or California users (which is most of them):
- Privacy policy explicitly addresses GDPR and CCPA rights
- Cookie consent banner (only for EU users; use geolocation to gate)
- Data subject request mechanism (easy way to request data export or deletion)
- Data processing records (internal documentation of what's processed and why)
- Data breach notification procedure (72-hour notification rule)

For most projects, GDPR/CCPA compliance is achieved through:
- Clear privacy policy
- Functional account deletion
- Cookie consent banner
- Privacy-friendly analytics (Plausible)
- No selling of data

For more complex projects (Soul Tiger with sensitive data, Memento with biometric data), additional steps may be required.

## Trademark filings

For brands you want to protect:
- **Soul Tiger**: URGENT — file in Classes 041, 042, 045 within 30 days per audit
- **NeurōTone**: file before public launch
- **Harmonia**: trademark search shows risk (common word) — discuss with attorney before committing to name
- **Memento AI**: file when launching (after validation)
- **LivingBrush**: likely already trademarked or established by common use — verify with attorney
- **Somnific Studios**: file when audience grows

Trademark filings: ~$250 per class for USPTO basic filing, plus attorney time (~$500–1,500 per filing).

## Music and content licensing

For projects using third-party content:
- **NeurōTone, Memento**: verify Epidemic Sound (or chosen library) commercial license covers AI-assembled output
- **LivingBrush video work**: existing licenses or fresh agreements per project
- **Somnific Studios**: Suno-generated music — verify Suno's terms allow commercial use (check current Suno ToS)

Get written confirmation from vendors. Don't rely on assumptions.

## Insurance

Once revenue is meaningful (~$50K+/year per business), discuss with the attorney:
- General liability insurance
- Professional liability / E&O insurance
- Cyber liability insurance (for breach exposure)

Not required at Phase 1, but plan for it.

## Entity structure

Discuss with CPA and attorney:
- Single LLC for the studio, with each project as a DBA (simpler, less protection)
- Separate LLC per project (more protection, more bookkeeping)
- Holding company with project LLCs underneath (most complex, most flexibility)

For Phase 1, a single LLC with each project as a DBA is usually fine. Revisit when revenue justifies the complexity.

---

<a id="section-21"></a>
# 21. Maintenance and Update Workflow

Once a project is live, ongoing maintenance is part of the studio operation. This section describes how that works.

## The maintenance categories

Every project has these ongoing maintenance areas:
- **Content updates** (blog posts, page text, new offerings)
- **Bug fixes** (issues users report or you discover)
- **Security patches** (dependency updates, vulnerability fixes)
- **Feature additions** (planned improvements)
- **AI prompt refinement** (improving quality based on real usage)
- **Performance optimization** (when needed)
- **Cost monitoring** (AI costs, hosting costs, vendor costs)

## Content updates via Claude Code

This is the killer workflow that makes the modern stack better than WordPress.

Process for a content update (e.g., adding a 2026 award to LivingBrush CV):

1. Open Claude Code in the project repo
2. Say: "Update the CV page to add this: 2026 Lifetime Achievement Award — [details]"
3. Claude Code edits the MDX file
4. Claude Code commits and pushes
5. Vercel deploys in 30 seconds
6. Site is updated

Total time: 2 minutes. No WordPress login, no plugin conflicts, no "did the change save?"

For client sites with Sanity, content updates happen in Sanity Studio. No code changes needed.

## Bug fix workflow

When a bug is reported (or you find one):

1. Reproduce reliably
2. Document in `issues/[date]-[short-description].md`
3. Open Claude Code, describe the bug
4. Get Claude Code to explain the root cause
5. Have Claude Code propose a fix
6. Review and approve
7. Apply fix on a feature branch
8. Test
9. Merge to main, deploy
10. Verify in production
11. Update the issues log with resolution

For urgent bugs in production, hotfix branch + direct deploy is acceptable, but always document after.

## Dependency updates

Monthly task:
1. Run `npm outdated` in each project repo
2. Review what's available
3. Update minor and patch versions freely (`npm update`)
4. For major version updates, read the changelog, test carefully
5. Always run the test suite (when test suites exist)
6. Deploy to staging, verify, then production

Security advisories (`npm audit`) should be addressed immediately if high-severity, otherwise within a week.

## AI prompt refinement

Quarterly task per project:
1. Sample 20–50 recent AI outputs from the project
2. Rate quality (1–5 scale, or pass/fail)
3. Identify patterns in low-quality outputs
4. Refine the prompt template (create a new version)
5. A/B test old vs. new prompt on a fresh batch
6. Promote the new version when clearly better

The prompt template versioning system (Section 12) makes this safe.

## Cost monitoring (monthly)

Per project, check:
- Vercel usage (close to free tier limit? plan to upgrade)
- Supabase usage (close to free tier? plan to upgrade)
- Anthropic spend (track per-user cost; flag if exceeding revenue per user)
- Cloudflare R2 storage (cheap, but track growth)
- Resend / Brevo usage
- Stripe fees (informational)

Roll up to a monthly studio P&L (work with CPA on this).

## Backup verification (quarterly)

Per project:
1. Verify Supabase backups are running
2. Test restoring a backup to a staging environment (at least once per project per year)
3. Verify Cloudflare R2 content is backed up (consider S3 mirror for critical content)

## What this maintenance workflow does NOT require

- Logging into WordPress admin
- Updating plugins to avoid security issues
- Dealing with PHP version conflicts
- Hosting provider migrations
- SSL certificate renewals (Vercel handles this)
- DNS troubleshooting (Cloudflare handles this)
- Database backups (Supabase handles this)
- CDN cache invalidation (Vercel handles this)
- Cron jobs requiring server maintenance

These are all WordPress-world problems that don't exist in this stack. That's why the maintenance burden is dramatically lower.

## When to bring in help

Consider contracting help when:
- Maintenance is exceeding 4–6 hours/week across all projects (consider a part-time developer for routine maintenance)
- A specific area is outside your expertise and Claude Code's capability (rare, but possible — e.g., advanced audio engineering for NeurōTone)
- A client requires faster response times than you can provide solo

Until then, the workflow above is sustainable for one person.

---

<a id="section-22"></a>
# 22. Client Engagement Patterns

Client work uses the same stack as your own projects, but with different engagement, pricing, and handoff patterns.

## The default offering

Position client work as: **"Modern site rebuild with AI-powered updates."**

What you offer:
- Replace their old site (typically WordPress) with a fast, modern, secure site built on the studio stack
- Site is faster, more secure, more SEO-friendly, more accessible
- You host (Vercel + Cloudflare)
- Updates are easy: client emails you, you update via Claude Code, deployed in minutes
- For clients who want self-edit capability: Sanity CMS interface

## What clients get

- A faster site (Vercel + Next.js easily 2–5x faster than WordPress)
- A more secure site (no plugins to compromise, no PHP attack surface)
- Better SEO (modern stack, fast loading, structured data)
- Better mobile experience (responsive by default)
- AI-powered ongoing updates (cheaper than retainer-based WordPress updates)
- No "the site is down" incidents (Vercel uptime is excellent)
- Modern design (your brand sensibility)

## What clients don't get (by default)

- WordPress admin login
- A million configuration options they'll never use
- Plugins
- The ability to break their site by installing things

For clients who want self-edit, Sanity CMS provides a clean, modern editor without the WordPress bloat.

## Pricing models

### Model A: Project flat fee + optional retainer

- Build: flat fee based on scope ($3K–$15K typical for a small business site, depending on complexity)
- Ongoing: monthly retainer for hosting + maintenance + content updates ($150–$500/month based on update frequency and complexity)

This is the default offering. Predictable for both sides.

### Model B: Project flat fee + hand off

- Build: flat fee (typically 20–30% more than Model A because client gets full ownership)
- Hand off: client gets the GitHub repo, Vercel account access, Sanity admin, vendor account ownership
- You're done. Client maintains or hires elsewhere.

For clients who want long-term independence.

### Model C: Hourly maintenance for legacy WordPress sites (avoid)

Don't take on WordPress maintenance as new business. The platform is in decline; you don't want to be maintaining WordPress sites in 2030. If a current client refuses to modernize, refer them to a WordPress specialist.

## The pitch

When a client (like your 10-year-old WordPress client) asks for a rebuild, here's the conversation:

"I'd love to rebuild your site, and I want to share what's changed in web development since we built the original.

WordPress was the right choice in 2014. Today, it has real costs: it requires constant plugin updates to stay secure, the page load speed has gotten worse with every WordPress version, and a lot of the cool features you might want now don't work well with WordPress's architecture.

I now build on a modern stack that's faster, more secure, and significantly easier to update. The site loads in under a second instead of 3–4 seconds. There are no plugins to update or break. Updates happen by emailing me — I make changes using AI assistance and your site is updated in minutes, not hours.

If you ever want to make changes yourself, I can set you up with a modern editor that's cleaner than WordPress and doesn't require you to know what plugins to avoid.

Here's what I'd recommend: [scope + price]."

## Scope guardrails

Be careful about scope creep. Common client scope risks:
- "Can we also add e-commerce?" — yes, but it's a separate scope item
- "Can it integrate with [X]?" — depends on X; estimate before agreeing
- "Can we add a blog?" — yes, easy with the standard stack
- "Can we have a member area?" — yes, but it's a SaaS feature, not a brochure feature; price accordingly

Always write scope in a Statement of Work (SOW) before starting work. The SOW lists what's included and what's out of scope. Out-of-scope work is billed separately.

## Client handoff documents

For every client project, deliver:
- **Site overview**: how the site is structured, where content lives, how to request updates
- **Update request guide**: how to email update requests, what info to include
- **Brand guide reference**: tokens used, fonts, colors
- **Vendor access** (if Model B): credentials for Vercel, Sanity, Cloudflare DNS, etc.
- **Maintenance contract** (if Model A): terms for ongoing work

## Client communication patterns

- Set explicit expectations for response times (e.g., "I respond to update requests within 1 business day; typical update turnaround is 48 hours")
- Use email or a project-specific Slack channel — not text messages (avoid blurring boundaries)
- Use Linear or Notion for tracking client requests
- Send monthly check-ins for clients on retainer
- For larger client projects, schedule occasional video calls to review work

## When to turn down a client

- They're religiously attached to WordPress and won't consider alternatives
- They want hourly billing with no clear scope
- They demand 24/7 availability
- They have a history of scope creep without paying for it
- The project is in a category you don't want to specialize in (some industries are harder to maintain — heavily regulated, content-moderation-heavy, etc.)

Saying no is part of running a studio sustainably.

## How client work funds the portfolio

Client work has higher hourly value than your own projects (which monetize over months/years). One $10K client project can fund 3–6 months of your own project development. Build a healthy mix:
- 40–60% time on your own projects (NeurōTone, Harmonia, Soul Tiger, etc.)
- 40–60% time on client work
- Adjust the ratio based on cash flow needs

Client work also builds the shared infrastructure faster: every client project is another exercise of the stack, the design system, the deployment workflow.

---

<a id="section-23"></a>
# 23. Cost Monitoring

Knowing your costs prevents the most common solo-founder failure: building something with unit economics that don't work.

## The monthly studio P&L

Track these monthly, per project:
- Vercel: $0–$20 per project at Phase 1, scales with usage
- Supabase: $0 (free) or $25/month (Pro) per project
- Anthropic API: highly variable; track per-user spend
- Cloudflare R2: $0.015/GB stored + $0 egress
- Resend: $0 (free tier) or $20/month
- Brevo: $0 (free tier) or $25/month
- Plausible: $9/month for the whole portfolio
- Sentry: $0 (free tier) at Phase 1
- PostHog: $0 (free tier) at Phase 1
- Stripe: ~2.9% + $0.30 of revenue
- Domains: ~$15/year per domain

Project-specific:
- Shotstack (Memento): ~$0.05–0.10 per render
- Epidemic Sound (Memento, NeurōTone): ~$150/year
- Mapbox (Passport): free tier, then $0.0005/load
- Printful (Luminary, etc.): per-product fulfillment cost
- Dropbox Sign (Let's Agree): per-envelope cost

## AI cost per user

For each AI-using project, calculate the AI cost per user per month:

```
Total Anthropic spend for project / Active users = Cost per user
```

If this exceeds the user's contribution to revenue:
- Reduce model size (use Sonnet instead of Opus, Haiku instead of Sonnet)
- Cache more aggressively
- Reduce token usage in prompts
- Lower the AI feature limit for free tier
- Increase the price of the paid tier

This calculation is the single most important number for AI-first SaaS sustainability.

## Hosting cost growth

Vercel and Supabase free tiers handle Phase 1 for nearly any project. The question is when they stop being free:

- Vercel: 100GB bandwidth/month free. A typical SaaS site uses 1–10GB. Free until you have thousands of active users.
- Supabase: 500MB database, 1GB storage, 50K monthly active users free. Free until you have meaningful scale.

Both have clear upgrade paths. You'll know when to upgrade because the dashboard will warn you.

## Vendor consolidation savings

The shared-stack approach means significant cost savings vs. running each project independently:

Hypothetical: if each of 5 projects had its own Mailchimp, ConvertKit, HubSpot, Google Analytics 360, etc., the total cost could be $500–$2,000/month easily.

With the consolidated stack: $80–$200/month for the entire portfolio at Phase 1.

That savings is real. Don't break it by fragmenting the stack.

## Revenue tracking

Stripe Dashboard is the source of truth for revenue. Per project:
- MRR (monthly recurring revenue)
- ARR (annual recurring revenue)
- Churn rate (cancellations / total subscribers)
- LTV (lifetime value: average revenue per customer over their lifetime)
- CAC (customer acquisition cost: marketing spend / new customers)

LTV / CAC > 3 is the rough target for sustainable SaaS. Below 3, the model needs attention.

## When to invest in cost optimization

Don't optimize early. Cost optimization is engineering effort that doesn't produce features. Optimize when:
- A specific cost is growing faster than revenue
- A vendor is becoming a meaningful percentage of monthly spend
- You can see a clear 30%+ reduction with reasonable effort

Otherwise, focus on building features and growing revenue.

---

<a id="section-24"></a>
# 24. When to Deviate

The patterns in this document are defaults. There are times to break them. This section names the legitimate reasons.

## Legitimate reasons to deviate

### 1. The pattern genuinely doesn't fit the project

Some projects have requirements the standard pattern doesn't cover. Example: Soul Tiger's Swiss Ephemeris integration is project-specific and isn't a "deviation" so much as an addition.

When adding a project-specific dependency, document it in the project's CLAUDE.md and update this document if it's likely to recur.

### 2. The pattern has become stale

If a vendor is acquired, declines in quality, or stops being competitive, replacing it is appropriate. This happened to many tools that were once standard (e.g., Heroku used to be the default; it isn't anymore).

When replacing a vendor:
- Document the reason in this document (Section 28)
- Update all relevant sections
- Plan migration for existing projects (if any) — but don't force migration if it doesn't pay off

### 3. A specific client demands something

If a client requires WordPress, refer them out. If they require a vendor that's not in the stack but is reasonable (e.g., a specific email platform they're already invested in), evaluate case by case.

Document the deviation in that client project's CLAUDE.md. Don't let it bleed into other projects.

### 4. The launch-worthy standard requires more

If a project's competitive landscape demands a feature or tool that's not in the standard stack, add it for that project. Example: if a music project requires a specific notation library, that library is added even though it's not portfolio-wide.

### 5. A clear better option appears

If a new tool genuinely improves on the standard, consider adoption. Bar for adoption is high:
- Demonstrably better than the current tool on multiple dimensions
- Mature (not bleeding edge)
- Well-supported by Claude Code (or has a clear path to support)
- Reasonable migration cost from the current tool

Don't chase trends. Don't add tools because they're new.

## Illegitimate reasons to deviate

- "This new framework looks cool" — no
- "This client prefers WordPress because they're familiar with it" — politely decline
- "I want to learn a new database" — learn in personal experiments, not in production projects
- "This project is too small for the standard stack" — no, the standard stack handles small projects fine
- "I'm bored of the current stack" — boredom is a feature; it means you're getting fast

## Deviation documentation

When a deviation is made:
1. Document the deviation in the project's CLAUDE.md (project-specific)
2. If the deviation might apply to future projects, document in this document (Section 28)
3. If the deviation reveals a flaw in the standard pattern, update the standard pattern

## Reviewing the architecture

Every 6 months, review this document:
- Have any vendors changed significantly?
- Have any patterns proven problematic?
- Are there new patterns that should be added based on recent projects?
- Is anything no longer relevant?

Update accordingly. The architecture is a living document.

---

<a id="section-25"></a>
# 25. Reference: Component Library Inventory

Components to build (or copy from shadcn) for the shared library. After 2–3 projects, these will exist as a real shared package.

## Primitives (from shadcn/ui)

Install via shadcn CLI per project:

- `button` — primary, secondary, ghost, destructive variants
- `card` — header, content, footer composition
- `dialog` — modal dialogs
- `sheet` — slide-out panels (mobile-friendly nav, drawer UI)
- `dropdown-menu` — context menus, user menus
- `input` — text input
- `textarea` — multi-line text
- `select` — dropdown selection
- `checkbox` — single checkboxes
- `radio-group` — radio button groups
- `switch` — toggle switches
- `slider` — range sliders
- `tabs` — tab navigation
- `accordion` — collapsible content
- `tooltip` — hover tooltips
- `popover` — anchored popovers
- `toast` — notification toasts (Sonner)
- `alert` — inline alerts
- `alert-dialog` — confirmation dialogs
- `progress` — progress bars
- `skeleton` — loading states
- `badge` — small labels/tags
- `avatar` — user avatars
- `separator` — visual dividers
- `scroll-area` — custom scrollbars
- `command` — command palette (cmd+k)
- `calendar` — date picker base
- `date-picker` — full date picker
- `form` — form composition with validation

## Page composition components (build per project, extract to shared after pattern stabilizes)

- `Layout` — page shell
- `Header` — top nav, mobile menu toggle
- `Footer` — bottom of page
- `Hero` — landing page hero
- `Section` — reusable page section
- `Container` — max-width container
- `FeatureGrid` — features showcase
- `Pricing` — pricing tier display
- `PricingCard` — single tier
- `Testimonial` — quote + attribution
- `TestimonialGrid` — multiple testimonials
- `CTABlock` — call-to-action section
- `FAQAccordion` — frequently asked questions
- `Newsletter` — email signup
- `ContactForm` — generic contact form
- `BlogCard` — blog post preview
- `BlogPost` — full blog post layout
- `Breadcrumb` — page breadcrumbs
- `EmptyState` — empty state placeholder

## App-specific composition (per-project)

These don't get extracted to a shared library because they're project-specific:
- Auth pages (sign-in, sign-up, callback)
- Dashboard layout
- Settings pages
- Account management
- Subscription management
- Billing pages
- Project-specific feature UIs

These are built fresh per project, but follow the patterns from this document.

## Admin composition (per-project, but pattern shared)

- `AdminLayout` — admin page shell
- `AdminNav` — admin navigation
- `DataTable` — generic data table with sorting, filtering, pagination
- `MetricCard` — single metric display
- `MetricGrid` — multiple metrics
- `ActionMenu` — admin action dropdown
- `ConfirmDialog` — destructive action confirmation

---

<a id="section-26"></a>
# 26. Reference: Environment Variables

Standard environment variables across every project. Project-specific vars added per project.

## Supabase
```
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

## Stripe
```
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for dev)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (or pk_test_... for dev)
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Anthropic
```
ANTHROPIC_API_KEY=sk-ant-...
```

## Email
```
RESEND_API_KEY=re_...
BREVO_API_KEY=xkeysib-...
EMAIL_FROM=noreply@email.[projectname].com
EMAIL_REPLY_TO=hello@[projectname].com
```

## Cloudflare R2
```
CLOUDFLARE_R2_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY=...
CLOUDFLARE_R2_SECRET_KEY=...
CLOUDFLARE_R2_BUCKET=projectname-bucket
CLOUDFLARE_R2_PUBLIC_URL=https://...
```

## Monitoring
```
SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=... (for source map uploads)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=[projectname].com
```

## Site config
```
NEXT_PUBLIC_SITE_URL=https://[projectname].com
NEXT_PUBLIC_SITE_NAME=[Project Name]
```

## Optional (project-specific)
```
SHOTSTACK_API_KEY=... (Memento)
DROPBOX_SIGN_API_KEY=... (Let's Agree)
FAL_API_KEY=... (Luminary)
REPLICATE_API_TOKEN=... (image generation)
EPIDEMIC_SOUND_API_KEY=... (Memento, NeurōTone)
ELEVENLABS_API_KEY=... (Somnific × NeurōTone)
MAPBOX_ACCESS_TOKEN=... (Passport)
PRINTFUL_API_KEY=... (Luminary, Memento, etc.)
```

## Naming conventions

- `NEXT_PUBLIC_*` for variables exposed to the client
- All others server-only
- Use `_KEY` suffix for API keys
- Use `_SECRET` suffix for cryptographic secrets
- Use `_URL` suffix for URLs

## Storage

- Production: Vercel environment variables (encrypted at rest)
- Development: `.env.local` (gitignored)
- Preview: Vercel preview environment (typically same as production for less-sensitive vars, test values for sensitive ones)

## Rotation

- Stripe and Anthropic keys: rotate annually or on suspected compromise
- Webhook secrets: rotate with the webhook endpoint
- Service role keys: rotate annually
- Anon keys: rotate only on compromise (they're public-ish)

---

<a id="section-27"></a>
# 27. Reference: File and Folder Structure

The canonical project structure. Variations are documented per project.

## Standard Next.js SaaS app structure

```
project-root/
├── .env.example
├── .env.local              (gitignored)
├── .gitignore
├── README.md
├── PROJECT_BRIEF.md
├── CLAUDE.md
├── ARCHITECTURE_REFERENCE.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── components.json         (shadcn config)
├── middleware.ts
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx            (landing page)
│   ├── globals.css
│   │
│   ├── (marketing)/
│   │   ├── pricing/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   └── legal/
│   │       ├── terms/
│   │       └── privacy/
│   │
│   ├── (auth)/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── callback/
│   │
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── settings/
│   │   │   ├── account/
│   │   │   ├── billing/
│   │   │   └── preferences/
│   │   └── [feature-specific routes]/
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── users/
│   │       ├── payments/
│   │       └── moderation/
│   │
│   └── api/
│       ├── auth/
│       │   ├── signin/
│       │   └── signout/
│       ├── stripe/
│       │   ├── checkout/
│       │   ├── portal/
│       │   └── webhook/
│       ├── ai/
│       │   └── [task]/
│       ├── upload/
│       │   ├── request/
│       │   └── complete/
│       └── contact/
│
├── components/
│   ├── ui/                 (shadcn primitives)
│   ├── marketing/
│   ├── app/
│   ├── admin/
│   └── shared/
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   └── admin.ts
│   ├── stripe/
│   │   ├── server.ts
│   │   ├── client.ts
│   │   ├── checkout.ts
│   │   ├── portal.ts
│   │   ├── webhooks.ts
│   │   └── entitlements.ts
│   ├── ai/
│   │   ├── client.ts
│   │   ├── call.ts
│   │   ├── cost.ts
│   │   ├── cache.ts
│   │   └── prompts/
│   │       └── [feature]/
│   │           └── v1.ts
│   ├── email/
│   │   ├── resend.ts
│   │   ├── brevo.ts
│   │   ├── send.ts
│   │   └── templates/
│   ├── storage/
│   │   ├── supabase.ts
│   │   ├── r2.ts
│   │   ├── upload.ts
│   │   └── delete.ts
│   ├── utils/
│   │   └── [utility functions]
│   └── types/
│       └── [shared TypeScript types]
│
├── styles/
│   ├── tokens.css          (brand tokens)
│   └── globals.css         (imports tokens.css)
│
├── public/
│   ├── brand/
│   │   ├── logo.svg
│   │   ├── wordmark.svg
│   │   ├── favicon.ico
│   │   └── og-image.png
│   └── content/            (MDX-referenced images)
│
├── content/                (MDX content, if applicable)
│   ├── blog/
│   └── pages/
│
├── supabase/
│   ├── migrations/
│   └── seed.sql            (optional)
│
├── briefs/                 (feature briefs for Claude Code)
│   └── [feature-name].md
│
└── issues/                 (bug reports + resolutions)
    └── [date-description].md
```

## Variations for brochure sites (Type B)

Remove `(app)`, `(admin)` directories. Keep marketing structure.

## Variations for content sites (Type C)

Heavy `content/` directory. Add RSS, sitemap generation.

## Variations for Sanity-driven projects

Add `sanity/` directory with schemas and config. `/studio` route mounts Sanity Studio.

## File naming conventions

- Component files: `PascalCase.tsx` (e.g., `Button.tsx`, `HeroSection.tsx`)
- Utility files: `camelCase.ts` (e.g., `formatDate.ts`)
- Route files: lowercase `page.tsx`, `layout.tsx`, `route.ts` (Next.js convention)
- Test files: `[Component].test.tsx` or `__tests__/[Component].test.tsx`
- Type files: `[domain].types.ts` (e.g., `user.types.ts`)

---

<a id="section-28"></a>
# 28. Living Document: Updates and Decisions

This section records decisions made and changes to this document over time. Append new entries at the top.

## How to update this document

When you make a non-obvious decision during a project, document it here. Format:

```
## [Date] — [Brief title]

**Context**: What situation prompted the decision.

**Decision**: What was decided.

**Why**: The reasoning.

**Affects**: Which projects or sections this applies to.

**Sections updated**: Which sections of this document were modified.
```

## Initial document (May 2026)

Version 1.0 of this document was drafted as the foundational architecture for the studio operating system. It reflects:

- The portfolio of eight audited projects (NeurōTone, Harmonia, Memento AI, Soul Tiger, Let's Agree, Luminary Arts, Time Tamer, Passport)
- Plus Somnific Studios (Madelyn's project)
- Plus LivingBrush (Scott + Madelyn's established bodypainting brand)
- Plus future client work

The document is opinionated, comprehensive, and intended to govern every project the studio builds.

## Pending decisions (revisit after first 2-3 projects)

1. **Shared component package extraction** — after building 2–3 projects, extract the common page composition components into a shared npm package. Until then, copy-paste between projects is fine.

2. **Shared admin shell** — after 2–3 admin dashboards, extract the common patterns into a shared package.

3. **Cross-project SSO** — only build when users actually ask for it.

4. **The studio portfolio site** — Scott's umbrella site introducing all brands. Build after 2–3 brand sites are live.

5. **Monorepo vs. polyrepo** — currently each project is its own repo. After 2–3 projects, evaluate whether a monorepo (Turborepo, Nx) would help. Don't move early.

6. **Component primitives review** — after using shadcn across 2–3 projects, evaluate whether any custom primitives should be created or if shadcn fully serves needs.

---

# End of Portfolio Architecture Document v1.0

This document is the foundation. Project-specific instructions (CLAUDE.md files for each project) build on top of it and reference it by section number.

**Next steps after reading this document:**
1. Confirm the document covers everything you expected. Note any gaps.
2. Choose the first project (recommended sequence: Somnific Studios → LivingBrush → NeurōTone → Harmonia).
3. Create the first project's repo with the start-of-project checklist (Section 1).
4. Draft the first project's CLAUDE.md (Scott + Claude, in a focused session).
5. Begin building.

This document evolves with the studio. Update it when patterns change. Treat it as the source of truth for "how we do things here."

*— End of document —*
