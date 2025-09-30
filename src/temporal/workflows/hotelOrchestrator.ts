import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities/supplierActivities.js';
import type { HotelSearchParams, OrchestrationResult, SupplierResponse } from '../../types/index.js';

const { fetchHotelsBySupplier, deduplicateAndSelectBest } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
  retry: {
    initialInterval: '1 second',
    maximumAttempts: 100,
  },
});

export async function hotelOrchestrationWorkflow(params: HotelSearchParams): Promise<OrchestrationResult> {
  const startTime = Date.now();

  const suppliers = ['Supplier A', 'Supplier B'];

  const supplierPromises: Promise<SupplierResponse>[] = suppliers.map(supplier =>
    fetchHotelsBySupplier(supplier, params.city)
  );
  
  
  const settledPromises = await Promise.allSettled(supplierPromises);

  const successfulResults: SupplierResponse[] = [];
  for (const result of settledPromises) {
    if (result.status === 'fulfilled') {
      successfulResults.push(result.value);
    } else {
      // throw ApplicationFailure.create({message:`An activity failed after all retries: ${result.reason}`})
    }
  }

  const allHotels = successfulResults.flatMap((result) => result.hotels);

  const dedupedHotels = await deduplicateAndSelectBest(allHotels);

  const processingTime = Date.now() - startTime;

  return {
    hotels: dedupedHotels,
    totalSuppliers: supplierPromises.length,
    successfulSuppliers: successfulResults.length,
    cacheHit: false,
    processingTime,
  };
}
