import { Request, Response } from "express";
import {
  createRoomServices,
  deleteRoomServices,
  getRoomByIdServices,
  getRoomsServices,
  updateRoomServices,
} from "./room.service";

// Business logic for room-related operations

export const getRooms = async (req: Request, res: Response) => {
  try {
    const allRooms = await getRoomsServices();
    if (!allRooms || allRooms.length === 0) {
      res.status(404).json({ message: "No rooms found" });
    } else {
      res.status(200).json(allRooms);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch rooms" });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  if (isNaN(roomId)) {
    res.status(400).json({ error: "Invalid room ID" });
    return;
  }

  try {
    const room = await getRoomByIdServices(roomId);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json(room);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch room" });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const { hotelId, roomType, pricePerNight, capacity, amenities, isAvailable } = req.body;

  if (!hotelId || !roomType || !pricePerNight || !capacity) {
    res.status(400).json({ error: "hotelId, roomType, pricePerNight, and capacity are required" });
    return;
  }

  try {
    const newRoom = await createRoomServices({
      hotelId,
      roomType,
      pricePerNight,
      capacity,
      amenities: amenities || null,
      isAvailable: isAvailable ?? true, // use default true if not provided
    });

    if (!newRoom) {
      res.status(500).json({ message: "Failed to create room" });
    } else {
      res.status(201).json({ message: newRoom });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create room" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  if (isNaN(roomId)) {
    res.status(400).json({ error: "Invalid room ID" });
    return;
  }

  const { hotelId, roomType, pricePerNight, capacity, amenities, isAvailable } = req.body;

  if (!hotelId || !roomType || !pricePerNight || !capacity) {
    res.status(400).json({ error: "hotelId, roomType, pricePerNight, and capacity are required" });
    return;
  }

  try {
    const updatedRoom = await updateRoomServices(roomId, {
      hotelId,
      roomType,
      pricePerNight,
      capacity,
      amenities: amenities || null,
      isAvailable: isAvailable ?? true,
    });

    if (!updatedRoom) {
      res.status(404).json({ message: "Room not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedRoom });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update room" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const roomId = parseInt(req.params.id);
  if (isNaN(roomId)) {
    res.status(400).json({ error: "Invalid room ID" });
    return;
  }

  try {
    const deletedRoom = await deleteRoomServices(roomId);
    if (deletedRoom) {
      res.status(200).json({ message: "Room deleted successfully" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete room" });
  }
};
