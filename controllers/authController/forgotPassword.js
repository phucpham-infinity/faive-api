import User from '../../models/user.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import ResetPasswordMail from '../../helpers/mailer/mails/ResetPasswordMail.js'
import Log from '../../helpers/Log.js'

/**
 * The forgot password request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError('There is no user with this email address'))
  }

  // 2) Generate the random reset token
  const otp = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const email = user.email
  const name = user.first_name

  try {
    // Send otp to user email
    const resetPasswordMail = new ResetPasswordMail()
    await resetPasswordMail.to(email).send({ name, otp, email })
  } catch (err) {
    Log.error({ message: err.message, stack: err.stack })
    return next(
      new AppError('Failed to send OTP. Please try again after sometime.')
    )
  }

  res.status(200).json({
    status: 'success',
    message: 'An OTP has been sent to your email to reset your password.',
  })
})
