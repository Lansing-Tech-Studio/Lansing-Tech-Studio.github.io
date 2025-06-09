---
layout: page
title: Blog
permalink: /blog/
---

<div class="blog-header">
  <h1>Latest Updates</h1>
  <p class="lead">Stay up to date with our teams, programs, and community activities.</p>
</div>

<div class="blog-posts">
  {% for post in site.posts %}
    <article class="blog-post-preview">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <div class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%B %d, %Y" }}
        </time>
        {% if post.author %}
          <span class="post-author">by {{ post.author }}</span>
        {% endif %}
      </div>
      <div class="post-excerpt">
        {{ post.excerpt }}
      </div>
      <a href="{{ post.url | relative_url }}" class="read-more">Read More →</a>
    </article>
  {% endfor %}
</div>

{% if site.posts.size == 0 %}
  <div class="no-posts">
    <h2>Coming Soon!</h2>
    <p>We're working on our first blog posts. Check back soon for updates from our teams and programs.</p>
  </div>
{% endif %}
