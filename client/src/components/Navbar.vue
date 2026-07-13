<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': menuOpen }">
    <div class="container navbar-inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar-logo" id="nav-logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" width="54" height="27" fill="none">
            <defs>
              <linearGradient id="carGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ff4d4d"/>
                <stop offset="100%" stop-color="#990000"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <!-- Car body -->
            <rect x="4" y="14" width="56" height="11" rx="4" fill="url(#carGrad)" filter="url(#glow)"/>
            <!-- Cabin roof -->
            <path d="M14 14 Q18 5 28 5 L40 5 Q50 5 52 14Z" fill="url(#carGrad)" filter="url(#glow)"/>
            <!-- Windshield -->
            <path d="M17 14 Q20 7 28 7 L38 7 Q46 7 49 14Z" fill="rgba(255,255,255,0.15)"/>
            <!-- Windows -->
            <rect x="19" y="7.5" width="8" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
            <rect x="29" y="7.5" width="8" height="6" rx="1" fill="rgba(255,255,255,0.2)"/>
            <!-- Front wheel -->
            <circle cx="13" cy="25" r="5" fill="#050505" stroke="#111111" stroke-width="1.5"/>
            <circle cx="13" cy="25" r="2.5" fill="#000000" stroke="#222222" stroke-width="0.8"/>
            <!-- Rear wheel -->
            <circle cx="49" cy="25" r="5" fill="#050505" stroke="#111111" stroke-width="1.5"/>
            <circle cx="49" cy="25" r="2.5" fill="#000000" stroke="#222222" stroke-width="0.8"/>
            <!-- Headlights -->
            <ellipse cx="59" cy="18" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.9"/>
            <ellipse cx="59" cy="21" rx="2" ry="1" fill="#cccccc" opacity="0.7"/>
            <!-- Tail lights -->
            <rect x="4" y="17" width="3" height="4" rx="1" fill="#ffffff" opacity="0.9"/>
            <!-- Speed lines -->
            <line x1="0" y1="16" x2="6" y2="16" stroke="#888888" stroke-width="1.2" opacity="0.6"/>
            <line x1="0" y1="19" x2="4" y2="19" stroke="#888888" stroke-width="0.8" opacity="0.4"/>
          </svg>
        </div>
        <span class="logo-name cyber-glitch" data-text="PrimeRide">PrimeRide</span>
      </RouterLink>

      <!-- Desktop Nav Links -->
      <div class="navbar-links" ref="navLinksRef" @mouseleave="resetIndicator">
        <div class="nav-indicator" :style="indicatorStyle"></div>
        <RouterLink to="/" class="nav-link" @mouseenter="moveIndicator($event)" id="nav-home">Home</RouterLink>
        <RouterLink to="/book" class="nav-link" @mouseenter="moveIndicator($event)" id="nav-book">Book Ride</RouterLink>
        <RouterLink to="/about" class="nav-link" @mouseenter="moveIndicator($event)" id="nav-about">About</RouterLink>
        <RouterLink to="/drive" class="nav-link" @mouseenter="moveIndicator($event)" id="nav-driver">Drive with Us</RouterLink>
      </div>

      <!-- Right Actions -->
      <div class="navbar-actions">
        <RouterLink to="/login" class="btn btn-ghost btn-sm" id="nav-login">Sign In</RouterLink>
        <RouterLink to="/book" class="btn btn-primary btn-sm" id="nav-book-cta">
          <span>Book Now</span>
          <span class="btn-arrow">→</span>
        </RouterLink>
        <!-- Hamburger -->
        <button class="hamburger" :class="{ active: menuOpen }" @click="toggleMenu" id="nav-hamburger">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div class="mobile-menu" v-if="menuOpen">
        <div class="mobile-menu-inner">
          <RouterLink to="/" class="mobile-nav-link" @click="closeMenu" id="mobile-nav-home">🏠 Home</RouterLink>
          <RouterLink to="/book" class="mobile-nav-link" @click="closeMenu" id="mobile-nav-book">🚗 Book Ride</RouterLink>
          <RouterLink to="/about" class="mobile-nav-link" @click="closeMenu" id="mobile-nav-about">ℹ️ About</RouterLink>
          <RouterLink to="/drive" class="mobile-nav-link" @click="closeMenu" id="mobile-nav-driver">🧑‍💼 Drive with Us</RouterLink>
          <div class="mobile-actions">
            <RouterLink to="/login" class="btn btn-ghost" @click="closeMenu" id="mobile-nav-login">Sign In</RouterLink>
            <RouterLink to="/book" class="btn btn-primary" @click="closeMenu" id="mobile-nav-book-cta">Book Now</RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const menuOpen = ref(false);

