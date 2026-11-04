# Prompt: turn PPL Study Hub into a commercial web product

Status: **not approved, not started.** Monetisation is shelved in CLAUDE.md until the notes are
finished. This file is the prompt to give Claude when Harry decides to go ahead. Run it one phase
at a time.

## Before running it (Harry to do or decide)
- Content IP: confirm the `caa*.js` questions are original (the CAA's real exam questions are
  confidential), and check how much of CAP 413 and other CAA documents is quoted (CAA copyright).
- Business: sole trader or Ltd, ICO data protection fee, domain name, business email.
- Age policy: 18+ (or parent buys) vs allowing under-18s (ICO Children's Code applies).
- Price, trial or not, refund policy.
- Accounts: Stripe, Supabase (London region), hosting (Cloudflare Pages or Vercel Pro, since
  Vercel's free Hobby plan bans commercial use), email provider.
- A UK solicitor reviews the legal pages before taking money.
- Make the repo private: today all content ships in the public `docs/index.html`.

---

```text
You are working on the PPL Study Hub repository (see CLAUDE.md). It is a UK CAA PPL(A) revision
app, currently a single static page served by GitHub Pages, with all progress in browser
localStorage. Turn it into a professional, commercial UK web product. Follow CLAUDE.md
(British English, tablet-first layouts at ~430 px / ~800 px / desktop, generous spacing,
no real aircraft brands, aviation accuracy). Work ONLY on a feature branch — never push to main
until I approve. Work in the phases below and STOP after each phase with a short summary,
a list of decisions you need from me, and how to test it. Ask before assuming anything
about business details; use clearly marked placeholders ({{BUSINESS_NAME}}, {{COMPANY_NO}},
{{REGISTERED_ADDRESS}}, {{ICO_REG_NO}}, {{SUPPORT_EMAIL}}, {{PRICE_MONTHLY}}, {{PRICE_ANNUAL}}).

## Current state you must preserve
- src/hub.html + src/*.js are built by src/build.py into docs/index.html (never hand-edit docs/).
- Progress lives in localStorage key 'ppl-hub-v1' as object S with sections:
  cards, quiz, miss, blurt, cloze, steps, days, newd, cal, custom, plan, pq, mock, calc, ms,
  sec, radio, lab. Other keys: ppl-fs (flight settings), ppl-kb (kneeboard), ppl-voice,
  ppl-voice-kb, ppl-hub-theme. IndexedDB 'ppl-tts' caches voice models. Backup/restore
  exports all of these as JSON.
- On-device TTS (Piper/Kokoro) and ASR (Moonshine) load from public CDNs; keep that working.
- The app must keep working offline as an installed PWA on an Android tablet.
- Existing Playwright tests in tests/ must keep passing (adapt them to log in a test user).

## Target stack (justify any deviation before making it)
- Next.js (App Router, TypeScript, strict mode) for the marketing site, auth pages,
  account area and server routes. Host on Cloudflare Pages or Vercel Pro (commercial use).
- Supabase (Postgres + Auth), project in the London region (eu-west-2). Row Level Security
  enabled on EVERY table, deny by default.
- Stripe Checkout + Stripe Billing + Customer Portal for subscriptions; Stripe Tax or
  VAT-inclusive pricing. No card data ever touches our servers.
- Transactional email via a UK/EU-hosted provider (e.g. Postmark/Resend) for verification,
  password reset, receipts and renewal reminders.
- Repo becomes private. Study content is NOT shipped in any public file.

## Phase 0 — Plan and audit (no code)
1. Write docs/PLAN.md: architecture diagram, data flow, threat model (STRIDE-lite),
   a data inventory (each personal data field, purpose, lawful basis, retention, processor).
2. Audit content for IP risk: flag anything that looks copied from CAA exam material or
   CAA publications beyond fair quotation, and list third-party licences (Piper VCTK voice
   and VCTK dataset CC BY 4.0, Kokoro, Moonshine, transformers.js, YAIXM CC0, Natural Earth)
   with commercial-use status and attribution required.
3. List every decision I must make (age policy 18+ vs under-18 with Children's Code,
   pricing, trial or not, refund policy, sole trader vs Ltd).

## Phase 1 — Website homepage and legal pages
- Public pages: Home (what it is, the 9 subjects: Air Law, Communications, Human Performance,
  Meteorology, Navigation, Operational Procedures, Principles of Flight, Aircraft General
  Knowledge, Flight Performance & Planning), Features, Pricing (VAT-inclusive totals, no drip
  pricing), FAQ, Contact, About.
- Prominent disclaimer: independent study aid, not affiliated with or endorsed by the UK CAA,
  not a substitute for an approved training organisation or instructor; no CAA logos.
- Legal pages, each marked "DRAFT — requires review by a UK solicitor": Terms and Conditions
  (governing law England and Wales; licence to use; acceptable use; subscription term,
  renewal, price changes with notice; cancellation and 14-day cooling-off under the Consumer
  Contracts Regulations 2013 including express consent + acknowledgement for immediate
  digital content supply; Consumer Rights Act 2015 remedies; liability limits that do not
  exclude what UK law forbids excluding; aviation-safety disclaimer; account termination;
  complaints), Privacy Policy (UK GDPR / DPA 2018 Art. 13 content, controller details, ICO
  registration, lawful bases, processors and international transfers with IDTA/UK Addendum
  where relevant, retention, all data subject rights, right to complain to the ICO),
  Cookie Policy, Accessibility Statement, Licences/Attributions page.
- Cookie banner compliant with PECR: strictly necessary only by default, analytics off until
  opt-in, reject as easy as accept, consent recorded and withdrawable. Prefer cookieless,
  privacy-friendly analytics.
- WCAG 2.2 AA, light/dark themes consistent with the existing design tokens and logo.

## Phase 2 — Accounts and authentication
- Register (email + password, email verification required), login, logout, magic link
  option, forgot/reset password, optional TOTP 2FA, change email/password, sessions list.
- NCSC password guidance: min 12 chars, check against breached-password list, no forced
  complexity rules; rate limiting and lockout/backoff on auth endpoints; generic error messages
  (no account enumeration); CAPTCHA (e.g. Turnstile) on sign-up only if abuse appears.
- Sign-up captures only: email, display name (optional), date-of-birth confirmation or
  age tick per my age decision, Terms acceptance (versioned, timestamped), marketing consent
  as a separate unticked opt-in.
- Secure cookies: HttpOnly, Secure, SameSite=Lax; CSRF protection on state-changing routes.

## Phase 3 — Products, subscriptions and entitlements
- Data model supports multiple products later; today one product "PPL(A) Complete — all
  9 subjects" with monthly and annual prices (placeholders).
- Flow: pricing → login/register → pre-contract summary (price incl. VAT, renewal date,
  how to cancel, cooling-off wording + express-consent checkbox) → Stripe Checkout →
  success page. Customer Portal for cancel, change plan, update card, invoices.
- Stripe webhooks (checkout.session.completed, customer.subscription.created/updated/deleted,
  invoice.paid, invoice.payment_failed) are the ONLY source of truth for entitlements.
  Verify signatures, process idempotently (store event IDs), handle out-of-order events.
- Design to the DMCC Act 2024 subscription regime even if not fully in force: clear
  pre-contract information, renewal reminder emails before each renewal (and before a trial
  converts), cancellation online in as few steps as sign-up, end-of-term access after cancel.
- Grace period for failed payments; access ends cleanly at period end.

## Phase 4 — Gate the app and its content
- /app requires a valid session AND an active entitlement, checked server-side.
- Split build.py output: a thin app shell plus content bundles (data.js, radio.js, caa*.js,
  labs*.js) served only from an authenticated route handler with short-lived, private
  cache headers. Nothing gated may sit in a public folder or the service worker's public scope.
- Offline: after login, the service worker may cache content for that user, with the
  entitlement cached locally with an expiry (e.g. 7 days offline grace), re-checked when online.
  Clear cached content on logout.
- Retire GitHub Pages: the root/docs redirect points to the new domain.

## Phase 5 — Progress tracking in the database
- Postgres schema (migrations in supabase/migrations, reviewed SQL, no ad-hoc changes):
  users/profiles, products, prices, subscriptions, entitlements, consents (type, version,
  granted_at, withdrawn_at), terms_acceptances, and progress tables designed from S:
  card_state (srs fields per card), quiz_attempts and question_stats, mock_exams +
  mock_answers, section/step completion, radio_attempts, lab_results, study_days,
  user_settings (jsonb for fs/voice/theme/plan/pq), kneeboard notes if kept server-side.
  UUID PKs, created_at/updated_at, foreign keys with ON DELETE CASCADE from user, sensible
  indexes, CHECK constraints, no PII in progress tables beyond user_id.
- RLS: users can select/insert/update only rows where user_id = auth.uid(); webhook/admin
  writes via server-side service role only. Write pgTAP or SQL tests proving another
  user's rows are inaccessible.
- Sync: offline-first. Local IndexedDB store plus an outbox of changes with client-generated
  IDs; idempotent batched upserts to a /api/progress/sync endpoint; conflict rules per type
  (last-write-wins by updated_at for state, additive merge for counters/attempts). Show a
  small "synced / offline" indicator. Replace direct localStorage use behind one storage
  module so the existing app code changes minimally.
- Migration: on first login, offer to import existing 'ppl-hub-v1' (+ other ppl-* keys)
  and existing backup JSON files; validate with a schema before import.
- Progress page reads from the database (accurate across devices).
- Keep "Save backup file" as the user's data export.

## Phase 6 — Privacy rights, security and operations
- Account area: download my data (JSON, all tables), delete my account (cancels Stripe
  subscription, deletes or anonymises data per retention policy; keep invoices only as
  legally required — 6 years for tax), manage marketing and cookie consent.
- Secrets: all keys in environment variables / the host's secret store, never in client
  code or git. Only the Supabase anon key and Stripe publishable key may reach the browser.
  Service role key, Stripe secret key and webhook secret are server-only. Provide
  .env.example with names only; add .env* to .gitignore; add gitleaks (pre-commit + CI)
  and enable GitHub secret scanning; fail the build if a server secret is referenced in
  client bundles.
- Security headers: strict CSP (allowing only the CDNs the voice/ASR engines need, Stripe
  and Supabase), HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
  (microphone=self for ASR), frame-ancestors none.
- Input validation on every API route (zod), output encoding, rate limiting, structured
  logging without PII or tokens, error monitoring with PII scrubbing (EU region).
- Dependency audit in CI, lockfile committed, Dependabot.
- Database: daily backups / point-in-time recovery, documented restore test.
- Write docs/SECURITY.md (incident and breach procedure: assess, contain, report to the ICO
  within 72 hours where required, notify users), docs/ROPA.md (record of processing),
  docs/RETENTION.md, and a DPIA-lite if under-18s are allowed.

## Phase 7 — Testing and launch checklist
- Playwright end-to-end: register → verify → subscribe (Stripe test mode) → open every subject
  and lab → progress syncs across two browser contexts → offline then online → cancel →
  access ends at period end → data export → account deletion.
- Unit tests for webhook handling, sync merge rules and RLS.
- Run existing tests (t_smoke, t_grade, t_mock, t_backup, t_scan) against the gated app.
- Accessibility check (axe) on all public and account pages; layout checks at 430/800/desktop.
- Launch checklist: ICO fee paid, solicitor reviewed legal pages, Stripe live mode, domain +
  email (SPF/DKIM/DMARC), DPAs accepted with each processor, licences/attributions published.

## Rules throughout
- Don't put secrets, real keys or my personal data in code, commits, logs or tests.
- Don't fake test results: where a third-party service can't be reached from the sandbox,
  mock it, say so, and give me the manual test steps.
- Update CLAUDE.md to describe the new layout, build and deploy process at the end.
- Small, reviewable commits with clear messages, all on the feature branch.
```
