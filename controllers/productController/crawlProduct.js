import catchAsync from "../../utils/catchAsync.js";
import {crawlData} from "../../helpers/crawl/superShop/index.js";
import {body} from "express-validator";
import validateRequest from "../../middlewares/validateRequest.js";

const validateRequestBody = [
    body('url').isURL().withMessage('Please provide a valid URL'),
]

export default [
    validateRequestBody,
    validateRequest,
    catchAsync(async (req, res, next) => {
        const user = req.user._id;
        const url = decodeURIComponent(req.body.url);

        if (url.includes("super-shop.com")) {
            const data = await crawlData(url);
            res.status(200).json({
                status: "success",
                data,
            });
            return;
        }

        res.status(200).json({
            status: "success",
            data: {
                url,
            },
        });
    })
]
