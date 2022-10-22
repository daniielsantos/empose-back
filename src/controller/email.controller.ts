import { Request, Response } from "express"
import { EmailOptions } from "../model/email.model"
import { EmailSender } from "../services/email.service"

function EmailSenderController() {
    this.emailService = new EmailSender
}

EmailSenderController.prototype.send = async function(req: Request, res: Response) {
    try {
        const emailOptions: EmailOptions = req.body
        const result: any = await this.emailService.send(emailOptions)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.send({ message: "falha ao enviar email", error: e.message })
    }
}

const emailSenderController = new (EmailSenderController as any)
export { emailSenderController } 

