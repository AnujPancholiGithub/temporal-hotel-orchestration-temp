// src/routes/suppliers.ts

import  { Router, type Request, type Response } from 'express';
import { supplierA_Hotels, supplierB_Hotels } from '../suppliers/supplierMocks.js';

export const supplierRouter = Router();

// Mock endpoint for Supplier A
supplierRouter.get('/supplierA/hotels', (req: Request, res: Response) => {
  const { city } = req.query;

  if (typeof city !== 'string' || city.toLowerCase() !== 'delhi') {
    return res.json([]); // Return empty for any city other than 'delhi' for this mock
  }

  // Simulate a potential delay
  setTimeout(() => {
    res.json(supplierA_Hotels);
  }, 200); // 200ms delay
});

// Mock endpoint for Supplier B
supplierRouter.get('/supplierB/hotels', (req: Request, res: Response) => {
  const { city } = req.query;

  if (typeof city !== 'string' || city.toLowerCase() !== 'delhi') {
    return res.json([]);
  }

  // Simulate a slightly different delay
  setTimeout(() => {
    res.json(supplierB_Hotels);
  }, 350); // 350ms delay
});
