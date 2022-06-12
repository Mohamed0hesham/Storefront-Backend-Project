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
exports.token = void 0;
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
exports.token = "";
describe("testing the users end point handler", () => {
    it("a POST request on /users should return a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/users")
            .send({ firstname: "Ahmed", lastname: "Elrayes", password: "123456789" });
        exports.token = response.body;
        expect(response.body).toEqual(exports.token);
    }));
    it("a GET request on /users without a token should return the two users in table users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/users");
    }));
    it("a GET request on /users/2 with a token should return the user with id 2", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/users/2")
            .set("Authorization", `bearer ${exports.token}`);
        expect(response.body).toEqual({
            id: 2,
            firstname: "Ahmed",
            lastname: "Elrayes",
            password: response.body.password,
        });
    }));
});
