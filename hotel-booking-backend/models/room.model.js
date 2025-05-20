// models/room.model.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_number: { type: String, required: true, unique: true }, // Added room_number, making it required and unique
    room_name: { type: String, required: true },
    description: { type: String },
    price_per_night: { type: Number, required: true },
    max_guests: { type: Number, required: true, min: 1 },
    imageUrls: [{ type: String }], // Changed to an array
    type: { type: String },         // Added the 'type' field
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;