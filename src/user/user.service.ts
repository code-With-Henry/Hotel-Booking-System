import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUserInsert, TUserSelect, usersTable } from "../drizzle/schema";



//CRUD Operations for User entity

//Get all users
export const getUsersServices = async():Promise<TUserSelect[] | null> => {
     return await  db.query.usersTable.findMany({
       orderBy:[desc(usersTable.userId)]
     });
}

//Get user by ID
export const getUserByIdServices = async(userId: number):Promise<TUserSelect | undefined>=> {
      return await db.query.usersTable.findFirst({
        where: eq(usersTable.userId,userId)
      }) 
}

// Create a new user
export const createUserServices = async(user:TUserInsert):Promise<string> => {
       await db.insert(usersTable).values(user).returning();
        return "User Created Successfully";
}

// Update an existing user
export const updateUserServices = async(userId: number, user:TUserInsert):Promise<string> => {
    await db.update(usersTable).set(user).where(eq(usersTable.userId,userId));
    return "User Updated Succeffully";
}

// Update an existing user
export const deleteUserServices = async(userId: number):Promise<string> => {
   await db.delete(usersTable).where(eq(usersTable.userId,userId));
   return "User Delete Sucessfully";
}