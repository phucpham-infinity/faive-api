import User from '../../models/user.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 * The password update request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body

  // Get user from collection
  const user = await User.findOne(req.user._id).select('+password')

  // Check is posted current password is correct
  if (!user || !(await user.checkPassword(currentPassword, user.password)))
    return next(
      new AppError(
        'Current password is incorrect! Forgot your password? So, go to forgot password',
        401
      )
    )

  // If correct then update password
  user.password = newPassword
  user.confirmPassword = confirmPassword
  await user.save()

  res.status(200).json({
    status: 'success',
    message: 'Password successfully updated.',
  })
})
