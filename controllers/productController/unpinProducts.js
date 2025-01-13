import {body} from "express-validator";
import validateRequest from "../../middlewares/validateRequest.js";
import catchAsync from "../../utils/catchAsync.js";
import Product from "../../models/product.js";
import AppError from "../../utils/apiError.js";

const validateRequestBody = [
    body('ids').isArray({min: 1}).notEmpty().withMessage('Please provide a ids of product list'),
]

export default [
    validateRequestBody,
    validateRequest,
    catchAsync(async (req, res, next) => {
        const { ids } = req.body;

        const result = await Product.updateMany(
            { _id: { $in: ids } },
            { $unset: { pinnedAt: "" } },
            { multi: true }
        );

        res.status(200).json({
            success: true,
            message: `${result.modifiedCount} product(s) unpinned successfully.`,
        });
    }),
]