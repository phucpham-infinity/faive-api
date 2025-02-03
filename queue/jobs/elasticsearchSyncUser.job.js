import {elasticsearchClient} from "../../utils/elasticsearch.js";
import omit from "lodash/omit.js";

export const elasticsearchAddUserJob = async (data) => {
    try {
        return await elasticsearchClient.index({
            index: 'user',
            id: data?._id?.toString(),
            body: omit(data, ['_id', 'password']),
            refresh: 'wait_for',
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const elasticsearchUpdateUserJob = async (data) => {
    try {
        return await elasticsearchClient.update({
            index: 'user',
            id: data?._id?.toString(),
            body: {
                doc: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    productCount: data.productCount,
                    hasEverAddedProduct: data.hasEverAddedProduct,
                }
            },
            refresh: 'wait_for',
        });
    } catch (err) {
        throw err;
    }
}

export const elasticsearchProfileUpdateUserJob = async (data) => {
    try {
        return await elasticsearchClient.update({
            index: 'user',
            id: data?.user?.toString(),
            body: {
                doc: {
                    profile: data,
                }
            }
        });
    } catch (err) {
        throw err;
    }
}