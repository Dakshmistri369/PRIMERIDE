<template>
  <div class="about-page">
    <ParticleField />

    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section" id="hero">
      <div class="hero-content">
        <div class="hero-text animate-fade-up">
          <div class="hero-badge">
            <span class="badge badge-blue">
              <span class="badge-dot"></span>
              Our Story
            </span>
          </div>
          <h1 class="hero-title">
            <span>Reinventing the</span>
            <span class="text-gradient"> Way</span>
            <br />
            <span>India </span>
            <span class="text-gradient-pink">Rides</span>
          </h1>
          <p class="hero-subtitle animate-fade-up delay-2">
            PrimeRide was born from a simple idea: everyone deserves a premium ride experience. 
            Founded in 2023, we've grown from a small startup in Bangalore to a national platform 
            serving 2 million+ rides across 50 cities.
          </p>
          <div class="hero-actions animate-fade-up delay-3">
            <RouterLink to="/book" class="btn btn-primary btn-hero" id="about-book-cta">Book a Ride</RouterLink>
            <a href="#team" class="btn btn-secondary btn-hero" id="about-team-link">Meet the Team ↓</a>
          </div>
        </div>
      </div>

      <!-- Right Side Visual Card Group -->
      <div class="hero-globe-container animate-scale-in delay-2">
        <div class="about-hero-visual">
          <div class="mission-card glass-card">
            <div class="mission-icon">🚀</div>
            <h3>Our Mission</h3>
            <p>Make premium, safe, and affordable rides accessible to everyone — from daily commuters to business travelers.</p>
          </div>
          <div class="vision-card glass-card">
            <div class="mission-icon">🌍</div>
            <h3>Our Vision</h3>
            <p>A future where every journey is a great experience — zero emissions, zero friction, maximum comfort.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="section" id="impact">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Our Impact</span>
          <h2 class="section-title">Numbers That <span class="text-gradient">Speak Louder</span></h2>
        </div>
        <div class="impact-grid">
          <div
            v-for="(stat, i) in impactStats"
            :key="stat.label"
            class="impact-card glass-card animate-fade-up"
            :class="`delay-${i + 1}`"
            :id="`impact-stat-${i}`"
          >
            <div class="impact-icon">{{ stat.icon }}</div>
            <div class="impact-value text-gradient">{{ stat.value }}</div>
            <div class="impact-label">{{ stat.label }}</div>
            <p class="impact-desc">{{ stat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section" id="values">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">What Drives Us</span>
          <h2 class="section-title">Our Core <span class="text-gradient-pink">Values</span></h2>
        </div>
        <div class="values-grid">
          <div
            v-for="(val, i) in values"
            :key="val.title"
            class="value-card animate-fade-up"
            :class="`delay-${i + 1}`"
            :id="`value-card-${i}`"
          >
            <div class="value-number">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="value-icon">{{ val.icon }}</div>
            <h3 class="value-title">{{ val.title }}</h3>
            <p class="value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section" id="team">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">The People</span>
          <h2 class="section-title">Meet the <span class="text-gradient">Team</span></h2>
          <p class="section-subtitle">Passionate builders, designers, and dreamers who are changing how India moves.</p>
        </div>
        <div class="team-grid">
          <div
            v-for="(member, i) in team"
            :key="member.name"
            class="team-card glass-card animate-fade-up"
            :class="`delay-${i + 1}`"
            :id="`team-member-${i}`"
          >
            <div class="team-avatar" :style="{ background: member.gradient }">{{ member.avatar }}</div>
            <h3 class="team-name">{{ member.name }}</h3>
            <div class="team-role badge badge-blue">{{ member.role }}</div>
            <p class="team-bio">{{ member.bio }}</p>
            <div class="team-socials">
              <a href="#" class="social-btn" :id="`team-linkedin-${i}`">in</a>
              <a href="#" class="social-btn" :id="`team-twitter-${i}`">𝕏</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section" id="timeline">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Journey So Far</span>
          <h2 class="section-title">Our <span class="text-gradient">Milestones</span></h2>
        </div>
        <div class="timeline">
          <div
            v-for="(event, i) in timeline"
            :key="event.year + event.title"
            :class="['timeline-item', 'animate-fade-up', { right: i % 2 === 1 }, `delay-${i + 1}`]"
            :id="`timeline-event-${i}`"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content glass-card">
              <div class="timeline-year badge badge-violet">{{ event.year }}</div>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-desc">{{ event.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Join CTA -->
    <section class="section" id="join">
      <div class="container">
        <div class="join-card glass-card animate-fade-up">
          <div class="join-bg-glow"></div>
          <h2 class="join-title">Join the <span class="text-gradient">Revolution</span></h2>
          <p class="join-subtitle">Whether you're a rider, driver, or investor — there's a place for you at PrimeRide.</p>
          <div class="join-actions">
            <RouterLink to="/book" class="btn btn-primary btn-hero" id="join-rider-cta">🚗 Ride with Us</RouterLink>
            <RouterLink to="/drive" class="btn btn-secondary btn-hero" id="join-driver-cta">🧑‍💼 Drive with Us</RouterLink>
            <a href="#" class="btn btn-ghost btn-hero" id="join-investor-cta">💼 Invest in PrimeRide</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import ParticleField from '../components/ParticleField.vue';

const impactStats = [
  { icon: '👥', value: '2M+', label: 'Happy Riders', desc: 'And growing by 50K new users every month.' },
  { icon: '🚗', value: '15K+', label: 'Active Drivers', desc: 'Verified, trained, and top-rated professionals.' },
  { icon: '🌆', value: '50+', label: 'Cities Covered', desc: 'Expanding to 100 cities by 2026.' },
  { icon: '⭐', value: '4.9/5', label: 'Average Rating', desc: '98% of rides rated 4 stars or above.' },
  { icon: '🌱', value: '30%', label: 'EV Fleet', desc: '30% of our rides are now zero-emission EVs.' },
  { icon: '💰', value: '₹5Cr+', label: 'Driver Earnings', desc: 'Paid out to drivers every single month.' },
];

const values = [
  { icon: '🛡️', title: 'Safety Above All', desc: 'Every driver is background-verified. Every ride is GPS tracked. Your safety is our non-negotiable priority.' },
  { icon: '⚡', title: 'Speed & Reliability', desc: 'Sub-3-minute pickups. 99.9% app uptime. We show up every single time.' },
  { icon: '💎', title: 'Premium Experience', desc: 'From clean vehicles to professional drivers, we raise the bar for what a ride should feel like.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We\'re committed to having a fully EV fleet by 2028 and planting a tree for every 100 rides.' },
  { icon: '🤝', title: 'Driver First', desc: 'Our drivers are partners, not contractors. Fair earnings, flexible hours, health insurance.' },
  { icon: '🔓', title: 'Radical Transparency', desc: 'No hidden fees. No surprise charges. What you see is exactly what you pay.' },
];

const team = [
  {
    name: 'Rohan Kapoor', role: 'CEO & Co-Founder', avatar: '👨‍💼',
    bio: 'Ex-Ola, IIT Bombay. Built and scaled products used by 50M+ people. Passionate about sustainable mobility.',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(123,97,255,0.3))',
  },
  {
    name: 'Ananya Singh', role: 'CTO & Co-Founder', avatar: '👩‍💻',
    bio: 'Ex-Google, MIT grad. Loves building distributed systems at scale. The brains behind our real-time matching algorithm.',
    gradient: 'linear-gradient(135deg, rgba(123,97,255,0.3), rgba(255,61,154,0.3))',
  },
  {
    name: 'Vikram Nair', role: 'Head of Design', avatar: '🧑‍🎨',
    bio: 'Former Apple designer. Believes every pixel matters. Led the design of PrimeRide\'s award-winning experience.',
    gradient: 'linear-gradient(135deg, rgba(255,61,154,0.3), rgba(255,140,66,0.3))',
  },
  {
    name: 'Priya Menon', role: 'VP Operations', avatar: '👩‍💼',
    bio: 'Ex-Uber, Harvard MBA. Scaled operations from 2 cities to 50 in 18 months. Master of chaos management.',
    gradient: 'linear-gradient(135deg, rgba(0,255,157,0.3), rgba(0,212,255,0.3))',
  },
];

const timeline = [
  { year: '2023 Q1', title: 'PrimeRide Founded', desc: 'Started in a tiny Bangalore apartment with 3 drivers and a dream to transform urban mobility.' },
  { year: '2023 Q3', title: 'Seed Funding ₹15Cr', desc: 'Raised seed round from top VCs. Expanded to Bangalore, Hyderabad, and Pune.' },
  { year: '2024 Q1', title: '100K Rides Milestone', desc: 'Reached 100,000 rides in 90 days. Launched premium and XL categories.' },
  { year: '2024 Q3', title: '25 Cities, 10K Drivers', desc: 'National expansion. Onboarded 10,000 drivers and launched driver health insurance.' },
  { year: '2025 Q1', title: 'Series A — ₹100Cr', desc: 'Major funding round. Launched EV initiative and AI-powered surge prediction.' },
  { year: '2026', title: '50 Cities & Beyond', desc: 'Serving 2M+ riders with India\'s highest-rated ride-hailing experience. Just getting started.' },
];
</script>

<style scoped>
.about-page {
  position: relative;
  z-index: 2;
  padding-top: 5rem;
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

.hero-stat {
  text-align: center;
}

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

.hero-globe-container {
  height: 580px;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: visible;
  display: flex;
  align-items: center;
}

.about-hero-visual {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.mission-card, .vision-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mission-icon { font-size: 2rem; }

/* Impact */
.impact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.impact-card {
  text-align: center;
  padding: 2.5rem 1.5rem;
}

.impact-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
.impact-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.3rem;
}
.impact-label {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}
.impact-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Values */
.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.value-card {
  padding: 2rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  transition: all var(--transition-med);
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-blue);
  opacity: 0;
  transition: opacity var(--transition-med);
}

.value-card:hover {
  border-color: rgba(0,212,255,0.3);
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover), var(--shadow-glow-blue);
}

