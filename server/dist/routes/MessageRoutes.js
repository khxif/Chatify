"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageControllers_1 = require("../controllers/MessageControllers");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = (0, express_1.Router)();
router.post("/send/:id", verifyToken_1.verifyToken, MessageControllers_1.sendMessage);
router.get("/get/:id", verifyToken_1.verifyToken, MessageControllers_1.getMessage);
exports.default = router;
