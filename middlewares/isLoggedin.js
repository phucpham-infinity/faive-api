import jwt from 'jsonwebtoken'

import config from '../config.js'
import User from '../models/user.js'
import AppError from '../utils/apiError.js'
import catchAsync from '../utils/catchAsync.js'

const isLoggedin = catchAsync(async (req, res, next) => {
  // Getting token from user authorization header
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access!!', 401)
    )
  }

  // Verify token
  const decoded = jwt.verify(token, config.jwt.secret)

  // Check if user still exists
  const currentUser = await User.findById(decoded._id)

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token is no longer exists!!',
        401
      )
    )
  }

  // GRANT ACCESS USER TO PROTECTED ROUTE
  req.user = currentUser
  next()
})

export default isLoggedin
