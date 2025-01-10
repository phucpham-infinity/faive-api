import OpenAI from 'openai'
import config from '../config.js'

// Create OpenAI object using API key
export default new OpenAI({
  apiKey: config.openai.api_key, // This is the default and can be omitted
})
