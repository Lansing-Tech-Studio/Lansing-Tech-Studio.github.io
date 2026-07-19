# Nav Restructure & Data-Driven Menu — Design

**Date:** 2026-07-19
**Status:** Approved

## Goal

1. Move "Blog" under "About" in the header nav.
2. Make the header menu data-driven so future edits happen in one obvious place instead of hard-coded HTML in `_layouts/default.html`.

## Resulting nav

- Home
- About ▾ (About Us, Blog)
- Programs
- Learn — plain link to `/resources/`
- Get Involved ▾ (Outreach, Sponsors)
- Contact

The "Learn" dropdown is removed; its label survives as a plain link straight to the resources page. The resources page keeps its `/resources/` permalink (no redirects, no broken links); its title/headline changes to "Learning Resources".

## Where the config lives

`_data/navigation.yml` (not `_config.yml`). Rationale: the repo already keeps structured config in `_data/` (`facts.yml`, `social_icons.yml`, `season.yml`); it's the Jekyll community convention for nav menus; and `_data` files hot-reload under `jekyll serve --livereload`, whereas `_config.yml` edits require a dev-server restart.

### Schema

```yaml
- title: Home
  url: /
- title: About
  dropdown:
    - title: About Us
      url: /about/
    - title: Blog
      url: /blog/
- title: Programs
  url: /programs/
- title: Learn
  url: /resources/
- title: Get Involved
  dropdown:
    - title: Outreach
      url: /outreach/
    - title: Sponsors
      url: /sponsors/
- title: Contact
  url: /contact/
```

An item has `title` plus either `url` (plain link) or `dropdown` (list of `title`/`url` children). The commented-out Workshops link in `default.html` becomes a YAML comment here (Workshops lives in a separate repo served at `/workshops/`).

## Template changes (`_layouts/default.html`)

Replace the hard-coded nav links (currently lines 45–70) with a Liquid loop over `site.data.navigation`:

- Items with `dropdown` render the existing markup: `nav-dropdown` wrapper, `dropdown-trigger` button (`aria-expanded`, `aria-haspopup`), chevron span, `dropdown-menu` with `role="menu"` and `dropdown-item` children with `role="menuitem"`.
- Items with `url` render a plain `nav-link` anchor.

Because the generated classes and structure are identical to today's, the mobile-menu toggle, dropdown a11y/keyboard JS in `default.html`, and `assets/js/programs-nav.js` need no changes.

### Active-state logic

- Home (`url: /`): exact match `page.url == '/'`.
- Other plain links and dropdown children: `page.url contains item.url` (e.g. `/about/`, `/blog/`).
- A dropdown gets `active` when any of its children match.

This reproduces current behavior, including the existing quirk that individual blog posts (whose URLs are `/:categories/:year/...`, not under `/blog/`) do not highlight the Blog item — only the `/blog/` index does.

Note: dropdown triggers are buttons, not links (existing pattern), so the About page is reached via the "About Us" child item; the "About" label in the bar itself is not clickable.

## Content changes

- `resources.md`: `title` → "Learning Resources" (permalink unchanged at `/resources/`).

## Docs to update

- `CLAUDE.md` — currently states dropdowns are Learn/Get Involved, hard-coded in `default.html`; update to describe `_data/navigation.yml`.
- `.github/copilot-instructions.md` — same correction (kept in sync per repo convention).

## Testing

- `bundle exec jekyll build` succeeds.
- Rendered `_site` pages show the new nav structure; spot-check active classes on `/`, `/about/`, `/blog/`, `/resources/`, `/outreach/`.
- Manual check in dev server: dropdown keyboard/hover behavior and mobile menu still work (JS untouched, markup identical).
