# Website Improvements — Design Spec

**Date:** 2026-07-11
**Status:** Approved by Brendon (with changes, incorporated below)
**Repo:** Lansing-Tech-Studio.github.io (Jekyll, GitHub Pages; pushing `main` deploys to lansingtechstudio.org)

## Purpose

Fix consistency, duplication, and flow problems found in the 2026-07-11 site audit, and add Disqus comments to blog posts. This spec is the agreed *what*; the companion implementation plan is the *how*.

## Hard constraints (decided by Brendon — do not relitigate)

1. **`/workshops/*` is a separate repository**, also served via GitHub Pages under the same domain. Links to `/workshops/` and `/workshops/demo-day/` are **not broken** and must be **left exactly as they are** — including the `demo-day.md` / `demoday.md` redirect stubs and the commented-out Workshops nav item. Do not create a workshops page in this repo. Do not "fix" these links.
2. **No registration links anywhere.** All registration/signup CTAs must route visitors to the contact page ("contact us for details"), not to external forms or placeholder URLs.
3. **Founded in 2021** (the "since 2020" claim in `about.md` is wrong).
4. **5 active FLL teams** is the number the site claims (keep the homepage stat; do not lower it to match older blog posts, which describe their moment in time).
5. **Disqus** is the comment system (Brendon's choice; free tier shows ads in the comment area — accepted).
6. Consolidation appetite is **"consolidate"**: merging overlapping pages and centralizing facts is in scope; a full IA/visual redesign is not.

## Part 1 — Single sources of truth for repeated facts

Create `_data/facts.yml` holding every fact that appears on more than one page, and replace hard-coded occurrences with Liquid references. Facts and their agreed values:

| Fact | Value | Currently contradicted at |
|---|---|---|
| Founded | 2021 | `about.md:9` ("since 2020") vs `about.md:116` |
| Active FLL teams | 5 | `index.md` (5) vs posts (2–3; leave posts as historical) |
| Students served | 50+ | index, about — consistent, centralize anyway |
| Workshop hours | 100+ | index, about |
| Community events/projects | 25+ | index, about, outreach |
| FLL age range | 9–14 | index, about, programs, contact |
| FLL cost | $200/student | programs, contact |
| FLL meeting time | Thursdays 6:30–8:30 PM | resources, contact |
| Mentoring schedule | By appointment | `contact.md:30–33` says "Wednesdays 6–8 PM" — wrong; programs/resources say by appointment |
| Sponsorship range | $100 – $2,500+ (tiers) | `contact.md:158` says "$500 – $5,000+" — wrong |

**Mission statement:** one canonical version already exists at `_config.yml` `mission_statement` (rendered in the index hero and footer). The *second, different* mission paragraph in `index.md` "Our Mission" (~line 92) must be replaced so the homepage no longer shows two mission statements: render `{{ site.mission_statement }}` there and keep any remaining prose as supporting copy, not an alternative mission.

**Season dates** (Regionals/States): `programs.md` says December; `resources.md` says Jan 11 / Feb 8. The real dates are **unconfirmed** (see Appendix A). Centralize the season timeline into one `_data/season.yml` consumed by both pages, seeded with the `resources.md` version, clearly marked in the data file with a comment that dates need confirmation. FLL registration opening (July vs Aug 15) is handled the same way.

## Part 2 — One mechanism per action

**Donations (mostly done already):** every donate button correctly uses `{{ site.donate_url }}` (Zeffy). One fix: the contact page's $25/$50/$100/Other amount buttons call a `donate(amount)` JS function that ignores the amount and just opens Zeffy. Remove the fake amount buttons and the JS function; keep a single "Donate via Zeffy" button (Zeffy's own form handles amount selection).

**Contact:** the Web3Forms form on `/contact/` is the standard mechanism. Changes:
- "Apply to Volunteer" (`contact.md:148`, currently `mailto:`) → link to the contact form; add a "Volunteering" option to the form's inquiry-type select if not present.
- Newsletter signup (`contact.md:204`, a `mailto:` with no backing mechanism, while other pages promise a "weekly newsletter") → remove the newsletter card and any "weekly newsletter" promises site-wide until a real mechanism exists.
- Plain informational `mailto:contact@lansingtechstudio.org` links (footer, contact page header, sponsors) are fine — they state the email address, they aren't a workflow.

**Registrations:** per hard constraint #2, all of these become links to the contact form (anchor `/contact#contact-form` or the relevant quick-link anchor), with the form's inquiry-type select covering: Student Registration, Volunteering, Sponsorship, Donation, General. Specifically:
- `contact.md:122` "Register for FLL" `href="#"` (dead) → contact form.
- `programs.md` "Register Now" buttons → keep pointing at `/contact#registration` (already correct pattern).
- Camp Google Form CTA goes away with the camps page (Part 3).
- Wording on registration cards changes from "register here" to "contact us for details / to register."

