import { Router } from "express";

import {

    getLessons,
    getLesson

} from "../controllers/lessonController";

import {

    verifyToken

} from "../middleware/authMiddleware";

const router = Router();

// ==========================================
// Lesson Routes
// ==========================================

// Get All Lessons of a Chapter

router.get(

    "/chapter/:chapterId",

    verifyToken,

    getLessons

);

// Get Single Lesson

router.get(

    "/:lessonId",

    verifyToken,

    getLesson

);

// ==========================================
// Export
// ==========================================

export default router;