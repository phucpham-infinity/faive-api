import mongoose from 'mongoose'

import Site from '../../models/site.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Fetch all products of a faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  let list = req.query.list
  const sort = req.query.sort
  const groupcount = +req.query.groupcount || 5
  const productcount = +req.query.productcount || 4

  let query = { createdAt: 1 }
  if (sort === 'new') query = { createdAt: -1 }

  if (!list)
    return next(new AppError('Provide faivelist id to get products', 404))

  // Check given faivelist is belongs to current user's profile
  const userList = await TaxonomyTerm.findOne({ user: req.user._id, _id: list })
  if (!userList)
    return next(
      new AppError('No faivelist found in your profile with that id', 404)
    )

  // Create aggregation pipeline
  let pipeline = [
    {
      $match: {
        faivelist: new mongoose.Types.ObjectId(list),
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $group: {
        _id: '$site',
        product: { $push: '$product' },
      },
    },
    {
      $limit: groupcount,
    },
  ]

  // Getting all product of the faivelist
  let result = await UserProduct.aggregate(pipeline).sort(query)

  // Populate site details of products
  result = await Site.populate(result, { path: '_id' })

  // If no of products in each group is greater then productcount then remove extra products
  const groups = result.map((el) => {
    let products = el.product.flat()

    products =
      products.length > productcount
        ? products.slice(0, productcount)
        : products

    return {
      site: el._id,
      products,
    }
  })

  res.status(200).json({
    status: 'success',
    total: groups.length,
    fiavelist: userList,
    groups,
  })
})
