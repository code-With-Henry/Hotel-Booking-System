import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  updateTicket
} from "./supportTicket.controller";

export const ticketRouter = Router();

// Get all tickets → GET /api/support-tickets/
ticketRouter.get("/", getTickets);

// Get ticket by ID → GET /api/support-tickets/:id
ticketRouter.get("/:id", getTicketById);

// Create a new ticket → POST /api/support-tickets/
ticketRouter.post("/", createTicket);

// Update an existing ticket → PUT /api/support-tickets/:id
ticketRouter.put("/:id", updateTicket);

// Delete an existing ticket → DELETE /api/support-tickets/:id
ticketRouter.delete("/:id", deleteTicket);


