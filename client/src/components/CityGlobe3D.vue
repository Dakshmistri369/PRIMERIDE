<template>
  <canvas ref="canvasRef" class="globe-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasRef = ref(null);
let renderer, scene, camera, animId, globeGroup;

const CITIES = [
  [19.076, 72.877],[28.704, 77.103],[12.972, 77.595],[17.385, 78.487],
  [13.082, 80.271],[22.573, 88.363],[18.520, 73.857],[23.022, 72.571],
  [26.912, 75.787],[21.170, 72.831],[30.733, 76.779],[26.846, 80.946],
  [15.497, 73.827],[9.939,  76.270],[11.127, 78.657],
];

function latLonToVec3(lat, lon, r) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

function init() {
  const canvas = canvasRef.value;
  const parent = canvas.parentElement;
  const W = parent.clientWidth || 350;
  const H = parent.clientHeight || 350;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.z = 3.2;

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dL = new THREE.DirectionalLight(0xff3333, 2);
  dL.position.set(4, 4, 4);
  scene.add(dL);

  globeGroup = new THREE.Group();

  const sphereMat = new THREE.MeshStandardMaterial({ color: 0x0a0814, roughness: 0.85, metalness: 0.15, transparent: true, opacity: 0.85 });
  globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1, 48, 48), sphereMat));

  const wireMat = new THREE.MeshBasicMaterial({ color: 0xff2222, wireframe: true, transparent: true, opacity: 0.07 });
  globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.004, 24, 24), wireMat));

  const dotGeo  = new THREE.SphereGeometry(0.024, 8, 8);
  const glowGeo = new THREE.SphereGeometry(0.048, 8, 8);
  const dotMat  = new THREE.MeshBasicMaterial({ color: 0xff4444 });
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.22 });

  CITIES.forEach(([lat, lon]) => {
    const pos = latLonToVec3(lat, lon, 1.02);
    const dot  = new THREE.Mesh(dotGeo,  dotMat);  dot.position.copy(pos);
    const glow = new THREE.Mesh(glowGeo, glowMat); glow.position.copy(pos);
    globeGroup.add(dot, glow);
  });

  const atmoMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.07, side: THREE.BackSide });
  globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.12, 32, 32), atmoMat));

  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.06, 1.10, 64), ringMat);
  ring.rotation.x = Math.PI / 2;
  globeGroup.add(ring);

  globeGroup.rotation.y = 1.3;
  scene.add(globeGroup);

  window.addEventListener('resize', onResize);
  loop();
}

function loop() {
  animId = requestAnimationFrame(loop);
  globeGroup.rotation.y += 0.0025;
  renderer.render(scene, camera);
}

function onResize() {
  if (!canvasRef.value) return;
  const parent = canvasRef.value.parentElement;
  const W = parent.clientWidth || 350, H = parent.clientHeight || 350;
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  renderer.setSize(W, H);
}

onMounted(init);
onUnmounted(() => {
  cancelAnimationFrame(animId);
  window.removeEventListener('resize', onResize);
  renderer?.dispose();
});
</script>

<style scoped>
.globe-canvas { width: 100% !important; height: 100% !important; display: block; }
</style>
