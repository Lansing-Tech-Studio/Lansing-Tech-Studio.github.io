# Website Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize repeated facts, make every donate/contact/signup CTA use one consistent mechanism, consolidate overlapping pages, purge fictional placeholder content, and add Disqus comments to blog posts.

**Architecture:** Jekyll static site (GitHub Pages). Repeated facts move into `_data/facts.yml` and `_data/season.yml` and are rendered via Liquid so they can never drift between pages again. Overlapping pages (`featured.md`, `camps.md`) collapse into `programs.md` with `jekyll-redirect-from` stubs preserving old URLs. Disqus is embedded in `_layouts/post.html`, gated so it never loads in development or before a shortname is configured.

**Tech Stack:** Jekyll (Ruby 3.4.8, `bundle exec jekyll build`), kramdown, jekyll-redirect-from (already in plugins), Web3Forms (existing contact form), Zeffy (existing `site.donate_url`), Disqus.

**Spec:** `docs/superpowers/specs/2026-07-11-website-improvements-design.md` — read it first. Its "Hard constraints" section is binding.

## Global Constraints

- **Never touch links to `/workshops/` or `/workshops/demo-day/`** — that path is a SEPARATE repository served under the same domain via GitHub Pages. These links are not broken. Also leave `demo-day.md`, `demoday.md`, and the commented-out Workshops nav entry in place (the nav comment may be relocated but must survive).
- **No registration links.** All signup CTAs route to the contact page/form ("contact us for details"). Never add an external registration URL or a placeholder `href="#"`.
- **Canonical facts:** founded **2021**; **5** active FLL teams; ages 9–14; $200/student; Thursdays 6:30–8:30 PM; mentoring by appointment; sponsorship tiers $100–$2,500+.
- **Do not push to `main`** — pushing main deploys the live site immediately. Work on the existing `plan/website-improvements` branch (or a branch off it); Brendon merges.
- Reuse existing CSS classes (`.btn`, `.btn-primary`, `.btn-outline`, `.program-card`, `.event-card`, `.timeline-item`, etc.); design tokens live at `:root` in `assets/css/style.scss` — never inline colors.
- Historical blog posts describe their moment in time — do not "correct" old team counts or dates in posts; only remove *fictional* content (Task 9 lists exactly what).
- There is no test suite. The verification cycle for every task is: `bundle exec jekyll build` (must exit 0) plus the task's specific `grep` checks against `_site/`. Run them before every commit.

---

### Task 1: `_config.yml` cleanup (canonical URL, dead config, docs exclusion)

**Files:**
- Modify: `_config.yml`

**Interfaces:**
- Produces: correct `site.url` used by jekyll-seo-tag/sitemap; `docs/` excluded from build (later tasks write plan/spec files there).

- [ ] **Step 1: Edit `_config.yml`**

Change the `url` line (currently `url: "https://lansing-tech-studio.github.io"`):

```yaml
url: "https://lansingtechstudio.org"
```

Delete this entire block (the nav is hard-coded in `_layouts/default.html`; this config is dead):

```yaml
# Navigation
header_pages:
  - about.md
  - programs.md
  - outreach.md
  - resources.md
  - sponsors.md
  - contact.md
```

Delete this entire block (dead scaffolding — bios are hard-coded in `about.md`, posts use standard `_posts`):

```yaml
# Collections
collections:
  team_bios:
    output: true
    permalink: /:collection/:name/
  blog_posts:
    output: true
    permalink: /blog/:year/:month/:day/:title/
```

In the `exclude:` list, add two entries after `- SiteLayout.md`:

```yaml
  - TODO.md
  - docs/
```

- [ ] **Step 2: Build and verify**

```bash
bundle exec jekyll build
grep -m1 -o 'https://lansingtechstudio.org[^<"]*' _site/sitemap.xml
ls _site/docs _site/TODO.html 2>&1 | head -2
```

Expected: build succeeds; the grep prints a `https://lansingtechstudio.org/...` URL; the `ls` reports "No such file or directory" for both.

- [ ] **Step 3: Commit**

```bash
git add _config.yml
git commit -m "fix: correct canonical URL, remove dead config, exclude docs from build"
```

---

### Task 2: Fact data files + homepage single mission and stats

**Files:**
- Create: `_data/facts.yml`
- Create: `_data/season.yml`
- Modify: `index.md:89-116` (mission section)

**Interfaces:**
- Produces (used verbatim by Tasks 3–6): `site.data.facts.founded`, `site.data.facts.stats.students`, `site.data.facts.stats.teams`, `site.data.facts.stats.workshop_hours`, `site.data.facts.stats.community_events`, `site.data.facts.fll.ages`, `site.data.facts.fll.cost`, `site.data.facts.fll.meeting`, `site.data.facts.fll.registration_deadline`, `site.data.facts.mentoring.schedule`, `site.data.facts.sponsorship.range`, `site.data.season.name`, `site.data.season.regional_date`, `site.data.season.state_date`.

