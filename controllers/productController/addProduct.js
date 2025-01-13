import {body} from 'express-validator'

import Site from '../../models/site.js'
import Product from '../../models/product.js'
import User from '../../models/user.js'
import catchAsync from '../../utils/catchAsync.js'
import UrlParser from "../../utils/urlParser.js";

/**
 * Add new product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const validateProductInput = [
    body('name').isString().notEmpty(),
    body('productId').isString().notEmpty(),
    body('url').notEmpty().isURL(),
]

export default [
    validateProductInput,
    catchAsync(async (req, res, next) => {

        const user = req.user._id
        const {name, productId} = req.body
        const url = decodeURIComponent(req.body.url)

        const productData = {
            name,
            url
        }

        /**
         * if product is already saved, then update the product with new data.
         * before attaching to a site. And if site is not already saved,
         * then create the site also.
         */

        const urlObj = UrlParser.make(url, productData)
        const rootUrl = urlObj.getRootUrl()
        let site = await Site.findOne({url: rootUrl})

        if (!site) {
            site = await Site.create({
                url: rootUrl,
                name: productData.site_name,
                icon: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${rootUrl}&size=128`,
            })
        }

        let product = await Product.findOneAndUpdate(
            {productId},
            {
                ...productData,
                user,
                site: site._id,
                url,
                updatedAt: Date.now(),
            },
            {
                new: true,
                upsert: true,
                includeResultMetadata: true,
            }
        )

        const productCount = await Product.countDocuments({user})

        await User.findOneAndUpdate(
            {
                _id: user,
            },
            {
                productCount,
                hasEverAddedProduct: true
            }
        )

        res.status(200).json({
            status: 'success',
            action: !product?.lastErrorObject?.updatedExisting ? 'created' : 'updated',
            product: product.value,
        })
    })
]
