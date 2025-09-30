import { Redis } from 'ioredis';
import type { RedisOptions } from 'ioredis';

const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    lazyConnect: true, 
    maxRetriesPerRequest: 3, 
};

export const redisClient = new Redis(redisConfig);

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis.');
});

redisClient.on('error', (err: Error) => {
  console.error('Redis connection error:', err);
});
