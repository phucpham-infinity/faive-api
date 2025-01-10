import User from '../../models/user.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProfile from '../../models/userProfile.js'
import createToken from '../../helpers/createToken.js'

/**
 * User registration and create user profile request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res) => {
  // Creating user
  const user = await User.create(req.body)

  // Creating user profile
  const userProfile = await UserProfile.create({
    user: user._id,
  })

  // Generating token
  const token = createToken({
    _id: user._id,
    email: user.email,
  })

  // Returning id, email and token
  res.status(201).json({
    status: 'success',
    data: { _id: user.id, email: user.email, token },
  })
})
