import { Router } from "express";

import {

    getQuestions,
    submitQuizController

} from "../controllers/questionController";

import {

    verifyToken

} from "../middleware/authMiddleware";

const router = Router();

// ==========================================
// Questions
// ==========================================

router.get(

    "/:subchapterId",

    verifyToken,

    getQuestions

);

// ==========================================
// Submit Quiz
// ==========================================

router.post(

    "/submit",

    verifyToken,

    submitQuizController

);

export default router;