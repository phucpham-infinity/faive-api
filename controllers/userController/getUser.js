import User from '../../models/user.js'
import UserProfile from '../../models/userProfile.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 * Fetch user details request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const userProfile = await UserProfile.findOne({ user: req.user._id })

  if (!user) return next(new AppError('No user found', 404))

  res.status(200).json({
    status: 'success',
    userProfile,
    user,
  })
})
