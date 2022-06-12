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
const order_1 = require("../../models/order");
const orderClass = new order_1.orders();
describe("testing model order.ts", () => {
    describe("checking for the required methods to be defined", () => {
        it("should have a create method", () => {
            expect(orderClass.index).toBeDefined();
        });
        it("should have an index method", () => {
            expect(orderClass.index).toBeDefined();
        });
        it("should have a show method", () => {
            expect(orderClass.show).toBeDefined();
        });
        it("should have a userCurrentOrder method", () => {
            expect(orderClass.userCurrentOrder).toBeDefined();
        });
        it("should have a userCompletedOrders method", () => {
            expect(orderClass.userCompletedOrders).toBeDefined();
        });
    });
    describe("testing the functionality of the methods inside order class", () => {
        it("create method should return the created order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderClass.create({ status: "active", user_id: 1 });
            expect(result).toEqual({ id: 1, status: "active", user_id: 1 });
        }));
        it("create method should return the created order with different data", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderClass.create({
                status: "complete",
                user_id: 1,
            });
            expect(result).toEqual({ id: 2, status: "complete", user_id: 1 });
        }));
        it("index method should return a list containing two orders", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderClass.index();
            expect(result).toEqual([
                { id: 1, status: "active", user_id: 1 },
                { id: 2, status: "complete", user_id: 1 },
            ]);
        }));
        it("show method with arg id=2 should return an order with id '2'", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderClass.show(2);
            expect(result).toEqual({ id: 2, status: "complete", user_id: 1 });
        }));
        it("userCurrentOrder method should return an order with status 'active' ", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderClass.userCurrentOrder(1);
            expect(result).toEqual([{ id: 1, status: "active", user_id: 1 }]);
        }));
        it("userCompletedOrders method should return orders with status 'complete' ", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderClass.userCompletedOrders(1);
            expect(result).toEqual([{ id: 2, status: "complete", user_id: 1 }]);
        }));
    });
});
