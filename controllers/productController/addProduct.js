import {body} from 'express-validator'
import md5 from 'md5';

import Site from '../../models/site.js'
import Product from '../../models/product.js'
import User from '../../models/user.js'
import catchAsync from '../../utils/catchAsync.js'
import UrlParser from "../../utils/urlParser.js";
import validateRequest from "../../middlewares/validateRequest.js";
import Brand from "../../models/brand.js";
import {getMainDomain} from "../../utils/hepler.js";

/**
 * Add new product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const validateRequestBody = [
    body('name').isString().notEmpty().withMessage('Please provide a valid name'),
    body('productId').isString().optional().withMessage('Please provide a valid productId'),
    body('url').notEmpty().isURL().withMessage('Please provide a valid URL'),
    body('brand').isString().withMessage('Brand must be an object').optional(),
    body('price').isNumeric().notEmpty().withMessage('Please provide a valid price'),
    body('priceCurrency').isString().notEmpty().withMessage('Please provide a valid priceCurrency'),
    body('description').optional(),
]

export default [
    validateRequestBody,
    validateRequest,
    catchAsync(async (req, res, next) => {

        const user = req.user._id
        const {
            name,
            productId,
            siteOrigin,
            brand,
            price,
            priceCurrency,
            description,
            image,
        } = req.body
        const url = decodeURIComponent(req.body.url)

        const productData = {
            name,
            url,
            siteOrigin,
            brand,
            price,
            priceCurrency,
            description,
            image,
        }

        /**
         * if product is already saved, then update the product with new data.
         * before attaching to a site. And if site is not already saved,
         * then create the site also.
         */

        const urlObj = UrlParser.make(url, productData)
        const rootUrl = urlObj.getRootUrl()

        let _site = await Site.findOne({url: rootUrl})
        if (!_site) {
            _site = await Site.create({
                url: rootUrl,
                name: getMainDomain(rootUrl),
                icon: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${rootUrl}&size=128`,
            })
        }

        let _productId = productId
        if (!_productId) _productId = md5(url)?.slice(0, 8);

        let product = await Product.findOneAndUpdate(
            {productId: _productId},
            {
                ...productData,
                user,
                site: _site?._id,
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
