import config from '../../config.js'
import NodemailerTransport from './transports/NodemailerTransport.js'
import PostmarkTransport from './transports/PostmarkTransport.js'

export default class Transport {
  constructor(type = null) {
    const t = type ?? config.mail.type

    switch (t) {
      case 'smtp':
        return new NodemailerTransport()
      case 'postmark':
        return new PostmarkTransport()
      default:
        throw new Error('Mail transport not found')
    }
  }
}
