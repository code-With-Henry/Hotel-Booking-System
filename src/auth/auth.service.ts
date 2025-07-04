import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TUserInsert, TUserSelect, usersTable } from "../drizzle/schema";

//register a new user
export const createUserServices = async(user:TUserInsert):Promise<string> => {
       await db.insert(usersTable).values(user).returning();
        return "User Created Successfully "
}

//get user by email
export const getUserByEmailService =async(email:string):Promise<TUserSelect | undefined>=>{
    return await db.query.usersTable.findFirst({
        where:(eq(usersTable.email,email))
    })
}