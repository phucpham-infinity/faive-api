import Faivelist from '../../utils/faivelist.js'
import catchAsync from '../../utils/catchAsync.js'

/**
 * Add new faivelist request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { name } = req.body
  const user = req.user._id

  // Create new faivelist object
  const list = new Faivelist({ name, user })

  // Add faivelist to the database
  const faivelist = await list.create()

  faivelist.images = [];
  faivelist.productsCount = 0;

  res.status(201).json({
    status: 'success',
    faivelist,
  })
})
