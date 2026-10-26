/**
 * PORTFOLIO INTERACTION ENGINE
 * Theme: Dark & Electric Blue
 * Feature: Dynamic Radiant Cursor & Rightward Directional Beam Light
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');
  const directionalBeam = document.getElementById('directionalBeam');
  const ambientRightGlow = document.getElementById('ambientRightGlow');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const btnDownloadCV = document.getElementById('btnDownloadCV');
  const cvModal = document.getElementById('cvModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const btnBackToTop = document.getElementById('btnBackToTop');

  /* ==========================================================================
     1. DYNAMIC RADIANT CURSOR & RIGHTWARD LIGHT EFFECT
     "ketika kursor ke arah kanan ada cahaya"
     ========================================================================== */
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let prevMouseX = mouseX;
  
  // Smooth interpolated coordinates for the ambient glow
  let glowX = mouseX;
  let glowY = mouseY;
  
  // Directional lighting states
  let rightwardVelocity = 0;
  let targetBeamOpacity = 0.2;
  let currentBeamOpacity = 0.2;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Direct positioning for the sharp dot
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }

    // Calculate movement delta to the right
    const deltaX = mouseX - prevMouseX;
    if (deltaX > 0) {
      // Moving right: boost rightward light flare
      rightwardVelocity = Math.min(rightwardVelocity + deltaX * 0.08, 1.0);
    } else {
      // Moving left: decay boost
      rightwardVelocity = Math.max(rightwardVelocity - 0.05, 0);
    }
    prevMouseX = mouseX;

    // Calculate rightward screen ratio (0 at left edge, 1 at right edge)
    const rightRatio = Math.max(0, Math.min(1, mouseX / window.innerWidth));
    
    // Ambient right side glow intensity strengthens as cursor moves right
    if (ambientRightGlow) {
      const baseIntensity = 0.12;
      const dynamicIntensity = baseIntensity + (rightRatio * 0.35) + (rightwardVelocity * 0.25);
      ambientRightGlow.style.setProperty('--right-intensity', dynamicIntensity.toFixed(3));
      ambientRightGlow.style.setProperty('--right-intensity-mid', (dynamicIntensity * 0.5).toFixed(3));
    }

    // Set directional beam target opacity based on position & rightward movement
    targetBeamOpacity = 0.15 + (rightRatio * 0.55) + (rightwardVelocity * 0.3);
  });

  // Smooth animation frame loop for fluid 60FPS lighting
  function renderCursorEffects() {
    // Linear interpolation for soft halo
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;

    if (cursorGlow) {
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }

    // Smooth transition for directional beam light
    currentBeamOpacity += (targetBeamOpacity - currentBeamOpacity) * 0.1;
    rightwardVelocity *= 0.92; // decay

    if (directionalBeam) {
      directionalBeam.style.left = `${glowX}px`;
      directionalBeam.style.top = `${glowY}px`;
      
      // Calculate dynamic flare width and brightness
      const beamScale = 1 + rightwardVelocity * 0.6;
      directionalBeam.style.transform = `translate(0, -50%) scaleX(${beamScale})`;
      directionalBeam.style.setProperty('--beam-opacity', currentBeamOpacity.toFixed(3));
      directionalBeam.style.setProperty('--beam-alpha', (0.2 + currentBeamOpacity * 0.35).toFixed(3));
      directionalBeam.style.setProperty('--beam-alpha-mid', (0.08 + currentBeamOpacity * 0.2).toFixed(3));
    }

    requestAnimationFrame(renderCursorEffects);
  }
  requestAnimationFrame(renderCursorEffects);

  // Interactive Hover Magnification
  const interactiveTargets = document.querySelectorAll('a, button, .glow-card, input, textarea, .hobby-item, .interest-box');
  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  /* ==========================================================================
     2. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT
     ========================================================================== */
  
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Active section indicator via Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ==========================================================================
     3. MOBILE NAVBAR TOGGLE
     ========================================================================== */

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     4. CV PREVIEW MODAL
     ========================================================================== */

  function openCVModal() {
    if (cvModal) {
      cvModal.classList.add('active');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCVModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnDownloadCV) {
    btnDownloadCV.addEventListener('click', openCVModal);
  }
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeCVModal);
  }
  if (btnCancelModal) {
    btnCancelModal.addEventListener('click', closeCVModal);
  }
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        closeCVModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
      closeCVModal();
    }
  });

  /* ==========================================================================
     5. INTERACTIVE CONTACT FORM SUBMISSION (WEB3FORMS INTEGRATION)
     ========================================================================== */

  const form = contactForm || document.getElementById('form');

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]') || document.getElementById('btnSubmitMessage');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Kirim Pesan Sekarang</span>';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.set("access_key", "cc003c11-afa4-4c8e-818c-257859370172");

      const senderName = document.getElementById('senderName')?.value.trim() || formData.get('name') || '';
      if (!formData.get('name') && senderName) {
        formData.append('name', senderName);
      }

      // Button loading indicator
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Mengirim Pesan...</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-animation">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        `;
      }

      if (formFeedback) {
        formFeedback.className = 'form-feedback info';
        formFeedback.innerHTML = `<span>Sedang mengirim pesan Anda...</span>`;
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback success';
            formFeedback.innerHTML = `
              🎉 Terima kasih, <strong>${senderName || 'Teman'}</strong>! Pesan Anda berhasil dikirim ke email Novia.
            `;
          } else {
            alert("Success! Your message has been sent.");
          }
          form.reset();
        } else {
          const errorMsg = data.message || "Gagal mengirim pesan.";
          if (formFeedback) {
            formFeedback.className = 'form-feedback error';
            formFeedback.innerHTML = `⚠️ <strong>Error:</strong> ${errorMsg}`;
          } else {
            alert("Error: " + errorMsg);
          }
        }
      } catch (error) {
        console.error("Web3Forms error:", error);
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.innerHTML = `⚠️ Terjadi kendala saat mengirim pesan. Silakan periksa koneksi internet Anda dan coba lagi.`;
        } else {
          alert("Something went wrong. Please try again.");
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }

        if (formFeedback) {
          setTimeout(() => {
            if (formFeedback.classList.contains('success')) {
              formFeedback.className = 'form-feedback hidden';
            }
          }, 8000);
        }
      }
    });
  }

  /* ==========================================================================
     6. BACK TO TOP BUTTON
     ========================================================================== */

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     7. CARD TILT SHINE ON MOUSE MOVE
     ========================================================================== */
  
  const glowCards = document.querySelectorAll('.glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--card-mouse-x', `${x}px`);
      card.style.setProperty('--card-mouse-y', `${y}px`);
    });
  });
});
