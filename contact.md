---
layout: page
title: Contact Us
permalink: /contact/
---

<div class="contact-hero">
  <h1>Get In Touch</h1>
  <p class="lead">Ready to join our community? Have questions? We'd love to hear from you!</p>
</div>

<div class="contact-section">
  <div class="contact-info">
    <h2>📍 Visit Us</h2>
    <p><strong>3003 East Michigan Ave #1137<br>Lansing, MI 48912</strong></p>
    <div class="info-card">
      <h3>Lansing Tech Studio</h3>
      <p><strong>Email:</strong> <a href="mailto:contact@lansingtechstudio.org">contact@lansingtechstudio.org</a></p>
    </div>
    
    <div class="hours-card">
      <h3>📅 Hours</h3>
      <div class="hours-grid">
        <div class="day-hours">
          <strong>Thursdays</strong><br>
          <span>6:30 -8:30 PM</span><br>
          <small>(Main Program Days)</small>
        </div>
        <div class="day-hours">
          <strong>Mentoring</strong><br>
          <span>{{ site.data.facts.mentoring.schedule }}</span><br>
          <small>(Career Mentoring)</small>
        </div>
        <div class="day-hours">
          <strong>Sunday</strong><br>
          <span>By Appointment</span><br>
          <small>(Special Events)</small>
        </div>
      </div>
    </div>
  </div>
  
  <div class="contact-form" id="contact-form">
    <h2>💬 Send Us a Message</h2>
    <form class="contact-form-container" action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value="{{ site.web3forms_access_key }}">
      <input type="hidden" name="subject" value="New message from the Lansing Tech Studio website">
      <input type="hidden" name="from_name" value="Lansing Tech Studio Contact Form">
      <input type="hidden" name="redirect" value="https://lansingtechstudio.org/thanks/">
      <!-- Honeypot: hidden from humans, bots that fill it are rejected by Web3Forms -->
      <input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" style="display: none;">

      <div class="form-group">
        <label for="name">Name *</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone">
      </div>
      
      <div class="form-group">
        <label for="inquiry-type">What can we help you with? *</label>
        <select id="inquiry-type" name="inquiry_type" required>
          <option value="">Please select...</option>
          <option value="student-registration">Student Registration</option>
          <option value="volunteer">Volunteer Opportunities</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="workshop">Workshop Information</option>
          <option value="mentoring">Career Mentoring</option>
          <option value="outreach">Community Outreach</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="student-age">Student Age (if applicable)</label>
        <select id="student-age" name="student_age">
          <option value="">Not applicable</option>
          <option value="8-10">8-10 years old</option>
          <option value="11-13">11-13 years old</option>
          <option value="14-16">14-16 years old</option>
          <option value="17-18">17-18 years old</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="5" required placeholder="Tell us more about your interest in Lansing Tech Studio..."></textarea>
      </div>
      
      <div class="form-group checkbox-group">
        <input type="checkbox" id="newsletter" name="newsletter" value="yes">
        <label for="newsletter">I'd like to receive updates about programs and events</label>
      </div>

      <!-- hCaptcha via Web3Forms' shared key (data-captcha="true") — no separate hCaptcha account needed -->
      <div class="form-group">
        <div class="h-captcha" data-captcha="true"></div>
      </div>

      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
    <script src="https://web3forms.com/client/script/hcaptcha/v1.js" async defer></script>
  </div>
</div>

## Quick Links

