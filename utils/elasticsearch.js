import {Client} from '@elastic/elasticsearch';

import config from "../config.js";

export const elasticsearchClient = new Client({
    node: `http://${config.elasticsearch.host}:${config.elasticsearch.port}`
});

