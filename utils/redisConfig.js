import config from "../config.js";

export const redisConfig = {
    host: config.redis.host,
    port: Number(config.redis.port),
    username: config.redis.username,
    password: config.redis.password,
}