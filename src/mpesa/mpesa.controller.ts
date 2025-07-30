import { Request, Response } from "express";
import {
  createMpesaPaymentRecord,
  initiateMpesaStkPush,
  updateMpesaPaymentStatus,
} from "./mpesa.service";

// 1. Initiate STK Push and create a pending payment record
export const initiateMpesaPayment = async (req: Request, res: Response) => {
  const { phoneNumber, bookingId, amount } = req.body;

  if (!phoneNumber || !bookingId || !amount) {
    console.log("⚠️ Missing input fields");
    res.status(400).json({ error: "Phone number, booking ID, and amount are required" });
    return;
  }

  try {
    // Generate unique transaction ID
    const transactionId = `TXN-${bookingId}-${Date.now()}`;
    console.log("📦 Creating payment record with ID:", transactionId);

    // Store payment as pending in the database
    await createMpesaPaymentRecord({
      bookingId,
      amount,
      transactionId,
      status: "Pending",
    });

    // Trigger STK push to the phone number
    console.log("📡 Initiating STK Push to:", phoneNumber);
    const result = await initiateMpesaStkPush({
      phone: phoneNumber,
      amount,
      bookingId,
    });

    console.log("✅ STK Push successfully initiated.");

    res.status(200).json({
      message: result,
      transactionId,
    });
  } catch (error: any) {
    console.error("❌ Failed to initiate payment:", error.response?.data || error.message);
    res.status(500).json({
      error: error.message || "Failed to initiate M-Pesa payment",
    });
  }
};

// 2. Handle M-Pesa callback from Safaricom
export const handleMpesaCallback = async (req: Request, res: Response) => {
  try {
    const callback = req.body;
    console.log("📥 Received M-Pesa callback:\n", JSON.stringify(callback, null, 2));

    const resultCode = callback?.Body?.stkCallback?.ResultCode;
    const transactionId = callback?.Body?.stkCallback?.CheckoutRequestID;

    if (!transactionId) {
      console.warn("⚠️ Missing CheckoutRequestID in callback body.");
      res.status(400).json({ error: "Missing transaction ID in callback" });
      return;
    }

    if (resultCode === 0) {
      await updateMpesaPaymentStatus(transactionId, "Completed");
      console.log(`✅ Payment marked as Completed for transaction: ${transactionId}`);
    } else {
      await updateMpesaPaymentStatus(transactionId, "Failed");
      console.log(`❌ Payment failed for transaction: ${transactionId}`);
    }

    // Respond to Safaricom to acknowledge callback receipt
    res.status(200).json({ message: "Callback processed successfully" });
  } catch (error: any) {
    console.error("❌ Error handling M-Pesa callback:", error.message);
    res.status(500).json({
      error: error.message || "Failed to process M-Pesa callback",
    });
  }
};
