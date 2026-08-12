import { Router } from "express";

import {
    getSubChapters,
    getSubChapter
} from "../controllers/subChapterController";

import {
    verifyToken
} from "../middleware/authMiddleware";

const router = Router();

// ==========================================
// Get Sub Chapters
// ==========================================

router.get(
    "/chapter/:chapterId",
    verifyToken,
    getSubChapters
);

// ==========================================
// Get Single Sub Chapter
// ==========================================

router.get(
    "/:id",
    verifyToken,
    getSubChapter
);

export default router;