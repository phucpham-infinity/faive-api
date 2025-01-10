import catchAsync from '../../utils/catchAsync.js'
import SharedController from './sharedController.js'

/**
 * This function expands shared data based on a provided URL,
 * utilizing the SharedController, and returns the expanded data.
 */

const expandSharedUrl = catchAsync(async (req, res, next) => {
  const { url } = req.params

  const shareController = new SharedController()
  const sharedData = await shareController.expand(url)

  res.status(200).json({
    status: 'success',
    data: sharedData,
  })
})

export default expandSharedUrl
