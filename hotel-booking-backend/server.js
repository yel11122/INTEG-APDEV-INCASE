const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const roomRoutes = require('./routes/room.routes');
const bookingRoutes = require('./routes/booking.routes');
const { errorHandler } = require('./middleware/errorMiddleware');
const morgan = require('morgan');
const socketIO = require('socket.io'); // Import socket.io

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// Middleware
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handling Middleware
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Socket.IO Setup
const io = socketIO(server, { // Change to const io
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Import and use bookingSockets.js
    const bookingSocketsHandler = require('./sockets/bookingSockets'); // Corrected path
    bookingSocketsHandler(io, socket); // Pass both io and socket
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});
