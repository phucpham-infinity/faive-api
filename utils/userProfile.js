import UserProfile from '../models/userProfile.js'

export default class CurrentUserProfile {
  constructor(userId = '') {
    this.userId = userId
    this._userProfile = {}
  }

  static async make(...args) {
    const profile = new CurrentUserProfile(...args)
    await profile._loadProfile()
    return profile
  }

  async _loadProfile() {
    this._userProfile = await UserProfile.findOne({ user: this.userId })
  }

  getdefaultFaiveList() {
    return this._userProfile.defaultFaivelist
  }
}
