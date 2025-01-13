export const extractWidth = (url) => {
  const match = url.match(/width=(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const getHighestWidthImages = (links) => {
  const grouped = {};
  links.forEach((link) => {
    const baseUrl = link.split("?")[0];
    const width = extractWidth(link);

    if (!grouped[baseUrl] || grouped[baseUrl].width < width) {
      grouped[baseUrl] = { url: link, width };
    }
  });

  return Object.values(grouped).map((item) => item.url);
};
