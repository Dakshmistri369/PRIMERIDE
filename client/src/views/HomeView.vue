<template>
  <div class="home-page">
    <RoadBackground3D />
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section" id="hero">
      <div class="hero-text animate-fade-up">
        <div class="hero-badge">
          <span class="badge badge-blue">
            <span class="badge-dot"></span>
            5,000+ Drivers Online
          </span>
        </div>
        <h1 class="hero-title">
          <span>Ride to the</span>
          <span class="word-switcher-container">
            <span class="word-switcher">
              <span class="text-gradient">Future</span>
              <span class="text-gradient">Airport</span>
              <span class="text-gradient">Office</span>
              <span class="text-gradient">Weekend</span>
              <span class="text-gradient">Comfort</span>
            </span>
          </span>
          <br />
          <span>with </span>
          <span class="text-gradient-pink">PrimeRide</span>
        </h1>
        <p class="hero-subtitle animate-fade-up delay-2">
          Experience next-generation urban mobility. PrimeRide fuses state-of-the-art 
          3D WebGL interfaces with real-time driver dispatching to provide zero-friction, 
          ultra-luxurious journeys. Available 24/7 across 50+ cities.
        </p>
        <div class="hero-actions animate-fade-up delay-3">
          <RouterLink to="/book" class="btn btn-primary btn-hero" id="hero-book-cta">
            🚗 Book a Ride
          </RouterLink>
          <a href="#features" class="btn btn-secondary btn-hero" id="hero-learn-more">
            Explore Features ↓
          </a>
        </div>
        <div class="hero-stats animate-fade-up delay-4">
          <div class="hero-stat">
            <span class="stat-num">4.9★</span>
            <span class="stat-label">Rating</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="stat-num">2min</span>
            <span class="stat-label">Avg. Pickup</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="stat-num">50+</span>
            <span class="stat-label">Cities</span>
          </div>
        </div>
      </div>

      <!-- Quick Book Panel (Now in the right column) -->
      <div class="hero-form-col animate-fade-up delay-3">
        <div class="quick-book glass-card" id="quick-book-panel">
          <div class="quick-book-header">
            <h3>Quick Book</h3>
            <span class="badge badge-green">Live</span>
          </div>
          <div class="quick-book-form">
            <div class="input-group">
              <label class="input-label">📍 Pickup</label>
              <input
                v-model="pickup"
                type="text"
                class="input-field"
                placeholder="Your location"
                id="quick-pickup"
              />
            </div>
            <div class="route-indicator">
              <div class="route-line"></div>
              <span class="route-icon">🔄</span>
            </div>
            <div class="input-group">
              <label class="input-label">🏁 Destination</label>
              <input
                v-model="dropoff"
                type="text"
                class="input-field"
                placeholder="Where to?"
                id="quick-dropoff"
              />
            </div>
            <RouterLink to="/book" class="btn btn-primary" style="width:100%; justify-content:center; margin-top:0.5rem" id="quick-book-submit">
              Find Rides →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURES SECTION ===== -->
    <section class="section features-section" id="features">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Why PrimeRide</span>
          <h2 class="section-title">Built for the <span class="text-gradient">Modern Rider</span></h2>
          <p class="section-subtitle">Everything you need for a seamless, safe, and premium ride experience.</p>
        </div>
        <div class="features-grid">
          <div
            v-for="(feature, i) in features"
            :key="feature.id"
            class="feature-card glass-card"
            :class="`delay-${i + 1}`"
            :id="`feature-card-${feature.id}`"
          >
            <div class="feature-icon" :style="{ background: feature.gradient }">
              {{ feature.icon }}
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
            <div class="feature-tag badge" :class="feature.badgeClass">{{ feature.tag }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CAR SHOWCASE SECTION ===== -->
    <section class="section car-section" id="car-showcase">
      <div class="container">
        <div class="car-section-inner">
          <div class="showcase-header animate-fade-up">
            <span class="section-eyebrow">Experience PrimeRide</span>
            <h2 class="section-title">Designed for <span class="text-gradient">Every Scenario</span></h2>
            <p class="section-subtitle">Whether it's a coastal escape, airport transition, or daily downtown hustle.</p>
          </div>
          
          <div class="illustration-showcase-grid">
            <!-- Coastal Drive Card -->
            <div class="illustration-card glass-card animate-fade-up delay-1">
              <div class="illustration-img-wrapper">
                <img src="/coastal_drive.png" alt="Coastal Escape" class="illustration-img" />
                <div class="illustration-badge">Scenic</div>
              </div>
              <div class="illustration-content">
                <h3 class="illustration-title">Coastal Escapes</h3>
                <p class="illustration-desc">Enjoy premium comfort on long weekend scenic drives and road trips.</p>
              </div>
            </div>

            <!-- Airport Pickup Card -->
            <div class="illustration-card glass-card animate-fade-up delay-2">
              <div class="illustration-img-wrapper">
                <img src="/airport_pickup.png" alt="Airport Transfers" class="illustration-img" />
                <div class="illustration-badge">Reliable</div>
              </div>
              <div class="illustration-content">
                <h3 class="illustration-title">Airport Transfers</h3>
                <p class="illustration-desc">Hassle-free pickups with real-time flight tracking and luggage support.</p>
              </div>
            </div>

            <!-- City Arrival Card -->
            <div class="illustration-card glass-card animate-fade-up delay-3">
              <div class="illustration-img-wrapper">
                <img src="/city_arrival.png" alt="City Commute" class="illustration-img" />
                <div class="illustration-badge">Smooth</div>
              </div>
              <div class="illustration-content">
                <h3 class="illustration-title">City Commutes</h3>
                <p class="illustration-desc">Navigate downtown traffic effortlessly and arrive at meetings in style.</p>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 3rem;">
            <RouterLink to="/book" class="btn btn-primary btn-hero" id="car-section-book-cta">
              Book Your Ride Now →
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== STATS SECTION ===== -->
    <section class="section stats-section" id="stats">
      <div class="stats-globe-bg">
        <CityGlobe3D />
      </div>
      <div class="container" style="position:relative;z-index:2">
        <div class="section-header animate-fade-up" style="text-align:center;margin-bottom:2.5rem">
          <span class="section-eyebrow">Global Presence</span>
          <h2 class="section-title">Serving <span class="text-gradient">50+ Cities</span></h2>
        </div>
        <div class="stats-grid">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="stat-card glass-card"
            :class="`delay-${i + 1}`"
            :id="`stat-card-${i}`"
          >
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value text-gradient">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-bar">
              <div class="stat-bar-fill" :style="{ width: stat.percentage, background: stat.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== HOW IT WORKS ===== -->
    <section class="section how-section" id="how-it-works">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Simple Process</span>
          <h2 class="section-title">Ride in <span class="text-gradient">3 Simple Steps</span></h2>
        </div>
        <div class="steps-grid">
          <div
            v-for="(step, i) in steps"
            :key="step.step"
            class="step-card animate-fade-up"
            :class="`delay-${i + 1}`"
            :id="`step-card-${i}`"
          >
            <div class="step-number">{{ step.step }}</div>
            <div class="step-icon">{{ step.icon }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.description }}</p>
            <div class="step-connector" v-if="i < steps.length - 1"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== RIDE TYPES ===== -->
    <section class="section rides-section" id="ride-types">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Choose Your Ride</span>
          <h2 class="section-title">Every Ride, <span class="text-gradient-pink">Your Way</span></h2>
          <p class="section-subtitle">From budget-friendly to ultra-luxury — pick the ride that fits your vibe.</p>
        </div>
        <div class="rides-grid">
          <div
            v-for="(ride, i) in rideTypes"
            :key="ride.id"
            class="ride-card"
            :class="[`delay-${i + 1}`, { active: selectedRide === ride.id }]"
            @click="selectedRide = ride.id"
            :id="`ride-type-${ride.id}`"
          >
            <div class="ride-card-inner glass-card">
              <div class="ride-icon-wrap" :style="{ background: ride.gradient }">
                <span class="ride-icon">{{ ride.icon }}</span>
              </div>
              <h3 class="ride-name">{{ ride.name }}</h3>
              <p class="ride-desc">{{ ride.description }}</p>
              <div class="ride-price">
                <span class="price-from">from</span>
                <span class="price-value">₹{{ ride.basePrice }}</span>
              </div>
              <div class="ride-features">
                <span v-for="f in ride.features.slice(0,3)" :key="f" class="ride-feature-tag">{{ f }}</span>
              </div>
              <RouterLink :to="`/book?type=${ride.id}`" class="btn btn-primary ride-book-btn" :id="`ride-book-${ride.id}`">
                Book {{ ride.name }} →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TESTIMONIALS ===== -->
    <section class="section testimonials-section" id="testimonials">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Real Reviews</span>
          <h2 class="section-title">What Riders <span class="text-gradient">Say About Us</span></h2>
        </div>
        <div class="testimonials-grid">
          <div
            v-for="(t, i) in testimonials"
            :key="t.name"
            class="testimonial-card glass-card animate-fade-up"
            :class="`delay-${i + 1}`"
            :id="`testimonial-${i}`"
          >
            <div class="stars">{{ '★'.repeat(t.rating) }}</div>
            <p class="testimonial-text">"{{ t.text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar">{{ t.avatar }}</div>
              <div>
                <div class="author-name">{{ t.name }}</div>
                <div class="author-city">{{ t.city }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA SECTION ===== -->
    <section class="section cta-section" id="cta">
      <div class="container">
        <div class="cta-card glass-card animate-fade-up">
          <div class="cta-glow"></div>
          <div class="cta-content">
            <h2 class="cta-title">Ready to Ride <span class="text-gradient">Smarter?</span></h2>
            <p class="cta-subtitle">Join 2 million+ riders who've upgraded their commute. First ride free!</p>
            <div class="cta-actions">
              <RouterLink to="/book" class="btn btn-primary btn-hero" id="cta-book">🚗 Book Your First Ride</RouterLink>
              <a href="#" class="btn btn-ghost" id="cta-app">📱 Download App</a>
            </div>
            <div class="cta-badges">
              <span class="cta-badge">✓ No subscription fees</span>
              <span class="cta-badge">✓ Cancel anytime</span>
              <span class="cta-badge">✓ 24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Drift Booking Banner overlay -->
    <div class="drift-banner" :class="{ 'show-banner': isScrolling }">
      <RouterLink to="/book" class="drift-banner-link">
        <span class="drift-banner-text">Book with PrimeRide</span>
        <span class="drift-banner-arrow">➔</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import RoadBackground3D from '../components/RoadBackground3D.vue';
import HeroCar3D from '../components/HeroCar3D.vue';
import CityGlobe3D from '../components/CityGlobe3D.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const pickup = ref('');
const dropoff = ref('');
const selectedRide = ref('premium');

const isScrolling = ref(false);
let scrollTimeout = null;

function handleScroll() {
  isScrolling.value = true;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false;
  }, 1500);
}

