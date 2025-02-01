import {meiseSyncMq} from "../../queue/index.js";
import {MEISE_SYNC_JOBS} from "../../queue/constans.js";
import {generateNgrams} from "../../utils/generateNgrams.js";

export const userModelHook = (userSchema) => {
    userSchema.post('save', function (doc, next) {
        meiseSyncMq.add(MEISE_SYNC_JOBS.ADD_INDEX_USER, {
            _id: doc._id,
            first_name: doc.first_name,
            last_name: doc.last_name,
            email: doc.email,
            'ngrams': generateNgrams([doc.first_name, doc.last_name, doc.email], 3, 5)
        });
        next();
    });

    userSchema.post('findOneAndUpdate', function (doc, next) {
        if (doc) {
            meiseSyncMq.add(MEISE_SYNC_JOBS.UPDATE_INDEX_USER, {
                _id: doc._id,
                first_name: doc.first_name,
                last_name: doc.last_name,
                email: doc.email,
                'ngrams': generateNgrams([doc.first_name, doc.last_name, doc.email], 3, 5)
            });
        }
        next();
    });

}