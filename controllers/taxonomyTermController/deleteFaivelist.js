import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProduct from '../../models/userProduct.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Delete faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { id } = req.params
  const user = req.user._id

  // Check the faive list is created by current user
  const faiveList = await TaxonomyTerm.findOne({ user, _id: id })

  if (!faiveList)
    return next(new AppError('No faive list found with that id', 404))

  // Remove all products from the faive list
  await UserProduct.deleteMany({ faiveList: id })

  // Remove the faive list
  await TaxonomyTerm.findByIdAndDelete(id)

  res.status(204).json({
    status: 'success',
  })
})
