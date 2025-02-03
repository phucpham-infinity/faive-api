import catchAsync from "../../utils/catchAsync.js";
import {elasticsearchClient} from "../../utils/elasticsearch.js";

export default catchAsync(async (req, res) => {
    const key = req.params.key;
    const page = Number(req.query?.page) ?? 1;
    const perPage = Number(req.query?.per_page) ?? 10;

    const from = (page - 1) * perPage;
    const body = await elasticsearchClient.search({
        index: 'user',
        body: {
            query: {
                query_string: {
                    query: `*${key}*`
                }
            },
            size: perPage,
            from,
            track_total_hits: true
        }
    })

    const totalItems = body.hits.total.value;
    const totalPages = Math.ceil(totalItems / perPage);

    return res.status(200).json({
        status: 'success',
        data: body.hits.hits.map(hit => hit._source) ?? [],
        meta: {
            page,
            perPage,
            totalPages,
            totalItems,
        }
    });
})