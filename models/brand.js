import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
})

brandSchema.index({name: 1, url: 1}, {unique: true});

export default mongoose.model('Brand', brandSchema)
