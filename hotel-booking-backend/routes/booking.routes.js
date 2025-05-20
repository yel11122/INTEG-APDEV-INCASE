const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// POST /api/bookings - Add a new booking
router.post('/', bookingController.addBooking);

// GET /api/bookings - Get all bookings
router.get('/', bookingController.getAllBookings);

// GET /api/bookings/:id - Get a single booking by ID
router.get('/:id', bookingController.getBookingById);

// PUT /api/bookings/:id - Update a booking by ID
router.put('/:id', bookingController.updateBooking);

// DELETE /api/bookings/:id - Delete a booking by ID
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
