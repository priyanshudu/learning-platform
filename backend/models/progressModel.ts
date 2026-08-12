import db from "../config/db";

// ==========================================
// Get All Subchapters
// ==========================================

export const getAllSubChapters = async () => {

    const [rows]: any = await db.query(

        `
        SELECT
            chapter_id,
            subchapter_id,
            subchapter_number
        FROM subchapters
        ORDER BY
            chapter_id ASC,
            subchapter_number ASC
        `

    );

    return rows;
};

// ==========================================
// Insert Student Progress
// ==========================================

export const insertStudentProgress = async (
    studentId: number,
    chapterId: number,
    subchapterId: number,
    unlocked: boolean
) => {

    await db.query(
        `
        INSERT IGNORE INTO student_progress
        (
            student_id,
            chapter_id,
            subchapter_id,
            unlocked
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            studentId,
            chapterId,
            subchapterId,
            unlocked
        ]
    );

};

// ==========================================
// Get Student Progress
// ==========================================

export const getStudentProgress = async (

    studentId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT
           
    progress_id,
    student_id,
    chapter_id,
    subchapter_id,
    lesson_completed,
    quiz_completed,
    score,
    unlocked,
    completed_at
        FROM student_progress
        WHERE student_id = ?
        ORDER BY
            chapter_id ASC,
            subchapter_id ASC
        `,

        [

            studentId

        ]

    );

    return rows;

};

// ==========================================
// Get Single Progress
// ==========================================

export const getProgressBySubChapter = async (

    studentId: number,
    subchapterId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT *
        FROM student_progress
        WHERE student_id = ?
        AND subchapter_id = ?
        `,

        [

            studentId,
            subchapterId

        ]

    );

    if (rows.length === 0) {

        return null;

    }

    return rows[0];

};

// ==========================================
// Complete Subchapter
// ==========================================

export const completeSubChapter = async (

    studentId: number,
    subchapterId: number

) => {

    await db.query(

        `
        UPDATE student_progress
SET
    lesson_completed = TRUE,
    completed_at = NOW()
WHERE student_id = ?
AND subchapter_id = ?
        `,

        [

            studentId,
            subchapterId

        ]

    );

};

// ==========================================
// Unlock Next Subchapter
// ==========================================

export const unlockSubChapter = async (
    studentId: number,
    subchapterId: number
) => {

    await db.query(
        `
        UPDATE student_progress
        SET unlocked = TRUE
        WHERE student_id = ?
        AND subchapter_id = ?
        `,
        [
            studentId,
            subchapterId
        ]
    );

};
// ==========================================
// Get Next Subchapter
// ==========================================

export const getNextSubChapter = async (
    subchapterId: number
) => {

    const [rows]: any = await db.query(

        `
        SELECT
            chapter_id,
            subchapter_number
        FROM subchapters
        WHERE subchapter_id = ?
        `,

        [subchapterId]

    );

    if (rows.length === 0) {

        return null;

    }

    const chapterId = rows[0].chapter_id;

    const currentNumber = rows[0].subchapter_number;

    const [next]: any = await db.query(

        `
        SELECT
            subchapter_id
        FROM subchapters
        WHERE chapter_id = ?
        AND subchapter_number = ?
        LIMIT 1
        `,

        [

            chapterId,

            currentNumber + 1

        ]

    );

    if (next.length === 0) {

        return null;

    }

    return next[0];

};
// ==========================================
// Check Unlock Status
// ==========================================

export const isSubChapterUnlocked = async (

    studentId: number,
    subchapterId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT unlocked
        FROM student_progress
        WHERE student_id = ?
        AND subchapter_id = ?
        `,

        [

            studentId,
            subchapterId

        ]

    );

    if (rows.length === 0) {

        return false;

    }

    return rows[0].unlocked;

};