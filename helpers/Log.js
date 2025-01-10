import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import config from '../config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Log {
  static #writeMessage(level, message, fileNamePrefix = 'log') {
    const finalMessage = `[${Log.#getDate()} ${Log.#getTime()}] ${level} : ${
        typeof message === 'object' ? Log.#safeStringify(message) : message
    }\n\n`
    const fileName = `${fileNamePrefix}-${Log.#getDate()}.log`
    const filePath = path.join(__dirname, '..', config.logs.path, fileName)

    try {
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      fs.appendFile(filePath, finalMessage, (err) => {
        if (err) process.stderr.write(`Failed to write log: ${err}\n`)
      })
    } catch (err) {
      process.stderr.write(`Failed to prepare log file: ${err}\n`)
    }
  }

  static #getDate() {
    return new Date().toISOString().split('T')[0]
  }

  static #getTime() {
    return new Date().toISOString().split('T')[1].split('.')[0]
  }

  static #safeStringify(obj) {
    try {
      return JSON.stringify(obj)
    } catch (err) {
      return `Failed to stringify object: ${err}`
    }
  }

  static info(message, fileNamePrefix = 'log') {
    Log.#writeMessage('INFO', message, fileNamePrefix)
  }

  static warn(message, fileNamePrefix = 'log') {
    Log.#writeMessage('WARN', message, fileNamePrefix)
  }

  static error(message, fileNamePrefix = 'log') {
    Log.#writeMessage('ERROR', message, fileNamePrefix)
  }
}
