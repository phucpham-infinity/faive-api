import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import config from '../config.js'
import catchAsync from './catchAsync.js'

/** Upload image to S3 bucket */

const s3 = new S3Client({
  endpoint: config.s3.origin + ':9000',
  region: config.s3.bucketRegion,
  credentials: {
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretKey,
  },
  forcePathStyle: true,
})

export default catchAsync(async function (req, res, next) {
  if (!req.file) return next()

  // Create file name
  const filename = `images/${req.user._id}/${
    req.file?.fieldname
  }-${Date.now()}.${req.file.mimetype.split('/')[1]}`

  const cmd = new PutObjectCommand({
    Bucket: config.s3.bucketName,
    Key: filename,
    Body: req.file?.buffer,
    ACL: 'public-read',
    ContentType: req.file?.mimetype,
  })

  const resp = await s3.send(cmd)

  req.file = { ...req.file, filename:`${config.s3.bucketName}/${filename}` }

  next()
})
