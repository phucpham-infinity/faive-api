import mongoose from 'mongoose'
import catchAsync from '../../utils/catchAsync.js'
import Product from '../../models/product.js'
import config from '../../config.js'

/**
 * Fetch sites request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  // const currentUser = req.user._id
  // const user = req.query.user ?? req.user._id
  const page = req.query.page ? parseInt(req.query.page) : 1
  const limit = req.query.per_page
    ? parseInt(req.query.per_page)
    : config.api.sites_per_page
  const skip = (page - 1) * limit

  const userId = req.query.user ?? req.user._id

  const sites = await Product.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } }, // Filter products by user ID
    {
      $lookup: {
        from: 'sites',
        localField: 'site',
        foreignField: '_id',
        as: 'siteDetails',
      },
    },
    { $unwind: '$siteDetails' }, // Deconstruct the siteDetails array
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ['$siteDetails', { lastProductAddedAt: '$createdAt' }],
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        url: { $first: '$url' },
        icon: { $first: '$icon' },
        lastProductAddedAt: { $max: '$lastProductAddedAt' }, // Choose how you want to handle createdAt here
        __v: { $max: '$__v' },
      },
    },
    { $sort: { lastProductAddedAt: -1 } }, // Sort by createdAt in descending order (newest first)
  ])

  res.status(200).json({
    status: 'success',
    pages: {
      total: Math.ceil(page),
      current: page,
    },
    sites,
  })
})
