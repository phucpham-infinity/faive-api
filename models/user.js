import argon2 from "argon2";
import mongoose from 'mongoose'
import config from '../config.js'
import {userModelHook} from "./hooks/user.hook.js";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Enter your confirm password'],
    validate: {
      // This only works on Create and Save
      validator: function (el) {
        return el === this.password
      },
      message: 'Password and confirm password should be same!',
    },
  },
  productCount: {
    type: Number,
    default: 0
  },
  hasEverAddedProduct: {
    type: Boolean,
    default: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
})

// Convert user's original password to hash
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified

  if (!this.isModified('password')) return next()

  // Hash the password with cost 12
  this.password = await argon2.hash(this.password, {hashLength:12})

  // Delete passwordConfirm field
  this.confirmPassword = undefined
  next()
})

// Generate token on forget password
// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex')

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000

//   return resetToken
// }

const generateOtp = () => {
  const types = {
    alphanumeric: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeric: '0123456789',
    alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  }

  const otpType = config.otp.type
  const otpLength = config.otp.length

  const str = types[otpType]

  let OTP = ''

  for (let i = 0; i < otpLength; i++) {
    OTP += str[Math.floor(Math.random() * otpLength)]
  }

  return OTP
}

userSchema.methods.createPasswordResetToken = function () {
  const otp = generateOtp()

  this.passwordResetToken = otp
  this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000

  return otp
}

// Match entered password and database password are equal or not on user login
userSchema.methods.checkPassword = async (password, dbPassword) => {
  return await argon2.verify(dbPassword,password)
}

userSchema.index({ email: 1 }, { unique: true })

userModelHook(userSchema)

export default mongoose.model('User', userSchema)
