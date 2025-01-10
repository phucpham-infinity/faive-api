import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProfile from '../../models/userProfile.js'

/**
 * Change user profile status request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const user = await UserProfile.findOneAndUpdate(
    { user: req.user._id },
    { status: req.body?.status?.toLowerCase() },
    {
      new: true,
      runValidators: true,
    }
  )

  if (!user) return next(new AppError('No user found', 404))

  res.status(200).json({
    status: 'success',
    user,
  })
})
