import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + `.${file.mimetype.split('/')[1]}`)
  },
})

export default multer({
  storage,
  limits: {
    fileSize: 100000000,
    fieldSize: 100000000,
  },
})
