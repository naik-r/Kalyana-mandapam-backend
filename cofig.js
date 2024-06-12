const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    selectedDates: {
        type: [Date],
        required: true
    },
    event: {
        type: String,
        required: true
    },
    numGuests: {
        type: Number,
        required: true
    },
    numDays: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    description: String
});


const OnlyHallSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    selectedDates: {
        type: [Date],
        required: true
    },
    event: {
        type: String,
        required: true
    },
    numGuests: {
        type: Number,
        required: true,
        min: 1
    },
    numDays: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    description: String
});
const HallwithRooms = mongoose.model('HallwithRooms', hallSchema);
const OnlyHall = mongoose.model('OnlyHall', OnlyHallSchema);
module.exports = { HallwithRooms, OnlyHall };
