
import {
    getAllSubChapters,
    insertStudentProgress,
    getStudentProgress,
    getProgressBySubChapter,
    completeSubChapter,
    unlockSubChapter,
    getNextSubChapter
} from "../models/progressModel";

import {
    getCache,
    setCache,
    deleteCache
} from "./redisService";


// ==========================================
// Initialize Student Progress
// ==========================================

export const initializeStudentProgress = async (
    studentId: number
) => {

    console.log(
        "Initializing Progress for:",
        studentId
    );

    const subchapters =
        await getAllSubChapters();

    console.log(
        "Total Subchapters:",
        subchapters.length
    );

    if (subchapters.length === 0) {

        console.log(
            "No subchapters found."
        );

        return;
    }

    for (const subchapter of subchapters) {

        // ==========================================
        // First Subchapter Of Every Chapter
        // ==========================================

        const unlocked =
            subchapter.subchapter_number === 1;

        console.log(
            "Inserting:",
            studentId,
            subchapter.chapter_id,
            subchapter.subchapter_id,
            "Unlocked:",
            unlocked
        );

        await insertStudentProgress(

            studentId,

            subchapter.chapter_id,

            subchapter.subchapter_id,

            unlocked

        );

    }

    console.log(
        "Progress Initialized Successfully"
    );

};


// ==========================================
// Get Student Progress
// ==========================================

export const getStudentProgressService = async (
    studentId: number
) => {

    // ==========================================
    // Redis Cache Key
    // ==========================================

    const cacheKey =
        `progress:student:${studentId}`;


    // ==========================================
    // Check Redis
    // ==========================================

    const cachedProgress =
        await getCache<any[]>(cacheKey);


    if (cachedProgress) {

        console.log(
            `⚡ Redis HIT: ${cacheKey}`
        );

        return {

            success: true,

            progress: cachedProgress

        };

    }


    // ==========================================
    // Redis MISS → MySQL
    // ==========================================

    console.log(
        `🐌 Redis MISS: ${cacheKey}`
    );

    const progress =
        await getStudentProgress(
            studentId
        );


    // ==========================================
    // Save Progress in Redis
    // ==========================================

    await setCache(

        cacheKey,

        progress,

        300

    );

    console.log(
        `💾 ${cacheKey} saved in Redis`
    );


    // ==========================================
    // Return Progress
    // ==========================================

    return {

        success: true,

        progress

    };

};


// ==========================================
// Complete Current Subchapter
// Unlock Next Subchapter
// ==========================================

export const updateStudentProgressService = async (
    studentId: number,
    currentSubChapterId: number
) => {

    // ==========================================
    // Get Current Progress
    // ==========================================

    const progress =
        await getProgressBySubChapter(

            studentId,

            currentSubChapterId

        );


    if (!progress) {

        return {

            success: false,

            message: "Progress not found"

        };

    }


    // ==========================================
    // Check Unlock Status
    // ==========================================

    if (!progress.unlocked) {

        return {

            success: false,

            message: "Subchapter is locked"

        };

    }


    // ==========================================
    // Complete Current Subchapter
    // ==========================================

    await completeSubChapter(

        studentId,

        currentSubChapterId

    );


    // ==========================================
    // Unlock Next Subchapter
    // ==========================================

    const nextSubChapter =
        await getNextSubChapter(

            currentSubChapterId

        );


    if (nextSubChapter) {

        await unlockSubChapter(

            studentId,

            nextSubChapter.subchapter_id

        );

    }


    // ==========================================
    // Invalidate Progress Cache
    // ==========================================

    await deleteCache(

        `progress:student:${studentId}`

    );

    console.log(
        '🗑️ Progress cache deleted for student ${studentId}'
    );


    // ==========================================
    // Return Response
    // ==========================================

    return {

        success: true,

        message: "Progress Updated"

    };

};

