import db from "../config/db";

// ==========================================
// Get Lessons By Chapter
// ==========================================

export const getLessonsByChapter = async (

    chapterId: number

) => {

    const [rows]: any = await db.execute(

        `
        SELECT

            l.lesson_id,

            l.chapter_id,

            l.subchapter_id,

            s.subchapter_number,

            s.subchapter_name,

            l.lesson_title,

            l.lesson_description

        FROM lessons l

        INNER JOIN subchapters s

            ON l.subchapter_id = s.subchapter_id

        WHERE l.chapter_id = ?

        ORDER BY s.subchapter_number ASC
        `,

        [chapterId]

    );

    return rows;

};

// ==========================================
// Get Lesson By ID
// ==========================================

export const getLessonById = async (

    lessonId: number

) => {

    const [rows]: any = await db.execute(

        `
        SELECT

            l.lesson_id,

            l.chapter_id,

            l.subchapter_id,

            c.chapter_name,

            s.subchapter_name,

            s.subchapter_number,

            l.lesson_title,

            l.lesson_description,

            l.video_path

        FROM lessons l

        INNER JOIN chapters c

            ON l.chapter_id = c.chapter_id

        INNER JOIN subchapters s

            ON l.subchapter_id = s.subchapter_id

        WHERE l.lesson_id = ?

        LIMIT 1
        `,

        [lessonId]

    );

    return rows[0];

};