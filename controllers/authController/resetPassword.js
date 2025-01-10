import crypto from 'crypto'

import User from '../../models/user.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 * The reset password request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const email = req.body.email ?? ''
  const otp = req.body.otp ?? ''
  const password = req.body.password ?? ''
  const confirmPassword = req.body.confirmPassword ?? ''

  // Find user based on valid token
  const user = await User.findOne({
    email,
    passwordResetToken: otp,
    passwordResetExpires: { $gt: Date.now() },
  })

  if (!user) {
    return next(new AppError('Token is invalid or expired', 400))
  }

  if (password !== confirmPassword) {
    return next(new AppError('Passwords do not match', 400))
  }

  // Update password and remove passwordResetToken and expires time
  user.password = password
  user.confirmPassword = confirmPassword
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  res.status(200).json({
    status: 'success',
    message: 'Password successfully updated. Login to get access!',
  })
})
