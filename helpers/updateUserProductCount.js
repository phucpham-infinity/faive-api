import db from '../db.js'
import Product from '../models/product.js'
import User from '../models/user.js'

// Update user product count using 'npm run update' comment
const updateProductCount = async () => {
  try {
    const users = await User.find()

    users.map(async (user) => {
      const productCount = await Product.countDocuments({ user: user._id })

      console.log(`${user.email}  ->   ${productCount}`)

      await User.findByIdAndUpdate(user._id, { productCount })
    })
  } catch (err) {
    console.log(err)
  }
}

;(async () => {
  await db.connect()

  await updateProductCount()
})()
