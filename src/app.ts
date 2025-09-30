import express from 'express';
import { supplierRouter } from './routes/suppliers.js';
import { hotelRouter } from './routes/hotels.js'; 
import { healthRouter } from './routes/health.js';

const app = express();
app.use('/', supplierRouter);
app.use('/', hotelRouter); 
app.use('/', healthRouter); 

export default app;
