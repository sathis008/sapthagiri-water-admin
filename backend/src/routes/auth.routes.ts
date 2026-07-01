import {Router} from "express";
import {login, register,profile} from "../controller/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", authenticate, profile);
export default router;