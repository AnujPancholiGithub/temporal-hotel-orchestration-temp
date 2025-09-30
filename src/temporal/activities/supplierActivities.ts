import type { Hotel, SupplierResponse } from '../../types/index.js';
import axios from "axios";
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

  const apiHost = process.env.API_HOST;
  if (!apiHost) {
    throw new Error("API_HOST environment variable is not set");
  }
  const baseUrl = `http://${apiHost}`;

  console.log(baseUrl);
  if (supplier === "Supplier A") {
    if (shouldFail(failChanceA)) {
      throw new ApplicationFailure("Oops! Something went wrong with the code while fetching hotels from Supplier A");
    }

    const response = await axios.get(`${baseUrl}/supplierA/hotels`, {
      params: { city },
    });

    return {
      hotels: response.data, 
      supplier: "Supplier A",
      responseTime: Date.now() - start,
    };
  }

  if (supplier === "Supplier B") {
    if (shouldFail(failChanceB)) {  
      throw new ApplicationFailure("Oops! Something went wrong with the code while fetching hotels from Supplier B")
    }

    const response = await axios.get(`${baseUrl}/supplierB/hotels`, {
      params: { city },
    });

    return {
      hotels: response.data,
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
