<template>
  <div class="book-page">
    <!-- Background particles -->
    <ParticleField />

    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section" id="hero">
      <div class="hero-content">
        <div class="hero-text animate-fade-up">
          <div class="hero-badge">
            <span class="badge badge-blue">
              <span class="badge-dot"></span>
              Book a Ride
            </span>
          </div>
          <h1 class="hero-title">
            <span>Where are you</span>
            <br />
            <span class="text-gradient"> Headed?</span>
          </h1>
          <p class="hero-subtitle animate-fade-up delay-2">
            Real-time pricing. Instant confirmation. Arrive in style.
          </p>
        </div>

        <!-- Left: Booking Form -->
        <div class="booking-form-panel animate-fade-up delay-1">
          <!-- Location Inputs -->
          <div class="form-section glass-card">
            <h3 class="form-section-title">📍 Trip Details</h3>
            <div class="form-fields">
              <div class="input-group">
                <label class="input-label">Pickup Location</label>
                <div class="input-with-icon">
                  <span class="input-icon green-dot"></span>
                  <input
                    v-model="pickup"
                    type="text"
                    class="input-field"
                    placeholder="Enter pickup address..."
                    id="book-pickup-input"
                    @input="fetchEstimate"
                  />
                </div>
              </div>
              <div class="route-visual">
                <div class="route-dot"></div>
                <div class="route-dashes"></div>
                <div class="route-dot pink"></div>
              </div>
              <div class="input-group">
                <label class="input-label">Destination</label>
                <div class="input-with-icon">
                  <span class="input-icon pink-dot"></span>
                  <input
                    v-model="dropoff"
                    type="text"
                    class="input-field"
                    placeholder="Enter destination..."
                    id="book-dropoff-input"
                    @input="fetchEstimate"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Ride Type Selector -->
          <div class="form-section glass-card">
            <h3 class="form-section-title">🚗 Choose Ride Type</h3>
            <div class="ride-selector">
              <button
                v-for="ride in rideTypes"
                :key="ride.id"
                class="ride-option"
                :class="{ active: selectedRide === ride.id }"
                @click="selectRide(ride.id)"
                :id="`ride-option-${ride.id}`"
              >
                <span class="ride-opt-icon">{{ ride.icon }}</span>
                <div class="ride-opt-info">
                  <span class="ride-opt-name">{{ ride.name }}</span>
                  <span class="ride-opt-eta">{{ ride.eta }}</span>
                </div>
                <span class="ride-opt-price">₹{{ ride.basePrice }}+</span>
              </button>
            </div>
          </div>

          <!-- Estimate Card -->
          <div class="estimate-card glass-card" v-if="estimate || loading" id="price-estimate-card">
            <div class="estimate-header">
              <h3 class="form-section-title">💰 Price Estimate</h3>
              <div class="loader" v-if="loading"></div>
              <span class="badge badge-green" v-else-if="estimate">Live Price</span>
            </div>
            <Transition name="fade">
              <div class="estimate-details" v-if="estimate && !loading">
                <div class="estimate-row">
                  <span>Distance</span>
                  <span class="estimate-val">{{ estimate.distance }}</span>
                </div>
                <div class="estimate-row">
                  <span>Duration</span>
                  <span class="estimate-val">{{ estimate.duration }}</span>
                </div>
                <div class="estimate-row">
                  <span>Base Fare</span>
                  <span class="estimate-val">₹{{ estimate.baseFare }}</span>
                </div>
                <div class="estimate-row">
                  <span>Distance Charge</span>
                  <span class="estimate-val">₹{{ estimate.distanceFare }}</span>
                </div>
                <div class="estimate-divider"></div>
                <div class="estimate-row total">
                  <span>Total Fare</span>
                  <span class="estimate-total">₹{{ estimate.totalFare }}</span>
                </div>
                <div class="surge-warning" v-if="estimate.surgeActive">
                  ⚡ Surge pricing ({{ estimate.surgeMultiplier }}x) is active
                </div>
              </div>
            </Transition>
          </div>

          <!-- Book Button -->
          <button
            class="btn btn-primary book-submit-btn"
            :disabled="booking || !pickup || !dropoff"
            @click="bookRide"
            id="book-confirm-btn"
          >
            <span v-if="!booking">🚀 Confirm Booking</span>
            <span v-else class="flex items-center gap-1">
              <span class="loader" style="width:20px;height:20px;border-width:2px;"></span>
              Finding driver...
            </span>
          </button>
        </div>
      </div>

      <!-- Right Column: Map + Drivers -->
      <div class="hero-globe-container animate-scale-in delay-2">
        <div class="book-right-panel">
          <!-- Map Panel -->
          <div class="map-panel glass-card animate-fade-up delay-2" id="map-panel">
            <div class="map-header">
              <h3 class="form-section-title">🗺️ Live Map</h3>
              <div class="map-controls">
                <button class="map-ctrl-btn" id="map-zoom-in">+</button>
                <button class="map-ctrl-btn" id="map-zoom-out">−</button>
              </div>
            </div>
            <div class="map-visual">
              <canvas ref="mapCanvas" class="map-canvas"></canvas>
              <div class="map-overlay-ui">
                <div class="map-pin pickup-pin" :style="{ left: '30%', top: '40%' }" id="map-pickup-pin">
                  <div class="pin-dot green"></div>
                  <div class="pin-pulse"></div>
                  <span class="pin-label">Pickup</span>
                </div>
                <div class="map-pin dropoff-pin" :style="{ left: '65%', top: '60%' }" id="map-dropoff-pin">
                  <div class="pin-dot pink"></div>
                  <span class="pin-label">Drop</span>
                </div>
                <div
                  v-for="(driver, i) in nearbyDrivers"
                  :key="driver.id"
                  class="driver-marker"
                  :style="{ left: `${20 + (i * 15) % 60}%`, top: `${20 + (i * 13) % 55}%` }"
                  :id="`driver-marker-${driver.id}`"
                >
                  🚗
                </div>
              </div>
            </div>
          </div>

          <!-- Nearby Drivers -->
          <div class="drivers-panel animate-fade-up delay-3" id="nearby-drivers-panel">
            <h3 class="form-section-title" style="margin-bottom:1rem;">🧑‍💼 Nearby Drivers</h3>
            <div class="drivers-list">
              <div
                v-for="driver in nearbyDrivers.slice(0, 4)"
                :key="driver.id"
                class="driver-card glass-card"
                :id="`driver-card-${driver.id}`"
              >
                <div class="driver-avatar">
                  <img :src="driver.avatar" :alt="driver.name" />
                </div>
                <div class="driver-info">
                  <span class="driver-name">{{ driver.name }}</span>
                  <span class="driver-car">{{ driver.car }}</span>
                  <div class="driver-rating">
                    <span class="star">★</span> {{ driver.rating }} · {{ driver.eta }} min away
                  </div>
                </div>
                <div class="driver-type-badge badge" :class="driver.type === 'economy' ? 'badge-blue' : driver.type === 'premium' ? 'badge-violet' : 'badge-pink'">
                  {{ driver.type }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking Confirmation Modal -->
    <Transition name="modal">
      <div class="modal-overlay" v-if="confirmedBooking" @click.self="confirmedBooking = null" id="booking-modal">
        <div class="modal-card glass-card animate-scale-in">
          <div class="modal-success-icon">🎉</div>
          <h2 class="modal-title">Ride Confirmed!</h2>
          <div class="modal-booking-id">Booking ID: <strong>{{ confirmedBooking.id }}</strong></div>

          <div class="modal-driver">
            <div class="modal-driver-avatar">
              <img v-if="confirmedBooking.driver.avatar" :src="confirmedBooking.driver.avatar" :alt="confirmedBooking.driver.name" />
              <span v-else>👨‍💼</span>
            </div>
            <div>
              <div class="modal-driver-name">{{ confirmedBooking.driver.name }}</div>
              <div class="modal-driver-car">{{ confirmedBooking.driver.car }}</div>
              <div class="modal-driver-rating">★ {{ confirmedBooking.driver.rating }}</div>
            </div>
            <div class="modal-eta">
              <span class="eta-num">{{ confirmedBooking.driver.eta }}</span>
              <span class="eta-label">min</span>
            </div>
          </div>

          <div class="modal-fare">
            <span>Total Fare</span>
            <span class="modal-fare-amount">₹{{ confirmedBooking.fare }}</span>
          </div>

          <div class="modal-actions">
            <button class="btn btn-primary" @click="confirmedBooking = null" id="modal-track-btn">📍 Track Ride</button>
            <button class="btn btn-ghost" @click="confirmedBooking = null" id="modal-close-btn">Close</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import ParticleField from '../components/ParticleField.vue';

const pickup = ref('');
const dropoff = ref('');
const selectedRide = ref('economy');
const estimate = ref(null);
const loading = ref(false);
const booking = ref(false);
const confirmedBooking = ref(null);
const nearbyDrivers = ref([]);
const mapCanvas = ref(null);

let estimateTimer = null;
let mapCtx, mapAnim;

const rideTypes = [
  { id: 'economy', name: 'Economy', icon: '🚗', eta: '3-5 min', basePrice: 80 },
  { id: 'premium', name: 'Premium', icon: '⭐', eta: '5-8 min', basePrice: 150 },
  { id: 'xl', name: 'XL', icon: '🚐', eta: '6-10 min', basePrice: 200 },
  { id: 'luxury', name: 'Luxury', icon: '💎', eta: '8-12 min', basePrice: 350 },
];

async function fetchDrivers() {
  try {
    const res = await axios.get('/api/drivers');
    nearbyDrivers.value = res.data.drivers;
  } catch {
    // Fallback mock drivers
    nearbyDrivers.value = [
      { id: 'd1', name: 'Arjun S.', car: 'Toyota Camry', rating: '4.9', eta: 3, type: 'premium', avatar: '👨' },
      { id: 'd2', name: 'Priya M.', car: 'Honda Civic', rating: '4.8', eta: 5, type: 'economy', avatar: '👩' },
      { id: 'd3', name: 'Rahul K.', car: 'Hyundai Creta', rating: '4.7', eta: 7, type: 'xl', avatar: '👨‍💼' },
      { id: 'd4', name: 'Sneha P.', car: 'BMW 3 Series', rating: '5.0', eta: 9, type: 'premium', avatar: '👩‍💼' },
    ];
  }
}

function selectRide(id) {
  selectedRide.value = id;
  if (pickup.value && dropoff.value) fetchEstimate();
}

function fetchEstimate() {
  clearTimeout(estimateTimer);
  if (!pickup.value || !dropoff.value) { estimate.value = null; return; }
  loading.value = true;
  estimateTimer = setTimeout(async () => {
    try {
      const res = await axios.post('/api/rides/estimate', {
        pickup: pickup.value,
        dropoff: dropoff.value,
        rideType: selectedRide.value,
      });
      estimate.value = res.data.estimate;
    } catch {
      estimate.value = {
        distance: `${(5 + Math.random() * 15).toFixed(1)} km`,
        duration: `${Math.floor(15 + Math.random() * 25)} min`,
        baseFare: 80,
        distanceFare: Math.floor(60 + Math.random() * 100),
        totalFare: Math.floor(140 + Math.random() * 200),
        surgeActive: false,
        surgeMultiplier: 1,
      };
    } finally {
      loading.value = false;
    }
  }, 700);
}

async function bookRide() {
  if (!pickup.value || !dropoff.value) return;
  booking.value = true;
  try {
    const res = await axios.post('/api/booking', {
      pickup: pickup.value,
      dropoff: dropoff.value,
      rideType: selectedRide.value,
    });
    confirmedBooking.value = res.data.booking;
  } catch {
    confirmedBooking.value = {
      id: 'PR' + Date.now().toString().slice(-6),
      driver: { name: 'Arjun Singh', car: 'Toyota Camry - KA 01 AB 1234', rating: 4.9, eta: 4, phone: '+91 98765 43210' },
      fare: estimate.value?.totalFare || 240,
      status: 'confirmed',
    };
  } finally {
    booking.value = false;
  }
}

// Animated mini-map canvas
function initMapCanvas() {
  const canvas = mapCanvas.value;
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  mapCtx = canvas.getContext('2d');

  const dots = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    color: ['#ffffff', '#cccccc', '#888888', '#aaaaaa'][Math.floor(Math.random() * 4)],
    opacity: Math.random() * 0.6 + 0.2,
  }));

  function drawGrid() {
    mapCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark background
    mapCtx.fillStyle = 'rgba(5, 5, 5, 0.95)';
    mapCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    mapCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    mapCtx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
      mapCtx.beginPath(); mapCtx.moveTo(x, 0); mapCtx.lineTo(x, canvas.height); mapCtx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      mapCtx.beginPath(); mapCtx.moveTo(0, y); mapCtx.lineTo(canvas.width, y); mapCtx.stroke();
    }

    // Roads
    const roads = [
      [[0.1, 0.3], [0.9, 0.4]],
      [[0.2, 0.1], [0.3, 0.9]],
      [[0.5, 0.0], [0.6, 1.0]],
      [[0.0, 0.6], [1.0, 0.7]],
      [[0.7, 0.2], [0.8, 0.8]],
    ];
    roads.forEach(([[x1, y1], [x2, y2]]) => {
      mapCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      mapCtx.lineWidth = 2;
      mapCtx.beginPath();
      mapCtx.moveTo(x1 * canvas.width, y1 * canvas.height);
      mapCtx.lineTo(x2 * canvas.width, y2 * canvas.height);
      mapCtx.stroke();
    });

    // Animated dots (cars)
    dots.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0) dot.x = canvas.width;
      if (dot.x > canvas.width) dot.x = 0;
      if (dot.y < 0) dot.y = canvas.height;
      if (dot.y > canvas.height) dot.y = 0;

      mapCtx.beginPath();
      mapCtx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      mapCtx.fillStyle = dot.color + Math.floor(dot.opacity * 255).toString(16).padStart(2, '0');
      mapCtx.fill();

      // Glow
      mapCtx.beginPath();
      mapCtx.arc(dot.x, dot.y, dot.r * 3, 0, Math.PI * 2);
      const grad = mapCtx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.r * 3);
      grad.addColorStop(0, dot.color + '40');
      grad.addColorStop(1, 'transparent');
      mapCtx.fillStyle = grad;
      mapCtx.fill();
    });

    mapAnim = requestAnimationFrame(drawGrid);
  }

  drawGrid();
}

