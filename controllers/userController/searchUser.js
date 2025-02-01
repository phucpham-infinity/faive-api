import catchAsync from "../../utils/catchAsync.js";
import {MEISE_INDEX, meiseClient} from "../../utils/meilisearch.js";

export default catchAsync(async (req, res, next) => {
    const key = req.params.key;
    const page = req.queries?.page ?? 1;
    const hitsPerPage = req.queries?.per_page ?? 10;

    const resSearch = await meiseClient.index(MEISE_INDEX.USER).search(key, {
        page,
        hitsPerPage,
    }, {})
    return res.status(200).json({
        status: 'success',
        data: resSearch?.hits ?? [],
        meta: {
            page,
            perPage: hitsPerPage,
            totalPages: resSearch?.totalPages ?? 0,
            totalItems: resSearch?.totalHits ?? 0,
        }
    });
})