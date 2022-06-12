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
exports.orders = void 0;
const database_1 = __importDefault(require("../database"));
// class orders
class orders {
    // Method index for getting all orders made by a user
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    // Method userCurrentOrder for getting current active order of a user
    userCurrentOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = 'active' ";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get current orders of user ${userId}. Error: ${err}`);
            }
        });
    }
    // Method userCompletedOrders for getting complete orders made by a user
    userCompletedOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE user_id = ($1) AND status = 'complete' ";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get current orders of user ${userId}. Error: ${err}`);
            }
        });
    }
    // Method show for getting a certain order by order id
    show(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `SELECT * FROM orders WHERE id=($1)`;
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [orderId]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get order ${orderId}. Error: ${err}`);
            }
        });
    }
    // Method create for creating a new order
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [order.status, order.user_id]);
                const newOrder = result.rows[0];
                conn.release();
                return newOrder;
            }
            catch (err) {
                throw new Error(`Could not add order to user ${order.user_id}. Error: ${err}`);
            }
        });
    }
    // Method for adding products to an order
    addProductToOrder(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [quantity, orderId, productId]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add product ${productId} to order ${orderId}. Error: ${err}`);
            }
        });
    }
    // Method for removing product from an order
    removeProductFromOrder(orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM order_products WHERE order_id=($1) AND product_id=($2) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [orderId, productId]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete product ${productId} from order ${orderId}. Error: ${err}`);
            }
        });
    }
    // Method for deleting an order by id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM orders WHERE id=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const article = result.rows[0];
                conn.release();
                return article;
            }
            catch (err) {
                throw new Error(`Could not delete this order, Error: ${err}`);
            }
        });
    }
}
exports.orders = orders;
