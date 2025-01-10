import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Fetch a single product and find those faivelist which does not have this product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { id: _id } = req.params
  const user = req.user._id

  // Getting product based on product id and user id
  const product = await Product.findOne({ _id, user })

  if (!product)
    return next(
      new AppError('No Product found in your profile with that id', 404)
    )

  // Find user's all faivelist and also find those faivelist which already added this product
  const list = await TaxonomyTerm.find({ user: req.user._id })
  const addedList = await UserProduct.find({ user, product: _id })

  // Return only those faivelist which does not have this product
  const faivelists = await Promise.all(
    list.map(async (faive) => {
      const added = addedList.filter(
        (el) => JSON.stringify(el.faivelist) === JSON.stringify(faive._id)
      )

      // Count how many product have in that faivelist
      const productCount = await UserProduct.countDocuments({
        faivelist: faive._id,
      })

      return {
        _id: faive._id,
        url: faive.url,
        name: faive.name,
        productCount,
        added: added.length > 0,
      }
    })
  )

  res.status(200).json({
    status: 'success',
    product,
    faivelists,
  })
})
