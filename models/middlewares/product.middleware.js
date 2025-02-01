import {meiseSyncMq} from "../../queue/index.js";
import {MEISE_SYNC_JOBS} from "../../queue/constans.js";

export const productModelMiddleware = (productSchema) => {
    productSchema.post('save', function (doc, next) {
        meiseSyncMq.add(MEISE_SYNC_JOBS.ADD_INDEX_PRODUCT, doc);
        next();
    });

    productSchema.post('findOneAndUpdate', function (doc, next) {
        if (doc) {
            meiseSyncMq.add(MEISE_SYNC_JOBS.UPDATE_INDEX_PRODUCT, doc);
        }
        next();
    });

}