// ── Tilt state ──────────────────────────────────────────────
const tiltState = new Map();
const MAX_TILT = 10;
const SCALE = 1.035;
const PERSP = 900;

function lerp(a, b, t) { return a + (b - a) * t; }

function attachTilt(el) {
  if (!el || tiltState.has(el)) return;
  el.style.willChange = 'transform';
  const s = { tx: 0, ty: 0, cx: 0, cy: 0, rafId: null, active: false };
  tiltState.set(el, s);

  function animate() {
    s.cx = lerp(s.cx, s.tx, 0.10);
    s.cy = lerp(s.cy, s.ty, 0.10);
    el.style.transform = `perspective(${PERSP}px) rotateX(${s.cy}deg) rotateY(${s.cx}deg) scale(${s.active ? SCALE : 1})`;
    if (s.active || Math.abs(s.cx) > 0.02 || Math.abs(s.cy) > 0.02) {
      s.rafId = requestAnimationFrame(animate);
    } else {
      s.rafId = null;
    }
  }

  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const py = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    s.tx =  px * MAX_TILT;
    s.ty = -py * MAX_TILT;
  };
  const onEnter = () => {
    s.active = true;
    if (!s.rafId) s.rafId = requestAnimationFrame(animate);
  };
  const onLeave = () => {
    s.active = false; s.tx = 0; s.ty = 0;
    if (!s.rafId) s.rafId = requestAnimationFrame(animate);
  };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mouseleave', onLeave);
  s.cleanup = () => {
    cancelAnimationFrame(s.rafId);
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
    el.style.transform = '';
    el.style.willChange = '';
  };
}

