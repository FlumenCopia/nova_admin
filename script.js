/* ==========================================================================
   NOVA INNOVATIONS — Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFounderHeroSettings();
  initServicesBackend();
  initTheme();
  initNavigation();
  initCounters();
  initPortfolioFilters();
  initScrollEffects();
  initSwiperMarquee();
  initImageSwipeGallery();
});

/* --- 1. Theme Management (Light / Dark) --- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('arqour_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('arqour_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  if (theme === 'dark') {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* --- 2. Navigation & Mobile Drawer --- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('navbar');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Active link highlighters on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        drawerLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Header blur shadow enhancement on scroll
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
}

function closeDrawer() {
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  if (mobileDrawer) mobileDrawer.classList.remove('open');
  if (drawerOverlay) drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* --- 3. Animated Counters --- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const step = Math.ceil(target / (duration / 25));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.innerText = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.innerText = current.toLocaleString();
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-pills-row');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* --- 4. Portfolio Filter Tabs --- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --- 5. Esteemed Clients Interactive Swiper Drag/Touch --- */
function initSwiperMarquee() {
  const marqueeContainer = document.querySelector('.partners-marquee-container');
  const marqueeTrack = document.querySelector('.partners-marquee-track');

  if (!marqueeContainer || !marqueeTrack) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  marqueeContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    marqueeContainer.classList.add('active');
    marqueeTrack.style.animationPlayState = 'paused';
    startX = e.pageX - marqueeContainer.offsetLeft;
    scrollLeft = marqueeContainer.scrollLeft;
  });

  marqueeContainer.addEventListener('mouseleave', () => {
    isDown = false;
    marqueeTrack.style.animationPlayState = 'running';
  });

  marqueeContainer.addEventListener('mouseup', () => {
    isDown = false;
    marqueeTrack.style.animationPlayState = 'running';
  });

  marqueeContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - marqueeContainer.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeContainer.scrollLeft = scrollLeft - walk;
  });

  // Touch Support
  marqueeContainer.addEventListener('touchstart', (e) => {
    marqueeTrack.style.animationPlayState = 'paused';
  }, { passive: true });

  marqueeContainer.addEventListener('touchend', () => {
    marqueeTrack.style.animationPlayState = 'running';
  }, { passive: true });
}

/* --- 6. Interactive Modal & Forms --- */
function openContactModal(serviceTitle = '') {
  const modal = document.getElementById('contact-modal');
  const serviceSelect = document.getElementById('form-service');
  
  if (serviceTitle && serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(serviceTitle.toLowerCase()) ||
          serviceSelect.options[i].value.toLowerCase().includes(serviceTitle.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleModalBackdropClick(event) {
  if (event.target.id === 'contact-modal') {
    closeContactModal();
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('form-name').value;
  closeContactModal();
  showToast('Inquiry Received!', `Thank you ${name}, our executive partner will reach out shortly.`);
  event.target.reset();
}

function handleNewsletter(event) {
  event.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  showToast('Subscribed!', `You are on the list (${email}). Expect high-signal insights.`);
  event.target.reset();
}

/* --- 7. Toast Notification --- */
function showToast(title, desc) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');

  if (!toast) return;

  toastTitle.innerText = title;
  toastDesc.innerText = desc;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --- 8. Subtle 3D Card Hover Effects --- */
function initScrollEffects() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContactModal();
      closeDrawer();
    }
  });
}

