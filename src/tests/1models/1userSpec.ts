import { UsersTable } from "../../models/user";

const usersClass = new UsersTable();

describe("testing model user.ts", () => {
  describe("checking for the required methods to be defined", () => {
    it("should have a create method", () => {
      expect(usersClass.index).toBeDefined();
    });

    it("should have an index method", () => {
      expect(usersClass.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(usersClass.show).toBeDefined();
    });
  });

  describe("testing the functionality of the methods inside users class", () => {
    it("create method should return the created user info", async () => {
      const result = await usersClass.create({
        firstname: "Mohamed",
        lastname: "Elrayes",
        password: "123456789",
      });
      expect(result).toEqual({
        id: 1,
        firstname: "Mohamed",
        lastname: "Elrayes",
        password: result.password,
      });
    });

    it("index method should return a list containing the created user", async () => {
      const result = await usersClass.index();
      expect(result).toEqual([
        {
          id: 1,
          firstname: "Mohamed",
          lastname: "Elrayes",
          password: result[0].password,
        },
      ]);
    });

    it("show method with arg 1 should return a user with id 1", async () => {
      const result = await usersClass.show(1);
      expect(result).toEqual({
        id: 1,
        firstname: "Mohamed",
        lastname: "Elrayes",
        password: result.password,
      });
    });
  });
});
