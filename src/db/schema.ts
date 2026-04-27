import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const shipments = pgTable("shipments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: text("order_id").notNull(),
  carrier: text("carrier").notNull(),
  trackingNumber: text("tracking_number"),
  status: text("status").notNull().default("label_created"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
