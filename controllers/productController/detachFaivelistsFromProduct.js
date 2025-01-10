import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Detaching faivelists to product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { faivelistIds } = req.body
  const user = req.user._id

  // Check if faivelistIds is empty
  if (!faivelistIds || faivelistIds.length === 0)
    return next(
      new AppError('Faivelist IDs are required to attach the product to', 404)
    )

  const faivelists = await TaxonomyTerm.find({
    _id: { $in: faivelistIds },
    user,
  })
  if (!faivelists || faivelists.length === 0) {
    return next(
      new AppError(
        'No faivelists were found with faivelist IDs provided for this user',
        404
      )
    )
  }

  // Find product by id
  const product = await Product.findOne({ _id: req.params.id, user })

  if (!product) {
    return next(
      new AppError('No product was found with given ID for this user', 404)
    )
  }

  // Remove product from all faivelist
  for (const faivelist of faivelists) {
    await UserProduct.deleteOne({
      faivelist: faivelist._id,
      product: product._id,
      user,
    })
  }

  res.status(200).json({
    status: 'success',
  })
})