- [ ] **Step 1: Create `_data/facts.yml`**

```yaml
# Single source of truth for facts that appear on more than one page.
# Change values HERE, never inline in pages. Rendered via
# {{ site.data.facts.<section>.<key> }}.
founded: 2021
stats:
  students: "50+"
  teams: "5"
  workshop_hours: "100+"
  community_events: "25+"
fll:
  ages: "9-14"
  cost: "$200 per student"
  meeting: "Thursdays 6:30 - 8:30 PM"
  # UNCONFIRMED (see TODO.md): contact page said July 31, resources said Aug 15.
  registration_deadline: "July 31"
mentoring:
  schedule: "By Appointment"
sponsorship:
  range: "$100 - $2,500+"
```

- [ ] **Step 2: Create `_data/season.yml`**

```yaml
# Competition dates shared by programs.md and resources.md.
# UNCONFIRMED (see TODO.md 2026-07-01 audit): programs.md previously claimed
# December for both events; resources.md said Jan 11 / Feb 8. Using the
# resources.md values until Brendon confirms the real dates.
name: "2025-2026"
regional_date: "January 11"
state_date: "February 8"
```

- [ ] **Step 3: Fix the homepage's second mission statement and centralize stats**

In `index.md`, replace the mission section (lines 89–116, from `<section class="mission-section">` through its closing `</section>`) with:

```html
<section class="mission-section">
  <div class="container">
    <div class="mission-content">
      <h2>Our Mission</h2>
      <p class="mission-text">
        {{ site.mission_statement }}
      </p>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">{{ site.data.facts.stats.students }}</div>
          <div class="stat-label">Students Served</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ site.data.facts.stats.teams }}</div>
          <div class="stat-label">Active Teams</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ site.data.facts.stats.workshop_hours }}</div>
          <div class="stat-label">Workshop Hours</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ site.data.facts.stats.community_events }}</div>
          <div class="stat-label">Community Events</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Notes: this deletes the competing "we believe in the power of technology to transform lives" mission paragraph AND the off-brand inline style `style="color: #f8acacff;"` on the `<h2>` (colors belong in `:root` tokens, never inline).

- [ ] **Step 4: Build and verify**

```bash
bundle exec jekyll build
grep -c "we believe in the power of technology to transform" _site/index.html
grep -c "igniting their passion" _site/index.html
grep -c "f8acac" _site/index.html
```

Expected: build succeeds; counts are `0`, `3` (hero + mission section + footer), `0`. (grep -c exits 1 when the count is 0 — that is the expected outcome for the 0-count checks, not a failure.)

- [ ] **Step 5: Commit**

```bash
git add _data/facts.yml _data/season.yml index.md
git commit -m "feat: centralize site facts in _data; single mission statement on homepage"
```

---

### Task 3: `about.md` — founding year and stats from facts

**Files:**
- Modify: `about.md:9`, `about.md:116`, `about.md:122-125`

**Interfaces:**
- Consumes: `site.data.facts.founded`, `site.data.facts.stats.*` from Task 2.

- [ ] **Step 1: Edit `about.md`**

Line 9 — replace:

```html
  <p class="lead">Empowering youth through technology, robotics, and community engagement since 2020.</p>
```

with:

```html
  <p class="lead">Empowering youth through technology, robotics, and community engagement since {{ site.data.facts.founded }}.</p>
```

Line 116 — replace `Founded in 2021, Lansing Tech Studio began` with `Founded in {{ site.data.facts.founded }}, Lansing Tech Studio began` (rest of sentence unchanged).

Lines 123–125 — replace the first three impact bullets:

```markdown
- Supported over 50 students in competitive robotics
- Conducted 100+ hours of workshops and training
- Participated in 25+ community service projects
```

with:

```markdown
- Supported {{ site.data.facts.stats.students }} students in competitive robotics
- Conducted {{ site.data.facts.stats.workshop_hours }} hours of workshops and training
- Participated in {{ site.data.facts.stats.community_events }} community service projects
```

- [ ] **Step 2: Build and verify**

```bash
bundle exec jekyll build
grep -c "since 2020" _site/about/index.html
grep -c "since 2021" _site/about/index.html
grep -c "Founded in 2021" _site/about/index.html
```

Expected: `0`, `1`, `1`.

- [ ] **Step 3: Commit**

```bash
git add about.md
git commit -m "fix: consistent founding year (2021) and centralized stats on About"
```

---

### Task 4: `contact.md` — honest donate button, one contact mechanism, fixed facts

**Files:**
- Modify: `contact.md` (six edits below)

**Interfaces:**
- Consumes: `site.data.facts.mentoring.schedule`, `site.data.facts.sponsorship.range`, `site.data.facts.fll.registration_deadline`, `site.data.facts.fll.ages`, `site.data.facts.fll.cost`, `site.data.facts.fll.meeting` from Task 2.

- [ ] **Step 1: Fix the mentoring hours card (lines 29–33)**

Replace:

```html
        <div class="day-hours">
          <strong>Wednesday Evenings</strong><br>
          <span>6:00 PM - 8:00 PM</span><br>
          <small>(Mentoring)</small>
        </div>
