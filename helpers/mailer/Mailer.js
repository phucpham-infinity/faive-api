import fs from 'node:fs'
import Mustache from 'mustache'
import Log from '../Log.js'
import config from '../../config.js'
import Transport from './Transport.js'
import {fileURLToPath} from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class Mailer {
    #subject = ''
    #to = ''
    #from = ''
    #transporter = null

    constructor(sub) {
        this.#createTransport()
        return this.subject(sub)
    }

    // Getting html template and variables
    #getTemplateString(template, vars) {
        const data = fs.readFileSync(
            `${path.join(__dirname, 'templates')}/${template}.html`,
            {encoding: 'utf8', flag: 'r'}
        )
        return Mustache.render(data, vars)
    }

    #createTransport() {
        this.#from = config.mail.from
        this.#transporter = new Transport()

        console.log('TP ', this.#transporter)
        console.log('TP CLASS: ', this.#transporter.constructor.name)
    }

    subject(sub) {
        this.#subject = sub
        return this
    }

    to(to) {
        this.#to = to
        return this
    }

    from(from) {
        this.#from = from
        return this
    }

    async sendMail(template, vars, from = null, to = null, subject = null) {
        if (from ?? false) this.from(from)
        if (to ?? false) this.to(to)
        if (subject ?? false) this.subject(subject)

        const newVars = {subject: this.#subject, ...vars}

        try {
            const templateString = this.#getTemplateString(template, newVars)

            const mailOptions = {
                from: this.#from,
                to: this.#to,
                subject: this.#subject,
                html: templateString,
                attachments: [
                    // Add all attachments(images) to email
                    {
                        filename: 'faive.png',
                        path: `${path.join(__dirname, 'images')}/faive.png`,
                        cid: 'faive-logo',
                    },
                    {
                        filename: 'instagram.png',
                        path: `${path.join(__dirname, 'images')}/instagram.png`,
                        cid: 'instagram-logo',
                    },
                    {
                        filename: 'tiktok.png',
                        path: `${path.join(__dirname, 'images')}/tiktok.png`,
                        cid: 'tiktok-logo',
                    },
                    {
                        filename: 'web.png',
                        path: `${path.join(__dirname, 'images')}/web.png`,
                        cid: 'web-logo',
                    },
                ],
            }

            await this.#transporter.sendMail(mailOptions)

            Log.info(`Mail sent from ${this.#from} to ${this.#to} successfully`)
        } catch (err) {
            console.log('Error ', err)
            Log.error(JSON.stringify({message: err.message, stack: err.stack}))
            throw err
        }
    }
}
