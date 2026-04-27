import { FastifyInstance } from "fastify";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/carrier-update", async (request, reply) => {
    const payload = request.body;
    console.log("Carrier webhook received:", payload);
    return { received: true };
  });
}