```

with:

```html
        <div class="day-hours">
          <strong>Mentoring</strong><br>
          <span>{{ site.data.facts.mentoring.schedule }}</span><br>
          <small>(Career Mentoring)</small>
        </div>
```

- [ ] **Step 2: Fix the dead "Register for FLL" button and centralize the deadline (lines 122, 128)**

Line 122 — replace `<a href="#" class="btn btn-primary">Register for FLL</a>` with:

```html
        <a href="#contact-form" class="btn btn-primary">Contact Us to Register</a>
```

(Do NOT touch the adjacent Workshop Calendar button pointing at `/workshops/` — separate repo.)

Line 128 — replace `<li><strong>FLL Teams:</strong> July 31st (for following season)</li>` with:

```html
          <li><strong>FLL Teams:</strong> {{ site.data.facts.fll.registration_deadline }} (for following season)</li>
```

- [ ] **Step 3: Volunteer CTA uses the form, not mailto (line 148)**

Replace:

```html
      <a href="mailto:contact@lansingtechstudio.org?subject=Lansing%20Tech%20Studio%20Volunteering" class="btn btn-primary">Apply to Volunteer</a>
```

with:

```html
      <a href="#contact-form" class="btn btn-primary">Apply to Volunteer</a>
```

(The form's inquiry-type select already has a "Volunteer Opportunities" option — no form change needed.)

- [ ] **Step 4: Correct the sponsorship range (line 157)**

Replace `<span>$500 - $5,000+ annual support</span>` with:

```html
          <span>{{ site.data.facts.sponsorship.range }} annual support</span>
```

- [ ] **Step 5: Remove the fake donation-amount buttons and their script**

Delete lines 175–180 (`<div class="donation-amounts">` through its `</div>` — the four `onclick="donate(...)"` buttons), keeping the `donation-impact` paragraph and the real `Donate Now` button. Then delete the entire script block at the bottom of the file (lines 278–282):

```html
<script>
function donate(amount) {
  window.open('{{ site.donate_url }}', '_blank');
}
</script>
```

- [ ] **Step 6: Remove the newsletter card (lines 204–210) — no mechanism exists behind it**

Delete the whole anchor block:

```html
    <a href="mailto:contact@lansingtechstudio.org?subject=Lansing%20Tech%20Studio%20Newsletter" class="social-link email">
      <div class="social-icon">📧</div>
      <div class="social-info">
        <strong>Newsletter</strong>
        <span>Weekly updates delivered to your inbox of current participants</span>
      </div>
    </a>
```

(Keep the form's "I'd like to receive updates" checkbox — it feeds the form submission, which is real.)

- [ ] **Step 7: FAQ facts from `_data` (lines 221, 231, 236)**

Line 221: replace `for ages 9-14.` with `for ages {{ site.data.facts.fll.ages }}.`
Line 231: replace `FLL teams are $200 per student per season (scholarships available).` with `FLL teams are {{ site.data.facts.fll.cost }} per season (scholarships available).`
Line 236: replace `FLL teams meet Thursdays 6:30 - 8:30pm during competition season (Aug-Feb).` with `FLL teams meet {{ site.data.facts.fll.meeting }} during competition season (Aug-Feb).`

- [ ] **Step 8: Build and verify**

```bash
bundle exec jekyll build
grep -c 'donate(' _site/contact/index.html
grep -c 'mailto:contact@lansingtechstudio.org?subject' _site/contact/index.html
grep -c '\$5,000' _site/contact/index.html
grep -c 'href="#"' _site/contact/index.html
grep -c 'Wednesday Evenings' _site/contact/index.html
```

Expected: all `0`. Also confirm the real donate button survived: `grep -c 'zeffy.com' _site/contact/index.html` → `1`.

- [ ] **Step 9: Commit**

```bash
git add contact.md
git commit -m "fix: contact page - honest donate button, form-based CTAs, corrected facts"
```

---

### Task 5: `programs.md` — season dates from data, registration wording

**Files:**
- Modify: `programs.md:60-65`, `programs.md:183-199`

**Interfaces:**
- Consumes: `site.data.season.regional_date`, `site.data.season.state_date`, `site.data.facts.fll.*` from Task 2.

- [ ] **Step 1: Fix the season timeline (lines 60–65)**

Replace:

```html
        <div class="timeline-item">
          <strong>December:</strong> Regional Competition
        </div>
        <div class="timeline-item">
          <strong>December:</strong> State Championship (qualifying teams)
        </div>
