
export interface Hotel {
    hotelId: string;
    name: string;
    price: number;
    city: string;
    commissionPct: number; 
    supplier?: 'Supplier A' | 'Supplier B'; 
  }
  
  export interface HotelSearchParams {
    city: string;
    minPrice?: number;
    maxPrice?: number;
  }
  
  export interface SupplierResponse {
    hotels: Hotel[];
    supplier: string;
    responseTime: number; 
    error?: string; 
  }
  
  export interface OrchestrationResult {
    hotels: Hotel[];
    totalSuppliers: number;
    successfulSuppliers: number;
    cacheHit: boolean;
    processingTime: number;
  }

  export interface SupplierHealth {
    status: 'healthy' | 'unhealthy';
    responseTime?: number;
    error?: string;
  }
  
  export interface HealthCheckResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    services: {
      redis: {
        status: 'healthy' | 'unhealthy';
        error?: string;
      };
      supplierA: SupplierHealth;
      supplierB: SupplierHealth;
    };
  }
  