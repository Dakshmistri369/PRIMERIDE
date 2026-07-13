<template>
  <div class="car3d-scene" ref="sceneRef" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <!-- Ambient glow rings -->
    <div class="glow-ring ring-1"></div>
    <div class="glow-ring ring-2"></div>
    <div class="glow-ring ring-3"></div>

    <!-- Ground reflection -->
    <div class="ground-reflect"></div>

    <!-- Neon undercar glow -->
    <div class="neon-underglow" :style="underlightStyle"></div>

    <!-- Floating particles -->
    <div
      v-for="p in particles"
      :key="p.id"
      class="particle"
      :style="p.style"
    ></div>

    <!-- Speed lines -->
    <div class="speed-lines">
      <div v-for="n in 8" :key="n" class="speed-line" :style="{ animationDelay: `${n * 0.18}s`, top: `${10 + n * 8}%` }"></div>
    </div>

    <!-- Car image wrapper with 3D tilt -->
    <div class="car-img-wrapper" :style="carTiltStyle">
      <img
        src="/red_muscle_car_3d.png"
        alt="PrimeRide Red Muscle Car"
        class="car-img"
        draggable="false"
      />
      <!-- Headlight beams -->
      <div class="headlight-beam beam-left" :style="beamStyle"></div>
      <div class="headlight-beam beam-right" :style="beamStyle"></div>
    </div>

    <!-- Drag hint -->
    <p class="drag-hint">✦ Move mouse to interact</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const sceneRef = ref(null);

// Mouse tracking
const mouse = ref({ x: 0.5, y: 0.5 });
const smoothMouse = ref({ x: 0.5, y: 0.5 });
let rafId = null;
let isHovering = false;

function onMouseMove(e) {
  if (!sceneRef.value) return;
  isHovering = true;
  const rect = sceneRef.value.getBoundingClientRect();
  mouse.value = {
    x: (e.clientX - rect.left) / rect.width,
    y: (e.clientY - rect.top)  / rect.height,
  };
}

function onMouseLeave() {
  isHovering = false;
  mouse.value = { x: 0.5, y: 0.5 };
}

// Smooth lerp loop
function lerp(a, b, t) { return a + (b - a) * t; }

function animLoop() {
  rafId = requestAnimationFrame(animLoop);
  const speed = isHovering ? 0.09 : 0.04;
  smoothMouse.value = {
    x: lerp(smoothMouse.value.x, mouse.value.x, speed),
    y: lerp(smoothMouse.value.y, mouse.value.y, speed),
  };
}

