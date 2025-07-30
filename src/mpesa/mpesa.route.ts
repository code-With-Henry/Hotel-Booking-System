import { Router } from "express";
import { handleMpesaCallback, initiateMpesaPayment } from "./mpesa.controller";


const mpesaRouter = Router();

// POST /api/payments/mpesa/initiate
mpesaRouter.post("/mpesa/initiate", initiateMpesaPayment);

// POST /api/payments/mpesa/callback
mpesaRouter.post("/mpesa/callback", handleMpesaCallback);

export default mpesaRouter;
