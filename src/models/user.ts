import { QueryResult } from "pg";
import Client from "../database";
import bcrypt from "bcrypt";

// Creating a type User
export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

// class UsersTable
export class UsersTable {
  // Method index for getting all users
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM users";
      const conn = await Client.connect();
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  // Method show for getting a certain user
  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }

  // Method create for creating a new user
  async create(user: User): Promise<User> {
    try {
      // Hashing the user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = bcrypt.hashSync(user.password, salt);
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result: QueryResult<User> = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hashedPass,
      ]);
      conn.release();
      const newUser = result.rows[0];

      return newUser;
    } catch (err) {
      throw new Error(
        `Could not add user ${user.firstname} ${user.lastname}. Error: ${err}`
      );
    }
  }
}
