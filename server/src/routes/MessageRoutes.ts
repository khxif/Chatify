import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/MessageControllers";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/send/:id", verifyToken, sendMessage);
router.get("/get/:id", verifyToken, getMessage);

export default router;