.value-number {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 900;
  opacity: 0.1;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.value-icon { font-size: 2rem; margin-bottom: 0.75rem; }
.value-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
.value-desc { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65; }

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.team-card {
  text-align: center;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.team-avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 2px solid var(--glass-border-strong);
  margin-bottom: 0.25rem;
}

.team-name { font-size: 1.1rem; font-weight: 700; }
.team-bio { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; flex: 1; }

.team-socials { display: flex; gap: 0.5rem; margin-top: 0.25rem; }
.social-btn {
  width: 34px; height: 34px;
  border-radius: var(--radius-sm);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
  text-decoration: none;
}

.social-btn:hover {
  border-color: var(--neon-blue);
  background: rgba(0,212,255,0.1);
  color: var(--neon-blue);
}

/* Timeline */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--neon-blue), var(--neon-violet));
  transform: translateX(-50%);
  opacity: 0.4;
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
}

.timeline-item .timeline-content { grid-column: 1; text-align: right; }
.timeline-item .timeline-dot { grid-column: 2; }
.timeline-item.right .timeline-content { grid-column: 3; text-align: left; grid-row: 1; }
.timeline-item.right .timeline-dot { grid-column: 2; }

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--neon-blue);
  box-shadow: 0 0 12px var(--neon-blue);
  justify-self: center;
  position: relative;
}

