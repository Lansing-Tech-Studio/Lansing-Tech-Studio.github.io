// Floating Programs Navigation - Interactive Features
(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.programs-nav');
    
    // Exit if we're not on the programs page
    if (!nav) return;
    
    const navContent = nav.querySelector('.programs-nav-content');
    const navToggle = nav.querySelector('.programs-nav-toggle');
    const navLinks = nav.querySelectorAll('.programs-nav-link');
    const sections = document.querySelectorAll('[id]');
    
    // Open menu by default on mobile on initial page load
    if (navToggle && window.innerWidth <= 768) {
      // Small delay to ensure smooth animation on page load
      setTimeout(function() {
        navToggle.classList.add('active');
        navContent.classList.add('active');
      }, 500);
    }
    
    // Mobile toggle functionality
    if (navToggle) {
      navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navContent.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navContent.classList.contains('active')) {
          navToggle.classList.remove('active');
          navContent.classList.remove('active');
        }
      });
      
      // Close menu when clicking a link
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            navToggle.classList.remove('active');
            navContent.classList.remove('active');
          }
        });
      });
    }
    
    // Scroll spy - highlight active section
    function highlightActiveSection() {
      const scrollPosition = window.scrollY + 150; // Offset for header
      
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Check if section has a corresponding nav link
        const hasNavLink = Array.from(navLinks).some(link => 
          link.getAttribute('href') === '#' + sectionId
        );
        
        if (hasNavLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });
      
      // Update active state
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(function() {
        highlightActiveSection();
      });
    });
    
    // Initialize on page load
    highlightActiveSection();
    
    // Smooth scroll polyfill for older browsers (already in CSS, but JS backup)
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            e.preventDefault();
            
            const headerHeight = 100; // Account for fixed header
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
              history.pushState(null, null, href);
            }
          }
        }
      });
    });
    
    // Handle initial page load with hash
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        setTimeout(function() {
          const headerHeight = 100;
          const targetPosition = targetSection.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          highlightActiveSection();
        }, 100);
      }
    }
    
    // Show/hide nav on scroll (optional enhancement)
    let lastScrollTop = 0;
    const navHideThreshold = 100;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // On desktop, keep nav visible always
      if (window.innerWidth > 768) {
        nav.style.opacity = '1';
        nav.style.pointerEvents = 'all';
        return;
      }
      
      // On mobile, show nav when scrolling up or near top
      if (scrollTop < navHideThreshold) {
        nav.style.opacity = '1';
        nav.style.pointerEvents = 'all';
      } else if (scrollTop < lastScrollTop) {
        // Scrolling up
        nav.style.opacity = '1';
        nav.style.pointerEvents = 'all';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Keyboard navigation support
    navLinks.forEach((link, index) => {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = navLinks[index + 1];
          if (nextLink) nextLink.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevLink = navLinks[index - 1];
          if (prevLink) prevLink.focus();
        }
      });
    });
    
    // Add visual feedback when sections come into view
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);
    
    // Observe program sections
    document.querySelectorAll('.program-section').forEach(section => {
      sectionObserver.observe(section);
    });
    
  });
})();
