import "dotenv/config"
import { EmailOptions } from "../model/email.model"
import { EmailSender } from "../services/email.service"

jest.mock("handlebars")
const Handlebars = require("handlebars")

jest.mock("nodemailer")
const nodemailer = require("nodemailer")
const sendEmailMock = jest.fn().mockReturnValueOnce('ok')
const sendEmailTemplateMock = jest.fn().mockReturnValueOnce('ok')
const setTemplateVariableMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValue({ sendMail: sendEmailMock, use:  sendEmailTemplateMock })
Handlebars.registerHelper.mockReturnValue("setVar")

const emailOptions: EmailOptions = {
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "empose@gmail.com",
    "password": "emp2&82!03",
    "from": "empose@gmail.com",
    "to": "empose@gmail.com",
    "subject": "Empose Recuperação de Senha",
    "text": "Empose",
    "html": "",
    "attachments": [
    ]
}
const makeSut = () => {
    return new EmailSender
}

beforeEach(() => {
    sendEmailMock.mockClear()
    nodemailer.createTransport.mockClear()
    setTemplateVariableMock.mockClear()
    Handlebars.registerHelper.mockClear()
})

describe("Nodemailer mail service",() => {
    test('should return ok if email is sent', async () => {
        const sut = makeSut()
        sendEmailMock.mockReturnValueOnce('ok')
        const result = await sut.send(emailOptions)
        expect(result.message).toEqual('email sent')
    });
    
    test('should call nodemailer createTransport', async () => {
        const sut = makeSut()
        const spyCreateTransport = jest.spyOn(nodemailer, 'createTransport')
        await sut.send(emailOptions)
     
        expect(spyCreateTransport).toHaveBeenCalledWith({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "empose@gmail.com",
                pass: "emp2&82!03"
            }
        })        
    });

    test('registerHelper', async () => {
        const sut = makeSut()
        const spySetVariables = jest.spyOn(sut, 'setTemplateVariable')
        // spySetVariables.mockImplementation
        await sut.send(emailOptions)

        expect(spySetVariables).toHaveBeenCalledWith("Empose", "1233112")         
        expect(spySetVariables).toBeCalledTimes(1)
    });

    test('should return error if email is not sent', async () => {
        const sut = makeSut()
        sendEmailMock.mockImplementationOnce(() => {
            throw new Error()
        })
        sendEmailTemplateMock.mockImplementationOnce(() => {
            throw new Error()
        })
        try {
            const result = await sut.send(emailOptions)
        } catch (error) {
            expect(error.message).toBe("falha ao enviar email")
        }
    });
})