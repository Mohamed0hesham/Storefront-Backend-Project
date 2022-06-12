import { orders } from "../../models/order";

const orderClass = new orders();

describe("testing model order.ts", () => {
  describe("checking for the required methods to be defined", () => {
    it("should have a create method", () => {
      expect(orderClass.index).toBeDefined();
    });

    it("should have an index method", () => {
      expect(orderClass.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(orderClass.show).toBeDefined();
    });

    it("should have a userCurrentOrder method", () => {
      expect(orderClass.userCurrentOrder).toBeDefined();
    });

    it("should have a userCompletedOrders method", () => {
      expect(orderClass.userCompletedOrders).toBeDefined();
    });
  });

  describe("testing the functionality of the methods inside order class", () => {
    it("create method should return the created order", async () => {
      const result = await orderClass.create({ status: "active", user_id: 1 });
      expect(result).toEqual({ id: 1, status: "active", user_id: 1 });
    });
    it("create method should return the created order with different data", async () => {
      const result = await orderClass.create({
        status: "complete",
        user_id: 1,
      });
      expect(result).toEqual({ id: 2, status: "complete", user_id: 1 });
    });

    it("index method should return a list containing two orders", async () => {
      const result = await orderClass.index();
      expect(result).toEqual([
        { id: 1, status: "active", user_id: 1 },
        { id: 2, status: "complete", user_id: 1 },
      ]);
    });

    it("show method with arg id=2 should return an order with id '2'", async () => {
      const result = await orderClass.show(2);
      expect(result).toEqual({ id: 2, status: "complete", user_id: 1 });
    });

    it("userCurrentOrder method should return an order with status 'active' ", async () => {
      const result = await orderClass.userCurrentOrder(1);
      expect(result).toEqual([{ id: 1, status: "active", user_id: 1 }]);
    });

    it("userCompletedOrders method should return orders with status 'complete' ", async () => {
      const result = await orderClass.userCompletedOrders(1);
      expect(result).toEqual([{ id: 2, status: "complete", user_id: 1 }]);
    });
  });
});
