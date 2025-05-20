const Booking = require('../models/booking.model');

// POST /api/bookings/add - Add a new booking
exports.addBooking = async (req, res) => {
    const { roomId, roomNumber, fullName, email, checkInDate, checkOutDate, roomType, numberOfGuests } = req.body;

    const newBooking = new Booking({
        roomId,
        roomNumber,
        fullName,
        email,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        roomType,
        numberOfGuests,
    });

    try {
        const savedBooking = await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully!', booking: savedBooking });
    } catch (err) {
        res.status(400).json({ message: 'Error creating booking', error: err });
    }
};

// GET /api/bookings - Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching bookings', error: err });
    }
};

// GET /api/bookings/:id - Get a single booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching booking', error: err });
    }
};

// PUT /api/bookings/:id - Update a booking by ID
exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully!', booking: updatedBooking });
    } catch (err) {
        res.status(400).json({ message: 'Error updating booking', error: err });
    }
};

// DELETE /api/bookings/:id - Delete a booking by ID
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting booking', error: err });
    }
};
