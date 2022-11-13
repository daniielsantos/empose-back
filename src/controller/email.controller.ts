import { EmailOptions } from "../model/email.model"
import { EmailSender } from "../services/email.service"

function EmailSenderController() {
    this.emailService = new EmailSender
}

EmailSenderController.prototype.send = async function(body: EmailOptions) {
    return this.emailService.send(body)
}

const emailSenderController = new (EmailSenderController as any)
export { emailSenderController } 

