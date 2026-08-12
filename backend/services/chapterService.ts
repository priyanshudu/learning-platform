
import {
    getAllChapters,
    getChapterById
} from "../models/chapterModel";

import {
    getCache,
    setCache,
    deleteCache
} from "./redisService";


// ==========================================
// Get All Chapters
// ==========================================

export const fetchAllChapters = async () => {

    const cacheKey = "chapters:all";

    // ------------------------------------------
    // 1. Check Redis
    // ------------------------------------------

    const cachedChapters =
        await getCache<any[]>(cacheKey);

    if (cachedChapters) {

        console.log(
            "⚡ Redis HIT: chapters:all"
        );

        return {

            success: true,

            chapters: cachedChapters

        };

    }


    // ------------------------------------------
    // 2. Redis MISS → Get from MySQL
    // ------------------------------------------

    console.log(
        "🐌 Redis MISS: chapters:all"
    );

    const chapters =
        await getAllChapters();


    // ------------------------------------------
    // 3. Save MySQL result in Redis
    // ------------------------------------------

    await setCache(

        cacheKey,

        chapters,

        600

    );

    console.log(
        "💾 Chapters saved in Redis"
    );


    // ------------------------------------------
    // 4. Return data
    // ------------------------------------------

    return {

        success: true,

        chapters

    };

};


// ==========================================
// Get Chapter By ID
// ==========================================

export const fetchChapterById = async (

    chapterId: number

) => {

    const cacheKey =
        `chapter:${chapterId}`;


    // ------------------------------------------
    // 1. Check Redis
    // ------------------------------------------

    const cachedChapter =
        await getCache<any>(cacheKey);


    if (cachedChapter) {

        console.log(
            `⚡ Redis HIT: ${cacheKey}`
        );

        return {

            success: true,

            chapter: cachedChapter

        };

    }


    // ------------------------------------------
    // 2. Redis MISS → Get from MySQL
    // ------------------------------------------

    console.log(
        `🐌 Redis MISS: ${cacheKey}`
    );

    const chapter =
        await getChapterById(

            chapterId

        );


    // ------------------------------------------
    // 3. Chapter doesn't exist
    // ------------------------------------------

    if (!chapter) {

        return {

            success: false,

            message: "Chapter not found"

        };

    }


    // ------------------------------------------
    // 4. Save chapter in Redis
    // ------------------------------------------

    await setCache(

        cacheKey,

        chapter,

        600

    );

    console.log(
        `💾 ${cacheKey} saved in Redis`
    );


    // ------------------------------------------
    // 5. Return data
    // ------------------------------------------

    return {

        success: true,

        chapter

    };

};

export const deleteChapterCache = async () => {

    await deleteCache("chapters:all");

};