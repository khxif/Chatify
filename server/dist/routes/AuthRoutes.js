"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthControllers_1 = require("../controllers/AuthControllers");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("hi");
});
router.post("/signup", AuthControllers_1.signup);
router.post("/login", AuthControllers_1.login);
router.get("/logout", AuthControllers_1.logout);
exports.default = router;
