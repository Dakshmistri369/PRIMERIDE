<template>
  <div class="road-container">
    <canvas ref="canvasRef" class="road-canvas"></canvas>
    
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
import * as THREE from 'three';

const canvasRef = ref(null);
const isScrolling = ref(false);

let renderer, scene, camera, animId;
let dashLines = [];
let offset = 0;
let car = null;
let wheels = [];
let currentX = 0;
let currentRotY = 0;
let lastScrollY = 0;
let scrollSpeed = 0;
let scrollTimeout = null;
let clock = null;

function init() {
  const canvas = canvasRef.value;
  const W = window.innerWidth, H = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 30, 140);

  camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 200);
  camera.position.set(0, 1.4, 0);
  camera.lookAt(0, 0.7, -100);

  // Road surface
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 240),
    new THREE.MeshBasicMaterial({ color: 0x060608, transparent: true, opacity: 0.9 })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.06, -120);
  scene.add(road);

  // Red side stripe lines
  [-4.1, 4.1].forEach(x => {
    const stripe = new THREE.Mesh(
      new THREE.PlaneGeometry(0.1, 240),
      new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.55 })
    );
    stripe.rotation.x = -Math.PI / 2;
    stripe.position.set(x, 0.01, -120);
    scene.add(stripe);
  });

  // White dashed centre line segments
  for (let i = 0; i < 32; i++) {
    const dash = new THREE.Mesh(
      new THREE.PlaneGeometry(0.14, 4.5),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
    );
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(0, 0.01, -i * 7.5 - 4);
    scene.add(dash);
    dashLines.push(dash);
  }

  // --- Create 3D Car ---
  car = new THREE.Group();

  // Chassis
  const bodyGeom = new THREE.BoxGeometry(0.8, 0.22, 1.6);
  const bodyMat = new THREE.MeshBasicMaterial({ color: 0xdd0000 }); // Vibrant red muscle car
  const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
  car.add(bodyMesh);

  // Cabin
  const cabinGeom = new THREE.BoxGeometry(0.48, 0.18, 0.7);
  const cabinMat = new THREE.MeshBasicMaterial({ color: 0x111111 }); // Dark windows
  const cabinMesh = new THREE.Mesh(cabinGeom, cabinMat);
  cabinMesh.position.set(0, 0.2, 0.1);
  car.add(cabinMesh);

  // Tail lights (glow red)
  const tailLightGeom = new THREE.BoxGeometry(0.12, 0.05, 0.05);
  const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });
  [-0.26, 0.26].forEach(x => {
    const light = new THREE.Mesh(tailLightGeom, tailLightMat);
    light.position.set(x, 0.06, 0.81);
    car.add(light);
  });

  // Headlights (glow white)
  const headlightGeom = new THREE.BoxGeometry(0.12, 0.05, 0.05);
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  [-0.26, 0.26].forEach(x => {
    const light = new THREE.Mesh(headlightGeom, headlightMat);
    light.position.set(x, 0.06, -0.81);
    car.add(light);
  });

  // Neon underglow
  const neonMat = new THREE.MeshBasicMaterial({ color: 0xff1111 });
  const neonGlow = new THREE.Mesh(new THREE.PlaneGeometry(0.74, 1.4), neonMat);
  neonGlow.rotation.x = -Math.PI / 2;
  neonGlow.position.set(0, -0.1, 0);
  car.add(neonGlow);

  // Wheels
  const wheelGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.14, 16);
  const wheelMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
  const wheelRimMat = new THREE.MeshBasicMaterial({ color: 0xff1111 }); // glowing red rim

  const wheelOffsets = [
    [-0.42, -0.06, 0.45],  // Rear Left
    [0.42, -0.06, 0.45],   // Rear Right
    [-0.42, -0.06, -0.45], // Front Left
    [0.42, -0.06, -0.45]   // Front Right
  ];

  wheelOffsets.forEach(pos => {
    const wheelGroup = new THREE.Group();
    
    const wheelMesh = new THREE.Mesh(wheelGeom, wheelMat);
    wheelMesh.rotation.z = Math.PI / 2;
    wheelGroup.add(wheelMesh);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.02, 8, 32), wheelRimMat);
    rim.rotation.y = Math.PI / 2;
    wheelGroup.add(rim);

    wheelGroup.position.set(...pos);
    car.add(wheelGroup);
    wheels.push(wheelGroup);
  });

  // Position car in front of camera
  car.position.set(0, 0.3, -13);
  car.scale.set(1.45, 1.45, 1.45);
  scene.add(car);

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', handleScroll, { passive: true });
  clock = new THREE.Clock();
  loop();
}

function handleScroll() {
  isScrolling.value = true;
  const currentScrollY = window.scrollY;
  scrollSpeed = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false;
    scrollSpeed = 0;
  }, 250);
}

function loop() {
  animId = requestAnimationFrame(loop);

  // Speed up the road lines when scrolling to simulate acceleration while drifting
  const speedMultiplier = isScrolling.value ? 1.5 + Math.min(Math.abs(scrollSpeed) * 0.05, 1.5) : 1.0;
  offset = (offset + 0.18 * speedMultiplier) % (32 * 7.5);

  dashLines.forEach((d, i) => {
    d.position.z = -(((i * 7.5 + offset) % (32 * 7.5))) + 8;
  });

  if (car) {
    const time = clock ? clock.getElapsedTime() : Date.now() * 0.001;

    // Small engine vibration
    const vibration = Math.sin(time * 20) * 0.006;
    car.position.y = 0.3 + vibration;

    // Calculate dynamic drift targets
    const targetX = Math.sin(window.scrollY * 0.005) * 1.5;
    const targetRotY = -Math.cos(window.scrollY * 0.005) * 0.35; // Counter-steer drift angle

    // Apply smooth interpolation (lerp)
    if (isScrolling.value) {
      currentX += (targetX - currentX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;
    } else {
      currentX += (0 - currentX) * 0.06;
      currentRotY += (0 - currentRotY) * 0.06;
    }

    car.position.x = currentX;
    car.rotation.y = currentRotY;

    // Spin wheels
    wheels.forEach(w => {
      w.rotation.x += 0.22 * speedMultiplier;
    });
  }

  renderer.render(scene, camera);
}

function onResize() {
  if (!canvasRef.value) return;
  const W = window.innerWidth, H = window.innerHeight;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);
}

onMounted(init);
onUnmounted(() => {
  cancelAnimationFrame(animId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', handleScroll);
  clearTimeout(scrollTimeout);
  renderer?.dispose();
});
</script>

<style scoped>
.road-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.road-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100vw !important;
  height: 100vh !important;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
}

.drift-banner {
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.drift-banner.show-banner {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.drift-banner-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.8rem;
  border-radius: var(--radius-full);
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 77, 77, 0.4);
  box-shadow: 0 0 25px rgba(255, 77, 77, 0.25),
              inset 0 0 10px rgba(255, 77, 77, 0.15);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.drift-banner-link:hover {
  border-color: rgba(255, 77, 77, 0.8);
  box-shadow: 0 0 35px rgba(255, 77, 77, 0.45),
              inset 0 0 15px rgba(255, 77, 77, 0.25);
  transform: scale(1.03);
}

.drift-banner-text {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 77, 77, 0.6);
}

.drift-banner-arrow {
  color: #ff4d4d;
  font-size: 1.1rem;
  animation: arrowPulse 1.2s ease-in-out infinite;
}

@keyframes arrowPulse {
  0%, 100% { transform: translateX(0); opacity: 0.7; }
  50% { transform: translateX(4px); opacity: 1; }
}
</style>
