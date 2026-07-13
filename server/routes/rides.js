const express = require('express');
const router = express.Router();

const rideTypes = [
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

// Get all ride types
router.get('/', (req, res) => {
  res.json({ success: true, rideTypes });
});

// Estimate fare
router.post('/estimate', (req, res) => {
  const { pickup, dropoff, rideType } = req.body;
  
  // Mock distance calculation (3-25 km)
  const distance = parseFloat((3 + Math.random() * 22).toFixed(1));
  const duration = Math.floor(distance * 3 + Math.random() * 10);
  
  const ride = rideTypes.find(r => r.id === rideType) || rideTypes[0];
  const fare = Math.round(ride.basePrice + ride.pricePerKm * distance);
  const surgeMultiplier = Math.random() > 0.7 ? 1.2 : 1.0;
  
  res.json({
    success: true,
    estimate: {
      rideType,
      pickup,
      dropoff,
      distance: `${distance} km`,
      duration: `${duration} min`,
      baseFare: ride.basePrice,
      distanceFare: Math.round(ride.pricePerKm * distance),
      totalFare: Math.round(fare * surgeMultiplier),
      surgeActive: surgeMultiplier > 1,
      surgeMultiplier,
      eta: ride.eta
    }
  });
});

module.exports = router;
