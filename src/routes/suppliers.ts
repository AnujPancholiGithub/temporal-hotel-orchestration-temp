// src/routes/suppliers.ts

import  { Router, type Request, type Response } from 'express';
import { supplierA_Hotels, supplierB_Hotels } from '../suppliers/supplierMocks.js';

export const supplierRouter = Router();

// Mock endpoint for Supplier A
supplierRouter.get('/supplierA/hotels', (req: Request, res: Response) => {
  const { city } = req.query;

  if (typeof city !== 'string') {
    return res.json([]);
  }


  // add a random failure
  const failChance = 0.25; // 25% chance of failure
  if (Math.random() < failChance) {
    return res.status(500).json({ error: 'Something went wrong with Supplier A' });
  }

  setTimeout(() => {
    res.json(supplierA_Hotels);
  }, 200);
});

// Mock endpoint for Supplier B
supplierRouter.get('/supplierB/hotels', (req: Request, res: Response) => {
  const { city } = req.query;

  if (typeof city !== 'string') {
    return res.json([]);
  }

  // add a random failure
  const failChance = 0.25; // 25% chance of failure
  if (Math.random() < failChance) {
    return res.status(500).json({ error: 'Something went wrong with Supplier B' });
  }

  setTimeout(() => {
    res.json(supplierB_Hotels);
  }, 350);
});
