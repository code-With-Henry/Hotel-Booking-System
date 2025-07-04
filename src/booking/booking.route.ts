import { Router } from "express";
import { createBooking, deleteBooking, getBookingById, getBookings, updateBooking } from "./booking.controller";
//import { adminRoleAuth } from "../middleware/bearAuth";


export const bookingRouter = Router();

// Definition Routes for Booking entity

// Get all Bookings
bookingRouter.get('/bookings', getBookings);

// Get Booking by ID
bookingRouter.get('/bookings/:id', getBookingById);

// Create a new Booking
bookingRouter.post('/bookings', createBooking);

// Update an existing Booking
bookingRouter.put('/bookings/:id', updateBooking);


// Delete an existing Booking
bookingRouter.delete('/bookings/:id',deleteBooking);
