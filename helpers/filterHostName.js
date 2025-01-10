// Validate site hostname
const filterHostName = (hostname) => {
  if (!hostname) {
    return ''
  }

  hostname = hostname.replace(/^ww[w0-9]{1}/, '')

  return hostname
}

export default filterHostName
