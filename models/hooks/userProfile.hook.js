import {meiseSyncMq} from "../../queue/index.js";
import {ELASTICSEACRH_SYNC_JOBS} from "../../queue/constans.js";

export const userProfileModelHook = (userProfileSchema) => {
    userProfileSchema.post('save', function (doc, next) {
        meiseSyncMq.add(ELASTICSEACRH_SYNC_JOBS.UPDATE_PROFILE_USER, doc);
        next();
    });

    userProfileSchema.post('findOneAndUpdate', function (doc, next) {
        if (doc) {
            meiseSyncMq.add(ELASTICSEACRH_SYNC_JOBS.UPDATE_PROFILE_USER, doc);
        }
        next();
    });

}