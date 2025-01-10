import fs from 'node:fs'

// Read file content and return
const readFile = (filename) => {
  const path = `./temp/${filename}`
  const html = fs.readFileSync(path, 'utf-8')

  // After reading file delete it
  fs.unlinkSync(path)

  return html
}

export default readFile
