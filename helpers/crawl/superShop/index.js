import axios from 'axios';
import * as cheerio from 'cheerio';


const extractWidth = (url) => {
    const match = url.match(/width=(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
};

const getHighestWidthImages = (links) => {
    const grouped = {};

    links.forEach((link) => {
        const baseUrl = link.split('?')[0];
        const width = extractWidth(link);

        if (!grouped[baseUrl] || grouped[baseUrl].width < width) {
            grouped[baseUrl] = { url: link, width };
        }
    });

    return Object.values(grouped).map((item) => item.url);
};

export const crawlData = async (url) => {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        let imageUrls = [];

        const galleryContent = $('#product-gallery').html();

        if (galleryContent) {
          const imageRegex = /(https:\/\/static\.super-shop\.com\/[^\s"']+)/g;

            const imageLinks = galleryContent.match(imageRegex);

            if (imageLinks && imageLinks.length > 0) {
                imageUrls = getHighestWidthImages(imageLinks)
            }
        }
        return imageUrls;
    } catch (error) {
        console.error('Error fetching product images:', error.message);
    }
}