import db from "../config/db";

// ==========================================
// Get Questions By Subchapter
// ==========================================

export const getQuestionsBySubchapter = async (

    subchapterId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT
            question_id,
            question_text,
            option_a,
            option_b,
            option_c,
            option_d
        FROM questions
        WHERE subchapter_id = ?
        ORDER BY question_id ASC
        `,

        [

            subchapterId

        ]

    );

    return rows;

};

// ==========================================
// Get Correct Answers
// ==========================================

export const getCorrectAnswers = async (

    questionIds: number[]

) => {

    const [rows]: any = await db.query(

        `
        SELECT
            question_id,
            correct_option
        FROM questions
        WHERE question_id IN (?)
        `,

        [

            questionIds

        ]

    );

    return rows;

};

// ==========================================
// Get Subchapter From Question
// ==========================================

export const getSubchapterByQuestion = async (

    questionId: number

) => {

    const [rows]: any = await db.query(

        `
        SELECT
            subchapter_id
        FROM questions
        WHERE question_id = ?
        LIMIT 1
        `,

        [

            questionId

        ]

    );

    return rows[0];

};