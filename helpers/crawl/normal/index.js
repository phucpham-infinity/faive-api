import axios from "axios";
import * as cheerio from "cheerio";

export const crawlNormalSiteData = async (url) => {
  let $;
  const initPage = async () => {
    try {
      const { data } = await axios.get(url);
      $ = cheerio.load(data);
    } catch (error) {
      console.error("Error load page data:", error.message);
    }
  };

  try {
    await initPage();
  } catch (error) {
    console.error("Error fetching product:", error.message);
  }
};
