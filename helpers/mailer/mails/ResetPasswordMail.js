import Mailer from "../Mailer.js"

export default class ResetPasswordMail extends Mailer {
    constructor(subject = null) {
        return super(subject ?? "Reset Your Password - Verification Code Inside")
    }

    async send(vars = { name: "", otp: "", subject: "Reset Your Password - Verification Code Inside" }, from = null, to = null, subject = null) {
        await this.sendMail("reset-password", vars, from, to, subject)
    }
}