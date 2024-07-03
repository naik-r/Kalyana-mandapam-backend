const express = require('express');
const router = express.Router();
const Booking = require('./Booking');

// POST /api/halls - Create a new booking
router.post('/halls', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).send('Failed to save booking');
  }
});

// GET /api/halls/bookings - Fetch all bookings
router.get('/halls/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).send('Failed to fetch bookings');
  }
});

// GET /api/booked-dates-rooms - Fetch booked dates and rooms
// GET /api/booked-dates-rooms - Fetch booked dates and rooms
router.get('/booked-dates-rooms', async (req, res) => {
  try {
    const bookings = await Booking.find({}, 'selectedDates selectedRooms');
    console.log('Fetched bookings:', bookings); // Log fetched bookings to console
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching booked dates and rooms:', err);
    res.status(500).send('Failed to fetch booked dates and rooms');
  }
});


// GET /api/booked-rooms - Fetch booked rooms for a specific date
router.get('/booked-rooms', async (req, res) => {
  const { date } = req.query;
  try {
    const bookings = await Booking.find({ selectedDates: new Date(date) }, 'selectedRooms');
    const bookedRooms = bookings.flatMap(booking => booking.selectedRooms);
    res.status(200).json(bookedRooms);
  } catch (err) {
    console.error('Error fetching booked rooms:', err);
    res.status(500).send('Failed to fetch booked rooms');
  }
});

module.exports = router;
