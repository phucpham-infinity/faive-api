import express from 'express'

import isLoggedin from '../middlewares/isLoggedin.js'
import expandSharedUrl from '../controllers/shareController/expandSharedUrl.js'
import shareUrl from '../controllers/shareController/shareUrl.js'

const router = express.Router()

router.get('/:url', expandSharedUrl)

router.post('/', isLoggedin, shareUrl)

export default router
