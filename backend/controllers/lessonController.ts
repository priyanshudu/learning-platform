import { Request, Response } from "express";

import {

    fetchLessonsByChapter,
    fetchLesson

} from "../services/lessonService";

// ==========================================
// Get Lessons By Chapter
// ==========================================

export const getLessons = async (

    req: Request,

    res: Response

): Promise<void> => {

    try {

        const chapterId = Number(

            req.params.chapterId

        );

        const result = await fetchLessonsByChapter(

            chapterId

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
// Get Single Lesson
// ==========================================

export const getLesson = async (

    req: Request,

    res: Response

): Promise<void> => {

    try {

        const lessonId = Number(

            req.params.lessonId

        );

        const result = await fetchLesson(

            lessonId

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