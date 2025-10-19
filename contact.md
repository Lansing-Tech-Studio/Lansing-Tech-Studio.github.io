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
    <div class="info-card">
      <h3>Lansing Tech Studio</h3>
      <p>
        129 Quail Run<br>
        DeWitt, MI 48820
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:contact@lansingtechstudio.org">contact@lansingtechstudio.org</a>
      </p>
    </div>
    
    <div class="hours-card">
      <h3>📅 Hours</h3>
      <div class="hours-grid">
        <div class="day-hours">
          <strong>Saturday</strong><br>
          <span>9:00 AM - 3:00 PM</span><br>
          <small>(Main program days)</small>
        </div>
        <div class="day-hours">
          <strong>Weekday Evenings</strong><br>
          <span>6:00 PM - 8:00 PM</span><br>
          <small>(Workshops & mentoring)</small>
        </div>
        <div class="day-hours">
          <strong>Sunday</strong><br>
          <span>By Appointment</span><br>
          <small>(Special events)</small>
        </div>
      </div>
    </div>
  </div>
  
  <div class="contact-form">
    <h2>💬 Send Us a Message</h2>
    <form class="contact-form-container" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
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
      
      <button type="submit" class="btn btn-primary">Send Message</button>
    </form>
  </div>
</div>

## Quick Links

<div class="quick-links-section">
  <div class="quick-links-grid">
    <div class="quick-link-card" id="registration">
      <h3>🎓 Student Registration</h3>
      <p>Ready to join a team or workshop? Registration is open for our current programs.</p>
      <div class="quick-actions">
        <a href="#" class="btn btn-primary">Register for FLL</a>
        <a href="#" class="btn btn-primary">Workshop Calendar</a>
      </div>
      <div class="registration-info">
        <h4>Registration Deadlines:</h4>
        <ul>
          <li><strong>FLL Teams:</strong> August 31st (for following season)</li>
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
      <a href="mailto:contact@lansingtechstudio.org?subject=Lansing%20Tech%20Studio%20Volunteering" class="btn btn-primary">Apply to Volunteer</a>
    </div>
    
    <div class="quick-link-card" id="sponsorship">
      <h3>💼 Partnership Opportunities</h3>
      <p>Support STEM education in our community through sponsorship and partnerships.</p>
      <div class="partnership-options">
        <div class="partnership-option">
          <strong>Financial Sponsorship</strong><br>
          <span>$500 - $5,000+ annual support</span>
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
        <div class="donation-amounts">
          <button class="amount-btn" onclick="donate(25)">$25</button>
          <button class="amount-btn" onclick="donate(50)">$50</button>
          <button class="amount-btn" onclick="donate(100)">$100</button>
          <button class="amount-btn" onclick="donate('other')">Other</button>
        </div>
        <p class="donation-impact">
          <small>$50 sponsors workshop materials for one student for a full year</small>
        </p>
      </div>
      <a href="/sponsors#donation" class="btn btn-primary">Donate Now</a>
    </div>
  </div>
</div>

## Social Media & Updates

<div class="social-section">
  <h2>🌐 Follow Our Journey</h2>
  <p>Stay connected with our community and see what our teams are up to!</p>
  
  <div class="social-links">
    {% capture facebook_url %}https://facebook.com/{{ site.facebook_username }}{% endcapture %}
    {% include social-link-card.html platform='facebook' url=facebook_url description='Daily updates, photos, and event announcements' %}

    {% capture youtube_url %}https://youtube.com/{{ site.youtube_username }}{% endcapture %}
    {% include social-link-card.html platform='youtube' url=youtube_url description='Robot demonstrations, student projects, and competition highlights' %}
    
    {% capture github_url %}https://github.com/{{ site.github_username }}{% endcapture %}
    {% include social-link-card.html platform='github' url=github_url description='Open source projects and coding resources' %}
    
    <a href="mailto:contact@lansingtechstudio.org?subject=Lansing%20Tech%20Studio%20Newsletter" class="social-link email">
      <div class="social-icon">📧</div>
      <div class="social-info">
        <strong>Newsletter</strong>
        <span>Monthly updates delivered to your inbox</span>
      </div>
    </a>
  </div>
</div>

## Frequently Asked Questions

<div class="faq-section">
  <h2>❓ Common Questions</h2>
  <div class="faq-grid">
    <div class="faq-item">
      <h3>What ages do you serve?</h3>
      <p>Our main FLL Challenge program is for ages 9-16. We also offer workshops for ages 8+ and career mentoring for high school students (14-18).</p>
    </div>
    
    <div class="faq-item">
      <h3>Do students need prior experience?</h3>
      <p>No experience necessary! We welcome complete beginners and provide all the training needed. Our mentors work with students at all skill levels.</p>
    </div>
    
    <div class="faq-item">
      <h3>What does participation cost?</h3>
      <p>FLL teams are $150 per student per season (scholarships available). Workshops range from $25-50. Career mentoring is free. We never want cost to be a barrier.</p>
    </div>
    
    <div class="faq-item">
      <h3>When do programs meet?</h3>
      <p>FLL teams meet Saturdays 9am-12pm during competition season (Sept-Feb). Workshops are scheduled throughout the year. Mentoring is by appointment.</p>
    </div>
    
    <div class="faq-item">
      <h3>Where are you located?</h3>
      <p>We meet at our facility at 123 Innovation Drive in Lansing. We also host some workshops at partner locations like libraries and community centers.</p>
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
      <strong>Program Director:</strong><br>
      Chelsea Thiede
    </div>
  </div>
  
  <p class="emergency-note">
    <small>For medical emergencies, always call 911 first, then notify us. 
    All mentors are trained in basic first aid and emergency procedures.</small>
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

<script>
function donate(amount) {
  // This would integrate with your donation processing system
  if (amount === 'other') {
    window.open('/sponsors#donation', '_blank');
  } else {
    window.open(`/sponsors#donation?amount=${amount}`, '_blank');
  }
}
</script>
