import fs from 'node:fs'

import AppError from '../utils/apiError.js'
import catchAsync from '../utils/catchAsync.js'
import NodemailerTransport from '../helpers/mailer/transports/NodemailerTransport.js'

/**
 * The forgot password request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  const { data } = req.body
  const email = 'faive@weloin.com'

  fs.writeFileSync('/app/temp/report.txt', data)

  const emailOptions = {
    from: 'Faive <notify@faive.io>',
    to: email,
    subject: 'Test Report',
    attachments: [
      {
        filename: 'report.txt',
        path: `/app/temp/report.txt`,
      },
    ],
  }

  const transport = new NodemailerTransport()
  const resData = await transport.sendMail(emailOptions)

  console.log(resData)

  res.status(200).json({
    status: 'success',
    message: 'Send Report successfully on your email.',
  })
})
