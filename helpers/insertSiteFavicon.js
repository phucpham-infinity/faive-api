import db from '../db.js'
import Site from '../models/site.js'

// Insert site's favicon using 'npm run insert-icon' comment
const insertSiteFavicon = async () => {
  try {
    const site = await Site.findOne({ icon: undefined })

    if (!site) {
      console.log('All sites are upto date..')
      return false
    }

    console.log('Site - ', site.url)

    // Get site icon using Google API
    const icon = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${site.url}&size=128`

    await Site.findByIdAndUpdate(site._id, { icon })
  } catch (err) {
    console.log(err)
  }
}

;(async () => {
  await db.connect()

  while (true) await insertSiteFavicon()
})()
