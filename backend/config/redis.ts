import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,

    maxRetriesPerRequest: 3
});

redis.on("connect", () => {

    console.log("✅ Redis Connected");

});

redis.on("ready", () => {

    console.log("✅ Redis Ready");

});

redis.on("error", (error) => {

    console.error("❌ Redis Error:", error.message);

});

redis.on("close", () => {

    console.log("⚠️ Redis Connection Closed");

});

export default redis;