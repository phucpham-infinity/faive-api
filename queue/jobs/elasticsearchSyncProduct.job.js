import {elasticsearchClient} from "../../utils/elasticsearch.js";
import omit from "lodash/omit.js";

export const elasticsearchUpdateProductJob = async (data) => {
    try {
        return await elasticsearchClient.index({
            index: 'product',
            id: data?._id?.toString(),
            refresh: 'wait_for',
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}


export const elasticsearchAddProductJob = async (data) => {
    try {
        return await elasticsearchClient.update({
            index: 'product',
            id: data?._id?.toString(),
            body: {
                doc: {
                    ...omit(data, ['_id'])
                }
            },
            refresh: 'wait_for',
        });
    } catch (err) {
        throw err;
    }
}