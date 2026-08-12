import db from "../config/db";

// ==========================================
// Get All Chapters
// ==========================================

export const getAllChapters = async () => {

    const [rows]: any = await db.execute(

        `
        SELECT

            chapter_id,
            chapter_code,
            chapter_name,
            description,
            total_lessons

        FROM chapters

        ORDER BY chapter_id ASC
        `

    );

    return rows;

};

// ==========================================
// Get Chapter By ID
// ==========================================

export const getChapterById = async (

    chapterId: number

) => {

    const [rows]: any = await db.execute(

        `
        SELECT

            chapter_id,
            chapter_code,
            chapter_name,
            description,
            total_lessons

        FROM chapters

        WHERE chapter_id = ?

        LIMIT 1
        `,

        [chapterId]

    );

    return rows[0];

};