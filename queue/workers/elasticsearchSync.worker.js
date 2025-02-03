import {Worker} from "bullmq";
import {
    elasticsearchAddUserJob,
    elasticsearchProfileUpdateUserJob,
    elasticsearchUpdateUserJob
} from '../jobs/elasticsearchSyncUser.job.js'
import {
    elasticsearchAddProductJob,
    elasticsearchUpdateProductJob,
} from '../jobs/elasticsearchSyncProduct.job.js'
import {ELASTICSEACRH_SYNC_JOBS, ELASTICSEACRH_SYNC_QUEUE} from "../constans.js";
import {redisConfig} from "../../utils/redisConfig.js";

export const setupElasticsearchSyncWorker = () => {
    new Worker(
        ELASTICSEACRH_SYNC_QUEUE,
        async (job) => {
            switch (job.name) {
                case ELASTICSEACRH_SYNC_JOBS.ADD_INDEX_USER:
                    return await elasticsearchAddUserJob(job.data)
                case ELASTICSEACRH_SYNC_JOBS.ADD_INDEX_PRODUCT:
                    return await elasticsearchAddProductJob(job.data)
                case ELASTICSEACRH_SYNC_JOBS.UPDATE_INDEX_PRODUCT:
                    return await elasticsearchUpdateProductJob(job.data)
                case ELASTICSEACRH_SYNC_JOBS.UPDATE_INDEX_USER:
                    return await elasticsearchUpdateUserJob(job.data)
                case ELASTICSEACRH_SYNC_JOBS.UPDATE_PROFILE_USER:
                    return await elasticsearchProfileUpdateUserJob(job.data)
                default:
                    break;
            }
        },
        {connection: redisConfig}
    );
};
