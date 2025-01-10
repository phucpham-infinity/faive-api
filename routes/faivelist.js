import express from 'express'

import isLoggedin from '../middlewares/isLoggedin.js'
import createFaivelist from '../controllers/taxonomyTermController/createFaivelist.js'
import getAllFaivelists from '../controllers/taxonomyTermController/getUserFaivelist.js'
import getFaivelistById from '../controllers/taxonomyTermController/getFaivelist.js'
import updateFaivelist from '../controllers/taxonomyTermController/updateFaivelist.js'
import addProductsToFaivelist from '../controllers/taxonomyTermController/addProductsToFaivelist.js'
import addProductToFaivelist from '../controllers/taxonomyTermController/addProductToFaivelist.js'
import deleteProductFromFaivelist from '../controllers/taxonomyTermController/deleteProductFromFaivelist.js'
import deleteFaivelist from '../controllers/taxonomyTermController/deleteFaivelist.js'
import detachProductsFromFaivelist from '../controllers/taxonomyTermController/detachProductsFromFaivelist.js'

const router = express.Router()

router.use(isLoggedin)

// Create a faivelist
router.post('/', createFaivelist)

// Get all faivelists
// TODO: Return images of last 4 products
router.get('/', getAllFaivelists)

// Get a single faivelist
router.get('/:id', getFaivelistById)

// Update a faivelist
router.put('/:id', updateFaivelist)

// Attach all products in the array of ids in body to a faivelist
router.put('/:id/products', addProductsToFaivelist)

// Detach all products in the array of ids in body to a faivelist
router.post('/:id/detach-products', detachProductsFromFaivelist)

// Attach a product to a faivelist
router.post('/:id/products/:pid', addProductToFaivelist)

// Delete a faivelist
router.delete('/:id', deleteFaivelist)

// Detach a product from a faivelist
router.delete('/:id/products/:pid', deleteProductFromFaivelist)

export default router
