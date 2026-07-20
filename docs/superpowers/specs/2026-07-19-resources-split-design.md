# Split Resources into a Landing Page and Sub-Pages

**Date:** 2026-07-19
**Status:** Approved, ready for implementation planning

## Problem

`resources.md` is a single 328-line page holding five unrelated topics: coding
links, equipment inventory, season and meeting calendars, the team code of
conduct, and parent information. It is reached from one plain nav link. Programs
had the same problem and was solved by splitting into a `_programs` collection
with a card-grid landing page and a nav dropdown; Resources should follow that
pattern.

A second problem surfaced while scoping: roughly fourteen of the classes the
Resources markup uses (`.resource-card`, `.resource-grid`, `.resource-section`,
`.equipment-card`, `.equipment-grid`, `.schedule-card`, `.schedule-grid`,
`.conduct-card`, `.conduct-section`, `.parent-section`, `.parent-info-grid`,
`.blog-preview*`, `.resources-cta`, `.meeting-time`) have zero definitions in
`assets/css/style.scss`. Those cards render as bare stacked divs today. The
split is the natural moment to remap them onto classes that already work.

## Goals

- One `/resources/` landing page whose cards link to five topic sub-pages.
- A Resources nav dropdown, generated from the collection, matching Programs.
- No new CSS: moved markup reuses existing styled classes.
- Existing inbound links keep working.

## Non-goals

- Rewriting or re-authoring the resource copy. Content moves as-is apart from
  class renames and the one deletion noted below.
- Any change to program content or program page appearance. The layout
  refactor in section 3 must be behavior-preserving for Programs.
- New styling beyond reusing existing classes.

## Design

### 1. Collection scaffolding

Add to `_config.yml`, alongside the existing `programs` entries:

```yaml
collections:
  resources:
    output: true
    permalink: /resources/:name/

defaults:
  - scope:
      path: ""
      type: "resources"
    values:
      layout: "resource"
```

Create `_resources/` with five files. Front matter mirrors `_programs/`:
`title`, `order`, `icon`, `card_title`, `summary`, `lead`.

| File | URL | order | icon | title |
| --- | --- | --- | --- | --- |
| `learning-links.md` | `/resources/learning-links/` | 1 | 💻 | Learning Links |
| `equipment.md` | `/resources/equipment/` | 2 | 🏗️ | Equipment & Facilities |
| `calendar.md` | `/resources/calendar/` | 3 | 🗓️ | Calendar & Schedules |
| `code-of-conduct.md` | `/resources/code-of-conduct/` | 4 | 🤝 | Team Code of Conduct |
| `for-parents.md` | `/resources/for-parents/` | 5 | 👪 | For Parents |

Liquid does not render inside front matter, so any shared fact
(`site.data.facts.*`, `site.data.season.*`) stays in the page body — same
constraint that already applies to `_programs/*.md`.

### 2. Content mapping

Source line ranges refer to `resources.md` as of commit `f4aa6d5`.

| Source | Destination |
| --- | --- |
| L14–68 (Coding Resources: Python, Web Development, Robotics & LEGO) | `learning-links.md` |
| L70–103 (Practice Tables & Equipment) | `equipment.md` |
| L105–197 (Season Schedule, Regular Meeting Schedule) | `calendar.md` |
| L199–215 (Blog & Updates) | **deleted** |
| L217–261 (Team Code of Conduct) | `code-of-conduct.md` |
| L263–319 (Registration Information, Team Information for Parents) | `for-parents.md` |
| L7–10 (hero), L321–328 (Need More Information CTA) | stays in `resources.md` |

The `## For Students`, `## For Team Members`, and `## For Parents` audience
headings disappear; each sub-page's `title` carries that role. The Markdown
`###` headings inside each moved block (for example `### Coding Resources`)
promote to `##`. The `<h3>` elements inside the HTML card wrappers (for example
`<h3>🐍 Python Learning</h3>`) keep their level.

**Blog & Updates is deleted, not moved.** It duplicated the About ▸ Blog nav
item, and the landing page CTA already routes visitors onward.

### 3. Shared layout machinery

`_layouts/program.html` and a new `_layouts/resource.html` would be ~95%
identical, so the shared part is extracted first.

New `_includes/collection-nav.html`, parameterized by `include.collection` and
`include.label`, containing the prev/next block currently inlined in
`program.html` (lines 15–48): the `sort: "order"` assignment, the index scan
that finds the current page, the previous/next links, and the "← All {label}"
link. Jekyll only populates `page.previous`/`page.next` for posts, which is why
this logic exists; the include keeps one copy of it.

Both layouts become thin:

