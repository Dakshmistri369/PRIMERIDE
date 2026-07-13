const express = require('express');
const cors = require('cors');
const ridesRouter = require('./routes/rides');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rides', ridesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PrimeRide API running 🚗' });
});

// Driver locations (mock GPS)
app.get('/api/drivers', (req, res) => {
  const drivers = Array.from({ length: 8 }, (_, i) => ({
    id: `driver-${i + 1}`,
    name: ['Arjun S.', 'Priya M.', 'Rahul K.', 'Sneha P.', 'Dev R.', 'Meera J.', 'Anil T.', 'Kavya B.'][i],
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    eta: Math.floor(2 + Math.random() * 8),
    car: ['Toyota Camry', 'Honda Civic', 'Hyundai Creta', 'BMW 3 Series', 'Tesla Model 3', 'Maruti Swift', 'Kia Seltos', 'Mahindra XUV'][i],
    type: ['economy', 'economy', 'premium', 'luxury', 'premium', 'economy', 'xl', 'xl'][i],
    lat: 12.9716 + (Math.random() - 0.5) * 0.05,
    lng: 77.5946 + (Math.random() - 0.5) * 0.05,
    avatar: `https://i.pravatar.cc/80?img=${i + 10}`
  }));
  res.json({ success: true, drivers });
});

// Booking endpoint
app.post('/api/booking', (req, res) => {
  const { pickup, dropoff, rideType } = req.body;
  const bookingId = 'PR' + Date.now().toString().slice(-6);
  
  setTimeout(() => {
    res.json({
      success: true,
      booking: {
        id: bookingId,
        pickup,
        dropoff,
        rideType,
        driver: {
          name: 'Arjun Singh',
          rating: 4.9,
          car: 'Toyota Camry - KA 01 AB 1234',
          eta: 4,
          phone: '+91 98765 43210'
        },
        fare: rideType === 'economy' ? 150 : rideType === 'premium' ? 280 : 420,
        status: 'confirmed'
      }
    });
  }, 800);
});

app.listen(PORT, () => {
  console.log(`\n🚗 PrimeRide API running at http://localhost:${PORT}`);
  console.log(`📡 Endpoints: /api/health | /api/rides | /api/drivers | /api/booking\n`);
});
