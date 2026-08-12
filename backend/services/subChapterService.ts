import {

    getChapterById,
    getSubChaptersByChapter,
    getSubChapterById

} from "../models/subChapterModel";

// ==========================================
// Get Sub Chapters By Chapter
// ==========================================

export const fetchSubChapters = async (

    chapterId: number,

    studentId: number

) => {

    // ==========================================
    // Check Chapter
    // ==========================================

    const chapter = await getChapterById(

        chapterId

    );

    if (!chapter) {

        return {

            success: false,

            message: "Chapter not found"

        };

    }

    // ==========================================
    // Get Sub Chapters + Progress
    // ==========================================

    const subchapters = await getSubChaptersByChapter(

        studentId,

        chapterId

    );

    // ==========================================
    // Return
    // ==========================================

    return {

        success: true,

        chapter,

        subchapters

    };

};

// ==========================================
// Get Single Sub Chapter
// ==========================================

export const fetchSubChapter = async (

    subchapterId: number

) => {

    const subChapter = await getSubChapterById(

        subchapterId

    );

    if (!subChapter) {

        return {

            success: false,

            message: "Sub Chapter not found"

        };

    }

    return {

        success: true,

        subChapter

    };

};