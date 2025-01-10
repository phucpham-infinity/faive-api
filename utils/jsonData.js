import dJSON from 'dirty-json'
import * as cheerio from 'cheerio'

import ScrapeParseInterface from './parseProdectData.js'

class LdJson extends ScrapeParseInterface {
  async getData(html, fields) {
    return await this.parseData(this.scrapeData(html), fields)
  }

  /**
   *
   * @param {*} html
   * @returns
   */
  scrapeData(html) {
    const $ = cheerio.load(html)
    let obj = $('script[type="application/ld+json"]')

    let arr = []

    for (let i in obj) {
      for (let j in obj[i].children) {
        let data = obj[i].children[j].data
        // console.log('JSON', data)
        if (data) {
          arr.push(dJSON.parse(data))
        }
      }
    }

    return arr.flat()
  }

  /**
   *
   * @param { Object } data
   * @param { Array } fields
   * @returns
   */
  async parseData(data, fields) {
    let product, organization
    let foundProduct = false,
      foundOrganization = false

    data.forEach((el) => {
      if (
        !foundProduct &&
        (el['@type'] === 'Product' || el['@type'] === 'ProductGroup')
      ) {
        product = { ...product, ...el }
        foundProduct = true
      }
    })

    data.forEach((el) => {
      if (!foundOrganization && el['@type'] === 'Organization') {
        organization = { ...organization, ...el }
        foundOrganization = true
      }
    })

    let res = {}

    // Name
    if (product && product?.name) res['name'] = product.name

    // Image
    if (product && product?.image) {
      if (
        Array.isArray(product?.image) &&
        typeof product?.image === 'object' &&
        !product?.image[0]?.thumbnail?.match('no-image')
      )
        res['image'] = product?.image[0]?.thumbnail
      else if (
        Array.isArray(product?.image) &&
        !product?.image[0].match('logo') &&
        !product?.image[0].match('no-image')
      )
        res['image'] = product?.image[0]
      else if (
        !Array.isArray(product?.image) &&
        typeof product?.image === 'object'
      )
        res['image'] = product?.image?.image
      else if (
        !Array.isArray(product?.image) &&
        !product?.image?.match('no-image')
      )
        res['image'] = product?.image
    } else if (product && product?.images) {
      if (
        Array.isArray(product?.images) &&
        !product?.images[0]?.match('no-image')
      )
        res['image'] = product?.images[0]
      else if (
        !Array.isArray(product?.images) &&
        !product?.images?.match('no-image')
      )
        res['image'] = product?.images
    }

    // Price and Currency
    if (product && product.offers) {
      const offers = Array.isArray(product.offers)
        ? product.offers[0]
        : product.offers
      if (offers.price) res['price'] = this.formatPrice(offers.price)
      if (offers.priceCurrency)
        res['priceCurrency'] = this.convertCodeToSymbol(offers.priceCurrency)
    }

    // Brand
    if (product && product.brand) {
      if (product.brand.name) res['brand'] = product.brand.name
      else res['brand'] = product.brand
    } else if (product && product.manufacturer)
      res['brand'] = product.manufacturer

    // Site Name
    if (product && product.offers && product.offers.seller)
      res['site_name'] = product.offers.seller.name
    else if (organization && organization.name)
      res['site_name'] = organization.name

    return fields.reduce((acc, curr) => {
      if (res[curr] ?? false) acc[curr] = res[curr]
      return acc
    }, {})
  }
}

export default LdJson
