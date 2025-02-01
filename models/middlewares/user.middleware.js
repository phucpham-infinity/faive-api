import {meiseSyncMq} from "../../queue/index.js";
import {MEISE_SYNC_JOBS} from "../../queue/constans.js";

export const userModelMiddleware = (userSchema) => {
    userSchema.post('save', function (doc, next) {
        meiseSyncMq.add(MEISE_SYNC_JOBS.ADD_INDEX_USER, doc);
        next();
    });

    userSchema.post('findOneAndUpdate', function (doc, next) {
        if (doc) {
            meiseSyncMq.add(MEISE_SYNC_JOBS.UPDATE_INDEX_USER, doc);
            console.log('userModelMiddleware findOneAndUpdate sync')
        }
        next();
    });

}