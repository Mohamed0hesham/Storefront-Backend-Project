import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

export let token = "";

describe("testing the users end point handler", () => {
  it("a POST request on /users should return a token", async () => {
    const response = await request
      .post("/users")
      .send({ firstname: "Ahmed", lastname: "Elrayes", password: "123456789" });
    token = response.body;
    expect(response.body).toEqual(token);
  });

  it("a GET request on /users without a token should return the two users in table users", async () => {
    const response = await request.get("/users");
  });

  it("a GET request on /users/2 with a token should return the user with id 2", async () => {
    const response = await request
      .get("/users/2")
      .set("Authorization", `bearer ${token}`);
    expect(response.body).toEqual({
      id: 2,
      firstname: "Ahmed",
      lastname: "Elrayes",
      password: response.body.password,
    });
  });
});
