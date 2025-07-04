import { Router } from "express";
import { createRoom, deleteRoom, getRoomById, getRooms, updateRoom } from "./room.controller";
//import { adminRoleAuth } from "../middleware/bearAuth";


export const roomRouter = Router();

// Definition Routes for Rooms


// Get all Rooms
roomRouter.get('/rooms', getRooms);

// Get Rooms by ID
roomRouter.get('/rooms/:id', getRoomById);

// Create a new Room
roomRouter.post('/rooms', createRoom);

// Update an existing Room
roomRouter.put('/rooms/:id', updateRoom);

// Delete an existing Room
roomRouter.delete('/rooms/:id', deleteRoom);