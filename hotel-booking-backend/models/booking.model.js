// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    numberOfGuests: Number,
    checkInDate: Date,
    checkOutDate: Date,
    roomId: String, // Reference to room
    roomName: String,
    roomNumber: Number,
    pricePerNight: Number,
    roomType: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
