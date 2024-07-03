const express = require('express');
const router = express.Router();
const BHall = require('./hall');

router.post('/onlyhall', async (req, res) => {
    try {
      const hallBooking = new BHall(req.body);
      await hallBooking.save();
      console.log("soccess")
      res.status(201).send(hallBooking);
    } catch (error) {
      console.log("sfa",error)
      res.status(400).send({ error: error.message });
    }
  });
  router.get('/onlyhall/unavailable-dates', async (req, res) => {
    try {
      const bookings = await BHall.find({}, 'selectedDates');
      console.log('Bookings:', bookings); // Log bookings to inspect the fetched data
      const unavailableDates = bookings.flatMap((booking) => booking.selectedDates);
      console.log('Unavailable Dates:', unavailableDates); // Log unavailable dates for inspection
      res.json(unavailableDates);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      res.status(500).send('Server error');
    }
  });
 // Example backend route to fetch private event dates
router.get('/onlyhall/selected-dates-private-events', async (req, res) => {
  try {
    const privateEventBookings = await BHall.find({ isPrivateEvent: true }, 'selectedDates');
    const selectedDatesPrivateEvents = privateEventBookings.flatMap((booking) => booking.selectedDates);
    console.log("selectedDatesPrivateEvents",selectedDatesPrivateEvents);
    res.json(selectedDatesPrivateEvents);
  } catch (error) {
    console.error('Error fetching selected dates for private events:', error);
    res.status(500).send('Server error');
  }
});

  module.exports = router;
