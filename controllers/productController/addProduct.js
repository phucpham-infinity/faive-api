import {body} from 'express-validator'

import Site from '../../models/site.js'
import Product from '../../models/product.js'
import User from '../../models/user.js'
import catchAsync from '../../utils/catchAsync.js'
import UrlParser from "../../utils/urlParser.js";
import validateRequest from "../../middlewares/validateRequest.js";
import Brand from "../../models/brand.js";

/**
 * Add new product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const validateRequestBody = [
    body('name').isString().notEmpty().withMessage('Please provide a valid name'),
    body('productId').isString().notEmpty().withMessage('Please provide a valid productId'),
    body('url').notEmpty().isURL().withMessage('Please provide a valid URL'),
    body('siteOrigin').isString().notEmpty().withMessage('Please provide a valid siteOrigin'),
    body('brand').isObject().withMessage('Brand must be an object')
        .custom((value) => {
            if (!value.name || typeof value.name !== 'string') throw new Error('Brand name is required and must be a string')
            if (!value.url || typeof value.url !== 'string') throw new Error('Brand url is required and must be a string')
            return true
        }),
    body('price').isNumeric().notEmpty().withMessage('Please provide a valid price'),
    body('priceCurrency').isString().notEmpty().withMessage('Please provide a valid priceCurrency'),
    body('previousPrice').isNumeric().optional(),
    body('discountPercentage').isString().optional(),
    body('description').isString().optional(),
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
            previousPrice,
            discountPercentage,
            description,
            image
        } = req.body
        const url = decodeURIComponent(req.body.url)

        const productData = {
            name,
            url,
            siteOrigin,
            brand,
            price,
            priceCurrency,
            previousPrice,
            discountPercentage,
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
                name: productData.siteOrigin,
                icon: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${rootUrl}&size=128`,
            })
        }

        let _brand;
        if (productData.brand) {
            _brand = await Brand.findOne({name: productData.brand?.name})
            if (!brand) {
                _brand = await Brand.create({
                    name: productData.brand?.name,
                    url: productData.brand?.url,
                    icon: productData.brand?.icon,
                })
            }
        }

        let product = await Product.findOneAndUpdate(
            {productId},
            {
                ...productData,
                user,
                site: _site?._id,
                brand: _brand?._id ?? null,
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