const navLinksRef = ref(null);
const indicatorStyle = ref({
  width: '0px',
  left: '0px',
  opacity: 0,
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
const closeMenu = () => { menuOpen.value = false; };

function moveIndicator(event) {
  const target = event.currentTarget;
  if (!target || !navLinksRef.value) return;
  const parentRect = navLinksRef.value.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  
  indicatorStyle.value = {
    width: `${targetRect.width}px`,
    left: `${targetRect.left - parentRect.left}px`,
    opacity: 1,
  };
}

function resetIndicator() {
  const activeLink = navLinksRef.value?.querySelector('.router-link-active');
  if (activeLink) {
    const parentRect = navLinksRef.value.getBoundingClientRect();
    const targetRect = activeLink.getBoundingClientRect();
    indicatorStyle.value = {
      width: `${targetRect.width}px`,
      left: `${targetRect.left - parentRect.left}px`,
      opacity: 1,
    };
  } else {
    indicatorStyle.value = {
      width: '0px',
      left: '0px',
      opacity: 0,
    };
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  setTimeout(() => {
    resetIndicator();
  }, 300);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Reset positioning when route changes
watch(() => route.path, () => {
  nextTick(() => {
    resetIndicator();
  });
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.2rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  background: rgba(5, 8, 15, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--glass-border);
  padding: 0.8rem 0;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
}

.logo-icon {
  display: flex;
  align-items: center;
  filter: drop-shadow(0 0 8px rgba(255, 77, 77, 0.5));
  transition: filter 0.3s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.navbar-logo:hover .logo-icon {
  filter: drop-shadow(0 0 18px rgba(255, 77, 77, 0.9));
  transform: scale(1.12) rotate(-5deg);
}

.navbar-logo:active .logo-icon {
  transform: scale(0.95) rotate(0deg);
}

.logo-name {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff6666 0%, #ff0000 50%, #990000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-shadow: none;
  position: relative;
  transition: letter-spacing 0.25s ease;
}

.navbar-logo:hover .logo-name {
  letter-spacing: 0.1em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  position: relative;
}

.nav-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 38px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.28s cubic-bezier(0.25, 0.8, 0.25, 1);
  pointer-events: none;
  z-index: 1;
}

.nav-link {
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  text-decoration: none;
  position: relative;
  z-index: 2;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-sm {
  padding: 0.6rem 1.25rem;
  font-size: 0.9rem;
}

.btn-arrow {
  transition: transform var(--transition-fast);
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.5rem;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(5, 8, 15, 0.97);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--glass-border);
  padding: 1rem 0 2rem;
}

.mobile-menu-inner {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  gap: 0.5rem;
}

.mobile-nav-link {
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover {
  background: var(--glass);
  color: var(--text-primary);
}

.mobile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0 0.25rem;
}

.mobile-actions .btn { flex: 1; justify-content: center; }

/* Slide down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 500px;
}

@media (max-width: 900px) {
  .navbar-links { display: none; }
  .hamburger { display: flex; }
  .navbar-actions .btn-ghost { display: none; }
}
</style>
