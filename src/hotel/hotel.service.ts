import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { hotelsTable, THotelInsert, THotelSelect } from "../drizzle/schema";




//CRUD Operations for Hotel entity

//Get all hotels
export const getHotelsServices = async():Promise<THotelSelect[] | null> => {
     return await  db.query.hotelsTable.findMany({
       orderBy:[desc(hotelsTable.hotelId)]
     });
}

//Get Hotel by ID
export const getHotelByIdServices = async(hotelId: number):Promise<THotelSelect | undefined>=> {
      return await db.query.hotelsTable.findFirst({
        where: eq(hotelsTable.hotelId,hotelId)
      }) 
}

// Create a new Hotel
export const createHotelServices = async(hotel:THotelInsert):Promise<string> => {
       await db.insert(hotelsTable).values(hotel).returning();
        return "Hotel Created Successfully";
}

// Update an existing Hotel
export const updateHotelServices = async(hotelId: number, hotel:THotelInsert):Promise<string> => {
    await db.update(hotelsTable).set(hotel).where(eq(hotelsTable.hotelId,hotelId));
    return "Hotel Updated Succeffully";
}


export const deleteHotelServices = async(hotelId: number):Promise<string> => {
   await db.delete(hotelsTable).where(eq(hotelsTable.hotelId,hotelId));
   return "Hotel Delete Sucessfully";
}