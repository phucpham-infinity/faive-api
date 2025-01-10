import config from '../../../config.js'
import postmark from 'postmark'

export default class PostmarkTransport {
  #transport = null

  constructor() {
    this.#transport = new postmark.ServerClient(
      config.mail.config.postmark.token
    )
  }

  async sendMail({ from, to, subject, html, attachments }) {
    await this.#transport.sendEmail({
      From: from,
      To: to,
      Subject: subject,
      HtmlBody: html,
      Attachments: attachments,
    })
  }
}