<div class="quick-links-section">
  <div class="quick-links-grid">
    <div class="quick-link-card" id="registration">
      <h3>🎓 Student Registration</h3>
      <p>Ready to join a team or workshop? Registration is open for our current programs.</p>
      <div class="quick-actions">
        <a href="#contact-form" class="btn btn-primary">Contact Us to Register</a>
        <a href="/workshops/" class="btn btn-primary">Workshop Calendar</a>
      </div>
      <div class="registration-info">
        <h4>Registration Deadlines:</h4>
        <ul>
          <li><strong>FLL Teams:</strong> {{ site.data.facts.fll.registration_deadline }} (for following season)</li>
          <li><strong>Workshops:</strong> 48 hours before session</li>
          <li><strong>Mentoring:</strong> Rolling admissions</li>
        </ul>
      </div>
    </div>
    
    <div class="quick-link-card" id="volunteer">
      <h3>🤝 Volunteer Opportunities</h3>
      <p>Share your skills and passion with our students. We have roles for all backgrounds.</p>
      <div class="volunteer-roles">
        <h4>Current Needs:</h4>
        <ul>
          <li>Technical mentors (programming, engineering)</li>
          <li>Workshop assistants</li>
          <li>Event coordinators</li>
          <li>Transportation volunteers</li>
          <li>Administrative support</li>
        </ul>
      </div>
      <a href="#contact-form" class="btn btn-primary">Apply to Volunteer</a>
    </div>
    
    <div class="quick-link-card" id="sponsorship">
      <h3>💼 Partnership Opportunities</h3>
      <p>Support STEM education in our community through sponsorship and partnerships.</p>
      <div class="partnership-options">
        <div class="partnership-option">
          <strong>Financial Sponsorship</strong><br>
          <span>{{ site.data.facts.sponsorship.range }} annual support</span>
        </div>
        <div class="partnership-option">
          <strong>In-Kind Donations</strong><br>
          <span>Equipment, services, expertise</span>
        </div>
        <div class="partnership-option">
          <strong>Internship Partners</strong><br>
          <span>Career opportunities for students</span>
        </div>
      </div>
      <a href="/sponsors" class="btn btn-primary">Learn About Sponsorship</a>
    </div>
    
    <div class="quick-link-card" id="donation">
      <h3>💝 Make a Donation</h3>
      <p>Every contribution helps us provide opportunities for more students in our community.</p>
      <div class="donation-quick">
        <p class="donation-impact">
          <small>$50 sponsors workshop materials for one student for a full year</small>
        </p>
      </div>
      <a href="{{ site.donate_url }}" target="_blank" rel="noopener" class="btn btn-primary">Donate Now</a>
    </div>
  </div>
</div>

## Social Media & Updates

<div class="social-section">
  <h2>🌐 Follow Our Journey</h2>
  <p>Stay connected with our community and see what our teams are up to!</p>
  
  <div class="social-links">
    {% include social-link-card.html platform='facebook' url=site.facebook_url description='Daily updates, photos, and event announcements' %}

    {% include social-link-card.html platform='youtube' url=site.youtube_url description='Robot demonstrations, student projects, and competition highlights' %}
    
    {% capture github_url %}https://github.com/{{ site.github_username }}{% endcapture %}
    {% include social-link-card.html platform='github' url=github_url description='Open source projects and coding resources' %}
  </div>
</div>

## Frequently Asked Questions

<div class="faq-section">
  <h2>❓ Common Questions</h2>
  <div class="faq-grid">
    <div class="faq-item">
      <h3>What ages do you serve?</h3>
      <p>Our main FLL Challenge program is for ages {{ site.data.facts.fll.ages }}. We also offer workshops for ages 10+ and career mentoring for high school students (14-18).</p>
    </div>
    
    <div class="faq-item">
      <h3>Do students need prior experience?</h3>
      <p>No experience necessary! We welcome complete beginners and provide all the training needed. Our mentors work with students at all skill levels.</p>
    </div>
    
    <div class="faq-item">
      <h3>What does participation cost?</h3>
      <p>FLL teams are {{ site.data.facts.fll.cost }} per season (scholarships available). Workshops are currently free and recordings can be found on our YouTube. Career mentoring is free. We never want cost to be a barrier.</p>
    </div>
    
    <div class="faq-item">
      <h3>When do programs meet?</h3>
      <p>FLL teams meet {{ site.data.facts.fll.meeting }} during competition season (Aug-Feb). Workshops are scheduled throughout the year. Mentoring is by appointment.</p>
    </div>
    
    <div class="faq-item">
      <h3>Where are you located?</h3>
      <p>We meet at our rented facilities in Lansing. We also host some workshops at partner locations like libraries and community centers.</p>
    </div>
    
    <div class="faq-item">
      <h3>How can parents get involved?</h3>
      <p>Parents can volunteer as mentors, help with events, provide transportation, or assist with fundraising. We also have a parent communication group for updates.</p>
    </div>
  </div>
</div>

## Emergency Information

<div class="emergency-section">
  <h2>🚨 Emergency Contacts</h2>
  <div class="emergency-info">
    <div class="emergency-contact">
      <strong>Director of Operations:</strong><br>
      Chelsea Thiede
    </div>
  </div>
  
  <p class="emergency-note">
    <small>For medical emergencies, always call 911 first, then notify us. 
    </small>
  </p>
</div>

<div class="contact-cta">
  <h2>Ready to Get Started?</h2>
  <p>Join our community of young innovators, dedicated mentors, and supportive families. 
  Together, we're building the future through technology, teamwork, and service.</p>
  <div class="cta-buttons">
    <a href="#contact-form" class="btn btn-primary">Send a Message</a>
    <a href="/programs" class="btn btn-primary">Explore Programs</a>
  </div>
</div>