```

with:

```html
        <div class="timeline-item">
          <strong>{{ site.data.season.regional_date }}:</strong> Regional Qualifying Tournament
        </div>
        <div class="timeline-item">
          <strong>{{ site.data.season.state_date }}:</strong> State Championship (qualifying teams)
        </div>
```

- [ ] **Step 2: Registration section — facts + contact-us flow (lines 183–199)**

Replace the three requirement blocks:

```markdown
### FLL Challenge Teams
- **Age:** {{ site.data.facts.fll.ages }} years old
- **Commitment:** Weekly 2-hour practices (August-February)
- **Cost:** {{ site.data.facts.fll.cost }} (scholarships available)
- **Registration:** Contact us by {{ site.data.facts.fll.registration_deadline }} for the following season

### Tech Workshops
- **Age:** 10+ (specific age requirements vary by workshop)
- **Schedule:** Spring Series
- **Cost:** Free (visit our YouTube channels to watch the recordings)
- **Registration:** Contact us for the current workshop schedule

### Career Mentoring
- **Age:** High school students (14-18)
- **Application required:** Essay and recommendation letter
- **Cost:** Free
- **Applications:** Accepted year-round
```

(This removes the stale "Registration: January 2026" and hard-coded cost/ages. The `Register Now` button at line 205 already points to `/contact#registration` — leave it.)

- [ ] **Step 3: Build and verify**

```bash
bundle exec jekyll build
grep -c 'December:</strong> Regional' _site/programs/index.html
grep -c 'January 2026' _site/programs/index.html
grep -c 'January 11' _site/programs/index.html
```

Expected: `0`, `0`, `1`.

- [ ] **Step 4: Commit**

```bash
git add programs.md
git commit -m "fix: programs page uses shared season dates and contact-us registration flow"
```

---

### Task 6: `resources.md` — shared season dates, no-stale-status calendar, contact-us registration

**Files:**
- Modify: `resources.md:107-158`, `resources.md:262-302`

**Interfaces:**
- Consumes: `site.data.season.*` from Task 2.

- [ ] **Step 1: Calendar heading and stale status classes (lines 107–158)**

Replace line 107 `### 2025-2026 Season Schedule` with:

```markdown
### {{ site.data.season.name }} Season Schedule

*Dates are from the most recent season — [contact us](/contact#contact-form) to confirm current-season dates.*
```

In the Winter timeline, replace the two competition items (lines 135–140):

```html
      <div class="timeline-item current">
        <strong>January 11:</strong> Regional Qualifying Tournament
      </div>
      <div class="timeline-item upcoming">
        <strong>February 8:</strong> State Championship (qualifying teams)
      </div>
```

with:

```html
      <div class="timeline-item">
        <strong>{{ site.data.season.regional_date }}:</strong> Regional Qualifying Tournament
      </div>
      <div class="timeline-item">
        <strong>{{ site.data.season.state_date }}:</strong> State Championship (qualifying teams)
      </div>
```

Then remove the stale ` completed`, ` current`, and ` upcoming` modifiers from every remaining `timeline-item` class in this section (they hard-code a point in time that is now wrong; the items become plain `<div class="timeline-item">`).

- [ ] **Step 2: Replace the four-step registration walkthrough (lines 266–302)**

The current 4-step flow ("Complete Online Form" → "Pay Program Fees" through "our secure online system") describes infrastructure that doesn't exist and duplicates contact/programs content. Replace the whole `<div class="parent-section">...</div>` block with:

```html
<div class="parent-section">
  <h3>📋 How to Register</h3>
  <p>
    Registration for all programs starts with a conversation. Send us a message and
    we'll walk you through availability, required paperwork, and program fees —
    financial assistance is available upon request.
  </p>
  <a href="/contact#contact-form" class="btn btn-primary">Contact Us to Register</a>
</div>
```

- [ ] **Step 3: Build and verify**

```bash
bundle exec jekyll build
grep -c 'timeline-item current\|timeline-item upcoming\|timeline-item completed' _site/resources/index.html
grep -c 'secure online system' _site/resources/index.html
grep -c 'January 11' _site/resources/index.html
```

Expected: `0`, `0`, `1`.

- [ ] **Step 4: Commit**

```bash
git add resources.md
git commit -m "fix: resources calendar shares season data; registration routes to contact"
```

---

### Task 7: Merge `featured.md` into Programs; redirect `/featured/`

**Files:**
- Modify: `programs.md:158-179` (events grid), `index.md:59-64`, `_layouts/default.html:56,126`
- Rewrite: `featured.md` (becomes redirect stub)

**Interfaces:**
- Consumes: `.event-card` markup pattern from `programs.md`.
- Produces: `/programs/#events` as the canonical events location (Task 8 links to it too).

- [ ] **Step 1: Add the two featured events to the Programs events grid**

In `programs.md`, inside `<div class="events-grid">` (after the Hack-a-thon card, before the Summer Programs card), insert:

