import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/apiError.js";
import { crawlData } from "../../helpers/crawl/superShop/index.js";

export default catchAsync(async (req, res, next) => {
  const user = req.user._id;
  if (!user || !req.body.url) {
    return next(
      new AppError("Something went wrong! Do not complete this process", 500)
    );
  }
  const url = decodeURIComponent(req.body.url);

  if (url.includes("super-shop.com")) {
    const data = await crawlData(url);
    res.status(200).json({
      status: "success",
      data,
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
      url,
    },
  });
});
