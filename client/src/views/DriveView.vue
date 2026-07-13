<template>
  <div class="drive-page">
    <ParticleField />

    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section" id="hero">
      <div class="hero-content">
        <div class="hero-text animate-fade-up">
          <div class="hero-badge">
            <span class="badge badge-blue">
              <span class="badge-dot"></span>
              Flexible Hours, Max Earnings
            </span>
          </div>
          <h1 class="hero-title">
            <span>Drive with</span>
            <span class="text-gradient"> PrimeRide</span>
            <br />
            <span>Be Your Own </span>
            <span class="text-gradient-pink">Boss</span>
          </h1>
          <p class="hero-subtitle animate-fade-up delay-2">
            Join the elite circle of professional driver-partners. Take home 
            up to 90% of fares. Set your own schedule, get paid weekly, 
            and access premium rider clienteles.
          </p>

          <div class="hero-stats animate-fade-up delay-4">
            <div class="hero-stat">
              <span class="stat-num">₹45k+</span>
              <span class="stat-label">Avg. Weekly</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="stat-num">0%</span>
              <span class="stat-label">Hidden Fees</span>
            </div>
            <div class="hero-stat-divider"></div>
            <div class="hero-stat">
              <span class="stat-num">24/7</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>

        <!-- Drive Sign Up Panel -->
        <div class="quick-book glass-card animate-fade-up delay-3" id="signup-panel">
          <div class="quick-book-header">
            <h3>Start Earning</h3>
            <span class="badge badge-green">Open</span>
          </div>
          <form @submit.prevent="submitForm" class="quick-book-form">
            <div class="input-group">
              <label class="input-label">🧑 Full Name</label>
              <input
                v-model="name"
                type="text"
                class="input-field"
                placeholder="Enter your name"
                required
                id="driver-name"
              />
            </div>
            <div class="input-group">
              <label class="input-label">📞 Phone Number</label>
              <input
                v-model="phone"
                type="tel"
                class="input-field"
                placeholder="10-digit number"
                pattern="[0-9]{10}"
                required
                id="driver-phone"
              />
            </div>
            <div class="input-group">
              <label class="input-label">🌆 City</label>
              <input
                v-model="city"
                type="text"
                class="input-field"
                placeholder="E.g., Bangalore"
                required
                id="driver-city"
              />
            </div>
            <div class="input-group">
              <label class="input-label">🚗 Vehicle Class</label>
              <select v-model="vehicleClass" class="input-field" required id="driver-vehicle">
                <option value="" disabled>Select vehicle category</option>
                <option value="economy">Economy Sedan</option>
                <option value="premium">Premium SUV</option>
                <option value="luxury">Luxury Chauffeur Class</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; margin-top:0.5rem" id="driver-submit">
              Apply to Drive →
            </button>
          </form>
        </div>
      </div>

      <!-- Cyber Radar Removed -->
    </section>

    <!-- ===== BENEFITS SECTION ===== -->
    <section class="section features-section" id="benefits">
      <div class="container">
        <div class="section-header animate-fade-up">
          <span class="section-eyebrow">Driver Benefits</span>
          <h2 class="section-title">Designed for <span class="text-gradient">Your Success</span></h2>
          <p class="section-subtitle">We treat our driver-partners with the same respect and care as our premium riders.</p>
        </div>
        <div class="features-grid">
          <div
            v-for="(benefit, i) in benefits"
            :key="benefit.id"
            class="feature-card glass-card"
            :class="`delay-${i + 1}`"
            :id="`benefit-card-${benefit.id}`"
          >
            <div class="feature-icon" :style="{ background: benefit.gradient }">
              {{ benefit.icon }}
            </div>
            <h3 class="feature-title">{{ benefit.title }}</h3>
            <p class="feature-desc">{{ benefit.description }}</p>
            <div class="feature-tag badge badge-blue">{{ benefit.tag }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <Transition name="modal">
      <div class="modal-overlay" v-if="submitted" id="success-modal">
        <div class="modal-card glass-card">
          <div class="modal-success-icon">🎉</div>
          <h2 class="modal-title">Application Submitted!</h2>
          <p style="color: var(--text-secondary); margin: 1rem 0 2rem;">
            Thank you, {{ name }}. Our onboarding team will contact you at <strong>{{ phone }}</strong> within 24 hours to schedule document verification.
          </p>
          <div class="modal-actions">
            <button @click="closeModal" class="btn btn-primary" id="modal-close-btn">Awesome</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ParticleField from '../components/ParticleField.vue';

const name = ref('');
const phone = ref('');
const city = ref('');
const vehicleClass = ref('');
const submitted = ref(false);

const benefits = [
  {
    id: 'payouts', icon: '💰', title: 'Weekly Payouts',
    description: 'Direct deposits every Tuesday. Track your daily trip details and earnings live in the partner dashboard.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Weekly'
  },
  {
    id: 'hours', icon: '⏱️', title: 'Flexible Schedule',
    description: 'You decide when and how long you drive. No minimum hours, no locking quotas. Absolute freedom.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Flexible'
  },
  {
    id: 'insurance', icon: '🛡️', title: 'Health & Accident Insurance',
    description: 'Comprehensive accident protection, medical coverage, and family health benefits from day one.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Protected'
  },
  {
    id: 'clients', icon: '💎', title: 'Premium Riders',
    description: 'Access to business executives and five-star travelers. Enjoy polite client interactions and higher tips.',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
    tag: 'Elite Fleet'
  }
];

function submitForm() {
  submitted.value = true;
}

function closeModal() {
  submitted.value = false;
  name.value = '';
  phone.value = '';
  city.value = '';
  vehicleClass.value = '';
}
</script>

<style scoped>
.drive-page {
  position: relative;
  z-index: 2;
}

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

select.input-field {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2em;
  padding-right: 2.5rem;
  color: var(--text-primary);
}

select.input-field option {
  background: #000000;
  color: var(--text-primary);
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
  overflow: hidden;
}

.radar-sweep {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, rgba(255, 255, 255, 0.12) 0deg, transparent 90deg, transparent 360deg);
  animation: spin 6s linear infinite;
  transform-origin: center;
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

.features-section { background: transparent; }

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

.feature-tag {
  width: fit-content;
  margin-top: auto;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-card {
  max-width: 480px;
  width: 100%;
  padding: 2.5rem;
  text-align: center;
}

.modal-success-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce-in 0.6s ease;
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.modal-actions .btn {
  flex: 1;
  justify-content: center;
}

@keyframes bounce-in {
  0% { transform: scale(0) rotate(-10deg); opacity: 0; }
  60% { transform: scale(1.1) rotate(2deg); opacity: 1; }
  to { transform: scale(1) rotate(0); }
}

@media (max-width: 1100px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding: 7rem 2rem 4rem;
  }
  .hero-globe-container {
    height: 380px;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 6rem 1.5rem 3rem;
  }
  .hero-stats {
    width: 100%;
    justify-content: center;
  }
}
</style>
