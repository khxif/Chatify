import { Router } from "express";
import {
  searchUser,
  usersForSidebar,
  verifyUser,
} from "../controllers/UserControllers";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/users-for-sidebar", verifyToken, usersForSidebar);
router.get("/verify-user", verifyToken, verifyUser);
router.get("/search-user/:username", verifyToken, searchUser);

export default router;
