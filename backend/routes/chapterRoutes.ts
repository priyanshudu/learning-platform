import { Router } from "express";

import {

    getAllChapters,
    getChapter

} from "../controllers/chapterController";

import {

    verifyToken

} from "../middleware/authMiddleware";

const router = Router();

// ==========================================
// Chapter Routes
// ==========================================

// Get All Chapters

router.get(

    "/",

    verifyToken,

    getAllChapters

);

// Get Single Chapter

router.get(

    "/:id",

    verifyToken,

    getChapter

);

// ==========================================
// Export
// ==========================================

export default router;