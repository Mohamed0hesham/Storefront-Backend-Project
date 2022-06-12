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
const user_1 = require("../../models/user");
const usersClass = new user_1.UsersTable();
describe("testing model user.ts", () => {
    describe("checking for the required methods to be defined", () => {
        it("should have a create method", () => {
            expect(usersClass.index).toBeDefined();
        });
        it("should have an index method", () => {
            expect(usersClass.index).toBeDefined();
        });
        it("should have a show method", () => {
            expect(usersClass.show).toBeDefined();
        });
    });
    describe("testing the functionality of the methods inside users class", () => {
        it("create method should return the created user info", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield usersClass.create({
                firstname: "Mohamed",
                lastname: "Elrayes",
                password: "123456789",
            });
            expect(result).toEqual({
                id: 1,
                firstname: "Mohamed",
                lastname: "Elrayes",
                password: result.password,
            });
        }));
        it("index method should return a list containing the created user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield usersClass.index();
            expect(result).toEqual([
                {
                    id: 1,
                    firstname: "Mohamed",
                    lastname: "Elrayes",
                    password: result[0].password,
                },
            ]);
        }));
        it("show method with arg 1 should return a user with id 1", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield usersClass.show(1);
            expect(result).toEqual({
                id: 1,
                firstname: "Mohamed",
                lastname: "Elrayes",
                password: result.password,
            });
        }));
    });
});
