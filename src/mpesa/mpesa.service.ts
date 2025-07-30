import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { paymentsTable } from "../drizzle/schema";
import { TPaymentInsert } from "../drizzle/schema";

dotenv.config();

const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
} = process.env;

const baseUrl = "https://sandbox.safaricom.co.ke";

// 1. Get M-Pesa Access Token
const getMpesaAccessToken = async (): Promise<string> => {
  const credentials = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");

  const response = await axios.get(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });

  return response.data.access_token;
};

// 2. Initiate STK Push
export const initiateMpesaStkPush = async ({
  phone,
  amount,
  bookingId,
}: {
  phone: string;
  amount: number;
  bookingId: number;
}): Promise<string> => {
  const token = await getMpesaAccessToken();
  const timestamp = moment().format("YYYYMMDDHHmmss");
  const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

  const payload = {
   "BusinessShortCode": "174379",    
   "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
   "Timestamp":"20160216165627",    
   "TransactionType": "CustomerPayBillOnline",    
   "Amount": "1",    
   "PartyA":"254708374149",    
   "PartyB":"174379",    
   "PhoneNumber":"254708374149",    
   "CallBackURL": "https://mydomain.com/pat", 
   "AccountReference": `Booking-${bookingId}`,
   "TransactionDesc": "Hotel Room Booking Payment",
  };

  console.log(" Sending STK Push Payload:", payload);

  try {
    const response = await axios.post(`${baseUrl}/mpesa/stkpush/v1/processrequest`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ STK Push Response:", response.data);
    console.log("✅ STK Push Response:", response.data);

    if (response.data.ResponseCode === "0") {
      return "STK Push initiated successfully";
    } else {
      throw new Error(`STK Push failed: ${response.data.ResponseDescription}`);
    }
  } catch (error: any) {
    console.error("❌ STK Push Error:", error.response?.data || error.message);
    throw new Error("Failed to initiate STK Push");
  }
};

// 3. Create M-Pesa Payment Record
export const createMpesaPaymentRecord = async ({
  bookingId,
  amount,
  transactionId,
  status = "Pending",
}: {
  bookingId: number;
  amount: number;
  transactionId?: string;
  status?: "Pending" | "Completed" | "Failed";
}): Promise<string> => {
  const payment: TPaymentInsert = {
    bookingId,
    amount: amount.toString(), // decimal must be string
    transactionId,
    paymentMethod: "Mpesa",
    paymentStatus: status,
  };

  await db.insert(paymentsTable).values(payment);

  console.log("💾 Payment record inserted:", payment);
  return "Payment record created successfully";
};

// 4. Update M-Pesa Payment Status (via callback)
export const updateMpesaPaymentStatus = async (
  transactionId: string,
  status: "Completed" | "Failed"
): Promise<string> => {
  await db
    .update(paymentsTable)
    .set({ paymentStatus: status })
    .where(eq(paymentsTable.transactionId, transactionId));

  console.log(`Payment status updated to ${status} for transaction ID: ${transactionId}`);
  return "Payment status updated successfully";
};
