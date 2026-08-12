import { Request, Response } from "express";

import {

    getStudentProgressService,
    updateStudentProgressService

} from "../services/progressService";

import { AuthRequest } from "../middleware/authMiddleware";

// ==========================================
// Get Student Progress
// ==========================================

export const getStudentProgress = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        const studentId = req.student?.student_id;

        if (!studentId) {

            res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

            return;

        }

        const result = await getStudentProgressService(

            studentId

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

// ==========================================
// Update Student Progress
// ==========================================

export const updateStudentProgress = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        const studentId = req.student?.student_id;

        if (!studentId) {

            res.status(401).json({

                success: false,

                message: "Unauthorized"

            });

            return;

        }

        const {

            currentSubChapterId

        } = req.body;

        if (

            !currentSubChapterId

        ) {

            res.status(400).json({

                success: false,

                message: "Current Sub Chapter is required"

            });

            return;

        }

    const result = await updateStudentProgressService(

    studentId,

    Number(currentSubChapterId)

);

        if (!result.success) {

            res.status(404).json(result);

            return;

        }

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