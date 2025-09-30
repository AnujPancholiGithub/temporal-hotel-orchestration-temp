import path from 'path';
import { fileURLToPath } from 'url';
import { Worker, NativeConnection, type NativeConnectionOptions } from '@temporalio/worker';
import * as activities from './temporal/activities/supplierActivities.js';
import { getTemporalEnv } from './config/temporal.js';
import { redisClient } from './config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Starting Temporal Worker...');
  
  const { address, namespace, apiKey } = await getTemporalEnv();

  const connectionOptions: NativeConnectionOptions = {
    address,
  };
  
  if (apiKey) {
    connectionOptions.tls = true;
    connectionOptions.apiKey = apiKey;
  } else {
    connectionOptions.tls = false;
  }

  await redisClient.connect();

  console.log(`Worker connecting to Temporal at: ${apiKey ? 'TLS' : 'non-TLS'} ${address} in namespace: ${namespace}`);
  const connection = await NativeConnection.connect(connectionOptions);
  
  const workflowsPath = path.resolve(__dirname, './temporal/workflows/hotelOrchestrator.js');

  const worker = await Worker.create({
    connection,
    namespace,
    workflowsPath, // Use the resolved absolute path
    activities,
    taskQueue: 'hotel-orchestration-que',
  });

  console.log(`Temporal Worker successfully connected. Listening on task queue: hotel-orchestration-que`);
  await worker.run();
  
  await redisClient.quit();
}

run().catch((err) => {
  console.error('Fatal error starting Temporal Worker:', err);
  process.exit(1);
});
