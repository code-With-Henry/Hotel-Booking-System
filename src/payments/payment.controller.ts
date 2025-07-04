import { Request, Response } from "express";
import {
  createPaymentServices,
  deletePaymentServices,
  getPaymentByIdServices,
  getPaymentsServices,
  updatePaymentServices
} from "./payment.service";

// Get all payments
export const getPayments = async (req: Request, res: Response) => {
  try {
    const allPayments = await getPaymentsServices();
    if (!allPayments || allPayments.length === 0) {
      res.status(404).json({ message: "No payments found" });
    } else {
      res.status(200).json(allPayments);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch payments" });
  }
};

// Get payment by ID
export const getPaymentById = async (req: Request, res: Response) => {
  const paymentId = parseInt(req.params.id);
  if (isNaN(paymentId)) {
    res.status(400).json({ error: "Invalid payment ID" });
    return;
  }
  try {
    const payment = await getPaymentByIdServices(paymentId);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
    } else {
      res.status(200).json(payment);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch payment" });
  }
};

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
  const {
    bookingId,
    amount,
    paymentStatus,
    paymentMethod,
    transactionId,
    paymentDate
  } = req.body;

  if (!bookingId || !amount || !paymentMethod || !transactionId) {
    res.status(400).json({ error: "Required fields are missing" });
    return;
  }

  try {
    const newPayment = await createPaymentServices({
      bookingId,
      amount,
      paymentStatus: paymentStatus || "Pending",
      paymentMethod,
      transactionId,
      paymentDate: paymentDate ? new Date(paymentDate) : new Date()

    });

    if (!newPayment) {
      res.status(500).json({ message: "Failed to create payment" });
    } else {
      res.status(201).json({ message: newPayment });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create payment" });
  }
};

// Update a payment
export const updatePayment = async (req: Request, res: Response) => {
  const paymentId = parseInt(req.params.id);
  if (isNaN(paymentId)) {
    res.status(400).json({ error: "Invalid payment ID" });
    return;
  }

  const {
    bookingId,
    amount,
    paymentStatus,
    paymentMethod,
    transactionId,
    paymentDate
  } = req.body;

  if (!bookingId || !amount || !paymentMethod || !transactionId) {
    res.status(400).json({ error: "Required fields are missing" });
    return;
  }

  try {
    const updatedPayment = await updatePaymentServices(paymentId, {
      bookingId,
      amount,
      paymentStatus: paymentStatus || "Pending",
      paymentMethod,
      transactionId,
      paymentDate: paymentDate ? new Date(paymentDate) : new Date()

    });

    if (!updatedPayment) {
      res.status(404).json({ message: "Payment not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedPayment });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update payment" });
  }
};

// Delete a payment
export const deletePayment = async (req: Request, res: Response) => {
  const paymentId = parseInt(req.params.id);
  if (isNaN(paymentId)) {
    res.status(400).json({ error: "Invalid payment ID" });
    return;
  }

  try {
    const deleted = await deletePaymentServices(paymentId);
    if (deleted) {
      res.status(200).json({ message: "Payment deleted successfully" });
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete payment" });
  }
};
