import { Request, Response } from "express";
import {
  createHotelServices,
  deleteHotelServices,
  getHotelByIdServices,
  getHotelsServices,
  updateHotelServices,
} from "./hotel.service";

// Business logic for hotel-related operations

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await getHotelsServices();
    if (!hotels || hotels.length === 0) {
      res.status(404).json({ message: "No hotels found" });
    } else {
      res.status(200).json(hotels);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch hotels" });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    res.status(400).json({ error: "Invalid hotel ID" });
    return;
  }

  try {
    const hotel = await getHotelByIdServices(hotelId);
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
    } else {
      res.status(200).json(hotel);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch hotel" });
  }
};

export const createHotel = async (req: Request, res: Response) => {
  const { name, location, address, contactPhone, category, rating } = req.body;

  if (!name || !location || !address) {
    res.status(400).json({ error: "Name, location, and address are required" });
    return;
  }

  try {
    const newHotel = await createHotelServices({
      name,
      location,
      address,
      contactPhone: contactPhone || null,
      category: category || null,
      rating: rating || null,
    });

    if (!newHotel) {
      res.status(500).json({ message: "Failed to create hotel" });
    } else {
      res.status(201).json({ message: newHotel });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create hotel" });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    res.status(400).json({ error: "Invalid hotel ID" });
    return;
  }

  const { name, location, address, contactPhone, category, rating } = req.body;

  if (!name || !location || !address) {
    res.status(400).json({ error: "Name, location, and address are required" });
    return;
  }

  try {
    const updatedHotel = await updateHotelServices(hotelId, {
      name,
      location,
      address,
      contactPhone: contactPhone || null,
      category: category || null,
      rating: rating || null,
    });

    if (!updatedHotel) {
      res.status(404).json({ message: "Hotel not found or failed to update" });
    } else {
      res.status(200).json({ message: updatedHotel });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update hotel" });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    res.status(400).json({ error: "Invalid hotel ID" });
    return;
  }

  try {
    const deletedHotel = await deleteHotelServices(hotelId);
    if (deletedHotel) {
      res.status(200).json({ message: "Hotel deleted successfully" });
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete hotel" });
  }
};
