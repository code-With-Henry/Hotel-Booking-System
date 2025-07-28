import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  getTicketsByUserId,
  updateTicket
} from "./supportTicket.controller";

export const ticketRouter = Router();

// GET /api/support-tickets
ticketRouter.get("/tickets", getTickets);

// GET /api/support-tickets/user/:userId
ticketRouter.get("/tickets/user/:userId", getTicketsByUserId);

// GET /api/support-tickets/:id
ticketRouter.get("/tickets/:id", getTicketById);

// POST /api/support-tickets
ticketRouter.post("/tickets", createTicket);

// PUT /api/support-tickets/:id
ticketRouter.put("/tickets/:id", updateTicket);

// DELETE /api/support-tickets/:id
ticketRouter.delete("/tickets/:id", deleteTicket);
