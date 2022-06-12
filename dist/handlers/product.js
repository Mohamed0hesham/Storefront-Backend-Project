"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const AuthTokenMw_1 = __importDefault(require("./middlewares/AuthTokenMw"));
// ================ Express routes here ====================
const productsRoutes = (app) => {
    //route for getting all products or by category
    app.get("/products", index);
    //route for getting a product by id
    app.get("/products/:id", show);
    //route for creating a new product with a token auth middleware
    app.post("/products", AuthTokenMw_1.default, create);
    //route for deleting a product with a token auth middleware
    app.delete("/products/:id", AuthTokenMw_1.default, destroy);
};
// ================ handler functions here ====================
//Creating an instance of class products in the product model
const productsClass = new product_1.products();
//Handler for getting all products or by category
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queiry = req.query;
        let product;
        //checks if there is a category specified otherwise it will return all products
        if (queiry.category) {
            product = yield productsClass.productsByCategory(queiry.category);
        }
        else {
            product = yield productsClass.index();
        }
        res.json(product);
    }
    catch (err) {
        res.json(err);
    }
});
//Handler for getting a certain product by id
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield productsClass.show(id);
    res.json(product);
});
//Handler for creating a new product
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = yield productsClass.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//Handler for deleting a product by id
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleted = yield productsClass.delete(id);
    res.json(deleted);
});
exports.default = productsRoutes;
