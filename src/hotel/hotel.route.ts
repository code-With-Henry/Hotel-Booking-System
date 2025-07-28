// hotel.router.ts
import { Router } from "express";
import { createHotel, deleteHotel, getHotelById, getHotels, updateHotel } from "./hotel.controller";


const hotelRouter = Router();

hotelRouter.get("/hotels", getHotels); // GET /api/hotels
hotelRouter.get("/hotels/:id", getHotelById); // GET /api/hotels/:id
hotelRouter.post("/hotels", createHotel); // POST /api/hotels
hotelRouter.put("/hotels/:id", updateHotel); // PUT /api/hotels/:id
hotelRouter.delete("/hotels/:id", deleteHotel); // DELETE /api/hotels/:id

export default hotelRouter;
