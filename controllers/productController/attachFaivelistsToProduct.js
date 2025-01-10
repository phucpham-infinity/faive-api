import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Attach faivelists to product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default async (req, res, next) => {
  try {
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

    // Create product, user and faivelist relations for add product to faivelist
    const userProducts = faivelists.map((faivelist) => ({
      faivelist: faivelist._id,
      product: product._id,
      site: product.site,
      user,
    }))

    const addedToFaivelists = await UserProduct.insertMany(userProducts)

    res.status(200).json({
      status: 'success',
      addedCount: addedToFaivelists.length,
      addedToFaivelists,
    })
  } catch (err) {
    if (err.code === 11000)
      return res.status(200).json({
        status: 'success',
        addedCount: err.insertedDocs.length,
        addedToFaivelists: err.insertedDocs,
      })

    res.status(500).json({
      status: 'error',
      err,
    })
  }
}
