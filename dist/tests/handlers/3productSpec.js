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
describe("test the products end points for responding", () => {
    it("a POST request on /products with a token should return the created product", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/products")
            .send({ name: "shirt", price: 2000, category: "clothing" })
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual({
            id: 2,
            name: "shirt",
            price: 2000,
            category: "clothing",
        });
    }));
    it("a GET request on /products with a token should return a list of two created product", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/products")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual([
            {
                id: 1,
                name: "Dell laptop",
                price: 20000,
                category: "electronics",
            },
            {
                id: 2,
                name: "shirt",
                price: 2000,
                category: "clothing",
            },
        ]);
    }));
    it("a GET request on /products?category=clothing with a token should return a list of products with category = clothing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/products?category=clothing")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual([
            {
                id: 2,
                name: "shirt",
                price: 2000,
                category: "clothing",
            },
        ]);
    }));
    it("a GET request on /products/2 with a token should return a product with id = 2", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/products/2")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.body).toEqual({
            id: 2,
            name: "shirt",
            price: 2000,
            category: "clothing",
        });
    }));
    it("a DELETE request on /products with a token should return a status code of 200 success", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/products/2")
            .set("Authorization", `bearer ${_1userSpec_1.token}`);
        expect(response.status).toBe(200);
    }));
});
