# PrimeRide 🚗⚡

> PrimeRide is a super-premium, high-fidelity ride-hailing landing page and web application. It combines cutting-edge 3D WebGL graphics, immersive interactions, and dark glassmorphic design systems to create a truly luxurious user experience.

---

## 🚀 Quick Start

Double-click `start.bat` to launch both servers automatically and open the browser.

**Or manually:**

```bash
# Terminal 1 — Express API (port 3001)
cd server
npm install
node index.js

# Terminal 2 — Vue App (port 5173)
cd client
npm install
npm run dev
```

Then open **http://localhost:5173**

---

## ✨ Features & Visual Highlights

### 1. 🚗 Scroll-Driven 3D Car Drift (Home Screen)
An advanced 3D perspective road is rendered in the background of the landing page. A detailed **3D Red Muscle Car** rides on the road, reacting dynamically to the user's scroll speed and direction:
* **Drift Physics**: Scrolling down drives a horizontal sway (`position.x`) and counter-steer rotation (`rotation.y`) simulating a high-speed drift.
* **Speed-Synced Motion**: Wheel spinning and road markers accelerate based on scroll speed.
* **Floating Neon Banner**: Active scrolling reveals a floating glassmorphic **"Book with PrimeRide ➔"** banner with pulsing neon shadows at the bottom center.

### 2. 🔑 Premium 3D Login View (`/login`)
A dedicated glassmorphic sign-in page featuring:
* **Cyber Muscle Car**: A custom high-fidelity 3D model designed with metallic chrome reflections, slanted headlights, dual chrome exhausts with glowing fire tips, alloy wheels, and static red brake calipers.
* **Studio Lighting**: Side-pointing directional lights casting a striking red rim highlight onto the car body.
* **Social Integrations**: Polished social sign-in buttons for Google, GitHub, and Facebook.
* **Teardown Performance**: Automatically disposes of WebGL contexts on unmount to safeguard against memory leaks.

### 3. 🎨 Interactive Theme & Text Color Cycling
* Clicking or touching anywhere on the website cycles all typography and text elements through a curated theme palette of **Red, Yellow, and White**.
* Strips out custom gradient text styling dynamically to force solid color states, ensuring readability across all views.

### 4. ⚡ Upgraded Loading Splash Screen
* Replaced the cartoon-style beetle with an ultra-sleek, aerodynamic **SVG Sports Coupe silhouette**.
* Features a low-slung glass canopy, B-pillar separator, aggressive LED headlights, full-width red taillights, and detailed alloy rims with red calipers.
* Renders a glowing red underglow that reflects onto the loading indicator ring.

### 5. 🗺️ Interactive City Globe
* A fully interactive 3D WebGL globe on the landing page showing active routes, glowing city dots, and atmosphere ring.
* Mouse-reactive camera tracking and particle starfields creating a galactic, high-tech backdrop.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vue.js 3 + Vite + Vue Router |
| **3D Engine** | Three.js (WebGL) |
| **Backend API** | Express.js |
| **Styling** | Vanilla CSS (Dark Glassmorphism) |
| **Animations** | GSAP (ScrollTrigger) + CSS Keyframes |

---

## 📁 Project Structure

```
PrimeRide/
├── start.bat              # One-click startup
├── server/
│   ├── index.js           # Express server (port 3001)
│   ├── routes/
│   │   └── rides.js       # Ride types & fare estimation API
│   └── package.json
└── client/
    ├── index.html
    ├── vite.config.js      # Vite config with API proxy
    └── src/
        ├── main.js         # App entry & Router config
        ├── App.vue         # Root container & text cycle listener
        ├── style.css       # Global design system & theme sheets
        ├── components/
        │   ├── Navbar.vue          # Glassmorphism navigation
        │   ├── SplashScreen.vue    # Sleek loading screen with sports car SVG
        │   ├── RoadBackground3D.vue# 3D Road scene & drift car physics
        │   ├── HeroCar3D.vue       # 3D Floating home screen car
        │   ├── CityGlobe3D.vue     # 3D Spinning Earth globe
        │   └── ParticleField.vue   # Viewport starfield particles
        └── views/
            ├── HomeView.vue   # Landing page & Drift banner
            ├── BookView.vue   # Ride booking and fare estimator
            ├── AboutView.vue  # About page
            └── LoginView.vue  # 3D Sign-in page
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| GET | `/api/rides` | Retrieve available ride types |
| POST | `/api/rides/estimate` | Compute fare estimate |
| GET | `/api/drivers` | Find nearby active drivers |
| POST | `/api/booking` | Dispatch a ride request |
