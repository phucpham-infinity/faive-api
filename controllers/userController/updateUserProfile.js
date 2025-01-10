import argon2 from "argon2";

import User from '../../models/user.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProfile from '../../models/userProfile.js'
import getFieldValue from '../../helpers/getFieldValue.js'

/**
 * Update user profile request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const fields = [
    'first_name',
    'last_name',
    'email',
    'password',
    'confirmPassword',
    'username',
    'instagram_user',
    'tiktok_user',
    'bio',
  ]
  const requiredFields = [
    'email',
    'password',
    'confirmPassword',
    'username',
    'first_name',
  ]
  const data = getFieldValue(req.body, fields, requiredFields)

  // Check given username is already exists or not
  if (data?.username) {
    const user = await UserProfile.findOne({ username: data.username })
    if (user && JSON.stringify(user.user) !== JSON.stringify(req.user._id))
      return next(
        new AppError('User name already taken. Try another one!', 400)
      )
  }

  // Check password and confirm password are same
  if (data?.password) {
    if (data?.password !== data?.confirmPassword)
      return next(
        new AppError('Password and confirm password should be same!', 400)
      )

    data.password = await argon2.hash(data.password,{hashLength:12})
    data.confirmPassword = undefined
  }

  const user = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
  })

  // Update user profile
  const userProfile = await UserProfile.findOneAndUpdate(
    { user: req.user._id },
    data,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!userProfile) return next(new AppError('No user found', 404))

  res.status(200).json({
    status: 'success',
    user,
    userProfile,
  })
})
