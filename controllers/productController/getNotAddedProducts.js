import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import Faivelist from '../../utils/faivelist.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'

/**
 * Fetch a products which are not added in that faivelist
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const getNotAddedProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const user = req.user._id

  const products = await Product.find({ user })
  const addedProducts = await UserProduct.find({ user, faivelist: id })

  let notAddedProducts = products.filter((product) => {
    const added = addedProducts.find(
      (el) => JSON.stringify(el.product) === JSON.stringify(product._id)
    )

    if (!added) return product
  })

  res.status(200).json({
    status: 'success',
    total: notAddedProducts.length,
    products: notAddedProducts,
  })
})

export default getNotAddedProducts
