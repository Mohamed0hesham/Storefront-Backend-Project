import dotenv from "dotenv";
import { Pool } from "pg";

let client = new Pool();
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
