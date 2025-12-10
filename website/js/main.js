/**
 * Slot 777 Brasil - Main JavaScript
 * Handles mobile navigation and FAQ interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      const isOpen = mobileNav.classList.contains('active');
      mobileMenuButton.setAttribute('aria-expanded', isOpen);

      // Update icon
      const icon = mobileMenuButton.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileNav) {
          mobileNav.classList.remove('active');
        }
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }

  // Lazy loading for images (fallback for browsers without native support)
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback: load images when they enter viewport
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '100px'
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // Track affiliate clicks (optional analytics)
  const affiliateLinks = document.querySelectorAll('a[rel*="sponsored"]');

  affiliateLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Log click for analytics if needed
      console.log('Affiliate click:', this.href);
    });
  });
});
