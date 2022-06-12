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
const user_1 = require("../models/user");
const AuthTokenMw_1 = __importDefault(require("./middlewares/AuthTokenMw"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ================ Express routes here ====================
const usersRoutes = (app) => {
    //route for getting all users with a token auth middleware
    app.get("/users", AuthTokenMw_1.default, index);
    //route for getting a certain user by id with a token auth middleware
    app.get("/users/:id", AuthTokenMw_1.default, show);
    //route for creating a new user
    app.post("/users", create);
};
// ================ handler functions here ====================
// Creating an instance of class UsersTable in the user model
const store = new user_1.UsersTable();
// Handler for getting all users
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield store.index();
    res.json(users);
});
// Handler for getting a certain user with id
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield store.show(id);
    res.json(user);
});
// Handler for creating a new user
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const newuser = yield store.create(user);
        // Signing the user token with JWT
        const token = jsonwebtoken_1.default.sign({ user: newuser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = usersRoutes;
