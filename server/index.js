require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ridesRouter = require('./routes/rides');
const supabase = require('./supabase');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rides', ridesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PrimeRide API running 🚗' });
});

// Driver locations (from Supabase, with mock fallback)
app.get('/api/drivers', async (req, res) => {
  try {
    const { data: drivers, error } = await supabase
      .from('drivers')
      .select('*');

    if (error || !drivers || drivers.length === 0) {
      throw new Error(error ? error.message : 'No drivers found');
    }

    res.json({ success: true, drivers });
  } catch (err) {
    console.log('Using mock drivers fallback:', err.message);
    const mockDrivers = Array.from({ length: 8 }, (_, i) => ({
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
    res.json({ success: true, drivers: mockDrivers });
  }
});

// Booking endpoint (saved to Supabase, with mock fallback)
app.post('/api/booking', async (req, res) => {
  const { pickup, dropoff, rideType } = req.body;
  const bookingId = 'PR' + Date.now().toString().slice(-6);
  
  // Assign driver
  let driver = {
    name: 'Arjun Singh',
    rating: 4.9,
    car: 'Toyota Camry - KA 01 AB 1234',
    eta: 4,
    phone: '+91 98765 43210',
    avatar: 'https://i.pravatar.cc/80?img=11'
  };

  try {
    // Try to get a driver from Supabase matching the rideType
    const { data: dbDrivers } = await supabase
      .from('drivers')
      .select('*')
      .eq('type', rideType);
      
    if (dbDrivers && dbDrivers.length > 0) {
      const selected = dbDrivers[Math.floor(Math.random() * dbDrivers.length)];
      driver = {
        name: selected.name,
        rating: parseFloat(selected.rating),
        car: `${selected.car} - KA 01 PR ${Math.floor(1000 + Math.random() * 9000)}`,
        eta: selected.eta,
        phone: '+91 ' + Math.floor(6000000000 + Math.random() * 3999999999),
        avatar: selected.avatar
      };
    }
  } catch (err) {
    console.log('Driver assignment fell back to mock:', err.message);
  }

  const fare = rideType === 'economy' ? 150 : rideType === 'premium' ? 280 : 420;

  try {
    const { error } = await supabase
      .from('bookings')
      .insert({
        id: bookingId,
        pickup,
        dropoff,
        ride_type: rideType,
        driver_name: driver.name,
        driver_car: driver.car,
        fare,
        status: 'confirmed'
      });

    if (error) throw error;
  } catch (err) {
    console.log('Could not save booking to database:', err.message);
  }
  
  setTimeout(() => {
    res.json({
      success: true,
      booking: {
        id: bookingId,
        pickup,
        dropoff,
        rideType,
        driver,
        fare,
        status: 'confirmed'
      }
    });
  }, 800);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚗 PrimeRide API running at http://localhost:${PORT}`);
    console.log(`📡 Endpoints: /api/health | /api/rides | /api/drivers | /api/booking\n`);
  });
}

module.exports = app;