```html
  <div class="event-card">
    <h3>🚀 HackerFest</h3>
    <p>A pre-season coding pump-up: one week in early August with an hour each evening of deep dives, collaborative coding, and tougher programming challenges.</p>
  </div>
  <div class="event-card">
    <h3>🥳 Volunteer Appreciation Picnic</h3>
    <p>A summer lakeside picnic to thank the volunteers who make our programs possible.</p>
  </div>
```

(Note: the old featured page said "July at Scenic Lake" with a food list — deliberately generalized here since it had no year and reads stale. HackerFest and the existing Hack-a-thon card *might* be the same event — flagged for Brendon in Appendix B; keep both cards for now.)

- [ ] **Step 2: Turn `featured.md` into a redirect stub**

Replace the ENTIRE file content with:

```markdown
---
permalink: /featured/
redirect_to: /programs/#events
sitemap: false
---
```

- [ ] **Step 3: Remove Featured from nav, footer, and homepage**

- `_layouts/default.html` line 56: delete the `<a ... >Featured</a>` dropdown item.
- `_layouts/default.html` line 126: delete `<li><a href="{{ '/featured' | relative_url }}">Featured</a></li>` from the footer.
- `index.md` lines 59–64: delete the whole "Additional Events" program card (the one linking to `/featured`).

- [ ] **Step 4: Build and verify**

```bash
bundle exec jekyll build
grep -c 'HackerFest' _site/programs/index.html
grep -o 'url=/programs/#events' _site/featured/index.html
grep -rc 'href="/featured"' _site/index.html _site/programs/index.html
```

Expected: `1`; `url=/programs/#events` (the redirect meta); `0` for both files.

- [ ] **Step 5: Commit**

```bash
git add programs.md featured.md index.md _layouts/default.html
git commit -m "feat: merge featured events into Programs; redirect /featured/"
```

---

### Task 8: Retire `camps.md`; simplify Programs nav dropdown

**Files:**
- Rewrite: `camps.md` (becomes redirect stub)
- Modify: `programs.md:174-178`, `index.md:53-58`, `_layouts/default.html:47-58,125`

**Interfaces:**
- Consumes: `/programs/#events` established in Task 7.

- [ ] **Step 1: Fold the camp into the Programs "Summer Programs" event card**

In `programs.md`, replace the Summer Programs card:

```html
  <div class="event-card">
    <h3>☀️ Summer Programs</h3>
    <p>Optional summer camp and workshops for continued learning during the off-season.</p>
    <a href="/camps/" class="btn btn-outline btn-small">Camp Info</a>
  </div>
```

with:

```html
  <div class="event-card">
    <h3>☀️ Summer Programs</h3>
    <p>Optional summer camps and workshops for continued learning during the off-season — most recently our week-long PyBricks Summer Coding Camp, where students bring LEGO® creations to life with Python. Contact us to hear about the next one.</p>
  </div>
```

- [ ] **Step 2: Turn `camps.md` into a redirect stub**

Replace the ENTIRE file content (including the Google Form signup link — the June 2026 camp is over) with:

```markdown
---
permalink: /camps/
redirect_to: /programs/#events
sitemap: false
---
```

- [ ] **Step 3: Replace the homepage camp card (index.md lines 53–58)**

Replace the "Pybricks Summer Camp" program card with:

```html
      <div class="program-card">
        <div class="program-icon">📅</div>
        <h3>Special Events & Camps</h3>
        <p>Build parties, Demo Day, Hack-a-thons, and summer camps throughout the year.</p>
        <a href="/programs#events" class="btn btn-outline">Learn More</a>
      </div>
```

- [ ] **Step 4: Collapse the now-single-item Programs dropdown to a plain nav link**

In `_layouts/default.html`, the Programs dropdown (lines 47–58) now contains only "Programs" (plus the commented Workshops line). Replace the whole `<div class="nav-dropdown ...">...</div>` block with:

```html
            <a href="{{ '/programs' | relative_url }}" class="nav-link {% if page.url contains '/programs' %}active{% endif %}">Programs</a>
            <!-- Workshops lives in a separate repo served at /workshops/ - restore a nav link here if wanted:
            <a href="{{ '/workshops' | relative_url }}" class="nav-link">Workshops</a> -->
```

Also delete the footer line 125 `<li><a href="{{ '/camps' | relative_url }}">Camps</a></li>`.

- [ ] **Step 5: Build and verify**

```bash
bundle exec jekyll build
grep -o 'url=/programs/#events' _site/camps/index.html
grep -rc 'href="/camps' _site/index.html _site/programs/index.html _site/about/index.html
grep -c 'class="nav-dropdown' _site/index.html
grep -c 'docs.google.com/forms' _site/camps/index.html
```

Expected: redirect meta present; `0` camp links on all three pages; `2` remaining dropdowns (Learn, Get Involved — note: match on `class="nav-dropdown`, not bare `nav-dropdown`, because the inline nav JS also contains that string); `0` Google Form references.

