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
exports.searchUser = exports.usersForSidebar = exports.verifyUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield UserModel_1.default.findOne({ email: (_a = res.locals.jwtData) === null || _a === void 0 ? void 0 : _a.email });
    if (!user)
        return res.status(401).json({ message: "User not found" });
    res.status(200).json({
        _id: user === null || user === void 0 ? void 0 : user._id,
        username: user === null || user === void 0 ? void 0 : user.username,
        email: user === null || user === void 0 ? void 0 : user.email,
    });
});
exports.verifyUser = verifyUser;
const usersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield UserModel_1.default.findOne({ email: (_b = res.locals.jwtData) === null || _b === void 0 ? void 0 : _b.email });
    if (!user)
        return res.status(401).json({ message: "User not found" });
    const users = yield UserModel_1.default.find({ _id: { $ne: user._id } }).select("-password");
    if (!users)
        return res.status(200).json([]);
    res.status(200).json(users);
});
exports.usersForSidebar = usersForSidebar;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    console.log(username);
    const users = yield UserModel_1.default.find({ username });
    console.log(users);
    if (!users)
        return res.status(200).json([]);
    res.status(200).json(users);
});
exports.searchUser = searchUser;