function initTilts() {
  document.querySelectorAll('.feature-card, .ride-card-inner, .illustration-card, .testimonial-card, .stat-card').forEach(attachTilt);
}

function destroyTilts() {
  tiltState.forEach(s => s.cleanup?.());
  tiltState.clear();
}

function splitTextIntoSpans(el) {
  const nodes = Array.from(el.childNodes);
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const words = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      words.forEach(w => {
        if (w.trim() === '') {
          fragment.appendChild(document.createTextNode(w));
        } else {
          const wrapper = document.createElement('span');
          wrapper.className = 'reveal-word';
          wrapper.style.display = 'inline-block';
          wrapper.style.overflow = 'hidden';
          wrapper.style.verticalAlign = 'bottom';
          
          const inner = document.createElement('span');
          inner.className = 'reveal-word-inner';
          inner.style.display = 'inline-block';
          inner.style.transform = 'translateY(110%)';
          inner.style.opacity = '0';
          inner.textContent = w;
          
          wrapper.appendChild(inner);
          fragment.appendChild(wrapper);
        }
      });
      el.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      splitTextIntoSpans(node);
    }
  });
}

// ── GSAP ScrollTrigger parallax ─────────────────────────────
let scrollCtx = null;

function initScrollAnimations() {
  scrollCtx = gsap.context(() => {
    // Split section titles into animatable words
    document.querySelectorAll('.section-title').forEach(title => {
      splitTextIntoSpans(title);
      
      gsap.to(title.querySelectorAll('.reveal-word-inner'), {
        scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' },
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
      });
    });

    // Section headers eyebrow and subtitle block fade
    gsap.utils.toArray('.section-header, .showcase-header').forEach(el => {
      gsap.from(el.querySelectorAll('.section-eyebrow, .section-subtitle'), {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
      });
    });

    // Feature cards stagger
    gsap.from('.feature-card', {
      scrollTrigger: { trigger: '.features-grid', start: 'top 80%' },
      y: 80, rotateX: 25, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      transformOrigin: 'center bottom', transformPerspective: 900,
    });

    // Stat cards
    gsap.from('.stat-card', {
      scrollTrigger: { trigger: '.stats-grid', start: 'top 80%' },
      y: 60, rotateY: -20, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.4)',
      transformPerspective: 900,
    });

    // Steps
    gsap.from('.step-card', {
      scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' },
      y: 70, rotateX: 20, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
      transformOrigin: 'center bottom', transformPerspective: 900,
    });

    // Ride cards
    gsap.from('.ride-card', {
      scrollTrigger: { trigger: '.rides-grid', start: 'top 80%' },
      y: 80, rotateY: 15, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      transformPerspective: 900,
    });

    // Illustration cards
    gsap.from('.illustration-card', {
      scrollTrigger: { trigger: '.illustration-showcase-grid', start: 'top 80%' },
      y: 80, rotateX: 18, scale: 0.92, opacity: 0, duration: 0.75, stagger: 0.12, ease: 'back.out(1.2)',
      transformOrigin: 'center bottom', transformPerspective: 900,
    });

    // Testimonials
    gsap.from('.testimonial-card', {
      scrollTrigger: { trigger: '.testimonials-grid', start: 'top 82%' },
      y: 60, rotateY: -12, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      transformPerspective: 900,
    });

    // CTA
    gsap.from('.cta-card', {
      scrollTrigger: { trigger: '.cta-section', start: 'top 85%' },
      y: 80, scale: 0.94, rotateX: 10, opacity: 0, duration: 1, ease: 'power4.out',
      transformOrigin: 'center bottom', transformPerspective: 900,
    });
  });
}

