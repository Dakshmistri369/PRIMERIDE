<template>
  <div class="login-page flex-col items-center">
    <!-- 3D Hero Section -->
    <div id="threejs-container" class="threejs-container" ref="containerRef">
      <div class="hero-overlay flex-col items-center justify-center">
        <h1 class="login-hero-title">PrimeRide</h1>
        <p class="login-hero-subtitle">Your journey starts here.</p>
      </div>
    </div>

    <!-- Login Container -->
    <div class="login-container animate-fade-up">
      <div class="glass-card login-card">
        <h2 class="login-title">Welcome back</h2>
        <p class="login-desc">Please Enter your Account details</p>
        <form @submit.prevent="handleSubmit" class="login-form">
          <!-- Email -->
          <div class="input-group">
            <label class="input-label">Email</label>
            <div class="input-with-icon">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-gray"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input v-model="email" type="email" placeholder="johndoe@gmail.com" class="input-field" required>
            </div>
          </div>

          <!-- Password -->
          <div class="input-group">
            <label class="input-label">Password</label>
            <div class="input-with-icon">
              <span class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-gray"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" class="input-field" required>
              <span class="password-toggle" @click="showPassword = !showPassword">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-gray"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-gray"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              </span>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex justify-between items-center text-sm remember-row">
            <label class="flex items-center cursor-pointer checkbox-label">
              <input type="checkbox" v-model="rememberMe" class="checkbox-input">
              <span class="ml-2 label-text">Keep me logged in</span>
            </label>
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>

          <!-- Sign In Button -->
          <button type="submit" class="btn btn-primary login-btn">
            Sign In
          </button>
        </form>

        <!-- Social Login -->
        <div class="social-login-wrap">
          <div class="social-divider">
            <span>or sign in with</span>
          </div>
          <div class="social-buttons">
            <button @click="handleSocial('google')" class="social-btn">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" class="social-img" alt="Google">
            </button>
            <button @click="handleSocial('github')" class="social-btn github">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </button>
            <button @click="handleSocial('facebook')" class="social-btn facebook">
              <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const containerRef = ref(null);
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

let renderer = null;
let scene = null;
let camera = null;
let car = null;
let wheels = [];
let clock = null;
let animationFrameId = null;

function handleSubmit() {
  alert(`Signing in as: ${email.value}`);
}

function handleSocial(platform) {
  alert(`Connecting with ${platform}...`);
}

