import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import Faivelist from '../../utils/faivelist.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Add products to faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { productIds, faiveIds, name } = req.body
  const user = req.user._id

  // Check faivelist ids or name and products are empty
  if (!productIds || productIds.length === 0 || (!faiveIds && !name))
    return next(
      new AppError(
        'Faivelist id or name and product id are required to add to list',
        404
      )
    )

  // Find products based on product ids
  const products = await Product.find({ _id: { $in: productIds }, user })

  // Create faivelist based on name or find faivelist by id
  let faivelists
  if (faiveIds)
    faivelists = await TaxonomyTerm.find({ _id: { $in: faiveIds }, user })
  else if (name) {
    const list = new Faivelist({ name, user })
    faivelists = [await list.create()]
  }

  // Create product, user and faivelist relations for add product to faivelist
  const userProducts = products.map((product) =>
    faivelists.map((faive) => {
      return {
        faivelist: faive._id,
        product: product._id,
        site: product.site,
        user,
      }
    })
  )

  const addedProducts = await UserProduct.insertMany(userProducts.flat())

  res.status(200).json({
    status: 'success',
    addedCount: addedProducts.length,
    addedProducts,
  })
})
