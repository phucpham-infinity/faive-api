import mongoose from 'mongoose'

const productsUsersSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  faivelist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaxonomyTerm',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

productsUsersSchema.index(
  { product: 1, user: 1, faivelist: 1 },
  { unique: true }
)

export default mongoose.model('ProductsUsers', productsUsersSchema)
