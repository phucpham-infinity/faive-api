class AppError extends Error {
  /**
   *
   * @param { String } message Send the error message
   * @param { Number } statusCode Send the error status code
   */
  constructor(message, statusCode) {
    super(message)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
