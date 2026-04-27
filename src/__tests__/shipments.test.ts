import { describe, it, expect } from "vitest";

describe("Shipment status transitions", () => {
  const validTransitions: Record<string, string[]> = {
    label_created: ["picked_up"],
    picked_up: ["in_transit"],
    in_transit: ["out_for_delivery", "exception"],
    out_for_delivery: ["delivered", "exception"],
    exception: ["in_transit", "returned"],
  };

  it("allows valid transitions", () => {
    expect(validTransitions["label_created"]).toContain("picked_up");
    expect(validTransitions["in_transit"]).toContain("out_for_delivery");
  });

  it("does not allow backward transitions", () => {
    expect(validTransitions["delivered"]).toBeUndefined();
  });
});
