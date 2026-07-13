<template>
  <div id="primeride-app">
    <!-- Splash intro screen -->
    <SplashScreen v-if="showSplash" @done="showSplash = false" />

    <Navbar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" width="44" height="22" fill="none">
                <defs>
                  <linearGradient id="footerCarGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#ff4d4d"/>
                    <stop offset="100%" stop-color="#990000"/>
                  </linearGradient>
                </defs>
                <rect x="4" y="14" width="56" height="11" rx="4" fill="url(#footerCarGrad)"/>
                <path d="M14 14 Q18 5 28 5 L40 5 Q50 5 52 14Z" fill="url(#footerCarGrad)"/>
                <path d="M17 14 Q20 7 28 7 L38 7 Q46 7 49 14Z" fill="rgba(255,255,255,0.12)"/>
                <circle cx="13" cy="25" r="5" fill="#050505" stroke="#111111" stroke-width="1.5"/>
                <circle cx="13" cy="25" r="2" fill="#111111" stroke="#222222" stroke-width="0.8"/>
                <circle cx="49" cy="25" r="5" fill="#050505" stroke="#111111" stroke-width="1.5"/>
                <circle cx="49" cy="25" r="2" fill="#111111" stroke="#222222" stroke-width="0.8"/>
              </svg>
              <span class="logo-text">PrimeRide</span>
            </div>
            <p class="footer-tagline">Your premium ride-hailing experience. Wherever you go, we take you there in style.</p>
            <div class="footer-socials">
              <a href="#" class="social-btn" id="footer-twitter">𝕏</a>
              <a href="#" class="social-btn" id="footer-instagram">📸</a>
              <a href="#" class="social-btn" id="footer-linkedin">in</a>
            </div>
          </div>
          <div class="footer-links">
            <h4>Company</h4>
            <ul>
              <li><RouterLink to="/about">About Us</RouterLink></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>Riders</h4>
            <ul>
              <li><RouterLink to="/book">Book a Ride</RouterLink></li>
              <li><a href="#">Safety</a></li>
              <li><a href="#">Rewards</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div class="footer-links">
            <h4>Drivers</h4>
            <ul>
              <li><a href="#">Become a Driver</a></li>
              <li><a href="#">Driver App</a></li>
              <li><a href="#">Earnings</a></li>
              <li><a href="#">Insurance</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="neon-line"></div>
          <div class="footer-bottom-content">
            <p>© 2026 PrimeRide. All rights reserved.</p>
            <div class="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import SplashScreen from './components/SplashScreen.vue';
import { RouterView, RouterLink } from 'vue-router';

const showSplash = ref(true);

const colors = ['red', 'yellow', 'white'];
const currentColorIndex = ref(-1);

function handleGlobalClickOrTouch() {
  currentColorIndex.value = (currentColorIndex.value + 1) % colors.length;
  const color = colors[currentColorIndex.value];
  document.body.setAttribute('data-text-color', color);
}

onMounted(() => {
  window.addEventListener('click', handleGlobalClickOrTouch);
  window.addEventListener('touchstart', handleGlobalClickOrTouch, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('click', handleGlobalClickOrTouch);
  window.removeEventListener('touchstart', handleGlobalClickOrTouch);
});
</script>

<style scoped>
.footer {
  background: #000000;
  border-top: 1px solid var(--glass-border);
  padding: 5rem 0 2rem;
  margin-top: 4rem;
  position: relative;
  z-index: 10;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 8px var(--neon-blue));
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff6666 0%, #ff0000 50%, #990000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.footer-tagline {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.footer-socials {
  display: flex;
  gap: 0.75rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  color: var(--text-secondary);
}

.social-btn:hover {
  border-color: var(--neon-blue);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-glow-blue);
  transform: translateY(-2px);
}

.footer-links h4 {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--neon-blue);
  margin-bottom: 1.2rem;
}

.footer-links ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.footer-links ul li a {
  color: var(--text-muted);
  font-size: 0.9rem;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.footer-links ul li a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  margin-top: 2rem;
}

.footer-bottom-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-content p {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  color: var(--text-muted);
  font-size: 0.85rem;
  transition: color var(--transition-fast);
  text-decoration: none;
}

.footer-legal a:hover { color: var(--neon-blue); }

/* Page transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-bottom-content { flex-direction: column; align-items: flex-start; }
  .footer-legal { gap: 1rem; }
}

@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; }
}
</style>
