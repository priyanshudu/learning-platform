import { Request, Response } from "express";

import {

    fetchAllChapters,
    fetchChapterById

} from "../services/chapterService";

// ==========================================
// Get All Chapters
// ==========================================

export const getAllChapters = async (

    req: Request,

    res: Response

): Promise<void> => {

    try {

        const result = await fetchAllChapters();

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
// Get Chapter By ID
// ==========================================

export const getChapter = async (

    req: Request,

    res: Response

): Promise<void> => {

    try {

        const chapterId = Number(req.params.id);

        if (isNaN(chapterId)) {

            res.status(400).json({

                success: false,

                message: "Invalid Chapter ID"

            });

            return;

        }

        const result = await fetchChapterById(

            chapterId

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