/* --- 9. Interactive Image Swipe Gallery --- */
function initImageSwipeGallery() {
  const trackWrapper = document.getElementById('swipe-track-wrapper');
  const track = document.getElementById('swipe-track');
  const slides = document.querySelectorAll('.swipe-slide');
  const prevBtn = document.getElementById('swipe-prev');
  const nextBtn = document.getElementById('swipe-next');
  const dots = document.querySelectorAll('.swipe-dot');
  const thumbs = document.querySelectorAll('.thumb-item');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const maxIndex = slides.length - 1;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let autoSlideTimer = null;

  function updateGallery(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    currentTranslate = -currentIndex * 100;
    prevTranslate = currentTranslate;
    track.style.transform = `translateX(${currentTranslate}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentIndex);
    });
  }

  function goToNext() {
    let nextIndex = currentIndex + 1;
    if (nextIndex > maxIndex) nextIndex = 0;
    updateGallery(nextIndex);
  }

  function goToPrev() {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = maxIndex;
    updateGallery(prevIndex);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { resetAutoSlide(); goToNext(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { resetAutoSlide(); goToPrev(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      resetAutoSlide();
      updateGallery(index);
    });
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      resetAutoSlide();
      updateGallery(index);
    });
  });

  // Touch & Mouse Drag Gesture Support
  if (trackWrapper) {
    // Touch events
    trackWrapper.addEventListener('touchstart', touchStart, { passive: true });
    trackWrapper.addEventListener('touchend', touchEnd, { passive: true });
    trackWrapper.addEventListener('touchmove', touchMove, { passive: true });

    // Mouse events
    trackWrapper.addEventListener('mousedown', touchStart);
    trackWrapper.addEventListener('mouseup', touchEnd);
    trackWrapper.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });
    trackWrapper.addEventListener('mousemove', touchMove);
  }

  function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    track.style.transition = 'none';
    resetAutoSlide();
  }

  function touchMove(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    // Translate relative to container width
    const containerWidth = trackWrapper.offsetWidth;
    const percentageMoved = (diff / containerWidth) * 100;
    currentTranslate = -currentIndex * 100 + percentageMoved;
  }

  function touchEnd() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    track.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -15 && currentIndex < maxIndex) {
      currentIndex += 1;
    } else if (movedBy > 15 && currentIndex > 0) {
      currentIndex -= 1;
    }

    updateGallery(currentIndex);
    startAutoSlide();
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function animation() {
    if (isDragging) {
      track.style.transform = `translateX(${currentTranslate}%)`;
      requestAnimationFrame(animation);
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const gallerySection = document.getElementById('gallery');
    if (!gallerySection) return;
    const rect = gallerySection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowRight') { resetAutoSlide(); goToNext(); }
      if (e.key === 'ArrowLeft') { resetAutoSlide(); goToPrev(); }
    }
  });

  // Auto slide timer
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToNext();
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  startAutoSlide();
}


/* --- 8. Dynamic Founder Hero Backend Integration --- */
async function initFounderHeroSettings() {
  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isLocal ? 'http://localhost:5000/api/public/settings' : '/api/public/settings';
    const backendHost = isLocal ? 'http://localhost:5000' : '';

    const res = await fetch(apiUrl);
    const result = await res.json();
    if (result && result.success && result.data) {
      const s = result.data;

      // 1. Tagline Badge
      const tag = s.founderHeroTag || s.leaderTag;
      if (tag) {
        const tagEl = document.getElementById('founder-hero-tag-text');
        if (tagEl) tagEl.textContent = tag;
      }

      // 2. Headline / Title
      const title = s.founderHeroTitle || s.heroTitle;
      if (title) {
        const titleEl = document.getElementById('founder-hero-title');
        if (titleEl) {
          titleEl.innerHTML = title.replace(/\n/g, '<br>');
        }
      }

      // 3. Description
      const desc = s.founderHeroDesc || s.heroSubtitle;
      if (desc) {
        const descEl = document.getElementById('founder-hero-desc');
        if (descEl) descEl.textContent = desc;
      }

      // 4. CTA Button Text & Link
      const ctaText = s.founderHeroCtaText;
      if (ctaText) {
        const ctaTextEl = document.getElementById('founder-hero-cta-text');
        if (ctaTextEl) ctaTextEl.textContent = ctaText;
      }

      const ctaPhone = s.founderHeroCtaPhone || s.primaryPhone;
      if (ctaPhone) {
        const ctaLinkEl = document.getElementById('founder-hero-cta');
        if (ctaLinkEl) {
          const clean = ctaPhone.replace(/[\s-]/g, '');
          ctaLinkEl.href = 'tel:' + clean;
          ctaLinkEl.title = 'Call ' + ctaPhone;
        }
      }

      // 5. Founder Photo
      const photo = s.founderImage || s.leaderImage;
      if (photo) {
        const imgEl = document.getElementById('founder-hero-img');
        if (imgEl) {
          const srcUrl = (photo.startsWith('http') || photo.startsWith('//'))
            ? photo
            : (photo.startsWith('/uploads') ? backendHost + photo : photo);
          imgEl.src = srcUrl;
        }
      }

      // 6. Founder Name & Role
      const name = s.founderName || s.leaderName;
      if (name) {
        const nameEl = document.getElementById('founder-hero-name');
        if (nameEl) nameEl.textContent = name;
      }

      const role = s.founderRole || s.leaderRole;
      if (role) {
        const roleEl = document.getElementById('founder-hero-role');
        if (roleEl) roleEl.textContent = role;
      }
    }
  } catch (err) {
    console.warn('Founder hero settings dynamic fetch fallback:', err);
  }
}


/* --- 9. Dynamic Services Section Backend Integration --- */
function getServiceIconClass(iconKey, title) {
  const key = (iconKey || '').toLowerCase();
  const t = (title || '').toLowerCase();
  
  if (key === 'billboard' || key === 'hoarding' || t.includes('hoarding') || t.includes('billboard')) {
    return 'fa-solid fa-rectangle-ad';
  }
  if (key === 'transit' || key === 'bus' || key === 'vehicle' || t.includes('vehicle') || t.includes('transit') || t.includes('bus')) {
    return 'fa-solid fa-bus';
  }
  if (key === 'retail' || key === 'shop' || t.includes('shop') || t.includes('retail') || t.includes('facade')) {
    return 'fa-solid fa-store';
  }
  if (key === 'event' || key === 'stall' || t.includes('event') || t.includes('stall')) {
    return 'fa-solid fa-champagne-glasses';
  }
  if (key === 'wall' || key === 'painting' || t.includes('wall') || t.includes('mural') || t.includes('paint')) {
    return 'fa-solid fa-paintbrush';
  }
  if (key === 'design' || key === 'print' || t.includes('design') || t.includes('print')) {
    return 'fa-solid fa-pen-ruler';
  }
  return 'fa-solid fa-layer-group';
}

function getServiceButtonLabel(service) {
  const t = (service.title || '').toLowerCase();
  if (t.includes('hoarding') || t.includes('billboard')) return 'Inquire Hoardings';
  if (t.includes('vehicle') || t.includes('transit') || t.includes('bus')) return 'Inquire Transit';
  if (t.includes('shop') || t.includes('retail') || t.includes('facade')) return 'Inquire Retail';
  if (t.includes('event') || t.includes('stall')) return 'Inquire Events';
  if (t.includes('wall') || t.includes('mural') || t.includes('paint')) return 'Inquire Wall Murals';
  if (t.includes('design') || t.includes('print')) return 'Inquire Design';
  return 'Inquire ' + (service.title || 'Service');
}

async function initServicesBackend() {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const apiBase = isLocal ? 'http://localhost:5000/api' : '/api';

  // 1. Load Services Header from SiteSettings
  try {
    const settingsRes = await fetch(`${apiBase}/public/settings`);
    const settingsData = await settingsRes.json();
    if (settingsData && settingsData.success && settingsData.data) {
      const s = settingsData.data;
      const subheadEl = document.getElementById('services-subhead');
      const headingEl = document.getElementById('services-heading');
      const descEl = document.getElementById('services-desc');

      if (subheadEl && s.servicesSectionSubhead) subheadEl.textContent = s.servicesSectionSubhead;
      if (headingEl && s.servicesSectionHeading) headingEl.textContent = s.servicesSectionHeading;
      if (descEl && s.servicesSectionDesc) descEl.textContent = s.servicesSectionDesc;
    }
  } catch (err) {
    console.warn('Services header settings fetch error:', err);
  }

  // 2. Load Services Cards from /api/public/services
  try {
    const servicesRes = await fetch(`${apiBase}/public/services`);
    const servicesData = await servicesRes.json();
    if (servicesData && servicesData.success && Array.isArray(servicesData.data) && servicesData.data.length > 0) {
      const container = document.getElementById('services-cards-container');
      if (!container) return;

      const activeServices = servicesData.data.filter(s => s.isActive !== false);
      if (activeServices.length === 0) return;

      let cardsHtml = '';
      activeServices.forEach(item => {
        const iconClass = getServiceIconClass(item.icon, item.title);
        const btnLabel = getServiceButtonLabel(item);
        const safeTitle = (item.title || '').replace(/'/g, "\\'");

        let tagsHtml = '';
        if (Array.isArray(item.features) && item.features.length > 0) {
          tagsHtml = '<div class="service-tags-list">';
          item.features.slice(0, 3).forEach(feat => {
            tagsHtml += `<span class="service-tag-item"><i class="fa-solid fa-check"></i> ${feat}</span>`;
          });
          tagsHtml += '</div>';
        }

        cardsHtml += `
        <div class="service-squircle-card">
          <div class="service-icon-box">
            <i class="${iconClass}"></i>
          </div>
          <h3 class="service-title">${item.title}</h3>
          <p class="service-desc">${item.description || ''}</p>
          ${tagsHtml}
          <button class="service-card-btn" onclick="openContactModal('${safeTitle}')">
            <span>${btnLabel}</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>`;
      });

      container.innerHTML = cardsHtml;
    }
  } catch (err) {
    console.warn('Services cards dynamic fetch error:', err);
  }
}
