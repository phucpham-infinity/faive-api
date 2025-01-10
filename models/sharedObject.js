import mongoose from 'mongoose'

const sharedObjectSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  payload: {
    type: {},
    required: true,
  },
})

const SharedObject = mongoose.model('SharedObject', sharedObjectSchema)

export default SharedObject
