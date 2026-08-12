
import redis from "../config/redis";


// ==========================================
// Set Cache
// ==========================================

export const setCache = async (
    key: string,
    value: any,
    ttl: number
) => {

    const data = JSON.stringify(value);

    await redis.set(
        key,
        data,
        "EX",
        ttl
    );

};


// ==========================================
// Get Cache
// ==========================================

export const getCache = async <T>(
    key: string
): Promise<T | null> => {

    const data = await redis.get(key);

    if (!data) {

        return null;

    }

    return JSON.parse(data) as T;

};


// ==========================================
// Delete Cache
// ==========================================

export const deleteCache = async (
    key: string
) => {

    await redis.del(key);

};

