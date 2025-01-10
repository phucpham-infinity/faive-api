import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 * Detaching multiple products from faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { productIds } = req.body
  const user = req.user._id

  // Check if productsIds is empty
  if (!productIds || productIds.length === 0)
    return next(
      new AppError(
        'Product IDs are required to detach products from faivelist',
        404
      )
    )

  const products = await Product.find({
    _id: { $in: productIds },
    user,
  })

  if (!products || products.length === 0) {
    return next(
      new AppError(
        'No products were found with product IDs provided for this user',
        404
      )
    )
  }

  // Find user's faivelist
  const faivelist = await TaxonomyTerm.findOne({ _id: req.params.id, user })

  if (!faivelist) {
    return next(
      new AppError('No faivelist was found with given ID for this user', 404)
    )
  }

  await UserProduct.deleteMany({
    faivelist: faivelist._id,
    product: { $in: products },
    user,
  })

  res.status(200).json({
    status: 'success',
  })
})
