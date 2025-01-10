import express from 'express'

import isLoggedin from '../middlewares/isLoggedin.js'
import getFaivelist from '../controllers/taxonomyTermController/getFaivelist.js'
import addTaxonomyTerm from '../controllers/taxonomyTermController/createFaivelist.js'
import updateFaivelist from '../controllers/taxonomyTermController/updateFaivelist.js'
import deleteFaivelist from '../controllers/taxonomyTermController/deleteFaivelist.js'
import getUserFaivelist from '../controllers/taxonomyTermController/getUserFaivelist.js'

const router = express.Router()

router.use(isLoggedin)

router.get('/', getUserFaivelist)

router.post('/create', addTaxonomyTerm)

router.patch('/edit/:id', updateFaivelist)

router.delete('/delete/:id', deleteFaivelist)

router.get('/:id', getFaivelist)

export default router
