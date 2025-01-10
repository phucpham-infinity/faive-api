import mongoose from 'mongoose'

const siteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
})

export default mongoose.model('Site', siteSchema)