.timeline-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(0,212,255,0.3);
  animation: ripple 2s ease infinite;
}

.timeline-content {
  padding: 1.25rem 1.5rem;
}

.timeline-year { margin-bottom: 0.5rem; }
.timeline-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
.timeline-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }

/* Join CTA */
.join-card {
  text-align: center;
  padding: 5rem 3rem;
  position: relative;
  overflow: hidden;
}

.join-bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%);
  pointer-events: none;
}

.join-title { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; position: relative; z-index: 1; }
.join-subtitle { color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 2.5rem; position: relative; z-index: 1; }

.join-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

@media (max-width: 1100px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
  .impact-grid { grid-template-columns: repeat(2, 1fr); }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .about-hero-inner { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: 1fr; }
  .values-grid { grid-template-columns: 1fr; }
  .impact-grid { grid-template-columns: 1fr; }
  .timeline::before { left: 20px; }
  .timeline-item { grid-template-columns: 30px 1fr; }
  .timeline-item .timeline-content { grid-column: 2; text-align: left; }
  .timeline-item.right .timeline-content { grid-column: 2; grid-row: auto; }
  .timeline-dot { grid-column: 1; }
  .join-actions { flex-direction: column; align-items: center; }
  .btn-hero { width: 100%; justify-content: center; }
}
</style>
