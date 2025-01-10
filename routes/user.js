import multer from 'multer'
import express from 'express'

import uploadImage from '../utils/s3ImageUpload.js'
import isLoggedin from '../middlewares/isLoggedin.js'
import getUser from '../controllers/userController/getUser.js'
import updateUserProfile from '../controllers/userController/updateUserProfile.js'
import uploadProfileImage from '../controllers/userController/uploadProfileImage.js'
import updateProfileStatus from '../controllers/userController/updateProfileStatus.js'
import uploadCoverImage from '../controllers/userController/uploadCoverImage.js'

const router = express.Router()

const upload = multer()

router.use(isLoggedin)

router.get('/get-user', getUser)

router.put(
  '/profile-url',
  upload.single('profile'),
  uploadImage,
  uploadProfileImage
)

router.put('/cover-url', upload.single('cover'), uploadImage, uploadCoverImage)

router.patch('/update-profile', updateUserProfile)
router.patch('/update-status', updateProfileStatus)

export default router
