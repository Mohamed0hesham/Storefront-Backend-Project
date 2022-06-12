import express, { Request, Response } from "express";
import { Product, products } from "../models/product";
import verifyAuthToken from "./middlewares/AuthTokenMw";

// ================ Express routes here ====================

const productsRoutes = (app: express.Application) => {
  //route for getting all products or by category
  app.get("/products", index);

  //route for getting a product by id
  app.get("/products/:id", show);

  //route for creating a new product with a token auth middleware
  app.post("/products", verifyAuthToken, create);

  //route for deleting a product with a token auth middleware
  app.delete("/products/:id", verifyAuthToken, destroy);
};

// ================ handler functions here ====================

//Creating an instance of class products in the product model
const productsClass = new products();

//Handler for getting all products or by category
const index = async (req: Request, res: Response) => {
  try {
    const queiry = req.query;
    let product: Product[];

    //checks if there is a category specified otherwise it will return all products
    if (queiry.category) {
      product = await productsClass.productsByCategory(
        queiry.category as string
      );
    } else {
      product = await productsClass.index();
    }
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

//Handler for getting a certain product by id
const show = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  const product = await productsClass.show(id);
  res.json(product);
};

//Handler for creating a new product
const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct = await productsClass.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//Handler for deleting a product by id
const destroy = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  const deleted = await productsClass.delete(id);
  res.json(deleted);
};

export default productsRoutes;
