# Data-Driven Nav (Blog under About) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move Blog under an About dropdown, make Learn a plain link to `/resources/`, and drive the whole header menu from `_data/navigation.yml` instead of hard-coded HTML.

**Architecture:** A new `_data/navigation.yml` holds the menu as a list of items (`title` + either `url` or `dropdown` children). `_layouts/default.html` loops over it, emitting the exact same classes/markup as the current hard-coded nav, so no CSS or JS changes are needed. Spec: `docs/superpowers/specs/2026-07-19-nav-restructure-design.md`.

**Tech Stack:** Jekyll (GitHub Pages), Liquid templates, YAML data files.

## Global Constraints

- No test suite exists; verification is `bundle exec jekyll build` plus grepping `_site/` output.
- Generated markup must keep existing classes exactly: `nav-link`, `nav-dropdown`, `dropdown-trigger`, `chevron`, `dropdown-menu`, `dropdown-item`, `role="menu"`, `role="menuitem"`, `aria-expanded="false"`, `aria-haspopup="true"` — the mobile-menu and dropdown-a11y JS in `default.html` select on these.
- Resources page permalink stays `/resources/`. No redirects.
- Registration CTA (`nav-actions` block) stays hard-coded — out of scope.
- Keep `CLAUDE.md` and `.github/copilot-instructions.md` in sync (repo convention).

---

### Task 1: Create `_data/navigation.yml` and render nav from it

**Files:**
- Create: `_data/navigation.yml`
- Modify: `_layouts/default.html:44-71` (the `nav-links` div contents)

**Interfaces:**
- Produces: `site.data.navigation` — list of `{title, url}` or `{title, dropdown: [{title, url}]}` consumed only by `default.html`.

- [ ] **Step 1: Create `_data/navigation.yml`**

```yaml
# Header navigation. Items have a title plus either:
#   url:       plain link
#   dropdown:  list of {title, url} children
# Active-state matching in _layouts/default.html uses "page.url contains url"
# (exact match for "/"), so keep urls aligned with page permalinks
# (trailing slash included).
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
# Workshops lives in a separate repo served at /workshops/ — to restore a
# nav link, add:
# - title: Workshops
#   url: /workshops/
```

- [ ] **Step 2: Replace the hard-coded links in `_layouts/default.html`**

Replace everything inside `<div class="nav-links">` … `</div>` (currently lines 45–70: the six links/dropdowns and the Workshops comment) with:

```liquid
            {% for item in site.data.navigation %}
            {% if item.dropdown %}
            {% assign parent_active = false %}
            {% for child in item.dropdown %}
            {% if page.url contains child.url %}{% assign parent_active = true %}{% endif %}
            {% endfor %}
            <div class="nav-dropdown {% if parent_active %}active{% endif %}">
              <button class="dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                {{ item.title }}
                <span class="chevron" aria-hidden="true"></span>
              </button>
              <div class="dropdown-menu" role="menu">
                {% for child in item.dropdown %}
                <a href="{{ child.url | relative_url }}" class="dropdown-item {% if page.url contains child.url %}active{% endif %}" role="menuitem">{{ child.title }}</a>
                {% endfor %}
              </div>
            </div>
            {% elsif item.url == "/" %}
            <a href="{{ item.url | relative_url }}" class="nav-link {% if page.url == '/' %}active{% endif %}">{{ item.title }}</a>
            {% else %}
            <a href="{{ item.url | relative_url }}" class="nav-link {% if page.url contains item.url %}active{% endif %}">{{ item.title }}</a>
            {% endif %}
            {% endfor %}
```

Do not touch the surrounding `nav-menu`/`nav-actions`/`nav-toggle` markup or any `<script>` blocks.

- [ ] **Step 3: Build and verify the rendered nav**

Run:
```bash
bundle exec jekyll build
grep -o 'dropdown-trigger[^<]*' _site/index.html
grep -c 'class="nav-dropdown' _site/index.html
grep -o '<a href="/resources/" class="nav-link[^"]*">Learn</a>' _site/index.html
grep -o 'class="nav-dropdown[^"]*active[^"]*"' _site/blog/index.html
grep -o 'class="nav-link active"' _site/index.html
```

Expected:
- Build succeeds.
- Two `dropdown-trigger` matches containing `About` and `Get Involved` (in that order); no `Learn` trigger.
- `class="nav-dropdown` count is 2 (one per dropdown; this pattern avoids matching the `.nav-dropdown` selectors in the inline JS).
- The Learn link renders as a plain `nav-link` pointing at `/resources/`.
- On `_site/blog/index.html` the About dropdown has `active`.
- On `_site/index.html` Home has `active`.

- [ ] **Step 4: Commit**

```bash
git add _data/navigation.yml _layouts/default.html
git commit -m "feat: drive header nav from _data/navigation.yml; move Blog under About"
```

---

### Task 2: Retitle resources page to "Learning Resources"

**Files:**
- Modify: `resources.md:3` (front-matter `title`) and `resources.md:8` (hero `<h1>`)

**Interfaces:**
- Consumes: nothing from Task 1 (independent).
- Produces: nothing consumed later.

- [ ] **Step 1: Edit `resources.md`**

Front matter: change `title: Resources` to `title: Learning Resources` (permalink stays `/resources/`).
Hero: change `<h1>Resources</h1>` to `<h1>Learning Resources</h1>`.

- [ ] **Step 2: Build and verify**

Run:
```bash
bundle exec jekyll build
grep -o '<h1>Learning Resources</h1>' _site/resources/index.html
grep -o '<title>[^<]*</title>' _site/resources/index.html
```

Expected: `<h1>Learning Resources</h1>` present; page `<title>` starts with "Learning Resources".

- [ ] **Step 3: Commit**

```bash
git add resources.md
git commit -m "feat: retitle resources page to Learning Resources"
```

---

### Task 3: Update CLAUDE.md and copilot-instructions.md

**Files:**
- Modify: `CLAUDE.md:25` (layout-chain bullet) and `CLAUDE.md:41` (pages bullet)
- Modify: `.github/copilot-instructions.md:73` (navigation bullet)

**Interfaces:**
- Consumes: reflects Task 1's `_data/navigation.yml` structure.
- Produces: nothing.

- [ ] **Step 1: Update `CLAUDE.md`**

In the layout-chain bullet (line 25), replace the sentences
"Programs is now a plain nav link (not a dropdown); the remaining dropdowns are Learn (Resources, Blog) and Get Involved (Outreach, Sponsors), hard-coded in `default.html`. `_config.yml` no longer has a `header_pages` setting."
with:
"The header menu is data-driven: `_data/navigation.yml` defines items (`title` + either `url` or `dropdown` children) and `default.html` renders them. Current dropdowns are About (About Us, Blog) and Get Involved (Outreach, Sponsors); Learn is a plain link to `/resources/`. Edit the menu in the data file, not the template. `_config.yml` has no `header_pages` setting."

In the pages bullet (line 41), replace
"The `nav-link active` state in `default.html` matches against `page.url contains '/slug'`, so permalinks must align."
with:
"The `nav-link active` state in `default.html` matches `page.url contains` the item's `url` from `_data/navigation.yml`, so permalinks and nav urls must align (trailing slash included)."

- [ ] **Step 2: Update `.github/copilot-instructions.md`**

Replace line 73
"- Navigation is hard-coded in `_layouts/default.html` (there is no `header_pages` config)"
with:
"- Navigation is configured in `_data/navigation.yml` and rendered by `_layouts/default.html` (there is no `header_pages` config)"

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md .github/copilot-instructions.md
git commit -m "docs: document data-driven nav in agent instructions"
```