// ── Magnetic buttons effect ─────────────────────────────────
const magneticButtonsCleanup = [];

function initMagneticButtons() {
  document.querySelectorAll('.btn-hero, .btn-primary').forEach(btn => {
    btn.style.transition = 'transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px)`;
    };
    
    const onMouseLeave = () => {
      btn.style.transform = '';
    };
    
    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);
    
    magneticButtonsCleanup.push(() => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    });
  });
}

function destroyMagneticButtons() {
  magneticButtonsCleanup.forEach(cleanup => cleanup());
  magneticButtonsCleanup.length = 0;
}

// ── Neon glow trail effect ──────────────────────────────────
const glowTrailCleanup = [];

function initNeonGlowTrail() {
  document.querySelectorAll('.section-title, .hero-title').forEach(el => {
    el.classList.add('neon-glow-trail');
    
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };
    
    el.addEventListener('mousemove', onMouseMove);
    glowTrailCleanup.push(() => {
      el.removeEventListener('mousemove', onMouseMove);
    });
  });
}

function destroyNeonGlowTrail() {
  glowTrailCleanup.forEach(cleanup => cleanup());
  glowTrailCleanup.length = 0;
}

onMounted(() => {
  initScrollAnimations();
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Small delay so all v-for DOM is ready
  setTimeout(() => {
    initTilts();
    initMagneticButtons();
    initNeonGlowTrail();
  }, 150);
});

