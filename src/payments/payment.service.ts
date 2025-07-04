import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { paymentsTable, TPaymentInsert, TPaymentSelect } from "../drizzle/schema";


//CRUD Operations for Payments entity

//Get all Payments
export const getPaymentsServices = async():Promise<TPaymentSelect[] | null> => {
     return await  db.query.paymentsTable.findMany({
       orderBy:[desc(paymentsTable.paymentId)]
     });
}

//Get Payment by ID
export const getPaymentByIdServices = async(paymentId: number):Promise<TPaymentSelect | undefined>=> {
      return await db.query.paymentsTable.findFirst({
        where: eq(paymentsTable.paymentId,paymentId)
      }) 
}

// Create a new Payment
export const createPaymentServices = async(payment:TPaymentInsert):Promise<string> => {
       await db.insert(paymentsTable).values(payment).returning();
        return "Payment Created Successfully";
}

// Update an existing Payment
export const updatePaymentServices = async(paymentId: number, payment:TPaymentInsert):Promise<string> => {
    await db.update(paymentsTable).set(payment).where(eq(paymentsTable.paymentId,paymentId));
    return "Payment Updated Succeffully";
}

// Delete an existing Payment
export const deletePaymentServices = async(paymentId: number):Promise<string> => {
   await db.delete(paymentsTable).where(eq(paymentsTable.paymentId,paymentId));
   return "Payment Delete Sucessfully";
}