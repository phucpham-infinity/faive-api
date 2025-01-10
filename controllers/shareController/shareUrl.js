import catchAsync from '../../utils/catchAsync.js'
import SharedController from './sharedController.js'

/**
 * Generates a shareable URL for a given payload and type,
 * utilizing the SharedController, and returns the URL.
 */

const shareUrl = catchAsync(async (req, res, next) => {
  let { payload, type } = req.body

  if (type === 'user') {
    payload = {}
    payload.id = req.user._id
  }

  const shareController = new SharedController()
  const sharedData = await shareController.generate(type, payload)

  const url = `${req.protocol}://${req.get('host')}/api/v1/share/${
    sharedData.url
  }`

  res.status(200).json({
    status: 'success',
    url,
  })
})

export default shareUrl
