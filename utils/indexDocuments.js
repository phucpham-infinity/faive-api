import omit from "lodash/omit.js";
import {elasticsearchClient} from "./elasticsearch.js";

export const bulkIndexUsers = async (users) => {
    try {
        const bulkData = users.flatMap(user => [
            {index: {_index: 'user', _id: user._id?.toString()}},
            omit(user?._doc ?? user, ['_id'])
        ]);
        return await elasticsearchClient.bulk({refresh: true, body: bulkData});
    } catch (error) {
        console.error('❌ Error in bulk indexing:', error);
    }
};
