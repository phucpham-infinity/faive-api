import Product from '../../models/product.js'
import catchAsync from '../../utils/catchAsync.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'
import mongoose from 'mongoose'
import AppError from '../../utils/apiError.js'

/**
 * Fetch all faivelists that product have been exists
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const _id = req.params.id
  const currentUser = req.user._id
  const user = req.query.user ?? req.user._id

  const product = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(_id),
        user,
      },
    },
    {
      $lookup: {
        from: 'productsusers',
        localField: '_id',
        foreignField: 'product',
        as: 'faivelists',
      },
    },
    {
      $lookup: {
        from: 'taxonomyterms',
        localField: 'faivelists.faivelist',
        foreignField: '_id',
        as: 'faivelists',
      },
    },
  ])

  if (!product || product.length === 0) {
    return next(
      new AppError('No products found with given ID for this user', 404)
    )
  }

  const faiveLists = product[0].faivelists

  res.status(200).json({
    status: 'success',
    total: faiveLists.length,
    faiveLists,
  })
})
