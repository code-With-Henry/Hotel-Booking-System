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
      return res.status(404).json({ message: "No hotels found" });
    }

    res.status(200).json(hotels);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch hotels" });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    return res.status(400).json({ error: "Invalid hotel ID" });
  }

  try {
    const hotel = await getHotelByIdServices(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch hotel" });
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
    return res.status(400).json({
      error: "Name, location, and address are required",
    });
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

    res.status(201).json({ message: newHotel });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create hotel" });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    return res.status(400).json({ error: "Invalid hotel ID" });
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
    return res.status(400).json({
      error: "Name, location, and address are required",
    });
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
      return res.status(404).json({ message: "Hotel not found or failed to update" });
    }

    res.status(200).json({ message: updatedHotel });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update hotel" });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  const hotelId = parseInt(req.params.id);
  if (isNaN(hotelId)) {
    return res.status(400).json({ error: "Invalid hotel ID" });
  }

  try {
    const deletedHotel = await deleteHotelServices(hotelId);
    if (deletedHotel) {
      return res.status(200).json({ message: "Hotel deleted successfully" });
    } else {
      return res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete hotel" });
  }
};
