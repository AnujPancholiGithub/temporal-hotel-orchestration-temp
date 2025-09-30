// src/temporal/activities/cacheActivities.ts
import { redisClient } from '../../config/redis.js';
import type { Hotel } from '../../types/index.js';

const CACHE_TTL_SECONDS = 300; // 5 minutes

export async function cacheHotels(city: string, hotels: Hotel[]): Promise<void> {
  const key = `hotels:${city.toLowerCase()}`;
  await redisClient.setex(key, CACHE_TTL_SECONDS, JSON.stringify(hotels));
}
