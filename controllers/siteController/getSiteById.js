import mongoose from 'mongoose'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import Site from '../../models/site.js'

/**
 * Fetch single site request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const currentUser = req.user._id
  const user = req.query.user ?? req.user._id
  const id = req.params.id

  const site = await Site.findById(id)

  if (!site)
    return next(new AppError('No site found in your profile with that id', 404))

  res.status(200).json({
    status: 'success',
    site: site,
  })
})
