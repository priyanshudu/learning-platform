import { Response } from "express";

import { AuthRequest } from "../middleware/authMiddleware"

import { getStudentProfile } from "../services/studentService";

// ==========================================
// Student Profile
// ==========================================

export const profile = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        // ==========================================
        // Get Student ID
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
        // Get Student Profile
        // ==========================================

        const result = await getStudentProfile(

            studentId

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