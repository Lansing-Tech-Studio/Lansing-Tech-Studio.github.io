---
layout: page
title: 2026 Lansing Tech Expo
permalink: /expo/
---

<div class="generic-hero">
  <h1>2026 Lansing Tech Expo</h1>
  <p class="lead">Apps built by Lansing Tech Studio students. Play them, watch the demo reels, read the code.</p>
</div>

{%- comment -%}
  One-time expo showcase. Deliberately not in _data/navigation.yml and not a
  collection member — it is a single page for a single event. Cards reuse
  .programs-grid / .program-card from the programs and resources landing pages;
  the iframes size themselves with aspect-ratio so no new CSS was needed.
{%- endcomment -%}

<p>These are three of the apps built by Lansing Tech Studio students as part of our <a href="/workshops">2026 Spring workshops</a>. Students worked for twelve weeks, learning software development practices, refining their apps, ultimately presenting them at their Student Demo Day.</p>

<div class="programs-grid">
  <div class="program-card" id="metal-mayhem">
    <h3>Metal Mayhem</h3>
    <p><strong>Joshua W.</strong></p>
    <iframe src="https://www.youtube.com/embed/PU-h3DKLe9w" title="Metal Mayhem demo reel"
      style="width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 0.5rem; margin-bottom: 1.5rem;"
      loading="lazy" allowfullscreen></iframe>
    <div class="cta-buttons" style="margin-top: auto;">
      <a href="https://boatbash-champions.onrender.com/" class="btn btn-primary btn-small">Play It</a>
      <a href="https://github.com/jcagner0928/Botbash-champions" class="btn btn-outline btn-small">View Code</a>
    </div>
  </div>

  <div class="program-card" id="vegetable-land">
    <h3>Vegetable Land</h3>
    <p><strong>Albert H.</strong></p>
    <iframe src="https://www.youtube.com/embed/grBLR6eWLFc" title="Vegetable Land demo reel"
      style="width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 0.5rem; margin-bottom: 1.5rem;"
      loading="lazy" allowfullscreen></iframe>
    <div class="cta-buttons" style="margin-top: auto;">
      <a href="https://www.digestibledevops.com/Vegetable_Land_Godot/" class="btn btn-primary btn-small">Play It</a>
      <a href="https://github.com/P0GO88/Vegetable_Land_Godot" class="btn btn-outline btn-small">View Code</a>
    </div>
  </div>

  <div class="program-card" id="hammerhead-hero">
    <h3>Hammerhead Hero</h3>
    <p><strong>Noah T.</strong></p>
    <iframe src="https://www.youtube.com/embed/o3kwk6C4JA8" title="Hammerhead Hero demo reel"
      style="width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 0.5rem; margin-bottom: 1.5rem;"
      loading="lazy" allowfullscreen></iframe>
    <div class="cta-buttons" style="margin-top: auto;">
      <a href="https://hammerhead-hero-sword-of-the-tides.ai.studio" class="btn btn-primary btn-small">Play It</a>
      <a href="https://github.com/brendon-debug/hammerhead-hero" class="btn btn-outline btn-small">View Code</a>
    </div>
  </div>
</div>
