import { Router } from "express";
import { createPayment, deletePayment, getPaymentById, getPayments, updatePayment } from "./payment.controller";
//import { adminRoleAuth } from "../middleware/bearAuth";


export const paymentRouter = Router();

// Definition Routes for Payment

// Get all Payments
paymentRouter.get('/payments', getPayments);

// Get Payments by ID
paymentRouter.get('/payments/:id', getPaymentById);

// Create a new Payment
paymentRouter.post('/payments',createPayment);

// Update an existing Payment
paymentRouter.put('/payments/:id', updatePayment);

// Delete an existing user
paymentRouter.delete('/payments/:id', deletePayment);
