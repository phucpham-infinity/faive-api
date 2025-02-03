import {Queue} from "bullmq";
import {ELASTICSEACRH_SYNC_QUEUE} from "./constans.js";
import {redisConfig} from "../utils/redisConfig.js";

export const createQueueMQ = (name) => new Queue(name, {
    connection: redisConfig
});

export const meiseSyncMq = createQueueMQ(ELASTICSEACRH_SYNC_QUEUE);
