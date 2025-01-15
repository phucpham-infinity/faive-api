import * as cheerio from 'cheerio'
import {NodeHtmlMarkdown} from 'node-html-markdown'
import {stringSimilarity} from 'string-similarity-js'

import getGPTData from '../helpers/getGPTData.js'
import ScrapeParseInterface from './parseProdectData.js'
import {getHighestWidthImages} from "./crawl.js";

class ImageAlt extends ScrapeParseInterface {
    async getData(html, fields) {
        if (!fields.includes('gallery')) return {}
        return await this.parseData(await this.scrapeData(html), fields)
    }

    async scrapeData(html) {
        try {
            const $ = cheerio.load(html)

            const title = $('title').text()

            // const imgs = []
            // $('img').each((idx, el) => {
            //     const src = $(el).attr('src')
            //     const alt = $(el).attr('alt')
            //     const title = $(el).attr('title')
            //
            //     imgs.push({src, alt, title})
            // })

            let imgs = []
            const imageRegex =
                /(https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|gif|webp|svg)(\?[^\s"']*)?)/gi;
            imgs = html.match(imageRegex);
            if (imgs && imgs.length > 0) {
                imgs = getHighestWidthImages(imgs);
            }


            // console.log('Images ------------------------------\n', imgs)

            $('script').remove()
            $('link').remove()
            $('style').remove()
            $('noscript').remove()

            const body = $('body').html()

            return {
                imgs,
                body,
                title,
            }
        } catch (err) {
            console.log(err)
            return {}
        }
    }

    async parseData(data, fields) {
        if (data?.imgs?.length) {
            return {gallery: data?.imgs}
        }
        if (!(data.imgs ?? false)) {
            console.log('COULD NOT GET IMAGES')
            return {}
        }
        let img_url = ''

        // Getting image url based on maximum matched alt and title attribute text
        const matchedTextVal = data.imgs.reduce((acc, curr) => {
            const text = `${curr.alt} ${curr.title}`
            const val = stringSimilarity(text, data.title ?? '')
            if (val > acc) {
                img_url = curr.src
                return val
            }
            return acc
        }, 0)


        // Return if image url find with valid condition
        if (matchedTextVal > 0.6) return {image: img_url}

        // Convert HTML to markdown
        const markdown = NodeHtmlMarkdown.translate(
            data.body,
            {},
            undefined,
            undefined
        )
        let bodyText = markdown.split('\n')

        // Find similar text of html title
        let matchedTextIdx = []
        bodyText.forEach((el, idx) => {
            const val = stringSimilarity(el, data.title)
            if (val > 0.6) {
                matchedTextIdx.push({idx, el})
            }
        })

        // Getting closest data of all similar text
        let imageData = []
        matchedTextIdx.forEach((el) => {
            let sliceData = bodyText.slice(el.idx - 20, el.idx + 20)
            imageData = [...imageData, ...sliceData]
        })

        imageData = imageData.join('\n')
        // console.log('Body-------------------------------------', imageData)
        if (imageData === '') {
            return {}
        }

        const query = {
            image: {
                type: 'string',
            },
        }

        // Extract image url using GPT
        const image = await getGPTData({
            context: imageData,
            query,
            required: ['image'],
        })

        return image
    }
}

export default ImageAlt
