import {MeiliSearch} from 'meilisearch'
import config from "../config.js";

export const meiseClient = new MeiliSearch({
    host: config.meise.host,
    apiKey: config.meise.apiKey,
})

export const MEISE_INDEX = {
    USER: 'user'
}