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
const database_1 = __importDefault(require("../../database"));
const orderStatusCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.body.order_id;
        const ordersql = "SELECT * FROM orders WHERE id=($1)";
        const conn = yield database_1.default.connect();
        const result = yield conn.query(ordersql, [orderId]);
        const order = result.rows[0];
        if (order.status !== "active") {
            const err = `Could not add products to order ${orderId} because order status is ${order.status}`;
            res.status(403).json(err);
        }
        else {
            next();
        }
        conn.release();
    }
    catch (err) {
        res.json(err);
        res.end;
    }
});
exports.default = orderStatusCheck;
