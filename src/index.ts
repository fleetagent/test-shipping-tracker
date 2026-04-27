import Fastify from "fastify";
import cors from "@fastify/cors";
import { shipmentRoutes } from "./routes/shipments";
import { trackingRoutes } from "./routes/tracking";
import { webhookRoutes } from "./routes/webhooks";

const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.register(shipmentRoutes, { prefix: "/api/shipments" });
app.register(trackingRoutes, { prefix: "/api/tracking" });
app.register(webhookRoutes, { prefix: "/api/webhooks" });

app.get("/health", async () => ({ status: "ok" }));

const PORT = Number(process.env.PORT) || 3004;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Shipping tracker on port ${PORT}`);
});

export { app };
