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
const order_1 = require("../models/order");
const AuthTokenMw_1 = __importDefault(require("./middlewares/AuthTokenMw"));
// ================ Express routes here ====================
const ordersRoutes = (app) => {
    //route for creating a new order with a token auth middleware
    app.post("/orders", AuthTokenMw_1.default, create);
    //route for getting all orders of a user with a token auth middleware
    app.get("/orders", AuthTokenMw_1.default, allOrders);
    //route for getting current active order of a user with a token auth middleware
    app.get("/orders/active/users/:id", AuthTokenMw_1.default, currentOrder);
    //route for getting completed orders of a user with a token auth middleware
    app.get("/orders/complete/users/:id", AuthTokenMw_1.default, userCompletedOrders);
};
// ================ handler functions here ====================
//Creating an instance of class orders in the order model
const orderClass = new order_1.orders();
//Handler for creating a new order
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const newOrder = yield orderClass.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//Handler for getting the current active order of a user
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield orderClass.index();
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//Handler for getting the current active order of a user
const currentOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const newOrder = yield orderClass.userCurrentOrder(userId);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
//Handler for getting the completed orders of a user
const userCompletedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const newOrder = yield orderClass.userCompletedOrders(userId);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = ordersRoutes;
