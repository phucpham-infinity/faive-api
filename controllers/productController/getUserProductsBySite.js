import mongoose from 'mongoose'

import Site from '../../models/site.js'
import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 * Fetch user products group by site name
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  // Create aggregation pipeline for get product
  let pipeline = [
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $group: {
        _id: '$site',
        products: {
          $push: {
            _id: '_id',
            url: '$url',
            name: '$name',
            brand: '$brand',
            price: '$price',
            priceCurrency: '$priceCurrency',
            image: '$image',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
      },
    },
  ]

  // Getting product from user's product collection
  let result = await Product.aggregate(pipeline)

  // Populate site details of products
  result = await Site.populate(result, { path: '_id' })

  res.status(200).json({
    status: 'success',
    total: result.length,
    groups: result,
  })
})
