import https from 'https'
import fs from 'fs'

// Download image from given url and save to given path
const downloadImage = (imgUrl, path) => {
  return new Promise(function (resolve, reject) {
    const file = fs.createWriteStream(path)
    https.get(imgUrl, function (res) {
      res.pipe(file)

      file.on('finish', () => {
        file.close()
        return resolve(path)
      })

      file.on('error', () => {
        file.close()
        return reject('')
      })
    })
  })
}

export default downloadImage
