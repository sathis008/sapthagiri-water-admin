import { Router } from "express";

import { getDashboard } from "../controller/dashboard.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Dashboard is accessible to all authenticated users.
// Role-based content filtering happens on the frontend.
router.get("/", authenticate, getDashboard);

export default router;
