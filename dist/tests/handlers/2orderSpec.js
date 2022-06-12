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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const _1userSpec_1 = require("./1userSpec");
const request = (0, supertest_1.default)(server_1.default);
describe("test the orders end points for responding", () => {
    it("a POST request on /orders with a token should return the created order", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/orders")
            .send({ status: "complete", user_id: 2 })
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual({ id: 3, status: "complete", user_id: 2 });
    }));
    it("a GET request on /orders with token should return a list of created orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/orders")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual([
            { id: 1, status: "active", user_id: 1 },
            { id: 2, status: "complete", user_id: 1 },
            { id: 3, status: "complete", user_id: 2 },
        ]);
    }));
    it("a GET request on /orders/active/users/2 with token should return a list of orders with status = active", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/orders/active/users/1")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual([{ id: 1, status: "active", user_id: 1 }]);
    }));
    it("a GET request on /orders/complete/users/2 with token should return a list of orders with status = complete for user with id = 2", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/orders/complete/users/2")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual([{ id: 3, status: "complete", user_id: 2 }]);
    }));
});
