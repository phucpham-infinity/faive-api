export const getMainDomain = (url) => {
    try {
        const hostname = new URL(url).hostname;
        const parts = hostname.split('.');

        return parts.length >= 3 ? parts.slice(-3, -2)[0] : parts[0];
    } catch (e) {
        console.error("Invalid URL", e);
        return null;
    }
};