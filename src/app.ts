import express from 'express';
import { supplierRouter } from './routes/suppliers.js';
import { hotelRouter } from './routes/hotels.js'; 

const app = express();
app.use('/', supplierRouter);
app.use('/', hotelRouter); 

export default app;
