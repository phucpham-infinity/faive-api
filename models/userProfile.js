import mongoose from 'mongoose'
import {userProfileModelHook} from "./hooks/userProfile.hook.js";

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  image: {
    type: String,
    default: null,
  },
  cover_image: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    default: null,
  },
  instagram_user: {
    type: String,
    default: null,
  },
  tiktok_user: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
})

userProfileModelHook(userProfileSchema);
export default mongoose.model('UserProfile', userProfileSchema)
