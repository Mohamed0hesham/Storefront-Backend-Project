import express, { Request, Response } from "express";
import { Order, orders } from "../models/order";
import verifyAuthToken from "./middlewares/AuthTokenMw";

// ================ Express routes here ====================

const ordersRoutes = (app: express.Application) => {
  //route for creating a new order with a token auth middleware
  app.post("/orders", verifyAuthToken, create);

  //route for getting all orders of a user with a token auth middleware
  app.get("/orders", verifyAuthToken, allOrders);

  //route for getting current active order of a user with a token auth middleware
  app.get("/orders/active/users/:id", verifyAuthToken, currentOrder);

  //route for getting completed orders of a user with a token auth middleware
  app.get("/orders/complete/users/:id", verifyAuthToken, userCompletedOrders);
};

// ================ handler functions here ====================

//Creating an instance of class orders in the order model
const orderClass = new orders();

//Handler for creating a new order
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await orderClass.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Handler for getting the current active order of a user
const allOrders = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderClass.index();
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Handler for getting the current active order of a user
const currentOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;

    const newOrder = await orderClass.userCurrentOrder(userId);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Handler for getting the completed orders of a user
const userCompletedOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as unknown as number;

    const newOrder = await orderClass.userCompletedOrders(userId);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default ordersRoutes;
