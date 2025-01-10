import User from '../../models/user.js'
import UserProfile from '../../models/userProfile.js'

export default class UserShareController {
  // Generate shared object with type user and user data
  static async generate(data) {
    return {
      type: 'user',
      payload: data,
    }
  }

  // Expand a shared user object and return the user data and profile data
  static async expand(sharedObj) {
    if (!sharedObj) return null

    const id = sharedObj?.payload?.id

    const user = await User.findById(id)
    const userProfile = await UserProfile.findOne({ user: id })

    const _id = userProfile.user
    userProfile.user = undefined

    return {
      ...userProfile._doc,
      _id,
      name: `${user.first_name} ${user.last_name}`,
    }
  }
}
