import { Router } from "express";

import {

    getStudentProgress,
    updateStudentProgress

} from "../controllers/progressController";

import {

    verifyToken

} from "../middleware/authMiddleware";

const router = Router();

// ==========================================
// Get Student Progress
// ==========================================

router.get(

    "/",

    verifyToken,

    getStudentProgress

);

// ==========================================
// Update Student Progress
// ==========================================

router.put(

    "/",

    verifyToken,

    updateStudentProgress

);

// ==========================================
// Export
// ==========================================

export default router;