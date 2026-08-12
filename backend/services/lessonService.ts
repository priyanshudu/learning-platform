import {

    getLessonsByChapter,
    getLessonById

} from "../models/lessonModel";

// ==========================================
// Fetch Lessons By Chapter
// ==========================================

export const fetchLessonsByChapter = async (

    chapterId: number

) => {

    const lessons = await getLessonsByChapter(

        chapterId

    );

    return {

        success: true,

        lessons

    };

};

// ==========================================
// Fetch Single Lesson
// ==========================================

export const fetchLesson = async (

    lessonId: number

) => {

    const lesson = await getLessonById(

        lessonId

    );

    if (!lesson) {

        return {

            success: false,

            message: "Lesson not found"

        };

    }

    return {

        success: true,

        lesson

    };

};