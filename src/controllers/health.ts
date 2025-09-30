import type { Request, Response } from "express";
import axios from "axios";
import { redisClient } from "../config/redis.js";

interface SupplierHealth {
  status: "healthy" | "unhealthy";
  responseTime?: number;
  error?: string;
}

interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  services: {
    redis: {
      status: "healthy" | "unhealthy";
      error?: string;
    };
    supplierA: SupplierHealth;
    supplierB: SupplierHealth;
  };
}

async function checkSupplierHealth(
  supplierUrl: string,
  timeout: number = 5000
): Promise<SupplierHealth> {
  const startTime = Date.now();

  console.log(supplierUrl);
  try {
    await axios.get(supplierUrl, {
      timeout,
      params: { city: "delhi" },
    });

    const responseTime = Date.now() - startTime;

    return {
      status: "healthy",
      responseTime,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function checkHealth(req: Request, res: Response): Promise<void> {
  try {
    const redisHealth = await checkRedisHealth();

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const [supplierAHealth, supplierBHealth] = await Promise.all([
      checkSupplierHealth(`${baseUrl}/supplierA/hotels`),
      checkSupplierHealth(`${baseUrl}/supplierB/hotels`),
    ]);

    const allHealthy =
      redisHealth.status === "healthy" &&
      supplierAHealth.status === "healthy" &&
      supplierBHealth.status === "healthy";

    const anyUnhealthy =
      redisHealth.status === "unhealthy" ||
      supplierAHealth.status === "unhealthy" ||
      supplierBHealth.status === "unhealthy";

    let overallStatus: "healthy" | "degraded" | "unhealthy";
    if (allHealthy) {
      overallStatus = "healthy";
    } else if (anyUnhealthy) {
      overallStatus = "degraded";
    } else {
      overallStatus = "unhealthy";
    }

    const healthResponse: HealthCheckResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      services: {
        redis: redisHealth,
        supplierA: supplierAHealth,
        supplierB: supplierBHealth,
      },
    };

    const httpStatus = overallStatus === "healthy" ? 200 : 503;
    res.status(httpStatus).json(healthResponse);
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
    });
  }
}

async function checkRedisHealth(): Promise<{
  status: "healthy" | "unhealthy";
  error?: string;
}> {
  try {
    await redisClient.ping();
    return { status: "healthy" };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Redis connection failed",
    };
  }
}
