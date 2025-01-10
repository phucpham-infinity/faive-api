import config from '../../config.js'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import UserProfile from '../../models/userProfile.js'

/**
 * Upload user profile image request
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  let imageUrl = null

  if (req.file?.filename) imageUrl = `${config.s3.cdn}/${req.file.filename}`

  await UserProfile.findOneAndUpdate(
    { user: req.user._id },
    { image: imageUrl },
    { new: true }
  )

  res.status(200).json({
    status: 'success',
    imageUrl,
    message: 'Image uploaded successfully',
  })
})