function initThree() {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerRef.value.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xff4d4d, 3.0, 30);
  pointLight.position.set(5, 6, 5);
  scene.add(pointLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight1.position.set(5, 10, 7);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xff4d4d, 1.8); // Side red rim highlight
  dirLight2.position.set(-6, 3, -6);
  scene.add(dirLight2);

  // --- Detailed Cyber Muscle Car Group ---
  car = new THREE.Group();

  // 1. Main Base Chassis (sleek, bottom plate)
  const chassisGeom = new THREE.BoxGeometry(1.85, 0.15, 3.8);
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.85, roughness: 0.2 });
  const chassis = new THREE.Mesh(chassisGeom, chassisMat);
  chassis.position.y = -0.1;
  car.add(chassis);

  // 2. Hood (streamlined front, sloped)
  const hoodGeom = new THREE.BoxGeometry(1.8, 0.3, 1.4);
  const hoodMat = new THREE.MeshStandardMaterial({ color: 0x151518, metalness: 0.9, roughness: 0.15 });
  const hood = new THREE.Mesh(hoodGeom, hoodMat);
  hood.position.set(0, 0.08, -1.0);
  hood.rotation.x = 0.08; // Sloped forward
  car.add(hood);

  // 3. Cabin / Cockpit (sloped wedge, glossy dark glass)
  const cabinGeom = new THREE.BoxGeometry(1.4, 0.45, 1.6);
  const cabinMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0f, metalness: 0.95, roughness: 0.05, transparent: true, opacity: 0.85 });
  const cabin = new THREE.Mesh(cabinGeom, cabinMat);
  cabin.position.set(0, 0.35, 0.25);
  cabin.rotation.x = -0.06;
  car.add(cabin);

  // 4. Rear Deck / Trunk (sloped rear)
  const rearDeckGeom = new THREE.BoxGeometry(1.78, 0.36, 1.0);
  const rearDeckMat = new THREE.MeshStandardMaterial({ color: 0x151518, metalness: 0.9, roughness: 0.15 });
  const rearDeck = new THREE.Mesh(rearDeckGeom, rearDeckMat);
  rearDeck.position.set(0, 0.11, 1.3);
  rearDeck.rotation.x = -0.05; // Sloped backward
  car.add(rearDeck);

  // 5. Front Nose / Splitter (aggressive face)
  const noseGeom = new THREE.BoxGeometry(1.8, 0.22, 0.4);
  const noseMat = new THREE.MeshStandardMaterial({ color: 0x0d0d0f, metalness: 0.9, roughness: 0.1 });
  const nose = new THREE.Mesh(noseGeom, noseMat);
  nose.position.set(0, 0.02, -1.8);
  car.add(nose);

  // 6. Angled LED Headlights (aggressive neon red strips)
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });
  [-0.72, 0.72].forEach(x => {
    // Slanted headlight strip
    const lightGeom = new THREE.BoxGeometry(0.24, 0.04, 0.06);
    const light = new THREE.Mesh(lightGeom, headlightMat);
    light.position.set(x, 0.08, -2.01);
    light.rotation.z = x > 0 ? 0.15 : -0.15; // Slanted look
    car.add(light);
  });

  // 7. Exhaust Pipes (dual chrome tips at the back)
  const exhaustGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 12);
  exhaustGeom.rotateX(Math.PI / 2);
  const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1.0, roughness: 0.1 });
  const exhaustFireMat = new THREE.MeshBasicMaterial({ color: 0xff5500 }); // Glowing inner fire
  
  [-0.5, 0.5].forEach(x => {
    const pipe = new THREE.Mesh(exhaustGeom, exhaustMat);
    pipe.position.set(x, -0.06, 1.82);
    
    // Fire tip
    const fireTip = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12), exhaustFireMat);
    fireTip.rotateX(Math.PI / 2);
    fireTip.position.z = 0.16;
    pipe.add(fireTip);
    
    car.add(pipe);
  });

  // 8. Aggressive Rear Wing / Spoiler
  const wingPostGeom = new THREE.BoxGeometry(0.04, 0.24, 0.15);
  const wingPostMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.9 });
  const wingBladeGeom = new THREE.BoxGeometry(1.9, 0.04, 0.4);
  const wingBlade = new THREE.Mesh(wingBladeGeom, hoodMat);
  
  [-0.65, 0.65].forEach(x => {
    const post = new THREE.Mesh(wingPostGeom, wingPostMat);
    post.position.set(x, 0.34, 1.6);
    car.add(post);
  });
  wingBlade.position.set(0, 0.46, 1.65);
  wingBlade.rotation.x = -0.06; // slight downforce angle
  car.add(wingBlade);

  // 9. Side skirts / rocker panels
  [-0.94, 0.94].forEach(x => {
    const skirtGeom = new THREE.BoxGeometry(0.06, 0.08, 2.6);
    const skirt = new THREE.Mesh(skirtGeom, chassisMat);
    skirt.position.set(x, -0.12, 0);
    car.add(skirt);
  });

  // 10. Underglow (neon glow plate)
  const neonMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });
  const underglow = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.4), neonMat);
  underglow.rotation.x = -Math.PI / 2;
  underglow.position.set(0, -0.19, 0);
  car.add(underglow);

  // 11. Wheels (performance alloys)
  const wheelGeom = new THREE.CylinderGeometry(0.44, 0.44, 0.34, 32);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.85, metalness: 0.0 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.95, roughness: 0.15 });
  const caliperMat = new THREE.MeshStandardMaterial({ color: 0xff0000, metalness: 0.6, roughness: 0.2 });

  const wheelPositions = [
    [-1.02, -0.15, 1.25],
    [1.02, -0.15, 1.25],
    [-1.02, -0.15, -1.25],
    [1.02, -0.15, -1.25]
  ];

  wheelPositions.forEach(pos => {
    const wheelGroup = new THREE.Group();
    
    // Tire
    const tire = new THREE.Mesh(wheelGeom, tireMat);
    tire.rotation.z = Math.PI / 2;
    wheelGroup.add(tire);

    // Rim Outer Face
    const rimFace = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.05, 32), rimMat);
    rimFace.rotation.z = Math.PI / 2;
    rimFace.position.x = pos[0] > 0 ? 0.16 : -0.16; // Move to outside of tire
    wheelGroup.add(rimFace);

    // Glowing rim accent ring
    const rimGlow = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.02, 8, 48), neonMat);
    rimGlow.rotation.y = Math.PI / 2;
    rimGlow.position.x = pos[0] > 0 ? 0.19 : -0.19;
    wheelGroup.add(rimGlow);

    wheelGroup.position.set(...pos);
    car.add(wheelGroup);
    wheels.push(wheelGroup);

    // Red brake caliper (added directly to car group so it remains static while wheels spin!)
    const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.1), caliperMat);
    const caliperX = pos[0] + (pos[0] > 0 ? -0.14 : 0.14); // slightly inside the wheel rim
    caliper.position.set(caliperX, pos[1] + 0.15, pos[2]);
    car.add(caliper);
  });

  scene.add(car);
  
  camera.position.set(4, 2.5, 5);
  camera.lookAt(0, 0.2, 0);

  clock = new THREE.Clock();
  animate();
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);

  if (clock && car && wheels.length) {
    const delta = clock.getElapsedTime();
    // Driving Vibration & Sway
    car.position.y = Math.sin(delta * 5) * 0.03;
    car.rotation.y = Math.sin(delta * 0.4) * 0.05;

    // Spin Entire Wheel Groups (Tire + Rim together)
    wheels.forEach(w => {
      w.rotation.x += 0.18;
    });
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function handleResize() {
  if (!containerRef.value || !renderer || !camera) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

onMounted(() => {
  initThree();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
  if (renderer && renderer.domElement) {
    renderer.dispose();
  }
});
</script>

<style scoped>
.login-page {
  position: relative;
  z-index: 2;
  padding-top: 4.5rem;
  min-height: 100vh;
  display: flex;
  background: var(--bg-primary);
  overflow-x: hidden;
}

.threejs-container {
  width: 100%;
  height: 40vh;
  min-height: 280px;
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  pointer-events: none;
  z-index: 10;
  text-align: center;
}

.login-hero-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, #ff8a7a 0%, #ff4d4d 50%, #aa0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.login-hero-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  opacity: 0.8;
  margin-top: 0.5rem;
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 0 1.5rem 4rem;
  margin-top: -1.5rem;
  z-index: 20;
  position: relative;
}

.login-card {
  padding: 2.5rem 2rem;
  border-radius: var(--radius-xl);
  background: rgba(15, 15, 20, 0.7);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-card);
}