- [ ] **Step 6: Commit**

```bash
git add camps.md programs.md index.md _layouts/default.html
git commit -m "feat: retire past-dated camps page; redirect /camps/; simplify Programs nav"
```

---

### Task 9: Purge fictional placeholder content (sponsors + two 2025 posts)

**Files:**
- Modify: `sponsors.md:96-156,365-369`, `_posts/2025-01-10-preparing-for-regionals.md`, `_posts/2025-01-15-welcome-to-lansing-tech-studio.md`

Remove ONLY what is listed — everything else in these posts stays (historical accuracy is fine; fiction is not). Never invent replacement sponsors, people, or quotes.

- [ ] **Step 1: `sponsors.md` — delete dead weight and false promise**

- Delete the entire commented-out "Current Sponsors" block, lines 96–156 (`<!-- ## Current Sponsors` through `</div> -->`) — it is fictional (Tech Innovations Inc., "Sarah Chen, CEO", Tony's Pizza, etc.).
- Replace the Newsletter recognition item (lines 365–369):

```html
    <div class="recognition-item">
      <h3>📧 Newsletter</h3>
      <p>Weekly newsletter recognition sent to active participants each session including 
      parents, educators, and community leaders.</p>
    </div>
```

with (season email updates to families are real per resources.md; a weekly newsletter is not):

```html
    <div class="recognition-item">
      <h3>📧 Email Updates</h3>
      <p>Sponsor recognition in the program email updates sent to participating
      families throughout each season.</p>
    </div>
```

- [ ] **Step 2: `_posts/2025-01-10-preparing-for-regionals.md`**

- Front matter: `author: "Coach Sarah"` → `author: "Lansing Tech Studio"` ("Coach Sarah" is fictional; real author unknown — see Appendix B).
- Team Python section: the prose describes a fishing-net/bycatch project under a "Lifeguard Support" heading (copy-paste artifact). Replace the paragraph at line 45:

```markdown
The Ocean Explorers have tackled the problem of bycatch in commercial fishing with their smart net design that can selectively release non-target species. Their solution combines engineering creativity with environmental awareness.
```

with:

```markdown
Team Python has tackled water safety with their lifesaving drone concept — a rapid-response drone that can reach a struggling swimmer and deliver flotation support faster than a lifeguard can swim. Their solution combines engineering creativity with real-world impact.
```

- Delete the achievements bullet `- Consulted with local fishermen and marine biologists` (line 49) and the entire Jordan quote line (line 52, the `**Quote from Team Member Jordan (age 12):** "We learned that sometimes the best solutions are simple ones. Our net design..."` line) — both belong to the phantom net project.
- Replace the Special Thanks list (lines 118–122):

```markdown
### Special Thanks
- **Tech Innovations Inc.** for funding our registration fees
- **Lansing Community Bank** for supporting transportation costs
- **Tony's Pizza** for providing team dinner during final prep week
- **All the families** who have volunteered countless hours
```

with:

```markdown
### Special Thanks
- **All the families** who have volunteered countless hours
```

- [ ] **Step 3: `_posts/2025-01-15-welcome-to-lansing-tech-studio.md`**

- Delete the entire `## Success Stories` section (lines 75–81: heading, intro line, and both alumni quotes — "Sarah M." and "Marcus L." are fictional).
- Replace the supporters section (lines 83–90):

```markdown
## Thank You to Our Supporters

None of this would be possible without our amazing sponsors and community partners:

- **Tech Innovations Inc.** - Our platinum sponsor providing major funding and mentorship
- **Lansing Community Bank** - Supporting our equipment purchases
- **Midwest Engineering Solutions** - Offering professional development for our mentors
- **Local businesses** - Providing supplies, services, and encouragement
```

with:

```markdown
## Thank You to Our Supporters

None of this would be possible without our sponsors, community partners, and the
local businesses that provide supplies, services, and encouragement.
```

(Keep the "New Partnerships" section — Eaton Rapids Family Fare and RMC are real partners.)
- Delete the bullet `- **Subscribe to our newsletter** for monthly program updates` (line 97) — no newsletter mechanism exists.

- [ ] **Step 4: Build and verify**

```bash
bundle exec jekyll build
grep -rc "Tech Innovations\|Lansing Community Bank\|Tony's Pizza\|Coach Sarah\|Sarah Chen\|Sarah M\.\|Marcus L\." _site/ | grep -v ':0' || echo CLEAN
```

Expected: `CLEAN`.

- [ ] **Step 5: Commit**

```bash
git add sponsors.md _posts/2025-01-10-preparing-for-regionals.md _posts/2025-01-15-welcome-to-lansing-tech-studio.md
git commit -m "fix: remove fictional placeholder sponsors, people, and quotes"
```

---

### Task 10: Disqus comments on blog posts

**Files:**
- Modify: `_config.yml` (add shortname key), `_layouts/post.html` (embed), `assets/css/style.scss` (spacing)

**Interfaces:**
- Produces: `site.disqus_shortname` config key; `comments: false` front-matter opt-out for posts.

- [ ] **Step 1: Add the config key**

In `_config.yml`, under the `web3forms_access_key` comment block, add:

```yaml
# Disqus comments on blog posts. Register the site at https://disqus.com/admin/create/
# and put the shortname here. Empty string = comments disabled site-wide.
disqus_shortname: ""
```

- [ ] **Step 2: Embed Disqus in `_layouts/post.html`**

Insert after the closing `</article>` tag, before `<nav class="post-navigation">`:

```html
    {% if jekyll.environment == "production" and site.disqus_shortname and site.disqus_shortname != "" and page.comments != false %}
    <div class="post-comments">
      <div id="disqus_thread"></div>
      <script>
        var disqus_config = function () {
          this.page.url = '{{ page.url | absolute_url }}';
          this.page.identifier = '{{ page.id }}';
        };
        (function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://{{ site.disqus_shortname }}.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      </script>
      <noscript>Please enable JavaScript to view the comments powered by Disqus.</noscript>
    </div>
    {% endif %}
```

The triple gate matters: `jekyll.environment == "production"` keeps Disqus out of local dev builds (GitHub Pages builds with `JEKYLL_ENV=production`); the shortname checks (both nil-guard and empty-string) keep it off until Brendon configures a real shortname; `page.comments != false` lets any post opt out with `comments: false` front matter. `page.id` as the identifier keeps comment threads attached if a post's URL ever changes.

- [ ] **Step 3: Add container spacing in `assets/css/style.scss`**

Near the existing `.post-navigation` / post styles, add:

```scss
.post-comments {
  margin-top: 3rem;
}
```

- [ ] **Step 4: Verify the gating in all three states**

Note: post pages are NOT under `_site/blog/` — the standard posts permalink puts them at `_site/<categories>/<year>/<month>/<day>/<title>.html` — so grep the whole `_site` tree:

```bash
# Dev build: absent
bundle exec jekyll build
grep -rl 'disqus_thread' _site || echo DEV-CLEAN

# Production + empty shortname: still absent
JEKYLL_ENV=production bundle exec jekyll build
grep -rl 'disqus_thread' _site || echo PROD-EMPTY-CLEAN

# Production + shortname set: present
printf 'disqus_shortname: "lts-test"\n' > /tmp/disqus-test.yml
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,/tmp/disqus-test.yml
grep -rl 'lts-test.disqus.com/embed.js' _site | head -4
rm /tmp/disqus-test.yml
bundle exec jekyll build   # restore normal _site
```

Expected: `DEV-CLEAN`, `PROD-EMPTY-CLEAN`, then all four post HTML paths listed.

- [ ] **Step 5: Commit**

```bash
git add _config.yml _layouts/post.html assets/css/style.scss
git commit -m "feat: Disqus comments on blog posts, gated on production + configured shortname"
```

---

### Task 11: Sync `CLAUDE.md` and `.github/copilot-instructions.md`

**Files:**
- Modify: `CLAUDE.md`, `.github/copilot-instructions.md`

CLAUDE.md's conventions changed in Tasks 1, 7, 8, 10. Read `.github/copilot-instructions.md` first and mirror every change there (existing repo convention: keep the two in sync).

- [ ] **Step 1: Update `CLAUDE.md`**

- In **Architecture**: replace the Collections bullet (the one saying `team_bios` and `blog_posts` collections are declared but unbacked) with:

```markdown
- **`/workshops/` is a separate repository**, also served via GitHub Pages under the same domain. Links to `/workshops/` and `/workshops/demo-day/` from this repo are valid cross-repo links — never "fix" or remove them, and leave the `demo-day.md`/`demoday.md` redirect stubs alone.
```

- In the layout-chain bullet, update the nav description: Programs is now a plain nav link (dropdowns remaining: Learn, Get Involved), and `_config.yml` no longer has `header_pages`.
- Add to **Architecture**:

```markdown
- **Shared facts** live in `_data/facts.yml` (stats, ages, costs, schedules) and `_data/season.yml` (competition dates). Any fact appearing on more than one page must be referenced from there via `{{ site.data.facts.* }}` — never hard-coded inline.
```

- Add to **Content conventions** (blog posts bullet): `comments: false` in front matter disables Disqus on a post; Disqus activates only when `disqus_shortname` is set in `_config.yml` and `JEKYLL_ENV=production`.
- Add to **Content conventions**: registration/signup CTAs always link to the contact page or `#contact-form` — never external registration URLs.

- [ ] **Step 2: Mirror the same edits in `.github/copilot-instructions.md`**

Three exact edits:

1. In **Project Overview**, after the existing sentence, add:

```markdown
**`/workshops/` is a separate repository**, also served via GitHub Pages under the same domain — links to `/workshops/` and `/workshops/demo-day/` are valid cross-repo links; never "fix" or remove them.
```

2. In **Architecture → Key Directories**, after the `_data/social_icons.yml` line, add:

```markdown
- `_data/facts.yml` / `_data/season.yml` - Single source of truth for facts used on multiple pages (stats, ages, costs, schedules, competition dates) — reference via `{{ site.data.facts.* }}`, never hard-code
```

3. In **Site Configuration (`_config.yml`)**, replace the line `- `header_pages` - Navigation order` with:

```markdown
- Navigation is hard-coded in `_layouts/default.html` (there is no `header_pages` config)
- `disqus_shortname` - Blog comments (empty string = disabled; posts can opt out with `comments: false`)
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md .github/copilot-instructions.md
git commit -m "docs: update agent instructions - workshops repo, data files, Disqus, CTA rules"
```

---

### Task 12: Full-site verification

**Files:**
- None modified (verification only; fix regressions found, then re-run).

- [ ] **Step 1: Clean production build**

```bash
JEKYLL_ENV=production bundle exec jekyll build 2>&1 | tail -3
```

Expected: `done in X seconds`, no warnings about missing includes/layouts.

- [ ] **Step 2: Internal link check**

Run this script from the repo root — it extracts every root-relative href from the built site and confirms a file exists for it, skipping the external `/workshops/` repo and assets:

```bash
missing=0
for p in $(grep -rhoE 'href="/[^"#?]*' _site --include='*.html' | sed 's/href="//' | sort -u); do
  case "$p" in
    /workshops*|/assets*|/feed.xml|/sitemap*|/robots*|/favicon*|/apple-touch*|/android-chrome*|/site.webmanifest*|/404*) continue;;
  esac
  clean="${p%/}"
  if [ ! -f "_site${clean}/index.html" ] && [ ! -f "_site${p}" ] && [ ! -f "_site${clean}.html" ]; then
    echo "MISSING: $p"; missing=1
  fi
done
[ "$missing" = 0 ] && echo ALL-LINKS-OK
```

(A `for` loop, not `... | while`, on purpose: a piped `while` runs in a subshell and the `missing=1` flag would be lost.)

Expected: `ALL-LINKS-OK`. Any `MISSING:` line is a regression to fix before finishing (unless it's a `/workshops/...` variant that slipped the skip pattern — those are fine).

- [ ] **Step 3: Consistency spot-checks**

```bash
grep -rc 'zeffy.com' _site/*/index.html _site/index.html | grep -v ':0'        # donate = Zeffy only
grep -rn 'href="#"' _site --include='*.html' | grep -v workshops || echo NO-DEAD-BUTTONS
grep -rn 'mailto:.*subject=' _site --include='*.html' || echo NO-WORKFLOW-MAILTOS
grep -c '2020' _site/about/index.html || echo NO-2020
```

Expected: Zeffy links only where donate buttons live (footer appears on every page — that's correct); `NO-DEAD-BUTTONS`; `NO-WORKFLOW-MAILTOS`; `NO-2020`.

- [ ] **Step 4: Manual smoke test**

```bash
bundle exec jekyll serve --livereload
```

Check at http://localhost:4000 — nav shows Home/About/Programs/Learn▾/Get Involved▾/Contact + Register Now; `/featured/` and `/camps/` redirect to `/programs/#events`; homepage shows one mission statement; contact page donate card has a single Zeffy button; blog posts show no Disqus block (dev build). Then stop the server.

- [ ] **Step 5: Final commit if fixes were needed, and hand off**

Do NOT push to `main`. Leave the branch for Brendon to review (`superpowers:finishing-a-development-branch` applies: offer PR from the working branch into `main`).

---

## Appendix A — Config values Brendon supplies later (none block execution)

| Value | Where | Until supplied |
|---|---|---|
| Disqus shortname | `_config.yml` `disqus_shortname` | Comments stay off (empty string) |
| Real Regionals/States dates | `_data/season.yml` | resources.md's Jan 11 / Feb 8, marked unconfirmed in comments |
| FLL registration deadline | `_data/facts.yml` `fll.registration_deadline` | "July 31", marked unconfirmed |

## Appendix B — Flagged for Brendon, intentionally NOT changed by this plan

- Are **HackerFest** and the **Hack-a-thon** the same event? Both now have cards in Programs → Special Events. If yes, merge the two cards.
- Real author of the 2025-01-10 regionals post (defaulted to "Lansing Tech Studio").
- `outreach.md` park names ("River Trail Park", "Community Recreation Center", "Lansing Nature Preserve") read as placeholders — confirm or replace.
- `resources.md` Code of Conduct dress-code line ("no crop tops or tight leggings") — flagged for tone review in the spec; left as-is.
- `outreach.md` stats (500+ volunteer hours, 1000+ lives touched) differ in kind from `_data/facts.yml` stats and were left inline — centralize them too once confirmed real.
