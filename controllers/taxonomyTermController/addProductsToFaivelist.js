import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Add multiple products to faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default async (req, res, next) => {
  try {
    const { productIds } = req.body
    const user = req.user._id

    // Check faivelist faiveIds or name and preducts are empty
    if (!productIds || productIds.length === 0)
      return next(new AppError('Product IDs are required to add to list', 404))

    const products = await Product.find({ _id: { $in: productIds }, user })
    if (!products || products.length === 0) {
      return next(
        new AppError(
          'No products were found with products IDs provided for this user',
          404
        )
      )
    }

    console.log('Id', req.params.id)

    // Find faivelist by id
    const faivelist = await TaxonomyTerm.findOne({ _id: req.params.id, user })

    if (!faivelist) {
      return next(
        new AppError('No faivelist was found with given ID for this user', 404)
      )
    }

    // Create product, user and faivelist relations for add product to faivelist
    const userProducts = products.map((product) => ({
      faivelist: faivelist._id,
      product: product._id,
      site: product.site,
      user,
    }))

    const addedProducts = await UserProduct.insertMany(userProducts, {
      ordered: false,
    })

    res.status(200).json({
      status: 'success',
      addedCount: addedProducts.length,
      addedProducts,
    })
  } catch (err) {
    if (err.code === 11000)
      return res.status(200).json({
        status: 'success',
        addedCount: err.insertedDocs.length,
        addedProducts: err.insertedDocs,
      })

    res.status(500).json({
      status: 'error',
      err,
    })
  }
}
