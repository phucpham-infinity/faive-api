import Site from '../../models/site.js'
import Product from '../../models/product.js'
import User from '../../models/user.js'
import readFile from '../../helpers/readFile.js'
import UrlParser from '../../utils/urlParser.js'
import catchAsync from '../../utils/catchAsync.js'
import scrapePage from '../../helpers/scrapePage.js'
import Log from '../../helpers/Log.js'
import AppError from '../../utils/apiError.js'

/**
 * Add new product request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

export default catchAsync(async (req, res, next) => {
  // Reading html from uploaded file
  const htmlFile = req.file?.filename
    ? readFile(req.file.filename)
    : req.body?.html

  const user = req.user._id
  const url = decodeURIComponent(req.body.url)

  // Scrape product data
  let productData = await scrapePage(htmlFile, url)
  Log.info(`PRODUCT DATA: ${JSON.stringify(productData)}`, 'scraper-log')


  // If don't scrap product data then return error message
  if (productData.name === null || productData.name === '')
    return next(
      new AppError('Something went wrong! Do not complete this process', 500)
    )

  /**
   * if product is already saved, then update the product with new data.
   * before attaching to a site. And if site is not already saved,
   * then create the site also.
   */

  // Getting site root url from product url
  const urlObj = UrlParser.make(url, productData)
  const rootUrl = urlObj.getRootUrl()

  productData.image = new URL(productData.image, rootUrl).href

  let site = await Site.findOne({ url: rootUrl })

  if (!site) {
    site = await Site.create({
      url: rootUrl,
      name: productData.site_name,
      icon: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${rootUrl}&size=128`,
    })
  }

  let product = await Product.findOneAndUpdate(
    { url },
    {
      ...productData,
      user,
      site: site._id,
      url,
      updatedAt: Date.now(),
    },
    {
      new: true,
      upsert: true,
      includeResultMetadata: true,
    }
  )

  // If new product is created then increase user's product count and setting "hasAddedProduct" flag to true
  // if (!product?.lastErrorObject?.updatedExisting)
  //   await User.findOneAndUpdate(
  //     {
  //       _id: user,
  //     },
  //     {
  //       $inc: {
  //         productCount: 1,
  //       },
  //       hasEverAddedProduct: true,
  //     }
  //   )

  const productCount = await Product.countDocuments({ user })

  await User.findOneAndUpdate(
    {
      _id: user,
    },
    {
      productCount,
      hasEverAddedProduct: true
    }
  )

  res.status(200).json({
    status: 'success',
    action: !product?.lastErrorObject?.updatedExisting ? 'created' : 'updated',
    product: product.value,
  })
})