// 3D tilt style for the car
const carTiltStyle = computed(() => {
  const dx = (smoothMouse.value.x - 0.5) * 2; // -1 to 1
  const dy = (smoothMouse.value.y - 0.5) * 2;
  const rotY = dx * 14;
  const rotX = -dy * 8;
  const translateX = dx * 18;
  const translateY = dy * 8;
  return {
    transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateX(${translateX}px) translateY(${translateY}px)`,
    transition: 'transform 0.05s linear',
  };
});

// Beam intensity based on mouse position
const beamStyle = computed(() => {
  const intensity = 0.3 + smoothMouse.value.x * 0.5;
  return { opacity: intensity };
});

// Undercar neon glow
const underlightStyle = computed(() => {
  const hue = 0 + smoothMouse.value.x * 30; // orange-red range
  return {
    background: `radial-gradient(ellipse at 50% 50%, hsla(${hue}, 100%, 55%, 0.55) 0%, transparent 70%)`,
  };
});

// Floating particles
const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    top:  `${Math.random() * 100}%`,
    width:  `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${4 + Math.random() * 6}s`,
    opacity: Math.random() * 0.7 + 0.1,
    background: i % 3 === 0
      ? 'rgba(255,80,80,0.85)'
      : i % 3 === 1
        ? 'rgba(255,180,60,0.7)'
        : 'rgba(255,255,255,0.55)',
  },
}));

onMounted(() => { animLoop(); });
onUnmounted(() => { cancelAnimationFrame(rafId); });
</script>

<style scoped>
.car3d-scene {
  position: relative;
  width: 100%;
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: crosshair;
}

/* ── Glow Rings ── */
.glow-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 80, 30, 0.18);
  pointer-events: none;
  animation: ringPulse 4s ease-in-out infinite;
}
.ring-1 { width: 420px; height: 420px; animation-delay: 0s;    border-color: rgba(255, 80, 30, 0.22); }
.ring-2 { width: 540px; height: 540px; animation-delay: 1.2s;  border-color: rgba(255, 160, 30, 0.12); }
.ring-3 { width: 660px; height: 660px; animation-delay: 2.4s;  border-color: rgba(255, 60, 60, 0.07); }

@keyframes ringPulse {
  0%, 100% { transform: scale(1);    opacity: 0.5; }
  50%       { transform: scale(1.04); opacity: 1;   }
}

/* ── Ground reflection ── */
.ground-reflect {
  position: absolute;
  bottom: 2%;
  left: 10%;
  right: 10%;
  height: 60px;
  background: radial-gradient(ellipse at 50% 100%, rgba(255, 80, 30, 0.25) 0%, transparent 75%);
  filter: blur(18px);
  pointer-events: none;
}

/* ── Neon Underglow ── */
.neon-underglow {
  position: absolute;
  bottom: 4%;
  left: 15%;
  right: 15%;
  height: 80px;
  filter: blur(22px);
  pointer-events: none;
  transition: background 0.3s ease;
}

/* ── Speed Lines ── */
.speed-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.speed-line {
  position: absolute;
  left: -100%;
  height: 1px;
  width: 35%;
  background: linear-gradient(to right, transparent, rgba(255, 100, 30, 0.35), transparent);
  animation: speedLine 3s linear infinite;
}
@keyframes speedLine {
  0%   { left: -40%; opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 0.6; }
  100% { left: 110%; opacity: 0; }
}

/* ── Particles ── */
.particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: floatParticle var(--dur, 5s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
@keyframes floatParticle {
  0%   { transform: translateY(0px)   scale(1);   opacity: 0.2; }
  50%  { transform: translateY(-30px) scale(1.3); opacity: 0.8; }
  100% { transform: translateY(0px)   scale(1);   opacity: 0.2; }
}

/* ── Car Image ── */
.car-img-wrapper {
  position: relative;
  z-index: 5;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(255, 80, 30, 0.15) 0%, rgba(15, 15, 20, 0.85) 80%);
  border: 4px solid rgba(255, 80, 30, 0.35);
  box-shadow: 0 20px 50px rgba(255, 80, 30, 0.3),
              inset 0 0 60px rgba(0, 0, 0, 0.9);
  will-change: transform;
  animation: carFloat 5s ease-in-out infinite;
}

@keyframes carFloat {
  0%, 100% { transform-origin: center; margin-top: 0px; }
  50%       { margin-top: -14px; }
}

.car-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  transform: scale(1.15) translateY(-5px);
  -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%);
  mask-image: radial-gradient(circle, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 95%);
}

/* ── Headlight Beams ── */
.headlight-beam {
  position: absolute;
  bottom: 32%;
  width: 180px;
  height: 120px;
  clip-path: polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%);
  background: linear-gradient(to right, rgba(255, 240, 180, 0.6), transparent);
  pointer-events: none;
  filter: blur(8px);
  transition: opacity 0.3s ease;
}
.beam-left  { left: -60px; transform: rotate(-8deg); }
.beam-right { left: -30px; transform: rotate(-4deg); }

/* ── Drag Hint ── */
.drag-hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.72rem;
  color: rgba(255, 100, 60, 0.55);
  letter-spacing: 0.14em;
  pointer-events: none;
  animation: hintPulse 2.8s ease-in-out infinite;
  white-space: nowrap;
}
@keyframes hintPulse {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 0.9; }
}
</style>