.login-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.login-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 1.1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.icon-gray {
  color: var(--text-muted);
  opacity: 0.8;
}

.input-with-icon .input-field {
  padding-left: 3rem;
  padding-right: 1.2rem;
}

.password-toggle {
  position: absolute;
  right: 1.1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.remember-row {
  margin: 0.2rem 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-input {
  accent-color: #ff4d4d;
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.label-text {
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.forgot-link {
  font-size: 0.88rem;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  white-space: nowrap;
}

.forgot-link:hover {
  color: #ff4d4d;
}

.login-btn {
  width: 100%;
  justify-content: center;
  padding: 1.05rem;
  font-size: 1.05rem;
  background: linear-gradient(135deg, #ff6666 0%, #ff0000 100%);
  border: none;
  box-shadow: 0 4px 20px rgba(255, 77, 77, 0.25);
  margin-top: 0.5rem;
}

.login-btn:hover {
  box-shadow: 0 8px 30px rgba(255, 77, 77, 0.45);
  transform: translateY(-2px);
}

.social-login-wrap {
  margin-top: 2.2rem;
  text-align: center;
}

.social-divider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.social-divider::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--glass-border);
  z-index: 1;
}

.social-divider span {
  position: relative;
  z-index: 2;
  background: #0d0d12;
  padding: 0 0.85rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  color: #000000;
}

.social-btn:hover {
  opacity: 0.85;
  transform: scale(1.05);
}

.social-btn.facebook {
  background: #1877f2;
  color: #ffffff;
}

.social-btn.github {
  background: #24292e;
  color: #ffffff;
}

.social-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

@media (min-width: 768px) {
  .login-page {
    flex-direction: row;
    align-items: center;
    padding-top: 0;
  }

  .threejs-container {
    flex: 1.2;
    height: 100vh;
  }

  .login-container {
    flex: 1;
    margin-top: 0;
    padding: 0 4rem;
    max-width: 480px;
  }
}
</style>
