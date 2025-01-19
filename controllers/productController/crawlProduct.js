import catchAsync from "../../utils/catchAsync.js";

import scrapePage from "../../helpers/scrapePage.js";
import readFile from "../../helpers/readFile.js";

export default [
    catchAsync(async (req, res, next) => {
        const htmlFile = req.file?.filename
            ? readFile(req.file.filename)
            : req.body?.html
        const url = decodeURIComponent(req.body.url);
        let productData = await scrapePage(htmlFile, url)

        res.status(200).json({
            status: 'success',
            data: {
                ...productData,
                url,
                image: [productData.image],
                site: productData.site_name,
                user: req.user._id,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
    })
]
