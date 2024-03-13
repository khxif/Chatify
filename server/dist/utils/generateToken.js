"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateToken = (id, username, email) => {
    console.log(process.env.JWT_SECRET);
    const token = jsonwebtoken_1.default.sign({ id, username, email }, process.env.JWT_SECRET);
    console.log(token);
    return token;
};
exports.default = generateToken;
