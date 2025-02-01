import config from '../config.js'
import {Queue} from "bullmq";
import {MEISE_SYNC_QUEUE} from "./constans.js";
import {redisConfig} from "../utils/redisConfig.js";

export const createQueueMQ = (name) => new Queue(name, {
    connection: redisConfig
});

export const meiseSyncMq = createQueueMQ(MEISE_SYNC_QUEUE);
