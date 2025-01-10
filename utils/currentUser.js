import jwt from 'jsonwebtoken'

import User from '../models/user.js'

class CurrentUser {
  constructor(token = '') {
    this.token = token
    this._user = {}
  }

  static async make(...args) {
    const u = new CurrentUser(...args)
    await u._loadUser()
    return u
  }

  async _loadUser() {
    // Get token
    let token
    if (this.token && this.token.startsWith('Bearer')) {
      token = this.token.split(' ')[1]
    }

    if (!token) return

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Check if user still exists
    const currentUser = await User.findById(decoded._id)
    if (!currentUser) return

    this._user = currentUser
  }

  // Return user's id
  getId() {
    return this._user._id || ''
  }

  // Return user's full name
  getName() {
    return `${this._user.first_name} ${this._user.last_name}` || ''
  }

  // Return user's email
  getEmail() {
    return this._user.email || ''
  }
}

export default CurrentUser