onUnmounted(() => {
  scrollCtx?.revert();
  destroyTilts();
  destroyMagneticButtons();
  destroyNeonGlowTrail();
  ScrollTrigger.getAll().forEach(t => t.kill());
  window.removeEventListener('scroll', handleScroll);
  clearTimeout(scrollTimeout);
});

const features = [
  {
    id: 'safety', icon: '🛡️', title: 'Safety First',
    description: 'Real-time ride tracking, SOS button, and verified drivers for peace of mind.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Verified', badgeClass: 'badge-blue'
  },
  {
    id: 'speed', icon: '⚡', title: 'Lightning Fast',
    description: 'Average pickup time under 3 minutes. We\'re always nearby when you need us.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: '< 3 min', badgeClass: 'badge-violet'
  },
  {
    id: 'price', icon: '💎', title: 'Transparent Pricing',
    description: 'No hidden fees. Know your fare before you book. Price locked, no surprises.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'No Surge*', badgeClass: 'badge-pink'
  },
  {
    id: 'eco', icon: '🌱', title: 'Green Rides',
    description: 'EV options available. Choose eco-friendly rides and reduce your carbon footprint.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Eco Option', badgeClass: 'badge-green'
  },
  {
    id: 'rewards', icon: '🎁', title: 'Ride Rewards',
    description: 'Earn PrimePoints on every ride. Redeem for free rides, upgrades & more.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Points', badgeClass: 'badge-blue'
  },
  {
    id: 'schedule', icon: '📅', title: 'Schedule Ahead',
    description: 'Plan your trips in advance. Book up to 7 days ahead for stress-free travel.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Pre-book', badgeClass: 'badge-violet'
  },
];

const carFeatures = [
  'Thoroughly sanitized before every ride',
  'GPS tracked for your safety',
  'Climate-controlled cabin',
  'Professional, rated drivers only',
  'Leather seats & premium sound system',
];

const stats = [
  { icon: '🚗', value: '2M+', label: 'Happy Riders', percentage: '85%', color: 'var(--neon-blue)' },
  { icon: '⭐', value: '4.9', label: 'Average Rating', percentage: '98%', color: 'var(--neon-violet)' },
  { icon: '🌆', value: '50+', label: 'Cities Covered', percentage: '70%', color: 'var(--neon-pink)' },
  { icon: '🏎️', value: '15K+', label: 'Active Drivers', percentage: '90%', color: 'var(--neon-green)' },
];

const steps = [
  { step: '01', icon: '📍', title: 'Set Your Location', description: 'Enter your pickup point and destination. Our AI suggests the best route.' },
  { step: '02', icon: '🎯', title: 'Choose Your Ride', description: 'Pick from Economy, Premium, XL, or Luxury. See price before you book.' },
  { step: '03', icon: '🚀', title: 'Ride & Arrive', description: 'Your driver arrives in minutes. Track live, pay seamlessly, rate your trip.' },
];

