---
layout: page
title: Learning Resources
permalink: /resources/
---

<div class="resources-hero">
  <h1>Learning Resources</h1>
  <p class="lead">Tools, guides, and information to support your learning journey.</p>
</div>

{%- comment -%}
  Cards are generated from the _resources collection (see _config.yml). Adding a
  file to _resources/ adds a card here, an entry in the header dropdown, and a
  stop in the prev/next sequence. The id on each card keeps legacy
  /resources#calendar style links landing correctly.
{%- endcomment -%}
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

{% include registration-cta.html %}

<div class="resources-cta">
  <h2>Need More Information?</h2>
  <p>Have questions about our programs, resources, or how to get involved? We're here to help!</p>
  <div class="cta-buttons">
    <a href="/contact" class="btn btn-primary">Contact Us</a>
    <a href="/about" class="btn btn-primary">Learn More About Us</a>
  </div>
</div>
