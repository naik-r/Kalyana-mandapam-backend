const express = require('express');
const router = express.Router();
const Booking = require('./Booking');
const BHall=require('./hall')
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
// router.get('/booked-rooms', async (req, res) => {
//   const { date } = req.query;
//   try {
//     const bookings = await Booking.find({ selectedDates: new Date(date) }, 'selectedRooms');
//     const bookedRooms = bookings.flatMap(booking => booking.selectedRooms);
//     console.log('bbbbooked',bookedRooms)
//     const bookingArray = [];
//     const selectt = new Date(date).toDateString();
//     for (let i = 0; i < bookedRooms.length; i++) {
//       for (let j = 0; j < bookedRooms[i].length; j++) {
//         if (new Date(bookedRooms[i][j].date).toDateString() ===selectt) {
//           bookingArray.push(...bookedRooms[i][j].rooms);
//         }
//       }
//     }
//  console.log('ddddara',bookingArray)
//     res.status(200).json(bookingArray);
//   } catch (err) {
//     console.error('Error fetching booked rooms:', err);
//     res.status(500).send('Failed to fetch booked rooms');
//   }
// });

router.get('/booked-rooms', async (req, res) => {
  const { date } = req.query;
  try {
    // Query to find bookings in the Booking collection
    const bookings = await Booking.find({ selectedDates: new Date(date) }, 'selectedRooms');
    const bookedRooms = bookings.flatMap(booking => booking.selectedRooms);

    // Query to find bookings in the Bhall collection
    const bhallBookings = await BHall.find({ selectedDates: new Date(date) }, 'selectedRooms');
    const bhallRooms = bhallBookings.flatMap(booking => booking.selectedRooms);

    // Combine the booked rooms from both collections
    const allBookedRooms = [...bookedRooms, ...bhallRooms];

    const bookingArray = [];
    const selectt = new Date(date).toDateString();

    for (let i = 0; i < allBookedRooms.length; i++) {
      for (let j = 0; j < allBookedRooms[i].length; j++) {
        if (new Date(allBookedRooms[i][j].date).toDateString() === selectt) {
          bookingArray.push(...allBookedRooms[i][j].rooms);
        }
      }
    }

    console.log('All booked rooms:', bookingArray);
    res.status(200).json(bookingArray);
  } catch (err) {
    console.error('Error fetching booked rooms:', err);
    res.status(500).send('Failed to fetch booked rooms');
  }
});



// router.get('/booked-rooms', async (req, res) => {
//   const { date } = req.query;
//   if (!date) {
//     return res.status(400).json({ error: 'Date query parameter is required' });
//   }

//   try {
//     const selectedDate = new Date(date);
//     const bookings = await Booking.find({ selectedDates: selectedDate }, 'selectedRooms selectedDates');

//     if (!bookings || bookings.length === 0) {
//       return res.status(200).json([]);
//     }

//     // Filter the rooms for the specific date
//     const bookedRooms = bookings.flatMap(booking => {
//       // Check if the selected date is in the booking's selectedDates array
//       const isDateBooked = booking.selectedDates.some(d => new Date(d).getTime() === selectedDate.getTime());
//       console.log('bbbbbb',bookedRooms)
//       return isDateBooked ? booking.selectedRooms : [];
//     });
  
//     res.status(200).json(bookedRooms);
//   } catch (err) {
//     console.error('Error fetching booked rooms:', err);
//     res.status(500).send('Failed to fetch booked rooms');
//   }
// });

module.exports = router;
