import { Response } from "express";

import {

    fetchSubChapters,
    fetchSubChapter

} from "../services/subChapterService";

import {

    AuthRequest

} from "../middleware/authMiddleware";

// ==========================================
// Get Sub Chapters
// ==========================================

export const getSubChapters = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        // ==========================================
        // Get Chapter ID
        // ==========================================

        const chapterId = Number(

            req.params.chapterId

        );

        if (

            isNaN(chapterId)

        ) {

            res.status(400).json({

                success: false,

                message: "Invalid chapter"

            });

            return;

        }

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
        // Fetch Sub Chapters
        // ==========================================

        const result = await fetchSubChapters(

            chapterId,
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

// ==========================================
// Get Single Sub Chapter
// ==========================================

export const getSubChapter = async (

    req: AuthRequest,

    res: Response

): Promise<void> => {

    try {

        const subchapterId = Number(

            req.params.id

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

        const result = await fetchSubChapter(

            subchapterId

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