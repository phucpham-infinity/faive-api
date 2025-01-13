import {body} from "express-validator";
import validateRequest from "../../middlewares/validateRequest.js";
import catchAsync from "../../utils/catchAsync.js";
import Product from "../../models/product.js";
import AppError from "../../utils/apiError.js";

const validateRequestBody = [
    body('products').isArray({min: 1}).notEmpty().withMessage('Please provide a product list'),
]

export default [
    validateRequestBody,
    validateRequest,
    catchAsync(async (req, res, next) => {
        const {products} = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return next(
                new AppError('Something went wrong! Please provide a valid array of products.', 500)
            )
        }

        const updatePromises = products.map((product) =>
            Product.updateOne(
                {_id: product.id},
                {$set: {pinnedAt: product.pinnedAt || new Date()}}
            )
        );

        const results = await Promise.all(updatePromises);
        const updatedCount = results.reduce((count, result) => count + result.modifiedCount, 0);

        res.status(200).json({
            success: true,
            message: `${updatedCount} product(s) pinned successfully.`,
        });
    }),
]