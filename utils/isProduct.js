import * as cheerio from 'cheerio'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { stringSimilarity } from 'string-similarity-js'

import getGPTData from '../helpers/getGPTData.js'
import ScrapeParseInterface from './parseProdectData.js'
import getGPTIsProduct from "../helpers/getGPTIsProduct.js";

class IsProduct extends ScrapeParseInterface {
  async getData(html, fields) {
    return await this.parseData(await this.scrapeData(html, fields), fields)
  }
  async scrapeData(html, fields) {
    // console.log('fields', fields)
    const $ = cheerio.load(html)

    const title = $('title').text()

    $('link').remove()
    $('style').remove()
    $('script').remove()
    $('iframe').remove()
    $('noscript').remove()
    $('input').remove()
    $('select').remove()
    $('option').remove()
    $('meta').remove()
    $('svg').remove()
    $('header').remove()
    $('footer').remove()
    $('i').remove()

    $('body')
      .contents()
      .filter(function () {
        return this.type === 'comment'
      })
      .remove()

    if (!fields.includes('image')) $('a').remove()

    const body = $('body').html()

    // console.log('Body', body)

    // Convert HTML to markdown
    const markdown = NodeHtmlMarkdown.translate(body, {}, undefined, undefined)
    let bodyText = markdown
      .replaceAll(/\n+/g, '\n')
      .replaceAll(/https?:\/\/[^)]+/g, '')
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/[-+_|]+/g, '')

    const bodyline = bodyText.split('.')
    // console.log('bodyText', bodyline)

    // Getting only text content of the website
    let max = 0,
      idx = 0
    bodyline.forEach((el, i) => {
      const similar = stringSimilarity(el, title)
      if (similar > 0.6 && similar > max) {
        max = similar
        idx = i
      }
    })

    const start = idx - 50 < 0 ? 0 : idx - 50
    const end = idx + 50 >= bodyline.length ? bodyline.length : idx + 50

    const filterText = bodyline.slice(start, end)

    return filterText.join('.')
  }

  async parseData(data, fields) {
    if (!data) {
      return {}
    }
    const gptData = await getGPTIsProduct({ context: data})
     return {isProduct: gptData}
  }
}

export default IsProduct
