import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { bookingsTable, TBookingInsert, TBookingSelect } from "../drizzle/schema";



//CRUD Operations for Booking entity

//Get all bookings
export const getBookingsServices = async():Promise<TBookingSelect[] | null> => {
     return await  db.query.bookingsTable.findMany({
      with: {
        user: {
          columns: {
            userId: true,
            firstName: true,
            lastName: true,
            email:true,
            contactPhone: true,
            address: true
          }
        },
        room: true,
        payment: true
      },
       orderBy:[desc(bookingsTable.bookingId)]
     });
}

//Get booking by ID
export const getBookingByIdServices = async(bookingId: number):Promise<TBookingSelect | undefined>=> {
      return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.bookingId,bookingId)
      }) 
}

// Create a new Booking
export const createBookingServices = async(booking:TBookingInsert):Promise<string> => {
       await db.insert(bookingsTable).values(booking).returning();
        return "Booking Created Successfully";
}

// Update an existing booking
export const updateBookingServices = async(bookingId: number, booking:TBookingInsert):Promise<string> => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.bookingId,bookingId));
    return "Booking Updated Succeffully";
}

// Delete an existing booking
export const deleteBookingServices = async(bookingId: number):Promise<string> => {
   await db.delete(bookingsTable).where(eq(bookingsTable.bookingId,bookingId));
   return "User Delete Sucessfully";
}