onMounted(async () => {
  await fetchDrivers();
  setTimeout(initMapCanvas, 100);
});

onUnmounted(() => {
  clearTimeout(estimateTimer);
  cancelAnimationFrame(mapAnim);
});
</script>

<style scoped>
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

.hero-globe-container {
  height: auto;
  position: relative;
  border-radius: var(--radius-xl);
  overflow: visible;
}

/* Form Panel */
.booking-form-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section { padding: 1.5rem; }

.form-section-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 1;
  flex-shrink: 0;
}

.green-dot { background: var(--neon-green); box-shadow: 0 0 6px var(--neon-green); }
.pink-dot { background: var(--neon-pink); box-shadow: 0 0 6px var(--neon-pink); }

.input-with-icon .input-field { padding-left: 2.5rem; }

.route-visual {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
}

.route-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--neon-green);
  box-shadow: 0 0 6px var(--neon-green);
}

.route-dot.pink {
  background: var(--neon-pink);
  box-shadow: 0 0 6px var(--neon-pink);
}

.route-dashes {
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(to right, var(--glass-border) 0, var(--glass-border) 5px, transparent 5px, transparent 10px);
}

/* Ride Selector */
.ride-selector {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ride-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  color: var(--text-primary);
  font-family: var(--font-primary);
  text-align: left;
}

