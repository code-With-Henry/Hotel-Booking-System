import { desc, eq, ilike } from "drizzle-orm";
import db from "../drizzle/db";
import { hotelsTable, THotelInsert, THotelSelect } from "../drizzle/schema";

//  Get all hotels (optionally filter by location)
export const getHotelsServices = async (location?: string): Promise<THotelSelect[]> => {
  if (location) {
    return await db.query.hotelsTable.findMany({
      where: ilike(hotelsTable.location, `%${location}%`),
      orderBy: [desc(hotelsTable.hotelId)],
    });
  }

  return await db.query.hotelsTable.findMany({
    orderBy: [desc(hotelsTable.hotelId)],
  });
};

//  Get Hotel by ID
export const getHotelByIdServices = async (hotelId: number): Promise<THotelSelect | undefined> => {
  return await db.query.hotelsTable.findFirst({
    where: eq(hotelsTable.hotelId, hotelId),
  });
};

//  Create a new Hotel
export const createHotelServices = async (hotel: THotelInsert): Promise<string> => {
  await db.insert(hotelsTable).values(hotel);
  return "Hotel created successfully";
};

//  Update an existing Hotel
export const updateHotelServices = async (hotelId: number, hotel: THotelInsert): Promise<string> => {
  await db.update(hotelsTable).set(hotel).where(eq(hotelsTable.hotelId, hotelId));
  return "Hotel updated successfully";
};

//  Delete a Hotel
export const deleteHotelServices = async (hotelId: number): Promise<string> => {
  await db.delete(hotelsTable).where(eq(hotelsTable.hotelId, hotelId));
  return "Hotel deleted successfully";
};
