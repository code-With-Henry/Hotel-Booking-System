import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  decimal,
  pgEnum,
  boolean,
  date,
} from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("userType", ["member", "admin"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["Pending", "Completed", "Failed"]);
export const ticketStatusEnum = pgEnum("ticket_status", ["Open", "Resolved"]);

// 1. Users Table
export const usersTable = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  firstName: varchar("firstname"),
  lastName: varchar("lastname"),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  contactPhone: varchar("contact_phone"),
  address: varchar("address"),
  userType: roleEnum("userType").default("member"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 2. Hotels Table
export const hotelsTable = pgTable("hotels", {
  hotelId: serial("hotel_id").primaryKey(),
  name: varchar("name"),
  location: varchar("location"),
  address: varchar("address"),
  contactPhone: varchar("contact_phone"),
  category: varchar("category"),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. Rooms Table
export const roomsTable = pgTable("rooms", {
  roomId: serial("room_id").primaryKey(),
  hotelId: integer("hotel_id").notNull().references(() => hotelsTable.hotelId, { onDelete: "cascade" }),
  roomType: varchar("room_type"),
  pricePerNight: decimal("price_per_night"),
  capacity: integer("capacity"),
  amenities: varchar("amenities"),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. Bookings Table
export const bookingsTable = pgTable("bookings", {
  bookingId: serial("booking_id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
  roomId: integer("room_id").notNull().references(() => roomsTable.roomId, { onDelete: "cascade" }),
  checkInDate: date("check_in_date"),
  checkOutDate: date("check_out_date"),
  totalAmount: decimal("total_amount"),
  bookingStatus: bookingStatusEnum("booking_status").default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 5. Payments Table
export const paymentsTable = pgTable("payments", {
  paymentId: serial("payment_id").primaryKey(),
  bookingId: integer("booking_id").notNull().references(() => bookingsTable.bookingId, { onDelete: "cascade" }),
  amount: decimal("amount"),
  paymentStatus: paymentStatusEnum("payment_status").default("Pending"),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method"),
  transactionId: varchar("transaction_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 6. Customer Support Tickets Table
export const supportTicketsTable = pgTable("support_tickets", {
  ticketId: serial("ticket_id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
  subject: varchar("subject"),
  description: varchar("description"),
  status: ticketStatusEnum("ticket_status").default("Open"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations

// Users relations
export const userRelations = relations(usersTable, ({ many }) => ({
  bookings: many(bookingsTable),
  supportTickets: many(supportTicketsTable),
}));

// Hotels relations
export const hotelRelations = relations(hotelsTable, ({ many }) => ({
  rooms: many(roomsTable),
}));

// Rooms relations
export const roomRelations = relations(roomsTable, ({ many, one }) => ({
  hotel: one(hotelsTable, {
    fields: [roomsTable.hotelId],
    references: [hotelsTable.hotelId],
  }),
  bookings: many(bookingsTable),
}));

// Bookings relations
export const bookingRelations = relations(bookingsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [bookingsTable.userId],
    references: [usersTable.userId],
  }),
  room: one(roomsTable, {
    fields: [bookingsTable.roomId],
    references: [roomsTable.roomId],
  }),
  payment: one(paymentsTable, {
    fields: [bookingsTable.bookingId],
    references: [paymentsTable.bookingId],
  }),
}));

// Payments relations
export const paymentRelations = relations(paymentsTable, ({ one }) => ({
  booking: one(bookingsTable, {
    fields: [paymentsTable.bookingId],
    references: [bookingsTable.bookingId],
  }),
}));

// Support Tickets relations
export const supportTicketRelations = relations(supportTicketsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [supportTicketsTable.userId],
    references: [usersTable.userId],
  }),
}));

// Infer Types
export type TUserInsert = typeof usersTable.$inferInsert;
export type TUserSelect = typeof usersTable.$inferSelect;

export type THotelInsert = typeof hotelsTable.$inferInsert;
export type THotelSelect = typeof hotelsTable.$inferSelect;

export type TRoomInsert = typeof roomsTable.$inferInsert;
export type TRoomSelect = typeof roomsTable.$inferSelect;

export type TBookingInsert = typeof bookingsTable.$inferInsert;
export type TBookingSelect = typeof bookingsTable.$inferSelect;

export type TPaymentInsert = typeof paymentsTable.$inferInsert;
export type TPaymentSelect = typeof paymentsTable.$inferSelect;

export type TTicketInsert = typeof supportTicketsTable.$inferInsert;
export type TTicketSelect = typeof supportTicketsTable.$inferSelect;
