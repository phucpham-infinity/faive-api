import mongoose from 'mongoose'

import config from './config.js'

const uri = config.mongo.uri

export default {
  connect: async () => {
    try {
      await mongoose.connect(uri)
      console.log('Database connection successfully...')
    } catch (err) {
      console.log(err)
    }
  },
}
