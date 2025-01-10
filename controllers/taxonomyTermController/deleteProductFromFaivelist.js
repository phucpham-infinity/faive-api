import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Remove a single products from a faivelist
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const id = req.params.id
  const productId = req.params.pid
  const user = req.user._id

  const product = await Product.findOne({ _id: productId, user })
  if (!product || product.length === 0) {
    return next(
      new AppError(
        'No product was found with products ID provided for this user',
        404
      )
    )
  }

  // Find faivelist by id
  const faivelist = await TaxonomyTerm.findOne({ _id: id, user })

  if (!faivelist) {
    return next(
      new AppError('No faivelist was found with given ID for this user', 404)
    )
  }

  // Remove product from faivelist

  const deletedProduct = await UserProduct.deleteOne({
    product: productId,
    faivelist: id,
    user,
  })

  res.status(200).json({
    status: 'success',
  })
})
