---
layout: page
title: Programs
permalink: /programs/
---

<div class="programs-hero">
  <h1>Our Programs</h1>
  <p class="lead">Comprehensive STEM education through hands-on learning, competition, and mentorship.</p>
</div>

{%- comment -%}
  Cards are generated from the _programs collection (see _config.yml). Adding a
  file to _programs/ adds a card here and a stop in the prev/next sequence.
  The id on each card keeps legacy /programs#fll style links landing correctly.
  With exactly four programs the grid is pinned to one row of four on desktop,
  since auto-fit would otherwise orphan the fourth card on its own row.
{%- endcomment -%}
{% assign programs = site.programs | sort: "order" %}
<div class="programs-grid{% if programs.size == 4 %} programs-grid--four{% endif %}">
  {% for program in programs %}
    <div class="program-card" id="{{ program.slug }}">
      <div class="program-icon">{{ program.icon }}</div>
      <h3>{{ program.card_title | default: program.title }}</h3>
      <p>{{ program.summary }}</p>
      <a href="{{ program.url | relative_url }}" class="btn btn-outline">Learn More</a>
    </div>
  {% endfor %}
</div>

{% include registration-cta.html %}