const rideTypes = [
  { id: 'economy', name: 'Economy', icon: '🚗', description: 'Affordable daily rides', basePrice: 80, gradient: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', features: ['AC', 'Budget-friendly', 'Quick'] },
  { id: 'premium', name: 'Premium', icon: '⭐', description: 'Luxury for every journey', basePrice: 150, gradient: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', features: ['AC', 'Premium Car', 'Top Drivers'] },
  { id: 'xl', name: 'XL', icon: '🚐', description: 'Space for groups & luggage', basePrice: 200, gradient: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', features: ['AC', 'SUV', '6 Seats'] },
  { id: 'luxury', name: 'Luxury', icon: '💎', description: 'First-class experience', basePrice: 350, gradient: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))', features: ['AC', 'BMW/Benz', 'Chauffeur'] },
];

const testimonials = [
  { name: 'Priya Sharma', city: 'Bangalore', rating: 5, avatar: '👩', text: 'PrimeRide completely changed how I commute. The drivers are always professional and the app is so smooth. Never going back to other services!' },
  { name: 'Arjun Mehta', city: 'Mumbai', rating: 5, avatar: '👨', text: 'Booked a premium ride for my client meeting. The car was spotless, driver was on time, and the ride was like floating on air. 10/10 would recommend.' },
  { name: 'Sneha Patel', city: 'Delhi', rating: 5, avatar: '👩‍💼', text: 'The safety features give me so much peace of mind traveling late at night. Live tracking and the SOS button are genuinely useful. Love this app!' },
];


</script>

<style scoped>
.home-page {
  position: relative;
  z-index: 2;
}

/* ===== HERO ===== */
.hero-section {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 6rem 4rem 4rem;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-3d-col {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.hero-form-col {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 460px;
  justify-self: end;
}

.hero-badge {
  margin-bottom: 0.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: var(--neon-green);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.5s ease infinite;
  box-shadow: 0 0 8px var(--neon-green);
}

.hero-title {
  font-size: clamp(2.8rem, 5vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.word-switcher-container {
  display: inline-block;
  position: relative;
  overflow: hidden;
  height: 1.15em;
  min-width: 8ch;
  line-height: 1.15em;
  margin-left: 0.5rem;
  vertical-align: bottom;
}

.word-switcher {
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  animation: wordSlide 12s cubic-bezier(0.76, 0, 0.24, 1) infinite;
}

.word-switcher span {
  display: block;
  height: 1.15em;
  line-height: 1.15em;
  white-space: nowrap;
}

@keyframes wordSlide {
  0%, 16%  { transform: translateY(0); }
  20%, 36% { transform: translateY(-20%); }
  40%, 56% { transform: translateY(-40%); }
  60%, 76% { transform: translateY(-60%); }
  80%, 96% { transform: translateY(-80%); }
  100%     { transform: translateY(0); }
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 480px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-hero {
  padding: 1rem 2.5rem;
  font-size: 1.05rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.2rem 1.5rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  width: fit-content;
}

.hero-stat { text-align: center; }

.stat-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero-stat-divider {
  width: 1px;
  height: 2.5rem;
  background: var(--glass-border);
}

.quick-book {
  padding: 1.8rem;
  border-color: rgba(255, 255, 255, 0.15);
}

.quick-book-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.quick-book-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
}

.quick-book-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.route-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
}

.route-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 80, 80, 0.2), #ff5050, rgba(255, 80, 80, 0.2), transparent);
  background-size: 200% 100%;
  animation: routeEnergyFlow 2.2s linear infinite;
  opacity: 0.85;
}

@keyframes routeEnergyFlow {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.route-icon {
  font-size: 1rem;
  animation: spin 4s linear infinite;
  display: inline-block;
}

.hero-globe-container {
  height: 580px;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: visible;
}

.cyber-globe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber-globe-glow {
  position: absolute;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%);
  filter: blur(40px);
  animation: pulse 4s ease-in-out infinite;
}

.cyber-globe-sphere {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(10, 10, 10, 0.8) 0%, rgba(5, 5, 5, 0.98) 70%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.08), 
              0 0 30px rgba(255, 255, 255, 0.04);
}

.cyber-globe-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.cyber-globe-ring.ring-1 {
  width: 380px;
  height: 140px;
  transform: rotateX(70deg) rotateY(15deg);
  animation: spin 15s linear infinite;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.08);
  border-top-color: var(--neon-blue);
}

.cyber-globe-ring.ring-2 {
  width: 360px;
  height: 180px;
  transform: rotateX(60deg) rotateY(-30deg);
  animation: spin 20s linear infinite reverse;
  border-top-color: var(--neon-violet);
}

.cyber-globe-ring.ring-3 {
  width: 400px;
  height: 100px;
  transform: rotateX(80deg) rotateY(45deg);
  animation: spin 25s linear infinite;
  border-top-color: var(--neon-pink);
}


/* ===== FEATURES ===== */
.features-section { background: transparent; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: default;
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.feature-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

.feature-tag { width: fit-content; margin-top: auto; }

/* ===== CAR SECTION ===== */
.car-section-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

.car-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.car-features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.car-feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.check-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.15);
  border: 1px solid rgba(0, 212, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: var(--neon-blue);
  flex-shrink: 0;
}

.showcase-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem auto;
}

.illustration-showcase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
}

@media (max-width: 900px) {
  .illustration-showcase-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.illustration-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-xl);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s, border-color 0.4s;
  cursor: pointer;
  height: 100%;
}

.illustration-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4), 
    0 0 30px rgba(255, 255, 255, 0.08);
}

.illustration-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1.2;
  overflow: hidden;
  background: #020408;
}

