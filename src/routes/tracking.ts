import { FastifyInstance } from "fastify";
import IORedis from "ioredis";

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");

export async function trackingRoutes(app: FastifyInstance) {
  app.get<{ Params: { trackingNumber: string } }>("/:trackingNumber", async (request) => {
    const cached = await redis.get(`tracking:${request.params.trackingNumber}`);
    if (cached) return JSON.parse(cached);
    return { trackingNumber: request.params.trackingNumber, events: [], status: "unknown" };
  });
}
