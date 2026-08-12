import "dotenv/config";
import redis from "./config/redis";

const testRedis = async () => {

    const keys = await redis.keys("*");

    console.log("Redis Keys:");

    console.log(keys);

    for (const key of keys) {

        const value = await redis.get(key);

        console.log("\nKEY:", key);

        console.log("VALUE:", value);

        const ttl = await redis.ttl(key);

        console.log("TTL:", ttl);
    }

    await redis.quit();
};

testRedis();