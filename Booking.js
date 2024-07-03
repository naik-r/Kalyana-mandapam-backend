const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  numPersonsNeedingRoom: { type: Number, required: true },
  roomType: { type: String, required: true },
  numRoomsNeeded: { type: Number, required: true },
  selectedRooms: [{ type: Date, type:Array }], 
  selectedDates: { type: [Date], required: true },
  numGuests: { type: Number, required: true },
  numDays: { type: Number, required: true },
  description: { type: String },
  totalPrice: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
