import express, { Application, Response } from "express";
import cors from "cors"; 
import { logger } from "./middleware/logger";
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
import { userRouter } from "./user/user.route";
import { authRouter } from "./auth/auth.route";
import { hotelRouter } from "./hotel/hotel.route";
import { roomRouter } from "./room/room.route";
import { bookingRouter } from "./booking/booking.route";
import { paymentRouter } from "./payments/payment.route";
import { ticketRouter } from "./supportTickets/supportTicket.route";


const app: Application = express();

// Basic Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiterMiddleware);

//  API Routes
app.use("/api", userRouter);
app.use("/api",hotelRouter);
app.use("/api", roomRouter);
app.use("/api", bookingRouter);
app.use("/api",paymentRouter);
app.use("/api",ticketRouter);
app.use("/api",authRouter);
app.use('/api/auth', authRouter);  
app.use('/api/users', userRouter); 
app.use('/api/bookings', bookingRouter);

app.use("/api/tickets", ticketRouter); 

//  Default route
app.get('/', (req, res: Response) => {
  res.send("Welcome to Hotel Room Booking Management System");
});

export default app;