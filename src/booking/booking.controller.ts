import { Request, Response } from "express";
import {createBookingServices,getBookingsServices,getBookingByIdServices,updateBookingServices,deleteBookingServices} from "./booking.service";

// Controller to fetch all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await getBookingsServices();
    if (!allBookings || allBookings.length === 0) {
      res.status(404).json({ message: "No bookings found" });
    } else {
      res.status(200).json(allBookings);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch bookings" });
  }
};

// Controller to fetch a booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }
  try {
    const booking = await getBookingByIdServices(bookingId);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json(booking);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch booking" });
  }
};

// Controller to create a new booking
export const createBooking = async (req: Request, res: Response) => {
  const {
    userId,
    roomId,
    checkInDate,
    checkOutDate,
    totalAmount,
    bookingStatus
  } = req.body;

  if (!userId || !roomId || !checkInDate || !checkOutDate || !totalAmount) {
    res.status(400).json({ error: "All required fields must be provided" });
    return;
  }

  try {
    const newBooking = await createBookingServices({
      userId,
      roomId,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      totalAmount,
      bookingStatus: bookingStatus || "Pending"
    });

    if (!newBooking) {
      res.status(500).json({ message: "Failed to create booking" });
    } else {
      res.status(201).json({ message: newBooking });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create booking" });
  }
};

// Controller to update a booking
export const updateBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  const {
    userId,
    roomId,
    checkInDate,
    checkOutDate,
    totalAmount,
    bookingStatus
  } = req.body;

  if (!userId || !roomId || !checkInDate || !checkOutDate || !totalAmount) {
    res.status(400).json({ error: "All required fields must be provided" });
    return;
  }

  try {
    const updatedBooking = await updateBookingServices(bookingId, {
      userId,
      roomId,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      totalAmount,
      bookingStatus: bookingStatus || "Pending"
    });

    if (!updatedBooking) {
      res.status(404).json({ message: "Booking not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedBooking });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update booking" });
  }
};

// Controller to delete a booking
export const deleteBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const deleted = await deleteBookingServices(bookingId);
    if (deleted) {
      res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete booking" });
  }
};
