import { Router } from "express";
import {createBooking, deleteBooking, getBookingById, getBookings, getMyBookings, updateBooking } from "./booking.controller";
import { memberRoleAuth } from "../middleware/bearAuth";

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

// Should be relative to /api/bookings
bookingRouter.get("/my/bookings",memberRoleAuth, getMyBookings);



