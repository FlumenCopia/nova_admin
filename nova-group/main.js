/**
 * BUSINESS ALLIANCE - COMMERCIAL REAL ESTATE
 * Interactive Scripts & Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModals();
  initCatalogSlider();
  initStatsCounter();
  initFaqAccordion();
  initGalleryFilters();
  initLightbox();
  initServiceCalculator();
  initForms();
});

/* --------------------------------------------------------------------------
   NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (menuBtn && navDrawer && drawerOverlay) {
    const toggleMenu = () => {
      menuBtn.classList.toggle('open');
      navDrawer.classList.toggle('open');
      drawerOverlay.classList.toggle('open');
      document.body.style.overflow = navDrawer.classList.contains('open') ? 'hidden' : '';
    };

    const closeBtn = navDrawer.querySelector('.mobile-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', toggleMenu);
    }

    menuBtn.addEventListener('click', toggleMenu);
    drawerOverlay.addEventListener('click', toggleMenu);

    navDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navDrawer.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   CONSULTATION / CONTACT MODAL
   -------------------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('consultation-modal');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButtons = document.querySelectorAll('.close-modal-btn, .modal-close-btn');

  if (!modalOverlay) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceType = btn.getAttribute('data-service') || 'General Commercial Inquiry';
      const selectElem = modalOverlay.querySelector('#modal-property-type');
      if (selectElem && serviceType) {
        selectElem.value = serviceType;
      }
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   FEATURED PORTFOLIO SWIPER / TOUCH & ARROW NAVIGATION
   -------------------------------------------------------------------------- */
