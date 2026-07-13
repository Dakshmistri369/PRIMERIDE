<template>
  <Transition name="splash-exit" @after-leave="$emit('done')">
    <div class="splash" v-if="visible">

      <!-- Background grid lines -->
      <div class="splash-grid"></div>

      <!-- Animated speed lines -->
      <div class="speed-lines">
        <span v-for="i in 12" :key="i" class="speed-line" :style="{ '--i': i }"></span>
      </div>

      <!-- Center content -->
      <div class="splash-center">

        <!-- Car logo -->
        <div class="splash-logo" :class="{ animate: started }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" fill="none" class="car-svg">
            <defs>
              <linearGradient id="splashCarGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ff4d4d"/>
                <stop offset="100%" stop-color="#990000"/>
              </linearGradient>
              <filter id="splashGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="splashGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <!-- Sleek Sports Car Body -->
            <path d="M 6,46 L 12,46 C 12,37 17,33 22,33 C 27,33 32,37 32,46 L 84,46 C 84,37 89,33 94,33 C 99,33 104,37 104,46 L 110,46 C 113,46 114,44 114,40 C 114,35 106,32 94,26 C 86,18 78,14 62,14 C 46,14 36,16 28,26 C 22,32 16,33 10,33 C 7,33 6,38 6,46 Z" fill="url(#splashCarGrad)" filter="url(#splashGlow)"/>
            <!-- Glass Canopy -->
            <path d="M 32,25 C 38,18 48,17 62,17 C 76,17 82,19 86,25 Z" fill="rgba(10, 10, 15, 0.9)"/>
            <path d="M 35,24 C 40,19 48,18 62,18 C 75,18 80,20 83,24 Z" fill="rgba(255,255,255,0.12)"/>
            <!-- B-Pillar -->
            <line x1="58" y1="17.2" x2="58" y2="25" stroke="#1c1b1c" stroke-width="1.8"/>
            <!-- Aggressive Headlights -->
            <path d="M 108,32 L 114,34 L 111,36 Z" fill="#ffffff" opacity="0.95" filter="url(#splashGlow)"/>
            <!-- Sleek Tail lights -->
            <path d="M 7,33 L 13,33 L 12,35 L 6.5,35 Z" fill="#ff3333" filter="url(#splashGlow)"/>
            <!-- Spoiler lip -->
            <path d="M 8,33 C 9,30 14,30 15,33 Z" fill="#1c1b1c" />
            <!-- Rear Wheel Assembly -->
            <circle cx="22" cy="46" r="9" fill="#08080a" stroke="#1c1b1c" stroke-width="0.8"/>
            <circle cx="22" cy="46" r="6.5" fill="#131316"/>
            <circle cx="22" cy="46" r="4.5" fill="none" stroke="#666666" stroke-width="1.2" stroke-dasharray="1.5, 1"/>
            <path d="M 26.5,41.5 A 6.5,6.5 0 0,0 19.5,39.5" fill="none" stroke="#ff3333" stroke-width="1.5"/>
            <circle cx="22" cy="46" r="1.5" fill="#111111"/>
            <!-- Front Wheel Assembly -->
            <circle cx="94" cy="46" r="9" fill="#08080a" stroke="#1c1b1c" stroke-width="0.8"/>
            <circle cx="94" cy="46" r="6.5" fill="#131316"/>
            <circle cx="94" cy="46" r="4.5" fill="none" stroke="#666666" stroke-width="1.2" stroke-dasharray="1.5, 1"/>
            <path d="M 98.5,41.5 A 6.5,6.5 0 0,0 91.5,39.5" fill="none" stroke="#ff3333" stroke-width="1.5"/>
            <circle cx="94" cy="46" r="1.5" fill="#111111"/>
            <!-- Red Underglow -->
            <ellipse cx="60" cy="53" rx="50" ry="3" fill="#ff3333" opacity="0.4" filter="url(#splashGlowStrong)"/>
          </svg>
          <!-- Wheel spin rings -->
          <div class="wheel-ring wheel-front"></div>
          <div class="wheel-ring wheel-rear"></div>
        </div>

        <!-- Brand name with letter animation -->
        <div class="splash-brand" :class="{ animate: started }">
          <span v-for="(char, i) in 'PRIMERIDE'" :key="i"
            class="brand-letter"
            :style="{ '--li': i }"
          >{{ char }}</span>
        </div>

        <!-- Tagline -->
        <p class="splash-tagline" :class="{ animate: started }">Premium Rides &middot; Delivered in Style</p>

        <!-- Loading bar -->
        <div class="splash-bar-wrap" :class="{ animate: started }">
          <div class="splash-bar">
            <div class="splash-bar-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="splash-pct">{{ Math.round(progress) }}%</span>
        </div>

      </div>

      <!-- Corner accents -->
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['done']);
const visible = ref(true);
const started = ref(false);
const progress = ref(0);

onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => { started.value = true; }, 50);
  });

  const duration = 2600;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    progress.value = Math.min((elapsed / duration) * 100, 100);
    if (progress.value < 100) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => { visible.value = false; }, 350);
    }
  }
  requestAnimationFrame(tick);
});
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.splash-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(192,57,43,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,57,43,0.07) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridPulse 3s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.9; }
}

.speed-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.speed-line {
  position: absolute;
  top: 50%;
  left: -100%;
  height: 1.5px;
  border-radius: 99px;
  background: linear-gradient(to right, transparent, rgba(192,57,43,0.7), transparent);
  animation: speedLine 1.8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.15s);
  width: calc(30% + var(--i) * 5%);
  transform: translateY(calc((var(--i) - 6) * 28px));
  opacity: 0;
}

@keyframes speedLine {
  0%   { left: -60%; opacity: 0; }
  20%  { opacity: 0.8; }
  80%  { opacity: 0.6; }
  100% { left: 120%; opacity: 0; }
}

.splash-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  position: relative;
  z-index: 2;
}

.splash-logo {
  position: relative;
  opacity: 0;
  transform: scale(0.4) translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.splash-logo.animate {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.car-svg {
  width: 220px;
  height: auto;
  filter: drop-shadow(0 0 24px rgba(255,77,77,0.4)) drop-shadow(0 0 60px rgba(255,77,77,0.2));
  animation: carFloat 2.5s ease-in-out infinite 0.8s;
}

@keyframes carFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.wheel-ring {
  position: absolute;
  bottom: -4px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(17, 17, 17, 0.65);
  animation: wheelSpin 0.6s linear infinite;
}

.wheel-front { left: 22px; }
.wheel-rear  { right: 14px; }

@keyframes wheelSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.splash-brand {
  display: flex;
  gap: 0.04em;
}

.brand-letter {
  font-family: 'Orbitron', 'Rajdhani', var(--font-display), sans-serif;
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, #ff6666 0%, #ff0000 50%, #990000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.08em;
  opacity: 0;
  transform: translateY(40px) rotateX(60deg);
  transition:
    opacity 0.5s ease,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: calc(0.15s + var(--li) * 0.07s);
  filter: drop-shadow(0 0 12px rgba(255,51,51,0.35));
}

.splash-brand.animate .brand-letter {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

.splash-tagline {
  font-size: 0.9rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease 1.2s, transform 0.6s ease 1.2s;
  margin: 0;
}

.splash-brand.animate ~ .splash-tagline {
  opacity: 1;
  transform: translateY(0);
}

.splash-bar-wrap {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: min(340px, 80vw);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 1.5s, transform 0.6s ease 1.5s;
}

.splash-bar-wrap.animate {
  opacity: 1;
  transform: translateY(0);
}

.splash-bar {
  flex: 1;
  height: 3px;
  background: rgba(255,255,255,0.08);
  border-radius: 99px;
  overflow: hidden;
}

.splash-bar-fill {
  height: 100%;
  background: linear-gradient(to right, #aa0000, #ff4d4d, #aa0000);
  background-size: 200% 100%;
  border-radius: 99px;
  transition: width 0.05s linear;
  box-shadow: 0 0 12px rgba(255,77,77,0.5);
  animation: barShimmer 1.2s ease infinite;
}

@keyframes barShimmer {
  0%   { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

.splash-pct {
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.05em;
  min-width: 36px;
  text-align: right;
}

.corner {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.5;
}

.corner-tl { top: 24px;    left: 24px;    border-top: 2px solid #ff4d4d; border-left: 2px solid #ff4d4d; }
.corner-tr { top: 24px;    right: 24px;   border-top: 2px solid #ff4d4d; border-right: 2px solid #ff4d4d; }
.corner-bl { bottom: 24px; left: 24px;    border-bottom: 2px solid #ff4d4d; border-left: 2px solid #ff4d4d; }
.corner-br { bottom: 24px; right: 24px;   border-bottom: 2px solid #ff4d4d; border-right: 2px solid #ff4d4d; }

.splash-exit-leave-active {
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-exit-leave-to {
  opacity: 0;
  transform: scale(1.06);
}
</style>
