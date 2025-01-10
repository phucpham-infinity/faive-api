import nodemailer from 'nodemailer'
import config from '../../../config.js'

export default class NodemailerTransport {
  #transport = null

  constructor() {
    this.#transport = nodemailer.createTransport(config.mail.config.smtp)
  }

  async sendMail({ from, to, subject, html, attachments }) {
    await this.#transport.sendMail({ from, to, subject, html, attachments })
  }
}
