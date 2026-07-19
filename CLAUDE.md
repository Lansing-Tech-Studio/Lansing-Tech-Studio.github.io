# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Jekyll static site for **Lansing Tech Studio** (youth STEM nonprofit — FIRST LEGO League, coding bootcamps, community service). Hosted on GitHub Pages at `lansing-tech-studio.github.io` with custom domain via `CNAME`.

## Commands

```bash
bundle install                         # install gems (Ruby 3.4.8, see .ruby-version)
bundle exec jekyll serve --livereload  # dev server at http://localhost:4000
bundle exec jekyll build               # production build → _site/
```

Deployment is automatic: pushing to `main` triggers GitHub Pages to rebuild and deploy. The `DEPLOYMENT.md` references a `.github/workflows/jekyll.yml` action, but it does not exist in the repo — GitHub Pages' built-in Jekyll builder handles the deploy. There is no test suite or linter configured.

## Architecture

Standard Jekyll layout, with a few non-obvious points worth knowing before editing:

- **Single global stylesheet**: `assets/css/style.scss` (~2000 lines) with SCSS front matter (`---\n---`) so Jekyll compiles it. All design tokens live as CSS custom properties on `:root` at the top of the file — change colors there, not inline. Brand palette: `--primary-color: #00A6FB` (blue), `--secondary-color: #FF6B35` (orange), `--accent-color: #92e6b2` (green).

- **Layout chain**: `_layouts/default.html` is the shell (header nav, footer, all client-side JS for the mobile menu, dropdown a11y/keyboard handling, smooth-scroll). `page.html` and `post.html` both extend `default.html`. Programs is now a plain nav link (not a dropdown); the remaining dropdowns are Learn (Resources, Blog) and Get Involved (Outreach, Sponsors), hard-coded in `default.html`. `_config.yml` no longer has a `header_pages` setting.

- **Programs page**: has a separate sub-navigation script at `assets/js/programs-nav.js`, loaded globally from `default.html`. If you touch the programs page structure, check this script for ID/selector coupling.

- **Social icons** are an SVG sprite system: definitions in `_data/social_icons.yml` → rendered into a single hidden `<svg>` sprite via `_includes/social-icons.svg` (included once in `default.html`'s footer) → referenced by `<use href="#icon-name">` from `_includes/social-icon.html`. Add new icons by extending `social_icons.yml` (provide `name`, `base_url`, `svg` path data) — do not inline SVGs in templates.

- **`/workshops/` is a separate repository**, also served via GitHub Pages under the same domain. Links to `/workshops/` and `/workshops/demo-day/` from this repo are valid cross-repo links — never "fix" or remove them, and leave the `demo-day.md`/`demoday.md` redirect stubs alone.

- **Shared facts** live in `_data/facts.yml` (stats, ages, costs, schedules) and `_data/season.yml` (competition dates). Any fact appearing on more than one page must be referenced from there via `{{ site.data.facts.* }}` — never hard-coded inline.

- **Pages** are top-level markdown files (`about.md`, `programs.md`, etc.) using `layout: page` and explicit `permalink:` values.

## Content conventions

- **Blog posts** (`_posts/`): filename `YYYY-MM-DD-slug.md`. Front matter: `layout: post`, `title`, `date` (with timezone, e.g. `2025-01-15 10:00:00 -0500`), `author`, `categories`, `tags`, `excerpt`. Common categories: `announcements`, `competition`, `teams`, `welcome`. `comments: false` in a post's front matter disables Disqus on that post; Disqus otherwise activates only when `disqus_shortname` is set in `_config.yml` and `JEKYLL_ENV=production`.

- **Pages**: `layout: page`, `title`, `permalink: /slug/` (trailing slash). The `nav-link active` state in `default.html` matches against `page.url contains '/slug'`, so permalinks must align.

- **Buttons / cards**: reuse existing classes (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-small`, `.container`, `.program-card`, `.value-card`, `.bio-card`) rather than introducing new ones.

- **Registration/signup CTAs** always link to the contact page or `#contact-form` — never to external registration URLs.

- **Audience / tone**: youth (FLL ages 9–14, workshops 10+, mentoring 14–18), parents, and sponsors. Welcoming and enthusiastic about STEM.

- **Style**: 2-space indentation in HTML/Liquid and SCSS; ATX-style markdown headers.

## Reference docs in repo

- `SiteLayout.md` — planned IA / sitemap (excluded from build via `_config.yml`).
- `TODO.md` — work-in-progress notes (untracked).
