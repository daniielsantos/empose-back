import { EmailOptions } from "../model/email.model"
import { emailSender } from "../services/email.service"

function EmailSenderController() {
    this.emailService = emailSender
}

EmailSenderController.prototype.send = async function(body: EmailOptions) {
    return this.emailService.send(body)
}

const emailSenderController = new (EmailSenderController as any)
export { emailSenderController } 

