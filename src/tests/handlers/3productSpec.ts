import app from "../../server";
import supertest from "supertest";
import { token } from "./1userSpec";

const request = supertest(app);

describe("testing the products end points for responding", () => {
  it("a POST request on /products with a token should return the created product", async () => {
    const response = await request
      .post("/products")
      .send({ name: "shirt", price: 2000, category: "clothing" })
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual({
      id: 2,
      name: "shirt",
      price: 2000,
      category: "clothing",
    });
  });

  it("a GET request on /products with a token should return a list of two created product", async () => {
    const response = await request
      .get("/products")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "Dell laptop",
        price: 20000,
        category: "electronics",
      },
      {
        id: 2,
        name: "shirt",
        price: 2000,
        category: "clothing",
      },
    ]);
  });

  it("a GET request on /products?category=clothing with a token should return a list of products with category = clothing", async () => {
    const response = await request
      .get("/products?category=clothing")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual([
      {
        id: 2,
        name: "shirt",
        price: 2000,
        category: "clothing",
      },
    ]);
  });

  it("a GET request on /products/2 with a token should return a product with id = 2", async () => {
    const response = await request
      .get("/products/2")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual({
      id: 2,
      name: "shirt",
      price: 2000,
      category: "clothing",
    });
  });

  it("a DELETE request on /products with a token should return a status code of 200 success", async () => {
    const response = await request
      .delete("/products/2")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
