import jwt from 'jsonwebtoken'

import config from '../config.js'

// Creating JWT token
const createToken = (data) => {
  return jwt.sign(data, config.jwt.secret, {
    expiresIn: config.jwt.expires_in,
  })
}

export default createToken
