import mongoose from 'mongoose'
import AppError from '../../utils/apiError.js'
import catchAsync from '../../utils/catchAsync.js'
import Site from '../../models/site.js'

/**
 * Update site data request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const id = req.params.id

  const site = await Site.findByIdAndUpdate(id, req.body, { new: true })

  if (!site)
    return next(new AppError('No site found in your profile with that id', 404))

  res.status(200).json({
    status: 'success',
    site: site,
  })
})
