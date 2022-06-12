import express, { Request, Response } from "express";
import { User, UsersTable } from "../models/user";
import verifyAuthToken from "./middlewares/AuthTokenMw";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// ================ Express routes here ====================

const usersRoutes = (app: express.Application) => {
  //route for getting all users with a token auth middleware
  app.get("/users", verifyAuthToken, index);

  //route for getting a certain user by id with a token auth middleware
  app.get("/users/:id", verifyAuthToken, show);

  //route for creating a new user
  app.post("/users", create);
};

// ================ handler functions here ====================

// Creating an instance of class UsersTable in the user model
const store = new UsersTable();

// Handler for getting all users
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Handler for getting a certain user with id
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const user = await store.show(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Handler for creating a new user
const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newuser = await store.create(user);

    // Signing the user token with JWT
    const token = Jwt.sign({ user: newuser }, process.env.TOKEN_SECRET!);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default usersRoutes;
