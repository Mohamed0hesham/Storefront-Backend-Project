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
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const productsClass = new product_1.products();
describe("testing model order.ts", () => {
    describe("checking for the required methods to be defined", () => {
        it("should have a create method", () => {
            expect(productsClass.index).toBeDefined();
        });
        it("should have an index method", () => {
            expect(productsClass.index).toBeDefined();
        });
        it("should have a show method", () => {
            expect(productsClass.show).toBeDefined();
        });
    });
    describe("testing the functionality of the methods inside products class", () => {
        it("create method should return the created order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield productsClass.create({
                name: "Dell laptop",
                price: 20000,
                category: "electronics",
            });
            expect(result).toEqual({
                id: 1,
                name: "Dell laptop",
                price: 20000,
                category: "electronics",
            });
        }));
        it("index method should return a list containing one order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield productsClass.index();
            expect(result).toEqual([
                {
                    id: 1,
                    name: "Dell laptop",
                    price: 20000,
                    category: "electronics",
                },
            ]);
        }));
        it("show method with arg id=1 should return an order with id '1' ", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield productsClass.show(1);
            expect(result).toEqual({
                id: 1,
                name: "Dell laptop",
                price: 20000,
                category: "electronics",
            });
        }));
    });
});
