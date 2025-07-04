import { Router } from "express";
import { createHotel, deleteHotel, getHotelById, getHotels, updateHotel } from "./hotel.controller";
//import { adminRoleAuth } from "../middleware/bearAuth";


export const hotelRouter = Router();

// Hotel routes definition


// Get all Hotels
hotelRouter.get('/hotels', getHotels);

// Get Hotel by ID
hotelRouter.get('/hotels/:id', getHotelById);

// Create a new Hotel
hotelRouter.post('/hotels',  createHotel);

// Update an existing Hotel
hotelRouter.put('/hotels/:id',updateHotel);

// Delete an existing Hotel
hotelRouter.delete('/hotels/:id', deleteHotel);
