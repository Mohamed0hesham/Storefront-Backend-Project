import Client from "../database";

// Creating a type Product
export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

// class products
export class products {
  // Method index for getting all products
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      console.log(err);

      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  // Method show for getting a certain product by id
  async show(id: number): Promise<Product> {
    try {
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`);
    }
  }

  // Method productsByCategory for getting all products of a certain category
  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const sql = `SELECT * FROM products WHERE category=($1)`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [category]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get product by category ${category}. Error: ${err}`
      );
    }
  }

  // Method create for creating a new product
  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const newProduct = result.rows[0];

      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(`Could not add order ${product.name}. Error: ${err}`);
    }
  }

  // Method delete for deleting a product
  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}, Error: ${err}`);
    }
  }
}
