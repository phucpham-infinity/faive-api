import {MEISE_INDEX, meiseClient} from "../../utils/meilisearch.js";

export const meiseAddUserJob = async (data) => {
    try {
        return await meiseClient.index(MEISE_INDEX.USER).addDocuments(data);
    } catch (err) {
        throw err;
    }
}

export const meiseUpdateUserJob = async (data) => {
    try {
        return await meiseClient.index(MEISE_INDEX.USER).updateDocuments(data);
    } catch (err) {
        throw err;
    }
}