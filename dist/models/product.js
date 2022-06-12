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
exports.products = void 0;
const database_1 = __importDefault(require("../database"));
// class products
class products {
    // Method index for getting all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                console.log(err);
                throw new Error(`Could not get products. Error: ${err}`);
            }
        });
    }
    // Method show for getting a certain product by id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM products WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get order ${id}. Error: ${err}`);
            }
        });
    }
    // Method productsByCategory for getting all products of a certain category
    productsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM products WHERE category=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [category]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get product by category ${category}. Error: ${err}`);
            }
        });
    }
    // Method create for creating a new product
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    product.name,
                    product.price,
                    product.category,
                ]);
                const newProduct = result.rows[0];
                conn.release();
                return newProduct;
            }
            catch (err) {
                throw new Error(`Could not add order ${product.name}. Error: ${err}`);
            }
        });
    }
    // Method delete for deleting a product
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM products WHERE id=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}, Error: ${err}`);
            }
        });
    }
}
exports.products = products;
