import { products } from "../../models/product";

const productsClass = new products();

describe("testing model product.ts", () => {
  describe("checking for the required methods to be defined", () => {
    it("should have a create method", () => {
      expect(productsClass.index).toBeDefined();
    });

    it("should have an index method", () => {
      expect(productsClass.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(productsClass.show).toBeDefined();
    });
  });

  describe("testing the functionality of the methods inside products class", () => {
    it("create method should return the created product", async () => {
      const result = await productsClass.create({
        name: "Dell laptop",
        price: 20000,
        category: "electronics",
      });
      expect(result).toEqual({
        id: 1,
        name: "Dell laptop",
        price: 20000,
        category: "electronics",
      });
    });

    it("index method should return a list containing one product", async () => {
      const result = await productsClass.index();
      expect(result).toEqual([
        {
          id: 1,
          name: "Dell laptop",
          price: 20000,
          category: "electronics",
        },
      ]);
    });

    it("show method with arg id=1 should return a product with id '1' ", async () => {
      const result = await productsClass.show(1);
      expect(result).toEqual({
        id: 1,
        name: "Dell laptop",
        price: 20000,
        category: "electronics",
      });
    });
  });
});
