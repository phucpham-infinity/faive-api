import uuid4 from 'uuid4'

import UserShareController from './shareUser.js'
import SharedObject from '../../models/sharedObject.js'
import FaivelistShareController from './shareFaivelist.js'

export default class ShareController {
  constructor() {
    // Initializing the shareMapper object to map share types to their respective controllers
    this.shareMapper = {
      user: UserShareController,
      faivelist: FaivelistShareController,
    }
  }

  // Generate a shared object and store to database
  async generate(controller, data) {
    if (!this.shareMapper.hasOwnProperty(controller)) return null

    const { payload, type } = await this.shareMapper[controller].generate(data)

    // Generate a unique URL
    const url = uuid4()

    const sharedData = await SharedObject.create({ url, payload, type })

    return sharedData
  }

  // Expand a shared object from a URL and object type
  async expand(url) {
    // console.log(url)
    const res = await SharedObject.findOne({ url })

    // console.log('Res', res)
    if (!res) return null

    const data = await this.shareMapper[res.type].expand(res)

    return data
  }
}
