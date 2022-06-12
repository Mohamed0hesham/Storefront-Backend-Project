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
exports.UsersTable = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// class UsersTable
class UsersTable {
    // Method index for getting all users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        });
    }
    // Method show for getting a certain user
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE id=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get user ${id}. Error: ${err}`);
            }
        });
    }
    // Method create for creating a new user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hashing the user's password
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPass = bcrypt_1.default.hashSync(user.password, salt);
                const sql = "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [
                    user.firstname,
                    user.lastname,
                    hashedPass,
                ]);
                conn.release();
                const newUser = result.rows[0];
                return newUser;
            }
            catch (err) {
                throw new Error(`Could not add user ${user.firstname} ${user.lastname}. Error: ${err}`);
            }
        });
    }
}
exports.UsersTable = UsersTable;
