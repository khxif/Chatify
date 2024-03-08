import { Router } from "express";
import { login, logout, signup } from "../controllers/AuthControllers";

const router = Router();

router.get("/", (req, res) => {
  res.send("hi");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;
