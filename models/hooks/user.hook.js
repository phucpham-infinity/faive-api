import {meiseSyncMq} from "../../queue/index.js";
import {ELASTICSEACRH_SYNC_JOBS} from "../../queue/constans.js";

export const userModelHook = (userSchema) => {
    userSchema.post('save', function (doc, next) {
        meiseSyncMq.add(ELASTICSEACRH_SYNC_JOBS.ADD_INDEX_USER, doc);
        next();
    });

    userSchema.post('findOneAndUpdate', function (doc, next) {
        if (doc) {
            meiseSyncMq.add(ELASTICSEACRH_SYNC_JOBS.UPDATE_INDEX_USER, doc);
        }
        next();
    });

}