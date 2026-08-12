import { Response } from "express";

import { AuthRequest } from "../middleware/authMiddleware";

import {

    fetchQuestions,
    submitQuiz

} from "../services/questionService";

// ==========================================
// Get Questions By Subchapter
// ==========================================

export const getQuestions = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        // ==========================================
        // Get Subchapter ID
        // ==========================================

        const subchapterId = Number(

            req.params.subchapterId

        );

        if (

            isNaN(subchapterId)

        ) {

            res.status(400).json({

                success: false,

                message: "Invalid Sub Chapter"

            });

            return;

        }

        // ==========================================
        // Fetch Questions
        // ==========================================

        const result = await fetchQuestions(

            subchapterId

        );

        if (!result.success) {

            res.status(404).json(result);

            return;

        }

        // ==========================================
        // Success
        // ==========================================

        res.status(200).json(result);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

// ==========================================
// Submit Quiz
// ==========================================

export const submitQuizController = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        // ==========================================
        // Student
        // ==========================================

        const studentId = req.student?.student_id;

        if (!studentId) {

            res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

            return;

        }

        // ==========================================
        // Body
        // ==========================================

        const {

            subchapter_id,
            answers

        } = req.body;

        if (

            !subchapter_id ||

            !answers ||

            !Array.isArray(answers)

        ) {

            res.status(400).json({

                success: false,

                message: "Invalid Request"

            });

            return;

        }

        // ==========================================
        // Submit Quiz
        // ==========================================

        const result = await submitQuiz(

            studentId,

            Number(subchapter_id),

            answers

        );

        res.status(200).json(result);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};