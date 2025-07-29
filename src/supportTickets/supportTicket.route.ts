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

// ✅ GET /api/tickets
ticketRouter.get("/tickets", getTickets);

// ✅ GET /api/tickets/user/:userId
ticketRouter.get("/tickets/user/:userId", getTicketsByUserId);

// ✅ GET /api/tickets/:id
ticketRouter.get("/tickets/:id", getTicketById);

// ✅ POST /api/tickets
ticketRouter.post("/tickets", createTicket);

// ✅ PUT /api/tickets/:id
ticketRouter.put("/tickets/:id", updateTicket);

// ✅ DELETE /api/tickets/:id
ticketRouter.delete("/tickets/:id", deleteTicket);


