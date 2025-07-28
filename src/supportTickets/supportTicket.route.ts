import { Router } from "express";
import { createTicket, deleteTicket, getTicketById, getTickets, getTicketsByUserId, updateTicket } from "./supportTicket.controller";
//import { adminRoleAuth } from "../middleware/bearAuth";


export const ticketRouter = Router();

//definition Routes for ticket

// Get all tickets
ticketRouter.get('/tickets', getTickets);

// Get ticket by ID
ticketRouter.get('/tickets/:id', getTicketById);

// Create a new ticket
ticketRouter.post('/tickets', createTicket);

// Update an existing ticket
ticketRouter.put('/tickets/:id', updateTicket);


// Delete an existing ticket
ticketRouter.delete('/tickets/:id', deleteTicket);

ticketRouter.get("/user/:userId", getTicketsByUserId)
