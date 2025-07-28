import { Request, Response } from "express";
import {
  createTicketServices,
  deleteTicketServices,
  getTicketByIdServices,
  getTicketsServices,
  updateTicketServices
} from "./supportTicket.service";

// Get all support tickets
export const getTickets = async (req: Request, res: Response) => {
  try {
    const allTickets = await getTicketsServices();
    if (!allTickets || allTickets.length === 0) {
      res.status(404).json({ message: "No support tickets found" });
    } else {
      res.status(200).json(allTickets);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch tickets" });
  }
};

// Get a support ticket by ID
export const getTicketById = async (req: Request, res: Response) => {
  const ticketId = parseInt(req.params.id);
  if (isNaN(ticketId)) {
    res.status(400).json({ error: "Invalid ticket ID" });
    return;
  }
  try {
    const ticket = await getTicketByIdServices(ticketId);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
    } else {
      res.status(200).json(ticket);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch ticket" });
  }
};

// Create a new support ticket
export const createTicket = async (req: Request, res: Response) => {
  const { userId, subject, description, status } = req.body;
  console.log("Body received:", req.body);

  if (!userId || !subject || !description) {
    res.status(400).json({ error: "User ID, subject, and description are required" });
    return;
  }

  try {
    const newTicket = await createTicketServices({
      userId,
      subject,
      description,
      status: status || "Open"
    });

    if (!newTicket) {
      res.status(500).json({ message: "Failed to create ticket" });
    } else {
      res.status(201).json({ message: newTicket });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create ticket" });
  }
};

// Update a support ticket
export const updateTicket = async (req: Request, res: Response) => {
  const ticketId = parseInt(req.params.id);
  if (isNaN(ticketId)) {
    res.status(400).json({ error: "Invalid ticket ID" });
    return;
  }

  const { userId, subject, description, status } = req.body;

  if (!userId || !subject || !description) {
    res.status(400).json({ error: "User ID, subject, and description are required" });
    return;
  }

  try {
    const updatedTicket = await updateTicketServices(ticketId, {
      userId,
      subject,
      description,
      status: status || "Open"
    });

    if (!updatedTicket) {
      res.status(404).json({ message: "Ticket not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedTicket });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update ticket" });
  }
};

// Delete a support ticket
export const deleteTicket = async (req: Request, res: Response) => {
  const ticketId = parseInt(req.params.id);
  if (isNaN(ticketId)) {
    res.status(400).json({ error: "Invalid ticket ID" });
    return;
  }

  try {
    const deletedTicket = await deleteTicketServices(ticketId);
    if (deletedTicket) {
      res.status(200).json({ message: "Ticket deleted successfully" });
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete ticket" });
  }
};


export const getTicketsByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const userTickets = await getTicketsServices();

    if (!userTickets || userTickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }

    const filtered = userTickets.filter((ticket) => ticket.userId === userId);

    if (filtered.length === 0) {
      return res.status(404).json({ message: "No tickets found for this user" });
    }

    return res.status(200).json(filtered);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Failed to fetch user tickets",
    });
  }
};
