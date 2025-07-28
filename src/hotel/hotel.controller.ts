import { Request, Response } from "express";
import {
  createHotelServices,
  deleteHotelServices,
  getHotelByIdServices,
  getHotelsServices,
  updateHotelServices,
} from "./hotel.service";

// GET /api/hotels?location=...
export const getHotels = async (req: Request, res: Response) => {
  try {
    const { location } = req.query;
    const hotels = await getHotelsServices(location as string | undefined);

    if (!hotels || hotels.length === 0) {
      res.status(404).json({ message: "No hotels found" });
      return;
    }

    res.status(200).json(hotels);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch hotels" });
    return;
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
      return;
    }

    res.status(200).json(hotel);
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch hotel" });
    return;
  }
};

export const createHotel = async (req: Request, res: Response) => {
  const {
    name,
    location,
    address,
    contactPhone,
    category,
    rating,
    imageUrl,
    priceRange,
    amenities,
  } = req.body;

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
      imageUrl: imageUrl || null,
      priceRange: priceRange || null,
      amenities: Array.isArray(amenities) ? amenities : [],
    });

    if (!newHotel) {
      res.status(500).json({ message: "Failed to create hotel" });
      return;
    }

    res.status(201).json({ message: newHotel });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create hotel" });
    return;
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    res.status(400).json({ error: "Invalid hotel ID" });
    return;
  }

  const {
    name,
    location,
    address,
    contactPhone,
    category,
    rating,
    imageUrl,
    priceRange,
    amenities,
  } = req.body;

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
      imageUrl: imageUrl || null,
      priceRange: priceRange || null,
      amenities: Array.isArray(amenities) ? amenities : [],
    });

    if (!updatedHotel) {
      res.status(404).json({ message: "Hotel not found or failed to update" });
      return;
    }

    res.status(200).json({ message: updatedHotel });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update hotel" });
    return;
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
    if (!deletedHotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }

    res.status(200).json({ message: "Hotel deleted successfully" });
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete hotel" });
    return;
  }
};
