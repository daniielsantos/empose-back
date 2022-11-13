import "dotenv/config"
import { EmailOptions } from "../model/email.model"
import { emailSender } from "../services/email.service"
import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)
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
    return emailSender
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
            await sut.send(emailOptions)
        } catch (error) {
            expect(error.message).toBe("falha ao enviar email")
        }
    });
})


jest.setTimeout(10000)

const send = jest.fn()

const app = makeApp({
},{
},{
},{
},{
},{
},{
},{
},{
},{
    send
})


describe('/api/v1/email-sender', () => {
    beforeEach(() => {
        send.mockReset()
    });
    let emailSenderIn, payload, emailSenderResponse
    let token = 'bearer '
    emailSenderIn = {
        host: "smtp.gmail.com",
        port: 587,
        username: "daniielsouzapvh@gmail.com",
        password: "manjmogzlupwopwx",
        from: "daniielsouzapvh@gmail.com",
        to: "daniielsouzapvh@gmail.com",
        subject: "Empose Recuperação de Senha",
        text: "Daniel Santos",
        html: "",
        attachments: [
            {
                filename: "image_test.jpg",
                path: "./src/attachments/image_test.jpg"
            }
        ]
    }
    emailSenderResponse = {
        message: "email sent"
    }
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should send email', async () => {
        expect(token)
        send.mockResolvedValue(emailSenderResponse)
        let res = await request(app)
            .post('/api/v1/email-sender')
            .set('authorization', token)
            .send(emailSenderResponse)
        
        expect(res.status).toBe(200)
        expect(send.mock.calls.length).toBe(1)
        expect(send.mock.calls[0][0]).toMatchObject(emailSenderResponse)
        expect(res.body).toMatchObject(emailSenderResponse)
    });

    it('should return error', async () => {
        send.mockImplementationOnce(() => {
            throw new Error("erro ao enviar email")
        })
        let res = await request(app)
        .post('/api/v1/email-sender')
        .set('authorization', token)
        .send(emailSenderIn)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao enviar email"})
        expect(send.mock.calls.length).toBe(1)
    });

});
