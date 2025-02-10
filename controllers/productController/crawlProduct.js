import catchAsync from "../../utils/catchAsync.js";

import scrapePage from "../../helpers/scrapePage.js";
import readFile from "../../helpers/readFile.js";
import AppError from "../../utils/apiError.js";

export default [
    catchAsync(async (req, res, next) => {
        const htmlFile = req.file?.filename
            ? readFile(req.file.filename)
            : req.body?.html
        const url = decodeURIComponent(req.body.url);
        let productData = await scrapePage(htmlFile, url);

        if(!productData.name) {
            throw new AppError("Product not found!");
        }

        res.status(200).json({
            status: 'success',
            data: {
                ...productData,
                url,
                price: productData.price ,
                priceCurrency: productData.priceCurrency ?? "",
                brand: productData.brand ?? "",
                gallery: productData.gallery ? [productData.image, ...productData.gallery] : [productData.image],
                image: [productData.image],
                site: productData.site_name,
                user: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
    })
]
