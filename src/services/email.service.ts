import { EmailOptions } from "../model/email.model"
import { createTransport } from 'nodemailer'
import hbs from "nodemailer-express-handlebars"
import path from "path"
import Handlebars from "handlebars"

function EmailSender() { 
    // this.hbs = hbs
 }

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

        this.setTemplateVariable(options.text, "1233112")
     
        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                partialsDir: path.resolve('./src/views/'),
                layoutsDir: path.resolve('./src/views/'),
                defaultLayout: 'password_recover'
            },
            viewPath: path.resolve('./src/views/'),
            extName: '.handlebars'
        }))

        let sendOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
            attachments: options.attachments,
            template: 'password_recover'
        }
        
        await transporter.sendMail(sendOptions)
        return { message: "email sent" }
    } catch (e) {
        // return new Error("falha ao enviar email")
        throw new Error("falha ao enviar email")
    }
}

EmailSender.prototype.setTemplateVariable = function(name: string, password: string) {
    Handlebars.registerHelper("setVar", function(varName, varValue, opt) {
        switch (varName) {
            case 'name': {
                opt.data.root[varName] = name;
            } break
            case 'password': {
                opt.data.root[varName] = password;
            } break
        }
    });
}

export { EmailSender }