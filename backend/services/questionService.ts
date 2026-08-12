import {

    getQuestionsBySubchapter,
    getCorrectAnswers

} from "../models/questionModel";

import {

    getSubChapterById

} from "../models/subChapterModel";

import {

    completeSubChapter,
    unlockSubChapter,
    getNextSubChapter

} from "../models/progressModel";

// ==========================================
// Get Questions By Subchapter
// ==========================================

export const fetchQuestions = async (

    subchapterId: number

) => {

    // ==========================================
    // Check Subchapter
    // ==========================================

    const subchapter = await getSubChapterById(

        subchapterId

    );

    if (!subchapter) {

        return {

            success: false,

            message: "Sub Chapter not found"

        };

    }

    // ==========================================
    // Get Questions
    // ==========================================

    const questions = await getQuestionsBySubchapter(

        subchapterId

    );

    if (questions.length === 0) {

        return {

            success: false,

            message: "No Questions Found"

        };

    }

    // ==========================================
    // Return Response
    // ==========================================

    return {

        success: true,
    chapter_id: subchapter.chapter_id,
    chapter_name: subchapter.chapter_name,
    subchapter_name: subchapter.subchapter_name,
    questions

    };

};

// ==========================================
// Submit Quiz
// ==========================================

export const submitQuiz = async (

    studentId: number,

    subchapterId: number,

    answers: {

        question_id: number;

        selected_option: string;

    }[]

) => {

    // ==========================================
    // Prepare Question IDs
    // ==========================================

    const questionIds = answers.map(

        answer => answer.question_id

    );

    // ==========================================
    // Get Correct Answers
    // ==========================================

    const correctAnswers = await getCorrectAnswers(

        questionIds

    );

    // ==========================================
    // Calculate Score
    // ==========================================

    let correct = 0;

    for (const answer of answers) {

        const dbAnswer = correctAnswers.find(

            (item: any) =>

                item.question_id === answer.question_id

        );

        if (

            dbAnswer &&

            dbAnswer.correct_option === answer.selected_option

        ) {

            correct++;

        }

    }

    // ==========================================
    // Calculate Result
    // ==========================================

    const total = answers.length;

    const wrong = total - correct;

    const score = Math.round(

        (correct * 100) / total

    );

    const passed = score >= 60;

    // ==========================================
    // Passed
    // ==========================================

    if (passed) {

    await completeSubChapter(

        studentId,

        subchapterId

    );

    const nextSubchapter = await getNextSubChapter(

        subchapterId

    );

    if (nextSubchapter) {

        await unlockSubChapter(

            studentId,

            nextSubchapter.subchapter_id

        );

    }

}

    // ==========================================
    // Return Result
    // ==========================================

    return {

        success: true,

        total,

        correct,

        wrong,

        score,

        passed,

        message: passed

            ? "Quiz Passed"

            : "Quiz Failed"

    };

};