## Part 3 — Page consolidation and flow

- **`featured.md` → merge into `programs.md`** Special Events section (HackerFest, Volunteer Appreciation Picnic; note the picnic's "July" has no year — mark for content refresh). `/featured/` becomes a `redirect_to: /programs/` stub (jekyll-redirect-from is already installed). Remove Featured from the nav dropdown in `default.html`.
- **`camps.md` (PyBricks camp, June 22–26 2026 — past) → retire.** `/camps/` becomes a redirect stub to `/programs/` (summer-programs section). Remove the Camps nav item and the homepage "Featured: Robotics Camp" badge/CTA. Preserve the camp description by folding a short "Summer Programs" recap into `programs.md` if not already covered.
- **`_config.yml` cleanup:**
  - `url:` → `https://lansingtechstudio.org` (currently the github.io URL, so jekyll-seo-tag and the sitemap emit wrong canonical URLs; `CNAME` is already `lansingtechstudio.org`).
  - Delete `header_pages` (the nav is hard-coded in `default.html`; this config is dead and misleading).
  - Delete the unused `team_bios` and `blog_posts` collections (dead scaffolding; bios are hard-coded in about.md, posts use standard `_posts`).
  - Add `docs/` to `exclude:` so this spec and the plan don't get published to the live site.
- **Purge fictional placeholder content that reads as real:**
  - `_posts/2025-01-10…` and `_posts/2025-01-15…` thank fake sponsors (Tech Innovations Inc., Lansing Community Bank, Tony's Pizza) and quote fake people — remove these passages entirely; do not invent replacements.
  - `_posts/2025-01-10…` author "Coach Sarah" is fictional → change author to "Lansing Tech Studio" (or Brendon supplies the real author, Appendix A).
  - `_posts/2025-01-10…` Team Python's description mismatches its title (copy-paste artifact) — fix the description to match the stated project.
  - Delete the commented-out fake-sponsor block in `sponsors.md` (~lines 96–156) from source.
  - `outreach.md` generic park names ("River Trail Park," etc.) — flag in Appendix A; do not invent real names.
- **`CLAUDE.md` / `.github/copilot-instructions.md` updates:** document that `/workshops/*` is a separate repo (so future agents stop flagging those links as broken), and remove the now-deleted collections note. Keep the two files in sync per existing convention.

## Part 4 — Disqus comments on blog posts

- Add `disqus_shortname: ""` to `_config.yml` with a comment pointing to disqus.com registration. Value supplied by Brendon (Appendix A); empty string until then.
- In `_layouts/post.html`, after the post footer, embed the standard Disqus `embed.js` snippet, rendered **only when** `jekyll.environment == "production"` **and** `site.disqus_shortname != ""` **and** `page.comments != false`. Set `this.page.url` from `site.url` + `page.url` and `this.page.identifier` from `page.id` so threads survive URL changes.
- Per-post opt-out: `comments: false` in front matter.
- Style the container minimally with existing spacing conventions in `assets/css/style.scss` (design tokens at `:root`).

## Part 5 — Verification

- `bundle exec jekyll build` succeeds (there is no test suite; the build is the gate).
- A one-off internal-link check over `_site/` (script or htmlproofer) confirming no internal 404s, **excluding** `/workshops/*` (external repo) and `site.donate_url`/Web3Forms (external).
- Manual smoke pass with the dev server: nav dropdowns match pages, redirects for `/featured/` and `/camps/` work, contact form still posts to Web3Forms, Disqus block absent in development builds.
- Note for the executing agent: pushing to `main` deploys immediately — do all work on a branch and let Brendon merge.

## Out of scope

- Anything under `/workshops/` (separate repo).
- Full IA/visual redesign; nav dropdown regrouping beyond removing merged pages.
- Newsletter infrastructure.
- Refreshing stale season content with *new* facts (the structure gets fixed; real dates/photos/descriptions come from Brendon per `TODO.md`'s NEEDED list).
- The `resources.md` dress-code wording (flagged for Brendon's review in Appendix A; not changed by an agent).

## Appendix A — Facts needed from Brendon (blockers only where noted)

| Item | Needed for | Blocking? |
|---|---|---|
| Disqus shortname (register site at disqus.com) | Part 4 activation | No — ship gated on empty value |
| Real Regionals/States dates for current season | `_data/season.yml` accuracy | No — seed with resources.md values, marked unconfirmed |
| FLL registration opening date (July vs Aug 15) | `_data/facts.yml` | No — pick contact.md's "July 31" and mark unconfirmed |
| Real author of the 2025-01-10 regionals post | Part 3 purge | No — default to "Lansing Tech Studio" |
| Real park names for outreach cleanups (or approval to genericize) | Part 3 | No — leave as-is, flagged |
| Review of dress-code wording in `resources.md` code of conduct | Out-of-scope flag | No — informational |
