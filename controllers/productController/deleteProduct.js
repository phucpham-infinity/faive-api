import User from '../../models/user.js'
import Product from '../../models/product.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'

/**
 * Delete product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const user = req.user._id
  const { id } = req.params

  // Check this product is belongs to current user's profile
  const product = await Product.findOne({ user, _id: id })

  if (!product) return next(new AppError('No product found with that id', 404))

  // Add filter options for delete product
  let filter = { user, product: id }

  // Remove product relation with user's faivelits
  await UserProduct.deleteMany(filter)

  // Remove the product
  await Product.findByIdAndDelete(id)

  // Reduce product count for user
  // await User.findOneAndUpdate({
  //   _id: user,
  // }, {
  //   $inc: {
  //     productCount: -1
  //   }
  // })

  const productCount = await Product.countDocuments({ user })
  console.log(productCount)

  await User.findOneAndUpdate({ _id: user }, { productCount })

  res.status(204).json({
    status: 'success',
  })
})
