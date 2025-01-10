import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import TaxonomyTerm from '../../models/taxonomyTerm.js'

/**
 * Update faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { id } = req.params
  const user = req.user._id

  // Check the faive list is created by logged in user
  let faiveList = await TaxonomyTerm.findOneAndUpdate({_id: id, user}, req.body, {
    new: true,
    runValidators: true,
  })

  if (!faiveList)
    return next(
      new AppError('No faivelist found in your profile with that id', 404)
    )

  res.status(200).json({
    status: 'success',
    faiveList,
  })
})
