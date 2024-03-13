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
exports.logout = exports.login = exports.signup = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const hashPassword_1 = __importDefault(require("../utils/hashPassword"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ message: "Missing credentials" });
        const user = yield UserModel_1.default.findOne({ email });
        console.log(user);
        if (user)
            return res.status(401).json({ message: "Email already registered" });
        const hashedPassword = yield (0, hashPassword_1.default)(password);
        const newUser = yield new UserModel_1.default({
            username,
            email,
            password: hashedPassword,
        }).save();
        console.log(newUser);
        const token = (0, generateToken_1.default)(newUser === null || newUser === void 0 ? void 0 : newUser._id, newUser.username, newUser.email);
        res.cookie("user", token, {
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            _id: newUser._id,
            username: newUser === null || newUser === void 0 ? void 0 : newUser.username,
            email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!",
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Missing credentials" });
        const user = yield UserModel_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Email not registered" });
        const isPasswordValid = yield (0, comparePassword_1.default)(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = (0, generateToken_1.default)(user === null || user === void 0 ? void 0 : user._id, user === null || user === void 0 ? void 0 : user.username, user === null || user === void 0 ? void 0 : user.email);
        res.cookie("user", token, {
            path: "/",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            _id: user === null || user === void 0 ? void 0 : user._id,
            username: user === null || user === void 0 ? void 0 : user.username,
            email: user === null || user === void 0 ? void 0 : user.email,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!",
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .status(200)
            .clearCookie("user", {
            path: "/",
        })
            .json({ message: "Logout success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong!",
        });
    }
});
exports.logout = logout;
