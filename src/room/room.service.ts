import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { roomsTable, TRoomInsert, TRoomSelect } from "../drizzle/schema";




//CRUD Operations for Room entity

//Get all Rooms
export const getRoomsServices = async():Promise<TRoomSelect[] | null> => {
     return await  db.query.roomsTable.findMany({
      with: {
        hotel: true,
      },
       orderBy:[desc(roomsTable.roomId)]
     });
}

//Get Room by ID
export const getRoomByIdServices = async(roomId: number):Promise<TRoomSelect | undefined>=> {
      return await db.query.roomsTable.findFirst({
        where: eq(roomsTable.roomId,roomId)
      }) 
}

// Create a new Room
export const createRoomServices = async(room:TRoomInsert):Promise<string> => {
       await db.insert(roomsTable).values(room).returning();
        return "Room Created Successfully";
}

// Update an existing Room
export const updateRoomServices = async(roomId: number, room:TRoomInsert):Promise<string> => {
    await db.update(roomsTable).set(room).where(eq(roomsTable.roomId,roomId));
    return "Room Updated Succeffully";
}


export const deleteRoomServices = async(roomId: number):Promise<string> => {
   await db.delete(roomsTable).where(eq(roomsTable.roomId,roomId));
   return "Room Deleted Sucessfully";
}