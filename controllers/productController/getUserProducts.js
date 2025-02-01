import catchAsync from '../../utils/catchAsync.js';
import Product from '../../models/product.js';
import config from '../../config.js';
import mongoose from 'mongoose';

/**
 * Fetch all unique products of a user
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res) => {
    const user = req.query.user ?? req.user._id;
    const q = req.query.q ?? null;
    const site_id = req.query.site_id ?? null;
    const faivelist_id = req.query.faivelist_id ?? null;
    const exclude_faivelist_id = req.query.exclude_faivelist_id ?? null;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.per_page
        ? parseInt(req.query.per_page)
        : config.api.products_per_page;
    const skip = (page - 1) * limit;
    const sort = req.query.sort_by ?? config.api.sort_by;
    let sortQuery = {};

    // Create sort query based on query params if provided (By default newest first)
    switch (sort) {
        case 'name':
            sortQuery = {name: 1};
            break;
        case 'brand':
            sortQuery = {brand: 1};
            break;
        case 'price':
        case 'price_asc':
            sortQuery = {price: 1};
            break;
        case 'price_desc':
            sortQuery = {price: -1};
            break;
        case 'earliest':
            sortQuery =
                faivelist_id || exclude_faivelist_id
                    ? {'relations.createdAt': -1}
                    : {updatedAt: 1};
            break;
        default:
            sortQuery =
                faivelist_id || exclude_faivelist_id
                    ? {sortPinnedAt: 1, 'relations.createdAt': -1, name: 1}
                    : {sortPinnedAt: 1, updatedAt: -1, name: 1};
    }

    let pipeline = [
        {
            $lookup: {
                from: 'productsusers',
                localField: '_id',
                foreignField: 'product',
                as: 'relations',
            },
        },
        {
            $unwind: {
                path: '$relations',
                preserveNullAndEmptyArrays: true,
            },
        }, // Unwind to jobs each relation
        {$match: {user: new mongoose.Types.ObjectId(user)}},
        {
            $addFields: {
                sortPinnedAt: {$ifNull: ["$pinnedAt", new Date(3500, 12, 1)]},
            },
        }
    ];

    // Apply the site_id filter
    if (site_id) {
        const matchQuery =
            faivelist_id || exclude_faivelist_id
                ? {'relations.site': new mongoose.Types.ObjectId(site_id)}
                : {site: new mongoose.Types.ObjectId(site_id)};
        pipeline.push({
            $match: matchQuery,
        });
    }

    // Apply filters based on the presence of faivelist_id or exclude_faivelist_id
    if (faivelist_id) {
        pipeline.push({
            $match: {
                'relations.faivelist': new mongoose.Types.ObjectId(faivelist_id),
            },
        });
    } else if (exclude_faivelist_id) {
        pipeline.push(
            {
                $group: {
                    _id: '$_id',
                    doc: {$first: '$$ROOT'},
                    excluded: {
                        $max: {
                            $cond: [
                                {
                                    $eq: [
                                        '$relations.faivelist',
                                        new mongoose.Types.ObjectId(exclude_faivelist_id),
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $match: {
                    excluded: 0,
                },
            },
            {$replaceRoot: {newRoot: '$doc'}}
        );
    }

    // Search query filtering if provided
    if (q) {
        const regex = new RegExp(q, 'i');
        pipeline.push({
            $match: {
                $or: [{name: regex}, {brand: regex}],
            },
        });
    }

    // Sorting and pagination
    pipeline.push({$group: {_id: '$_id', document: {$first: '$$ROOT'}}}); // Ensure uniqueness of products
    pipeline.push({$replaceRoot: {newRoot: '$document'}}); // Flatten the documents
    pipeline.push({$sort: sortQuery});
    pipeline.push({$skip: skip}, {$limit: limit});
    pipeline.push({$unset: "sortPinnedAt"});

    // Execute the aggregation pipeline
    const products = await Product.aggregate(pipeline);

    // Calculate total products for proper paging, using an adapted pipeline for counting
    const countPipeline = pipeline.slice(0, -2); // Remove skip and limit stages
    countPipeline.push({$count: 'total'});
    const totalResult = await Product.aggregate(countPipeline);
    const totalProducts = totalResult.length > 0 ? totalResult[0].total : 0;

    // Response to client
    res.status(200).json({
        status: 'success',
        pages: {
            total: Math.ceil(totalProducts / limit),
            current: page,
        },
        products,
    });
});