.ride-option:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
}

.ride-option.active {
  border-color: var(--neon-blue);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.ride-opt-icon { font-size: 1.4rem; flex-shrink: 0; }

.ride-opt-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ride-opt-name { font-weight: 700; font-size: 0.95rem; }
.ride-opt-eta { font-size: 0.78rem; color: var(--text-muted); }
.ride-opt-price { font-weight: 700; font-size: 0.95rem; color: var(--neon-blue); }

/* Estimate */
.estimate-card { padding: 1.5rem; }
.estimate-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

.estimate-details { display: flex; flex-direction: column; gap: 0.6rem; }

.estimate-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.estimate-val { color: var(--text-primary); font-weight: 600; }

.estimate-divider {
  height: 1px;
  background: var(--glass-border);
  margin: 0.25rem 0;
}

.estimate-row.total {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.estimate-total {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.surge-warning {
  background: rgba(255, 140, 66, 0.1);
  border: 1px solid rgba(255, 140, 66, 0.3);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  color: var(--neon-orange);
  margin-top: 0.5rem;
}

.book-submit-btn {
  width: 100%;
  justify-content: center;
  padding: 1.1rem;
  font-size: 1.05rem;
}

.book-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Right Panel */
.book-right-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Map */
.map-panel { padding: 1.5rem; }
.map-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }

.map-controls { display: flex; gap: 0.5rem; }

.map-ctrl-btn {
  width: 32px; height: 32px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  line-height: 1;
  font-family: var(--font-primary);
}

.map-ctrl-btn:hover {
  border-color: var(--neon-blue);
  color: var(--neon-blue);
}

.map-visual {
  position: relative;
  height: 280px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.map-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.map-overlay-ui {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.map-pin {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transform: translate(-50%, -50%);
}

.pin-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  z-index: 2;
}

.pin-dot.green { background: var(--neon-green); box-shadow: 0 0 10px var(--neon-green); }
.pin-dot.pink { background: var(--neon-pink); box-shadow: 0 0 10px var(--neon-pink); }

.pin-pulse {
  position: absolute;
  width: 30px; height: 30px;
  border-radius: 50%;
  background: rgba(0, 255, 157, 0.3);
  animation: ripple 1.5s ease infinite;
}

.pin-label {
  font-size: 0.7rem;
  color: white;
  background: rgba(0,0,0,0.6);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.driver-marker {
  position: absolute;
  font-size: 1.1rem;
  transform: translate(-50%, -50%);
  animation: float 2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px var(--neon-blue));
}

/* Drivers List */
.drivers-panel { }

.drivers-list { display: flex; flex-direction: column; gap: 0.75rem; }

.driver-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
}

.driver-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--glass);
  border: 2px solid var(--glass-border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
  overflow: hidden;
}

.driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.driver-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
.driver-name { font-weight: 700; font-size: 0.95rem; }
.driver-car { font-size: 0.8rem; color: var(--text-muted); }
.driver-rating { font-size: 0.8rem; color: var(--text-secondary); }
.star { color: #ffd700; }

.driver-type-badge { font-size: 0.7rem; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
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

.modal-success-icon { font-size: 4rem; margin-bottom: 1rem; animation: bounce-in 0.6s ease; }
.modal-title { font-size: 1.8rem; margin-bottom: 0.5rem; }

.modal-booking-id {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.modal-driver {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.modal-driver-avatar {
  width: 50px; height: 50px;
  border-radius: 50%;
  background: rgba(0,212,255,0.1);
  border: 2px solid var(--neon-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  overflow: hidden;
}

.modal-driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-driver-name { font-weight: 700; font-size: 1rem; }
.modal-driver-car { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.25rem; }
.modal-driver-rating { font-size: 0.82rem; color: #ffd700; }

.modal-eta {
  margin-left: auto;
  text-align: center;
}

.eta-num {
  display: block;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  color: var(--neon-blue);
}

.eta-label { font-size: 0.75rem; color: var(--text-muted); }

.modal-fare {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.modal-fare-amount {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 900;
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-actions { display: flex; gap: 1rem; }
.modal-actions .btn { flex: 1; justify-content: center; }

/* Modal transition */
.modal-enter-active, .modal-leave-active { transition: all 0.35s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-card { transform: scale(0.9) translateY(20px); }

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 1024px) {
  .book-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .book-container { padding: 2rem 1.25rem 4rem; }
}
</style>
