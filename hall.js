const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  isPrivateEvent: { type: String,  required: false },
  otherEvent: { type: String },
  event: { type: String, required: false },
  description: { type: String },
  services: {
    catering: { type: Boolean, default: false },
    decoration: { type: Boolean, default: false }
  },
  selectedDates: { type: [Date], required: true },
  unavailableDates: { type: [Date], required: true },
  numGuests: { type: Number, required: true },
  numDays: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  withRooms: { type: Boolean, default: false },
  numPersonsNeedingRoom: { type: Number, default: 0 },
  roomType: { 
    type: String,
    enum: ['AC', 'Non-AC'],
    required: false
  },
  numRoomsNeeded: { type: Number, default: 0 },
  selectedRooms: { type: [Number], default: [] }
});

const BHall = mongoose.model('Hall', hallSchema);

module.exports = BHall;
