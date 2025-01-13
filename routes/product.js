import express from 'express'

import uploadFile from '../utils/uploadFile.js'
import isLoggedin from '../middlewares/isLoggedin.js'
import addProduct from '../controllers/productController/addProduct.js'
import crawlProduct from '../controllers/productController/crawlProduct.js'

import deleteProduct from '../controllers/productController/deleteProduct.js'
import getOneProducts from '../controllers/productController/getOneProducts.js'
import getUserProducts from '../controllers/productController/getUserProducts.js'
import getNotAddedProducts from '../controllers/productController/getNotAddedProducts.js'
import getFaivelistsFromProduct from '../controllers/productController/getFaivelistsFromProduct.js'
import attachFaivelistsToProduct from '../controllers/productController/attachFaivelistsToProduct.js'
import detachFaivelistsFromProduct from '../controllers/productController/detachFaivelistsFromProduct.js'

const router = express.Router()

router.use(isLoggedin)

// Create product
router.post('/', uploadFile, addProduct)

router.post('/crawl', crawlProduct)

// Retrieve product list
router.get('/', getUserProducts)

// Retrieve a single product
router.get('/:id', getOneProducts)

// Retrieve not exists products on that faivelist
router.get('/not-in-faivelist/:id', getNotAddedProducts)

// Retrieve all the faivelists that the single product belongs to
router.get('/:id/faivelists', getFaivelistsFromProduct)

// Attach the faivelists to a product
router.put('/:id/faivelists', attachFaivelistsToProduct)

// Delete a product
router.delete('/:id', deleteProduct)

// Detach a product from the given faivelists
router.delete('/:id/faivelists', detachFaivelistsFromProduct)

export default router
