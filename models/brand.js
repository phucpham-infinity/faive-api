import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
  },
})

export default mongoose.model('Brand', brandSchema)
