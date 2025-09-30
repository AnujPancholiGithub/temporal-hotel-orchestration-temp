export interface TemporalEnv {
  address: string;
  namespace: string;
  apiKey: string | undefined;
}

export async function getTemporalEnv(): Promise<TemporalEnv> {
  return {
    address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
    namespace: process.env.TEMPORAL_NAMESPACE || 'default',
    apiKey: process.env.TEMPORAL_API_KEY,
  };
}

