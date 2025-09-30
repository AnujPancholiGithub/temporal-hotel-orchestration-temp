import { Router } from 'express';
import { searchHotels } from '../controllers/hotels.js';

export const hotelRouter = Router();

// This defines the public API endpoint
hotelRouter.get('/api/hotels', searchHotels);
