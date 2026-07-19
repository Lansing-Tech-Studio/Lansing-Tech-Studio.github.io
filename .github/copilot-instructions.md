# Copilot Instructions for Lansing Tech Studio Website

## Project Overview

**Jekyll static site** for Lansing Tech Studio, a youth STEM education nonprofit. Hosted on **GitHub Pages** at `lansing-tech-studio.github.io`.

**`/workshops/` is a separate repository**, also served via GitHub Pages under the same domain — links to `/workshops/` and `/workshops/demo-day/` are valid cross-repo links; never "fix" or remove them.

## Architecture

### Key Directories
- `_layouts/` - Page templates (`default.html` wraps all pages, `page.html` for content, `post.html` for blog)
- `_includes/` - Reusable components (social icons: `social-icon.html`, `social-icons.svg`)
- `_posts/` - Blog posts: `YYYY-MM-DD-title-slug.md`
- `_data/social_icons.yml` - SVG icon definitions
- `_data/facts.yml` / `_data/season.yml` - Single source of truth for facts used on multiple pages (stats, ages, costs, schedules, competition dates) — reference via `{{ site.data.facts.* }}`, never hard-code
- `assets/css/style.scss` - Single stylesheet with CSS custom properties
- `assets/images/` - Site images

### Page Front Matter
```yaml
---
layout: page
title: About Us
permalink: /about/
---
```

## Development

```bash
bundle install                         # Install dependencies
bundle exec jekyll serve --livereload  # Dev server at localhost:4000
bundle exec jekyll build               # Production build
```

**Deployment**: Push to `main` → GitHub Pages auto-builds and deploys.

## Content Conventions

### Blog Posts (`_posts/`)
- Filename: `YYYY-MM-DD-title-slug.md`
- Required front matter: `layout: post`, `title`, `date`, `author`, `categories`, `tags`, `excerpt`
- Categories: `announcements`, `competition`, `teams`

### CSS Variables (use these for colors)
```scss
--primary-color: #00A6FB;    /* blue */
--secondary-color: #FF6B35;  /* orange */
--accent-color: #92e6b2;     /* green */
```

### Common Classes
- **Buttons**: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-small`
- **Layout**: `.container` (max-width: 1200px)
- **Cards**: `.program-card`, `.value-card`, `.bio-card`

### Social Icons
```liquid
{% include social-icon.html icon="facebook" username=site.facebook_username label="Facebook" %}
```
Icons defined in `_data/social_icons.yml`.

## Code Style

- **HTML/Liquid**: 2-space indentation
- **SCSS**: 2-space indentation, use CSS variables from `:root`
- **Markdown**: Use ATX-style headers (`##`), blank line before/after code blocks
- **YAML front matter**: Lowercase keys, quoted strings for titles with special characters

## Site Configuration (`_config.yml`)

- Navigation is configured in `_data/navigation.yml` and rendered by `_layouts/default.html` (there is no `header_pages` config)
- `disqus_shortname` - Blog comments (empty string = disabled; posts can opt out with `comments: false`)
- Social usernames: `github_username`, `facebook_username`, `youtube_username`
- `mission_statement` - Reused across pages

## Content Guidelines

- Focus: FIRST LEGO League, coding bootcamps, community service
- Audience: Youth (FLL ages 9-14, workshops 10+, mentoring 14-18), parents, sponsors
- Tone: Welcoming, enthusiastic about STEM
- See `SiteLayout.md` for site structure and planned sections
