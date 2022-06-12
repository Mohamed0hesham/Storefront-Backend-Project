import app from "../../server";
import supertest from "supertest";
import { token } from "./1userSpec";

const request = supertest(app);

describe("testing the orders end points for responding", () => {
  it("a POST request on /orders with a token should return the created order", async () => {
    const response = await request
      .post("/orders")
      .send({ status: "complete", user_id: 2 })
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual({ id: 3, status: "complete", user_id: 2 });
  });

  it("a GET request on /orders with token should return a list of created orders", async () => {
    const response = await request
      .get("/orders")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual([
      { id: 1, status: "active", user_id: 1 },
      { id: 2, status: "complete", user_id: 1 },
      { id: 3, status: "complete", user_id: 2 },
    ]);
  });

  it("a GET request on /orders/active/users/2 with token should return a list of orders with status = active", async () => {
    const response = await request
      .get("/orders/active/users/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual([{ id: 1, status: "active", user_id: 1 }]);
  });

  it("a GET request on /orders/complete/users/2 with token should return a list of orders with status = complete for user with id = 2", async () => {
    const response = await request
      .get("/orders/complete/users/2")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual([{ id: 3, status: "complete", user_id: 2 }]);
  });
});
