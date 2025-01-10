import express from 'express'

import getSites from '../controllers/siteController/getSites.js'
import getSiteById from '../controllers/siteController/getSiteById.js'

import isLoggedin from '../middlewares/isLoggedin.js'
import updateSite from '../controllers/siteController/updateSite.js'

const router = express.Router()

router.use(isLoggedin)

// Retrieve site list
router.get('/', getSites)

// Retrieves a single site
router.route('/:id').get(getSiteById).patch(updateSite)

export default router
