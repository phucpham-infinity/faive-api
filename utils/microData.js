import * as cheerio from 'cheerio'

import ScrapeParseInterface from './parseProdectData.js'

class MicroData extends ScrapeParseInterface {
  async getData(html, fields) {
    return await this.parseData(await this.scrapeData(html), fields)
  }
  async scrapeData(html) {
    const $ = cheerio.load(html)

    let res = []

    $('[itemscope]').each((index, $el) => {
      let item = {
        type: $($el).attr('itemtype'),
        properties: {},
      }

      const props = $($el).find('[itemprop]')

      props.each((index1, prop) => {
        item.properties[prop.attribs['itemprop']] =
          $(prop).attr('content') ||
          $.text(prop) ||
          $(prop).attr('src') ||
          $(prop).attr('href') ||
          ''

        if (!!prop.attribs['itemscope'] && !!prop.attribs['itemprop']) {
          let _item = {
            type: prop.attribs['itemtype'],
            properties: {},
          }

          $(prop)
            .find('[itemprop]')
            .each((index3, _prop) => {
              _item.properties[_prop.attribs['itemprop']] =
                $(_prop).attr('content') ||
                $.text(_prop) ||
                $(_prop).attr('src') ||
                $(_prop).attr('href') ||
                ''
            })
          item.properties[prop.attribs['itemprop']] = _item
        }
      })
      res.push(item)
    })

    return res
  }
  async parseData(data, fields) {
    let product, brand, offer, organization

    try {
      product = data.filter((el) => el.type.match('Product'))[0].properties
    } catch (err) {
      product = null
    }

    try {
      brand = data.filter((el) => el.type.match('Brand'))[0].properties
    } catch (err) {
      brand = null
    }

    try {
      offer = data.filter((el) => el.type.match('Offer'))[0].properties
    } catch (err) {
      offer = null
    }

    try {
      organization = data.filter((el) => el.type.match('Organization'))[0]
        .properties
    } catch (err) {
      organization = null
    }

    let res = {}
    try {
      // Name
      if (product && product.name) {
        if (Array.isArray(product.name)) res['name'] = product.name[0]
        else res['name'] = product.name
      }

      // Image
      if (product && product.image) {
        if (Array.isArray(product.image) && !product.image[0].match('logo'))
          res['image'] = product.image[0]
        else if (!Array.isArray(product.image) && !product.image.match('logo'))
          res['image'] = product.image
      } else if (product && product.images) {
        if (Array.isArray(product.images) && !product.images[0].match('logo'))
          res['image'] = product.images[0]
        else if (
          !Array.isArray(product.images) &&
          !product.images.match('logo')
        )
          res['image'] = product.images
      }

      // Price
      if (offer && offer.price) {
        if (Array.isArray(offer.price))
          res['price'] = this.formatPrice(offer.price[0])
        else res['price'] = this.formatPrice(offer.price)
      } else if (offer && offer.prices) {
        if (Array.isArray(offer.prices))
          res['price'] = this.formatPrice(offer.prices[0])
        else res['price'] = this.formatPrice(offer.prices)
      } else if (product && product.offers) {
        const offers = Array.isArray(product.offers)
          ? product.offers[0]
          : product.offers
        const price = offers.properties.price ?? false
        const prices = offers.properties.prices ?? false
        if (price) {
          if (Array.isArray(price)) res['price'] = this.formatPrice(price[0])
          else this.formatPrice(price)
        } else if (prices) {
          if (Array.isArray(prices)) res['price'] = this.formatPrice(prices[0])
          else this.formatPrice(prices)
        }
      } else if (product && product.price) {
        if (Array.isArray(product.price))
          res['price'] = this.formatPrice(product.price[0])
        else this.formatPrice(product.price)
      }

      // Price Currency
      if (offer && offer.priceCurrency) {
        if (Array.isArray(offer.priceCurrency))
          res['priceCurrency'] = this.convertCodeToSymbol(
            offer.priceCurrency[0]
          )
        else
          res['priceCurrency'] = this.convertCodeToSymbol(offer.priceCurrency)
      } else if (product && product.offers) {
        const offers = Array.isArray(product.offers)
          ? product.offers[0]
          : product.offers
        if (offers.properties.priceCurrency) {
          const priceCurrency = offers.properties.priceCurrency
          if (Array.isArray(priceCurrency))
            res['priceCurrency'] = this.convertCodeToSymbol(priceCurrency[0])
          else this.priceCurrency
        }
      } else if (product && product.priceCurrency) {
        if (Array.isArray(product.priceCurrency))
          res['priceCurrency'] = this.convertCodeToSymbol(
            product.priceCurrency[0]
          )
        else
          res['priceCurrency'] = this.convertCodeToSymbol(product.priceCurrency)
      }

      // Brand
      if (brand) {
        if (Array.isArray(brand.name)) res['brand'] = brand.name[0]
        else res['brand'] = brand.name
      } else if (product && product.brand && product.brand.properties.name) {
        const brandVal = product.brand.properties.name
        if (Array.isArray(brandVal)) res['brand'] = brandVal[0]
        else res['brand'] = brandVal
      }

      // Site Name
      if (organization && organization.name)
        res['site_name'] = organization.name
    } catch (err) {
      console.log(err)
    }

    return fields.reduce((acc, curr) => {
      if (res[curr] ?? false) acc[curr] = res[curr]
      return acc
    }, {})
  }
}

export default MicroData
