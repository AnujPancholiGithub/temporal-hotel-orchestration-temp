import type { Hotel, SupplierResponse } from '../../types/index.js';
import { supplierA_Hotels, supplierB_Hotels } from '../../suppliers/supplierMocks.js';
import { ApplicationFailure } from '@temporalio/client';

/**
 * An Activity that fetches hotel data from the mock Suppliers,
 * with randomized failures to simulate flaky suppliers.
 */
export async function fetchHotelsBySupplier(
  supplier: string,
  city: string
): Promise<SupplierResponse> {
  const start = Date.now();

  // Simulated network latency (50ms - 300ms)
  const simulatedLatency = Math.floor(50 + Math.random() * 250);
  await new Promise((resolve) => setTimeout(resolve, simulatedLatency));


  // Failure probabilities (tweak these numbers if you want more/less flakiness)
  // Most of the time both pass: e.g., 10% chance A fails, 8% chance B fails.
  const failChanceA = 0.10; // 10% fail for Supplier A
  const failChanceB = 0.08; // 8%  fail for Supplier B
  const shouldFail = (p: number) => Math.random() < p;

  if (supplier === "Supplier A") {

    if (shouldFail(failChanceA)) {
      throw new ApplicationFailure("Supplier A timed out / returned 5xx");
    }

    return {
      hotels: supplierA_Hotels,
      supplier: "Supplier A",
      responseTime: Date.now() - start,
    };
  }

  if (supplier === "Supplier B") {
    if (shouldFail(failChanceB)) {  
      throw new ApplicationFailure("Supplier B timed out / returned 5xx")
    }

    return {
      hotels: supplierB_Hotels,
      supplier: "Supplier B",
      responseTime: Date.now() - start,
    };
  }

  // Reject invalid suppliers
  throw new Error(`Invalid supplier: ${supplier}`);
}




/**
 * A pure, non-network activity for business logic.
 * It takes a combined list of hotels and returns a de-duplicated list
 * with the best offer for each hotel.
 */
export async function deduplicateAndSelectBest(hotels: Hotel[]): Promise<Hotel[]> {
  const hotelMap = new Map<string, Hotel>();

  for (const hotel of hotels) {
    const key = hotel.name.toLowerCase().trim();
    const existingHotel = hotelMap.get(key);

    if (!existingHotel || hotel.price < existingHotel.price) {
      hotelMap.set(key, hotel);
    }
  }

  return Array.from(hotelMap.values()).sort((a, b) => a.price - b.price);
}
