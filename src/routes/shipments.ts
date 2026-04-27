import { FastifyInstance } from "fastify";
import { db } from "../db/client";
import { shipments } from "../db/schema";
import { eq } from "drizzle-orm";

export async function shipmentRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const rows = await db.select().from(shipments).limit(50);
    return { shipments: rows };
  });

  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const [row] = await db.select().from(shipments).where(eq(shipments.id, request.params.id));
    if (!row) return reply.status(404).send({ error: "Shipment not found" });
    return row;
  });

  app.post<{ Body: { orderId: string; carrier: string; trackingNumber: string } }>("/", async (request, reply) => {
    const body = request.body;
    const [created] = await db.insert(shipments).values({
      orderId: body.orderId,
      carrier: body.carrier,
      trackingNumber: body.trackingNumber,
      status: "label_created",
    }).returning();
    return reply.status(201).send(created);
  });

  app.patch<{ Params: { id: string }; Body: { status: string } }>("/:id/status", async (request, reply) => {
    const { status } = request.body;
    const [updated] = await db.update(shipments)
      .set({ status, updatedAt: new Date() })
      .where(eq(shipments.id, request.params.id))
      .returning();
    return updated;
  });
}
