import { z } from "zod";

// Enums
export const roleEnum = z.enum(["member", "admin"]);
export const bookingStatusEnum = z.enum(["Pending", "Confirmed", "Cancelled"]);
export const paymentStatusEnum = z.enum(["Pending", "Completed", "Failed"]);
export const ticketStatusEnum = z.enum(["Open", "Resolved"]);

// Users Table Schema
export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactPhone: z.string().min(7).optional(),
  address: z.string().optional(),
  userType: roleEnum.optional(),
});

// Hotels Table Schema
export const hotelSchema = z.object({
  name: z.string().min(1, "Hotel name is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  contactPhone: z.string().optional(),
  category: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

// Rooms Table Schema
export const roomSchema = z.object({
  hotelId: z.number().int(),
  roomType: z.string().min(1, "Room type is required"),
  pricePerNight: z.string(), // Because `decimal` is string in Drizzle
  capacity: z.number().int().min(1),
  amenities: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

// Bookings Table Schema
export const bookingSchema = z.object({
  userId: z.number().int(),
  roomId: z.number().int(),
  checkInDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  checkOutDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  totalAmount: z.string(),
  bookingStatus: bookingStatusEnum.optional(),
});

// Payments Table Schema
export const paymentSchema = z.object({
  bookingId: z.number().int(),
  amount: z.string(),
  paymentStatus: paymentStatusEnum.optional(),
  paymentDate: z.string().optional(),
  paymentMethod: z.string().optional(),
  transactionId: z.string().optional(),
});

// Support Tickets Table Schema
export const supportTicketSchema = z.object({
  userId: z.number().int(),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  status: ticketStatusEnum.optional(),
});
