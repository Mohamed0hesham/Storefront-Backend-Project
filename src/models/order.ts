import Client from "../database";

// Creating a type Order
export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

// class orders
export class orders {
  // Method index for getting all orders made by a user
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  // Method userCurrentOrder for getting current active order of a user
  async userCurrentOrder(userId: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = ($1) AND status = 'active' ";

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get current orders of user ${userId}. Error: ${err}`
      );
    }
  }

  // Method userCompletedOrders for getting complete orders made by a user
  async userCompletedOrders(userId: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = ($1) AND status = 'complete' ";

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get current orders of user ${userId}. Error: ${err}`
      );
    }
  }

  // Method show for getting a certain order by order id
  async show(orderId: number): Promise<Order> {
    try {
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${orderId}. Error: ${err}`);
    }
  }

  // Method create for creating a new order
  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [order.status, order.user_id]);
      const newOrder = result.rows[0];

      conn.release();

      return newOrder;
    } catch (err) {
      throw new Error(
        `Could not add order to user ${order.user_id}. Error: ${err}`
      );
    }
  }

  // Method for adding products to an order
  async addProductToOrder(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }

  // Method for removing product from an order
  async removeProductFromOrder(
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [orderId, productId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not delete product ${productId} from order ${orderId}. Error: ${err}`
      );
    }
  }

  // Method for deleting an order by id
  async delete(id: string): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const article = result.rows[0];

      conn.release();

      return article;
    } catch (err) {
      throw new Error(`Could not delete this order, Error: ${err}`);
    }
  }
}
