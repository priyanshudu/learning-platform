import db from "../config/db";

// ==========================================
// Get Chapter
// ==========================================

export const getChapterById = async (

    chapterId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT

            chapter_id,
            chapter_number,
            chapter_name

        FROM chapters

        WHERE chapter_id = ?
        `,

        [

            chapterId

        ]

    );

    if (rows.length === 0) {

        return null;

    }

    return rows[0];

};

// ==========================================
// Get Sub Chapters With Student Progress
// ==========================================

export const getSubChaptersByChapter = async (

    studentId: number,

    chapterId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT

            s.subchapter_id,
            s.chapter_id,
            s.subchapter_number,
            s.subchapter_name,
            s.estimated_time,

            COALESCE(p.lesson_completed, FALSE) AS lesson_completed,
            COALESCE(p.quiz_completed, FALSE) AS quiz_completed,
            COALESCE(p.score, 0) AS score,
            COALESCE(p.unlocked, FALSE) AS unlocked

        FROM subchapters s

        LEFT JOIN student_progress p

            ON s.subchapter_id = p.subchapter_id

            AND p.student_id = ?

        WHERE s.chapter_id = ?

        ORDER BY

            s.subchapter_number ASC

        `,

        [

            studentId,

            chapterId

        ]

    );

    return rows;

};

// ==========================================
// Get Single Sub Chapter
// ==========================================

export const getSubChapterById = async (

    subchapterId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT

            s.subchapter_id,
            s.chapter_id,
            c.chapter_name,
            s.subchapter_number,
            s.subchapter_name,
            s.content,
            s.video_path,
            s.audio_path,
            s.pdf_path,
            s.estimated_time,
            s.is_active

        FROM subchapters s

        INNER JOIN chapters c

            ON s.chapter_id = c.chapter_id

        WHERE s.subchapter_id = ?

        `,

        [

            subchapterId

        ]

    );

    if (rows.length === 0) {

        return null;

    }

    return rows[0];

};