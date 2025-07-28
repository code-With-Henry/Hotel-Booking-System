import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { supportTicketsTable, TTicketInsert, TTicketSelect } from "../drizzle/schema";




//CRUD Operations for supportTicket entity

//Get all supportTickets
export const getTicketsServices = async():Promise<TTicketSelect[] | null> => {
     return await  db.query.supportTicketsTable.findMany({
      // with:{
      //   user: true,
      // },
       orderBy:[desc(supportTicketsTable.ticketId)]
     });
}

//Get Ticket by ID
export const getTicketByIdServices = async(ticketId: number):Promise<TTicketSelect | undefined>=> {
      return await db.query.supportTicketsTable.findFirst({
        where: eq(supportTicketsTable.ticketId,ticketId)
      }) 
}

// Create a new Ticket
export const createTicketServices = async(ticket:TTicketInsert):Promise<string> => {
       await db.insert(supportTicketsTable).values(ticket).returning();
        return "Ticket Created Successfully";
}

// Update an existing Ticket
export const updateTicketServices = async(ticketId: number, ticket:TTicketInsert):Promise<string> => {
    await db.update(supportTicketsTable).set(ticket).where(eq(supportTicketsTable.ticketId,ticketId));
    return "User Updated Succeffully";
}

// Delete an existing Ticket
export const deleteTicketServices = async(ticketId: number):Promise<string> => {
   await db.delete(supportTicketsTable).where(eq(supportTicketsTable.ticketId,ticketId));
   return "Ticket Delete Sucessfully";
}

// Get all tickets for a specific user
export const getTicketsByUserIdService = async (userId: number): Promise<TTicketSelect[]> => {
  return await db.query.supportTicketsTable.findMany({
    where: eq(supportTicketsTable.userId, userId),
    orderBy: [desc(supportTicketsTable.ticketId)]
  });
}