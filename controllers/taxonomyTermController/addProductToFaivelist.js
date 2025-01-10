import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Add single products to faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
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
  const faivelist = await TaxonomyTerm.findOne({ _id: req.params.id, user })

  if (!faivelist) {
    return next(
      new AppError('No faivelist was found with given ID for this user', 404)
    )
  }

  // Create product, user and faivelist relations for add product to faivelist

  const addedProduct = await UserProduct.create({
    faivelist: faivelist._id,
    product: product._id,
    site: product.site,
    user,
  })

  res.status(200).json({
    status: 'success',
    addedProduct,
  })
})
