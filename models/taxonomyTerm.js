import mongoose from 'mongoose'

const taxonomyTermSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

taxonomyTermSchema.index({ name: 1 })

export default mongoose.model('TaxonomyTerm', taxonomyTermSchema)
