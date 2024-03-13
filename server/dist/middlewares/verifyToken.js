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
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token || token.trim() === "")
            return res
                .status(401)
                .json({ message: "Invalid token or token malfunctioned" });
        const data = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (!data)
            return res.status(401).json({ message: "Invalid Token!" });
        res.locals.jwtData = data;
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: error.message || "Something went wrong!" });
    }
});
exports.verifyToken = verifyToken;
