import { FastifyInstance } from "fastify";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/carrier-update", async (request) => {
    const payload = request.body as Record<string, unknown>;
    console.log("Carrier webhook received:", payload);
    return { received: true };
  });
}