.illustration-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.4s ease;
  filter: contrast(1.05) brightness(0.98);
}

.illustration-card:hover .illustration-img {
  transform: scale(1.08);
  filter: contrast(1.1) brightness(1.05) saturate(1.1);
}

.illustration-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(5, 8, 15, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--neon-blue);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.illustration-card:nth-child(2) .illustration-badge {
  color: var(--neon-violet);
}

.illustration-card:nth-child(3) .illustration-badge {
  color: var(--neon-pink);
}

.illustration-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.illustration-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
}

.illustration-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}


/* ===== STATS ===== */
.stats-section {
  background: transparent;
  position: relative;
  overflow: hidden;
}

.stats-globe-bg {
  position: absolute;
  top: 50%;
  right: -80px;
  transform: translateY(-50%);
  width: 420px;
  height: 420px;
  opacity: 0.55;
  pointer-events: none;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
}

.stat-icon { font-size: 2rem; margin-bottom: 0.75rem; }

.stat-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
}

.stat-bar {
  height: 4px;
  background: var(--glass-border);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  border-radius: var(--radius-full);
  box-shadow: 0 0 8px currentColor;
  animation: shimmer 2s ease infinite;
  background-size: 200% auto;
}

/* ===== HOW IT WORKS ===== */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
}

.step-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  position: relative;
  transition: all var(--transition-med);
}

.step-card:hover {
  border-color: var(--glass-border-strong);
  background: var(--bg-card-hover);
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), var(--shadow-glow-blue);
}

.step-number {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 900;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.step-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.step-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

/* ===== RIDE TYPES ===== */
.rides-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.ride-card { cursor: pointer; }
.ride-card-inner { padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }

.ride-card.active .ride-card-inner {
  box-shadow: var(--shadow-glow-blue), var(--shadow-card);
}

.ride-icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.ride-icon { font-size: 1.6rem; }
.ride-name { font-size: 1.15rem; font-weight: 700; }
.ride-desc { font-size: 0.85rem; color: var(--text-secondary); }

.ride-price {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  margin: 0.25rem 0;
}

.price-from { font-size: 0.75rem; color: var(--text-muted); }
.price-value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ride-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.ride-feature-tag {
  padding: 0.2rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  color: var(--text-muted);
}

.ride-book-btn {
  width: 100%;
  justify-content: center;
  margin-top: auto;
  font-size: 0.9rem;
  padding: 0.7rem;
}

/* ===== TESTIMONIALS ===== */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stars { color: #ffd700; font-size: 1rem; letter-spacing: 2px; }

.testimonial-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  font-style: italic;
  flex: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--glass-border);
}

.author-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--glass);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  border: 2px solid var(--glass-border-strong);
}

.author-name { font-weight: 700; font-size: 0.95rem; }
.author-city { font-size: 0.8rem; color: var(--text-muted); }

/* ===== CTA ===== */
.cta-section { padding-bottom: 4rem; }

.cta-card {
  text-align: center;
  padding: 5rem 3rem;
  position: relative;
  overflow: hidden;
  border-color: rgba(255, 255, 255, 0.1);
}

.cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.cta-content { position: relative; z-index: 1; }
.cta-title { font-size: clamp(2rem, 4vw, 3.5rem); margin-bottom: 1rem; }
.cta-subtitle { color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 2rem; }

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.cta-badges {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-badge {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1100px) {
  .hero-section { grid-template-columns: 1fr; padding: 7rem 2rem 4rem; }
  .hero-globe-container { height: 380px; }
  .car-section-inner { grid-template-columns: 1fr; }
  .car-canvas-container { height: 320px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .rides-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero-section { padding: 6rem 1.5rem 3rem; grid-template-columns: 1fr; }
  .hero-3d-col { display: none; }
  .steps-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .rides-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-stats { width: 100%; justify-content: center; }
  .hero-actions { flex-direction: column; }
  .btn-hero { width: 100%; justify-content: center; text-align: center; }
  .cta-card { padding: 3rem 1.5rem; }
  .stats-globe-bg { opacity: 0.08; width: 200px; height: 200px; }
}

/* ===== 3D GLOBE IN STATS BACKGROUND ===== */
.stats-section {
  position: relative;
  overflow: hidden;
}

.stats-globe-bg {
  position: absolute;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  width: 360px;
  height: 360px;
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}

.stats-section .container {
  position: relative;
  z-index: 1;
}
</style>
