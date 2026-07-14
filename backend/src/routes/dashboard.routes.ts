import { Router } from "express";

import { getDashboard } from "../controller/dashboard.controller";

const router = Router();

router.get("/", getDashboard);

export default router;
