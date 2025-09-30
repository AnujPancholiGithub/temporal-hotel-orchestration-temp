import app from './app.js';
import { redisClient } from './config/redis.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  await redisClient.connect();
  app.listen(PORT, () => {
    console.log(`Express server started and listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
