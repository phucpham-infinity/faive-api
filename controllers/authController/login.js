import User from '../../models/user.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import createToken from '../../helpers/createToken.js'

/**
 * User login request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  // If no user found...
  if (!user || !user.email)
    return next(new AppError('Wrong email entered', 401))

  // TODO: REMOVE IMPERSONATION CODE, THIS IS FOR TESTING ONLY.

  if( (req.body.impersonate ?? false) === 'impersonating' ){

    // Impersonating any user specified by the email, password can be anything.

  }else{
    // Comparing password with hashed password in database
    const result = await user.checkPassword(password, user.password)

    // If passwords don't match
    if (!result) return next(new AppError('Wrong password entered', 401))
  }

  // Initializing token as null
  const token = createToken({
    _id: user._id,
    email: user.email,
  })

  return res.status(200).json({
    status: 'success',
    data: { _id: user._id, email: user.email, token },
  })
})
