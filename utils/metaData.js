import * as cheerio from 'cheerio'

import ScrapeParseInterface from './parseProdectData.js'

class MetaData extends ScrapeParseInterface {
  async getData(html, fields) {
    return await this.parseData(await this.scrapeData(html), [
      ...fields,
      'image',
    ])
  }
  async scrapeData(html) {
    const $ = cheerio.load(html)

    /**
     *
     */
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('meta[name="og:title"]').attr('content')
    const image =
      $('meta[property="og:image"]').attr('content') ||
      $('meta[name="og:image"]').attr('content')
    const imageUrl =
      $('meta[property="og:image:url"]').attr('content') ||
      $('meta[name="og:image:url"]').attr('content')
    const imageSecureUrl =
      $('meta[property="og:image:secure_url"]').attr('content') ||
      $('meta[name="og:image:secure_url"]').attr('content')
    const site_name =
      $('meta[property="og:site_name"]').attr('content') ||
      $('meta[name="og:site_name"]').attr('content')
    // const icon =
    //   $('link[rel="icon"]').attr('href') ||
    //   $('link[rel="shortcut icon"]').attr('href')
    const price =
      $('meta[property="price"]').attr('content') ||
      $('meta[name="price"]').attr('content')
    const priceCurrency =
      $('meta[property="priceCurrency"]').attr('content') ||
      $('meta[name="priceCurrency"]').attr('content')
    const description =
        $('meta[property="description"]').attr('content') ||
        $('meta[name="description"]').attr('content')
    const brand =
      $('meta[property="brand"]').attr('content') ||
      $('meta[name="brand"]').attr('content')


    // console.log('ICON   ', site_favicon)

    return {
      name: title,
      description,
      image: image || imageUrl || imageSecureUrl,
      site_name,
      // site_favicon: site_favicon ?? 'favicon.ico',
      price,
      priceCurrency: priceCurrency
        ? this.convertCodeToSymbol(convertCodeToSymbol)
        : undefined,
      brand,
    }
  }

  async parseData(data, fields) {
    return fields.reduce((acc, curr) => {
      if (data[curr] ?? false) acc[curr] = data[curr]
      return acc
    }, {})
  }
}

export default MetaData
