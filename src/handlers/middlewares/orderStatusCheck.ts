import express from "express";
import Client from "../../database";

const orderStatusCheck = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderId = req.body.order_id;
    const ordersql = "SELECT * FROM orders WHERE id=($1)";
    const conn = await Client.connect();

    const result = await conn.query(ordersql, [orderId]);

    const order = result.rows[0];

    if (order.status !== "active") {
      const err = `Could not add products to order ${orderId} because order status is ${order.status}`;
      res.status(403).json(err);
    } else {
      next();
    }
    conn.release();
  } catch (err) {
    res.json(err);
    res.end;
  }
};

export default orderStatusCheck;
