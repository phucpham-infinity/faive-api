import { Worker } from "bullmq";
import {meiseAddUserJob, meiseUpdateUserJob} from '../jobs/meiseSyncUser.job.js'
import {MEISE_SYNC_JOBS, MEISE_SYNC_QUEUE} from "../constans.js";
import {redisConfig} from "../../utils/redisConfig.js";

export const setupMeiseSyncWorker = () => {
    new Worker(
        MEISE_SYNC_QUEUE,
        async (job) => {
            switch (job.name) {
                case MEISE_SYNC_JOBS.ADD_INDEX_USER:
                    await meiseAddUserJob(job.data)
                    break;

                case MEISE_SYNC_JOBS.UPDATE_INDEX_USER:
                    await meiseUpdateUserJob(job.data)
                    break;

                default:
                    break;
            }
        },
        { connection: redisConfig }
    );
};
