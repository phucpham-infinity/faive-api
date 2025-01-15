import axios from "axios";
import * as cheerio from "cheerio";
import * as common from "../../../utils/crawl.js";

export const crawlSuperShopData = async (url) => {
    let $;

    const crawlProductGalleryImages = () => {
        let imageUrls = [];
        const galleryContent = $("#product-gallery").html();
        if (galleryContent) {
            const imageRegex =
                /(https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|gif|webp|svg)(\?[^\s"']*)?)/gi;
            imageUrls = galleryContent.match(imageRegex);
            if (imageUrls && imageUrls.length > 0) {
                imageUrls = common.getHighestWidthImages(imageUrls);
            }
        }
        return imageUrls;
    };

    const crawlProductMeta = () => {
        return {
            title: $('meta[property="og:title"]').attr('content') || $('title').text(),
            description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
            image: $('meta[property="og:image"]').attr('content'),
            url: $('meta[property="og:url"]').attr('content') || url,
            siteName: $('meta[property="og:site_name"]').attr('content'),
            siteOrigin: new URL(url).origin.replace(/(^\w+:|^)\/\//, '')
        }
    }

    const crawlProductInfo = () => {
        const sidebar = $(".npp-sidebar");

        const productName = sidebar.find(".product-title").text().trim();
        const productId = sidebar.find(".product-id .id").text().trim();

        const brandName = sidebar.find(".npp-brand").attr("title") || null;
        const brandLogo = sidebar.find(".npp-brand i").attr("class") || null;
        const brandLink = sidebar.find(".npp-brand").attr("href") || null;

        const currentPriceText = sidebar.find(".current-price").text().trim();
        const currentPriceMatch = currentPriceText.match(/([\d.,]+)\s*([\w€$]+)/);
        const currentPrice = currentPriceMatch ? currentPriceMatch[1] : null;
        const currentCurrency = currentPriceMatch ? currentPriceMatch[2] : null;

        const previousPriceText = sidebar.find(".prev-price").text().trim() || null;
        let previousPrice = null;
        if (previousPriceText) {
            const previousPriceMatch = previousPriceText.match(/([\d.,]+)/);
            previousPrice = previousPriceMatch ? previousPriceMatch[1] : null;
        }

        const discountPercentage =
            sidebar.find(".price-discount").text().trim() || null;

        let productDescriptionMarkdown;
        const productDescriptionItems = [];
        sidebar.find(".product-introduction li").each((_, element) => {
            const text = $(element).text().trim();
            productDescriptionItems.push(`- ${text}`);
        });
        if (productDescriptionItems.length > 0) {
            productDescriptionMarkdown = productDescriptionItems.join("\n");
        } else {
            productDescriptionMarkdown = sidebar
                .find(".product-introduction")
                .text()
                .trim();
        }

        return {
            name: productName,
            productId: productId,
            price: currentPrice,
            description: productDescriptionMarkdown,
            priceCurrency: currentCurrency,
            url,
            previousPrice,
            discountPercentage,
            brand: {
                name: brandName,
                icon: brandLogo,
                url: brandLink,
            },
        };
    };

    const initPage = async () => {
        try {
            const {data} = await axios.get(url);
            $ = cheerio.load(data);
        } catch (error) {
            console.error("Error fetching product images:", error.message);
        }
    };

    try {
        await initPage();
        const productMeta = crawlProductMeta();
        const imageUrls = crawlProductGalleryImages();
        const productInfo = crawlProductInfo();

        return {image: imageUrls, info: productInfo, meta: productMeta};
    } catch (error) {
        console.error("Error fetching product images:", error.message);
    }
};
