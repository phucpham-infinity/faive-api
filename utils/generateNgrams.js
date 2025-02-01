export const generateNgrams = (textArray, minN = 1, maxN = 3) => {
    let ngramsSet = new Set();

    textArray.forEach(text => {
        text = text.toLowerCase().replace(/[^a-z0-9]/g, ""); // Chuẩn hóa văn bản
        for (let n = minN; n <= maxN; n++) {
            for (let i = 0; i <= text.length - n; i++) {
                ngramsSet.add(text.substring(i, i + n));
            }
        }
    });

    return Array.from(ngramsSet);
}