import { Router } from "express";

import { profile } from "../controllers/studentController";

import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// ==========================================
// Student Routes
// ==========================================

// Student Profile

router.get(

    "/profile",

    verifyToken,

    profile

);

// ==========================================
// Export
// ==========================================

export default router;