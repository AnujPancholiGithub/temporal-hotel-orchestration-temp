import { Router } from 'express';
import { checkHealth } from '../controllers/health.js';

export const healthRouter = Router();

healthRouter.get('/health', checkHealth);
