const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

const fallbackRideTypes = [
  {
    id: 'economy',
    name: 'Economy',
    icon: '🚗',
    description: 'Affordable everyday rides',
    basePrice: 80,
    pricePerKm: 12,
    eta: '3-5 min',
    capacity: 4,
    features: ['AC', 'Comfortable', 'Budget-friendly']
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: '⭐',
    description: 'Luxury rides in style',
    basePrice: 150,
    pricePerKm: 22,
    eta: '5-8 min',
    capacity: 4,
    features: ['AC', 'Premium car', 'Top-rated drivers', 'In-car Wi-Fi']
  },
  {
    id: 'xl',
    name: 'XL',
    icon: '🚐',
    description: 'Spacious rides for groups',
    basePrice: 200,
    pricePerKm: 18,
    eta: '6-10 min',
    capacity: 6,
    features: ['AC', 'SUV/Van', 'Extra luggage space', 'Group travel']
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '💎',
    description: 'First-class experience',
    basePrice: 350,
    pricePerKm: 35,
    eta: '8-12 min',
    capacity: 4,
    features: ['AC', 'Premium sedan', 'Professional driver', 'Complimentary water', 'In-car entertainment']
  }
];

// Get all ride types (from Supabase, with local fallback)
router.get('/', async (req, res) => {
  try {
    const { data: dbRides, error } = await supabase
      .from('ride_types')
      .select('*');

    if (error || !dbRides || dbRides.length === 0) {
      throw new Error(error ? error.message : 'No ride types found');
    }

    // Format DB response (snake_case from database to camelCase for front-end compatibility)
    const formattedRides = dbRides.map(ride => ({
      id: ride.id,
      name: ride.name,
      icon: ride.icon,
      description: ride.description,
      basePrice: parseFloat(ride.base_price),
      pricePerKm: parseFloat(ride.price_per_km),
      eta: ride.eta,
      capacity: ride.capacity,
      features: ride.features
    }));

    res.json({ success: true, rideTypes: formattedRides });
  } catch (err) {
    console.log('Using mock ride types fallback:', err.message);
    res.json({ success: true, rideTypes: fallbackRideTypes });
  }
});

// Estimate fare (from Supabase, with local fallback)
router.post('/estimate', async (req, res) => {
  const { pickup, dropoff, rideType } = req.body;
  
  // Mock distance calculation (3-25 km)
  const distance = parseFloat((3 + Math.random() * 22).toFixed(1));
  const duration = Math.floor(distance * 3 + Math.random() * 10);
  
  let basePrice = 80;
  let pricePerKm = 12;
  let eta = '3-5 min';

  try {
    const { data: dbRide, error } = await supabase
      .from('ride_types')
      .select('*')
      .eq('id', rideType)
      .single();

    if (error || !dbRide) throw new Error(error ? error.message : 'Ride type not found');

    basePrice = parseFloat(dbRide.base_price);
    pricePerKm = parseFloat(dbRide.price_per_km);
    eta = dbRide.eta;
  } catch (err) {
    console.log('Fare estimation fell back to mock data:', err.message);
    const ride = fallbackRideTypes.find(r => r.id === rideType) || fallbackRideTypes[0];
    basePrice = ride.basePrice;
    pricePerKm = ride.pricePerKm;
    eta = ride.eta;
  }
  
  const fare = Math.round(basePrice + pricePerKm * distance);
  const surgeMultiplier = Math.random() > 0.7 ? 1.2 : 1.0;
  
  res.json({
    success: true,
    estimate: {
      rideType,
      pickup,
      dropoff,
      distance: `${distance} km`,
      duration: `${duration} min`,
      baseFare: basePrice,
      distanceFare: Math.round(pricePerKm * distance),
      totalFare: Math.round(fare * surgeMultiplier),
      surgeActive: surgeMultiplier > 1,
      surgeMultiplier,
      eta
    }
  });
});

module.exports = router;
