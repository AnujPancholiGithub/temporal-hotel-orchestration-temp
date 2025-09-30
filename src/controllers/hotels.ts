import type { Request, Response } from 'express';
import { Connection, WorkflowClient } from '@temporalio/client';
import { hotelOrchestrationWorkflow } from '../temporal/workflows/hotelOrchestrator.js';
import { redisClient } from '../config/redis.js';
import type { HotelSearchParams } from '../types/index.js';
import { type ConnectionOptions } from '@temporalio/client';
import { getTemporalEnv } from '../config/temporal.js';

let temporalClient: WorkflowClient;

async function getTemporalClient(): Promise<WorkflowClient> {
  if (!temporalClient) {
    const { address, namespace, apiKey } = await getTemporalEnv();

    const connectionOptions: ConnectionOptions = {
      address,
    };
    
    if (apiKey) {
      connectionOptions.tls = true;
      connectionOptions.apiKey = apiKey;
      connectionOptions.metadata = { 'temporal-namespace': namespace };
    }else{
      connectionOptions.tls = false;
    }

    console.log(`API Client connecting to Temporal at: ${address} in namespace: ${namespace}`);
    const connection = await Connection.connect(connectionOptions);
    temporalClient = new WorkflowClient({
      connection,
      namespace,
    });
    console.log('Express controller successfully connected to Temporal.');
  }
  return temporalClient;
}


export async function searchHotels(req: Request, res: Response): Promise<void> {
  const { city, minPrice, maxPrice } = req.query;

  if (!city || typeof city !== 'string') {
    res.status(400).json({ error: 'City parameter is required and must be a string.' });
    return;
  }

  const cacheKey = `hotels:${encodeURIComponent(JSON.stringify(req.query))}`;
  
  try {

    const cachedData = await redisClient.get(cacheKey).then(data => data && JSON.parse(data));
    if (cachedData) {
      console.log(`Cache HIT for city: ${city}`);
      res.json({ hotels: cachedData, cacheHit: true });
      return;
    }

    console.log(`Cache MISS for city: ${city}. Starting workflow.`);
    
    const client = await getTemporalClient();
    const params: HotelSearchParams = { city };
    
    const handle = await client.start(hotelOrchestrationWorkflow, {
      args: [params],
      taskQueue: 'hotel-orchestration-que',
      workflowId: `hotel-search-${city}-${Date.now()}`,
    });
    
    const result = await handle.result();
    
    let finalHotels = result.hotels;
    if (minPrice) {
      finalHotels = finalHotels.filter(h => h.price >= Number(minPrice));
    }
    if (maxPrice) {
      finalHotels = finalHotels.filter(h => h.price <= Number(maxPrice));
    }
    
    await redisClient.setex(cacheKey, 3600, JSON.stringify(finalHotels));
    
    res.json({
      ...result,
      hotels: finalHotels,
      cacheHit: false
    });

  } catch (error) {
    console.error('Failed to execute hotel search workflow:', error);
    res.status(500).json({ error: 'An internal error occurred while searching for hotels.' });
  }
}