```
_layouts/program.html
  .programs-hero (title + lead) → {{ content }}
  → {% include registration-cta.html %}
  → {% include collection-nav.html collection="programs" label="Programs" %}

_layouts/resource.html
  .resources-hero (title + lead) → {{ content }}
  → {% include collection-nav.html collection="resources" label="Resources" %}
```

The back-link URL inside the include derives from the collection name
(`/{{ include.collection }}/`), so no extra parameter is needed.

`_layouts/default.html` lines 49–51 currently hardcode the collection name:

```liquid
{% if item.collection == "programs" %}
{% assign children = site.programs | sort: "order" %}
{% endif %}
```

Generalize to:

```liquid
{% if item.collection %}
{% assign children = site[item.collection] | sort: "order" %}
{% endif %}
```

No other template change is needed — the dropdown markup, "All {title}" entry,
active-state matching, and keyboard/a11y JavaScript are already
collection-agnostic.

### 4. Landing page

`resources.md` reduces to hero + generated card grid + CTAs:

```liquid
{% assign resources = site.resources | sort: "order" %}
<div class="programs-grid">
  {% for resource in resources %}
    <div class="program-card" id="{{ resource.slug }}">
      <div class="program-icon">{{ resource.icon }}</div>
      <h3>{{ resource.card_title | default: resource.title }}</h3>
      <p>{{ resource.summary }}</p>
      <a href="{{ resource.url | relative_url }}" class="btn btn-outline">Learn More</a>
    </div>
  {% endfor %}
</div>
```

Five cards, so no `programs-grid--four` modifier; `auto-fit` handles the wrap.
The existing "Need More Information?" block and `registration-cta.html` follow
the grid.

### 5. CTA placement

`registration-cta.html` appears on the `/resources/` landing page and on
`for-parents.md` only. It is a program-signup prompt and reads as noise under
Learning Links, Equipment, Calendar, or Code of Conduct. Because it is not
universal across the collection, `resource.html` does not include it; the
`for-parents.md` body includes it directly.

### 6. Link compatibility

- `_includes/registration-cta.html` line 8: `/resources#calendar` →
  `/resources/calendar/`.
- Legacy `/resources#calendar` links still resolve, because the landing card
  carries `id="calendar"` from `resource.slug`.
- `_data/season.yml` header comments reference `resources.md`; update them to
  `_resources/calendar.md`.
- `_layouts/default.html` line 131 (footer "Resources" link to `/resources`)
  needs no change.

### 7. Style remap

Applied as content moves. No additions to `style.scss`.

| Current class | Replacement | Note |
| --- | --- | --- |
| `.resource-grid` | `.programs-grid` | styled, `auto-fit minmax(280px, 1fr)` |
| `.resource-card` | `.card` | styled at style.scss:426 |
| `.equipment-grid` | `.programs-grid` | |
| `.equipment-card` | `.info-card` | styled at style.scss:963 |
| `.schedule-grid` | `.programs-grid` | |
| `.schedule-card` | `.info-card` | |
| `.conduct-section` | `.programs-grid` | |
| `.conduct-card` | `.info-card` | |
| `.parent-info-grid` | `.programs-grid` | children already `.info-card` |
| `.resource-section` | removed | wrapper collapses to `<h3>` + grid |
| `.equipment-section` | removed | same |
| `.parent-section` | `.info-card` | |
| `.calendar-section` | removed | `.season-timeline` wrapper is enough |
| `.meeting-time` | removed | plain `<strong>` inside `.info-card` |
| `.season-timeline`, `.timeline`, `.timeline-item`, `.cta-buttons`, `.info-card`, `.resources-hero` | kept | already styled |

`.blog-preview*` and `.resources-cta` classes disappear with the deleted Blog
section; `.resources-cta` remains on the landing page's final block since it is
untouched by this change (it is unstyled today and stays that way — fixing it is
out of scope).

## Verification

1. `bundle exec jekyll build` completes without errors or warnings.
2. All six URLs render: `/resources/` plus the five sub-pages.
3. Nav dropdown shows "All Resources" + five children; the active state
   highlights Resources on every sub-page.
4. Prev/next chains cleanly 1 → 5, with no Previous on Learning Links and no
   Next on For Parents.
5. Programs pages are unchanged after the `collection-nav.html` extraction —
   compare `_site/programs/*/index.html` before and after.
6. `/resources#calendar` scrolls to the Calendar card on the landing page.
7. No remaining references to the removed classes: grep `resource-card`,
   `equipment-card`, `schedule-card`, `conduct-card`, `blog-preview`.

## Follow-up (out of scope)

- `CLAUDE.md` describes Resources as "a plain link to `/resources/`" and does
  not document the `collection:` nav key. Update it after implementation.
- `.resources-cta` on the landing page remains unstyled.
