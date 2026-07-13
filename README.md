# PrimeRide 🚗⚡

> A super-premium Uber-like ride-hailing website built with Vue.js 3, Three.js, Express.js, and vanilla CSS.

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

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vue.js 3 + Vite + Vue Router |
| 3D Graphics | Three.js |
| Backend API | Express.js |
| Styling | Vanilla CSS (Dark Glassmorphism) |
| Animations | Three.js + CSS Keyframes |

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
        ├── main.js         # App entry
        ├── App.vue         # Root + Footer
        ├── style.css       # Full design system
        ├── components/
        │   ├── Navbar.vue          # Glassmorphism sticky nav
        │   ├── HeroThreeScene.vue  # 🌍 Earth globe + particles
        │   ├── CarThreeScene.vue   # 🚗 3D floating car
        │   └── ParticleField.vue   # ✨ 5000-particle field
        └── views/
            ├── HomeView.vue   # Landing page
            ├── BookView.vue   # Booking page
            └── AboutView.vue  # About page
```

---

## 🎨 3D Features

- **Earth Globe** — Spinning globe with glowing city dots across 16 world cities, route arcs between cities, orbiting neon rings, atmosphere glow, shooting stars, and mouse-reactive camera
- **3D Car** — Full car built from Three.js geometries with neon underglow, headlights/taillights, ground grid, speed lines, and mouse-reactive rotation
- **Particle Field** — 5,000 additive-blended particles with upward drift and mouse interaction (fixed to viewport)

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| GET | `/api/rides` | All ride types |
| POST | `/api/rides/estimate` | Fare estimate |
| GET | `/api/drivers` | Nearby drivers |
| POST | `/api/booking` | Confirm booking |

---

## 🎨 Design System

- **Colors**: Navy `#05080F` bg, Electric Blue `#00D4FF`, Violet `#7B61FF`, Pink `#FF3D9A`, Green `#00FF9D`
- **Style**: Dark glassmorphism with backdrop-filter blur, neon glows
- **Font**: Inter + Space Grotesk (Google Fonts)
- **Animations**: Float, pulse, ripple, shimmer, bounce-in, page transitions