function initCatalogSlider() {
  const sliderWrap = document.querySelector('.portfolio-swiper-wrap') || document.querySelector('.property-cards-slider-wrap');
  const prevBtn = document.querySelector('.catalog-nav-prev');
  const nextBtn = document.querySelector('.catalog-nav-next');
  const paginationContainer = document.getElementById('portfolio-pagination');

  if (!sliderWrap) return;

  const cards = sliderWrap.querySelectorAll('.property-cat-card');
  if (!cards.length) return;

  // Calculate slide scroll distance (card width + gap)
  function getScrollStep() {
    const card = cards[0];
    const track = sliderWrap.querySelector('.portfolio-swiper-track') || sliderWrap.querySelector('.property-cards-grid');
    const gap = track ? parseFloat(window.getComputedStyle(track).gap) || 28 : 28;
    return (card ? card.offsetWidth : 380) + gap;
  }

  // Create Pagination Dots
  if (paginationContainer) {
    paginationContainer.innerHTML = '';
    cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `swiper-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to campaign ${index + 1}`);
      dot.addEventListener('click', () => {
        const step = getScrollStep();
        sliderWrap.scrollTo({
          left: index * step,
          behavior: 'smooth'
        });
      });
      paginationContainer.appendChild(dot);
    });
  }

  // Update Dots & Arrow States on Scroll
  function updateActiveState() {
    const step = getScrollStep();
    const scrollLeft = sliderWrap.scrollLeft;
    const activeIndex = Math.min(
      Math.round(scrollLeft / step),
      cards.length - 1
    );

    if (paginationContainer) {
      const dots = paginationContainer.querySelectorAll('.swiper-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }

    if (prevBtn) {
      if (scrollLeft <= 5) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'default';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
      }
    }

    if (nextBtn) {
      const maxScroll = sliderWrap.scrollWidth - sliderWrap.clientWidth;
      if (scrollLeft >= maxScroll - 5) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'default';
      } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
      }
    }
  }

  sliderWrap.addEventListener('scroll', updateActiveState, { passive: true });
  updateActiveState();

  // Prev / Next Button Controls
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = getScrollStep();
      sliderWrap.scrollBy({ left: -step, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const step = getScrollStep();
      const maxScroll = sliderWrap.scrollWidth - sliderWrap.clientWidth;
      if (sliderWrap.scrollLeft >= maxScroll - 10) {
        // Loop back to start if at the end
        sliderWrap.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderWrap.scrollBy({ left: step, behavior: 'smooth' });
      }
    });
  }

  // Mouse Drag to Scroll
  let isDown = false;
  let startX = 0;
  let scrollLeftPos = 0;
  let isDragging = false;

  sliderWrap.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    startX = e.pageX - sliderWrap.offsetLeft;
    scrollLeftPos = sliderWrap.scrollLeft;
  });

  sliderWrap.addEventListener('mouseleave', () => {
    isDown = false;
  });

  sliderWrap.addEventListener('mouseup', () => {
    isDown = false;
  });

  sliderWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderWrap.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }
    sliderWrap.scrollLeft = scrollLeftPos - walk;
  });

  // Prevent link click when dragging
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    });
  });

  // Autoplay Swiper (Advances smoothly, pauses on hover)
  let autoPlayTimer = null;
  function startAutoplay() {
    stopAutoplay();
    autoPlayTimer = setInterval(() => {
      const step = getScrollStep();
      const maxScroll = sliderWrap.scrollWidth - sliderWrap.clientWidth;
      if (sliderWrap.scrollLeft >= maxScroll - 10) {
        sliderWrap.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderWrap.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 4500);
  }

  function stopAutoplay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  sliderWrap.addEventListener('mouseenter', stopAutoplay);
  sliderWrap.addEventListener('mouseleave', startAutoplay);
  sliderWrap.addEventListener('touchstart', stopAutoplay, { passive: true });

  startAutoplay();
}

/* --------------------------------------------------------------------------
   ANIMATED STATS COUNTER
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const rawText = stat.textContent.trim();
          const target = parseInt(rawText.replace(/\D/g, ''), 10);
          const suffix = rawText.includes('+') ? '+' : (rawText.includes('%') ? '%' : '');
          
          if (!isNaN(target)) {
            let start = 0;
            const duration = 1800;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(start) + suffix;
              }
            }, stepTime);
          }
        });
      }
    });
  }, { threshold: 0.25 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) observer.observe(statsGrid);
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   GALLERY / CATALOG FILTERING
   -------------------------------------------------------------------------- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  const listingCards = document.querySelectorAll('.property-listing-card');

  if (!filterBtns.length || !listingCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      listingCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const categories = cardCategory.split(' ');
        if (filterCategory === 'all' || categories.includes(filterCategory)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   LIGHTBOX FOR PROPERTY IMAGES
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const viewableImgs = document.querySelectorAll('.viewable-img, .cat-card-img-wrap, .listing-media');

  if (!lightbox || !lightboxImg) return;

  viewableImgs.forEach(wrap => {
    wrap.addEventListener('click', (e) => {
      // Don't trigger if clicking an anchor or button inside
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
      
      const img = wrap.querySelector('img') || wrap;
      if (img && img.src) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* --------------------------------------------------------------------------
   SERVICE ESTIMATE CALCULATOR
   -------------------------------------------------------------------------- */
function initServiceCalculator() {
  const typeSelect = document.getElementById('calc-type');
  const areaInput = document.getElementById('calc-area');
  const areaDisplay = document.getElementById('calc-area-val');
  const resultDisplay = document.getElementById('calc-total-result');

  if (!typeSelect || !areaInput || !resultDisplay) return;

  function updateEstimate() {
    const ratePerSqft = parseFloat(typeSelect.value) || 45;
    const area = parseFloat(areaInput.value) || 600;

    if (areaDisplay) {
      areaDisplay.textContent = `${area} sq.ft`;
    }

    const estimatedMonthly = Math.round(area * ratePerSqft);
    resultDisplay.textContent = `₹${estimatedMonthly.toLocaleString('en-IN')}`;
  }

  typeSelect.addEventListener('change', updateEstimate);
  areaInput.addEventListener('input', updateEstimate);
  updateEstimate();
}

/* --------------------------------------------------------------------------
   FORM SUBMISSIONS & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initForms() {
  const forms = document.querySelectorAll('form');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }

        form.reset();

        // Close any active modal
        const modal = document.querySelector('.modal-overlay.active');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }

        showToast('Thank you! Your campaign inquiry has been received. Nova Innovations will contact you shortly.');
      }, 700);
    });
  });
}
