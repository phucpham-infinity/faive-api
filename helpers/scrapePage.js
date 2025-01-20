import ImageAlt from '../utils/imageAlt.js'
import LdJson from '../utils/jsonData.js'
import MetaData from '../utils/metaData.js'
import MicroData from '../utils/microData.js'
import TextData from '../utils/textData.js'
import Log from './Log.js'
import filterHostName from './filterHostName.js'
import AppError from "../utils/apiError.js";

/**
 * Scrapes a webpage to extract product details using various data extraction steps,
 * logging each step's results, and returns the populated product object.
 * @param { String } html
 * @param { String } url
 * @returns { Object }
 */

const scrapePage = async (html, url) => {
  // All steps for scrape a webpage's data
  const steps = [LdJson, MetaData, MicroData, ImageAlt, TextData]

  let product = {
    site_name: null,
    name: null,
    description: null,
    image: null,
    gallery: null,
    price: null,
    priceCurrency: null,
    brand: null,
    isProduct: null,
  }

  for (const Step of steps) {
    if (product.isProduct === false) {
      throw new AppError("No products found for product");
    }

    // Create object of each step of scrapper class
    const step = new Step()
    const fields = Object.keys(product).filter((el) => product[el] === null)
    if (fields.length === 0) break

    const scrappedData = await step.getData(html, fields)

    // Getting product's data from scrappedData
    for (const key of fields) {
      product[key] = scrappedData[key] ?? null
    }

    // console.log('STEP: ', step.constructor.name)
    // console.log(`Field \n`, fields)
    // console.log('DATA\n', data)
    // console.log('Product\n', product)
    Log.info(`STEP: ${step.constructor.name}`, 'scraper-log')
    Log.info(`FIELDS: \n${JSON.stringify(fields)}`, 'scraper-log')
    Log.info(`DATA: \n${JSON.stringify(scrappedData)}`, 'scraper-log')
    Log.info(`PRODUCT: \n${JSON.stringify(product)}`, 'scraper-log')
  }

  // Get site name from product url
  if (!(product.site_name ?? false)) {
    const urlObj = new URL(url)
    product.site_name = filterHostName(urlObj.hostname ?? null)
  }
  Log.info(`SITE NAME: ${product.site_name}`, 'scraper-log')

  return product
}

export default scrapePage
