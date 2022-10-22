import { EmailOptions } from "../model/email.model"
import { createTransport } from 'nodemailer'

function EmailSender() { /* TODO 'EmailSender' is empty */ }

EmailSender.prototype.send = async function(options: EmailOptions) {
    try {
        const transporter = createTransport({
            host: options.host,
            port: options.port,
            auth: {
                user: options.username,
                pass: options.password
            }
        })
        await transporter.sendMail({
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
            attachments: options.attachments
        })
        return {message: "email sent"}
    } catch (e) {
        console.error("falha ao enviar email ", e.message)
        throw new Error(e.message)
    }
}

export { EmailSender }