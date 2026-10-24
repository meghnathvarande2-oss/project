/* ==========================================================================
   MEGHNATH VARANDE — PORTFOLIO MAIN JAVASCRIPT
   Modern Features, Interactive Widgets, Theme Switching, and Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ===== SMART ANIMATED TEXT ROTATOR (Building, Learning, Developing, Innovating) ===== */
  const smartAnimateEl = document.getElementById('smart-animate-text');
  if (smartAnimateEl) {
    const words = ['Building.', 'Learning.', 'Developing.', 'Innovating.'];
    let wordIndex = 0;
    setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      smartAnimateEl.style.opacity = '0';
      smartAnimateEl.style.transform = 'translateY(12px) scale(0.95)';
      smartAnimateEl.style.filter = 'blur(4px)';
      setTimeout(() => {
        smartAnimateEl.textContent = words[wordIndex];
        smartAnimateEl.style.opacity = '1';
        smartAnimateEl.style.transform = 'translateY(0) scale(1)';
        smartAnimateEl.style.filter = 'blur(0px)';
      }, 300);
    }, 2800);
  }


  /* ===== 1. THEME SWITCHER (DARK / LIGHT) ===== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark'); // Default to dark for modern AI aesthetic

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'bx bx-sun';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeIcon.className = 'bx bx-moon';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  /* ===== 2. HEADER SCROLL & MOBILE NAV ===== */
  const header = document.querySelector('.header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.innerHTML = isOpen ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<i class="bx bx-menu"></i>';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<i class="bx bx-menu"></i>';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== 3. ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  /* ===== 4. TYPEWRITER EFFECT ===== */
  const typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    const roles = [
      "AI & Machine Learning Student",
      "Python & Data Science Explorer",
      "Aspiring ML Engineer",
      "Automation Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* ===== 5. PROJECT CATEGORY FILTER ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ===== 6. INTERACTIVE PLAYGROUND: STUDENT PERFORMANCE ANALYZER ===== */
  const marksInput = document.getElementById('marks-input');
  const calcBtn = document.getElementById('calc-btn');
  const sampleBtn = document.getElementById('sample-marks-btn');

  const resMean = document.getElementById('res-mean');
  const resMax = document.getElementById('res-max');
  const resMin = document.getElementById('res-min');
  const resGrade = document.getElementById('res-grade');

  function analyzeMarks() {
    if (!marksInput) return;
    const rawVal = marksInput.value.trim();
    if (!rawVal) {
      showToast('Please enter some numbers or click "Load Sample"');
      return;
    }

    const marks = rawVal
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n) && n >= 0 && n <= 100);

    if (marks.length === 0) {
      showToast('Please enter valid numeric scores between 0 and 100');
      return;
    }

    // Vectorized style calculations (simulating NumPy logic)
    const sum = marks.reduce((acc, val) => acc + val, 0);
    const mean = (sum / marks.length).toFixed(1);
    const maxVal = Math.max(...marks);
    const minVal = Math.min(...marks);

    let grade = 'Distinction (A+)';
    if (mean < 40) grade = 'Needs Help (F)';
    else if (mean < 60) grade = 'Second Class (C)';
    else if (mean < 75) grade = 'First Class (B)';
    else if (mean < 85) grade = 'Distinction (A)';

    // Update UI with smooth pop effect
    if (resMean) resMean.textContent = `${mean}%`;
    if (resMax) resMax.textContent = `${maxVal}`;
    if (resMin) resMin.textContent = `${minVal}`;
    if (resGrade) resGrade.textContent = grade;

    showToast(`Analyzed ${marks.length} subject scores successfully!`);
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', analyzeMarks);
  }

  if (sampleBtn && marksInput) {
    sampleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      marksInput.value = '94, 88, 92, 79, 96, 85, 90';
      analyzeMarks();
    });
  }

  if (marksInput) {
    marksInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        analyzeMarks();
      }
    });
  }

  /* ===== 7. QUICK TOPIC CHIPS IN CONTACT FORM ===== */
  const topicBtns = document.querySelectorAll('.topic-tag-btn');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      topicBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const topic = btn.getAttribute('data-topic');
      if (subjectInput) {
        subjectInput.value = topic;
      }
      if (messageInput) {
        if (topic.includes('Internship')) {
          messageInput.value = "Hi Meghnath,\n\nWe came across your profile and would like to discuss an AI/ML or automation internship opportunity with our team.\n\nBest regards,\n";
        } else if (topic.includes('Project')) {
          messageInput.value = "Hi Meghnath,\n\nI was impressed by your student projects and would like to talk about collaborating on a Python/AI project.\n\n";
        } else {
          messageInput.value = "Hi Meghnath,\n\nReaching out to connect and discuss your journey in AI & Machine Learning.\n\n";
        }
      }
      showToast(`Selected: "${topic}"`);
    });
  });

  /* ===== 8. CONTACT FORM SUBMISSION (MAILTO GENERATOR) ===== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const subject = formData.get('subject') || 'Portfolio Inquiry';
      const message = formData.get('message') || '';

      const body = `${message}\n\n-------------------------\nFrom: ${name}\nEmail: ${email}`;
      const mailtoUrl = `mailto:meghnathvarande2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client ready to send...');
    });
  }

  /* ===== 9. COPY EMAIL TO CLIPBOARD ===== */
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn, #copy-email-action');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'meghnathvarande2@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied meghnathvarande2@gmail.com to clipboard! 📋');
      }).catch(() => {
        showToast('Email: meghnathvarande2@gmail.com');
      });
    });
  });

  /* ===== 10. RESUME MODAL ===== */
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ===== 11. SCROLL-TO-TOP BUTTON WITH PROGRESS RING ===== */
  const scrollTopBtn = document.getElementById('scroll-top');
  const progressCircle = document.querySelector('.scroll-top__circle circle');
  const circleCircumference = 130; // 2 * PI * r (approx)

  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;

    if (scrollPos > 300) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }

    if (progressCircle && scrollTotal > 0) {
      const scrollPercent = scrollPos / scrollTotal;
      const offset = circleCircumference - (scrollPercent * circleCircumference);
      progressCircle.style.strokeDashoffset = offset;
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== 12. SCROLL REVEAL ANIMATIONS ===== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 70}ms`;
    revealObserver.observe(el);
  });

  /* ===== 13. TOAST NOTIFICATION HELPER ===== */
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="bx bx-check-circle" style="color: #10b981; font-size: 1.1rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  /* ===== 14. FOOTER CURRENT YEAR ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
