import { Router, Response } from "express"
import { emailSenderController } from "../controller/email.controller"
import { Req } from "../types/request"
const router = Router()

export default function(emailSenderController: any) {
    router.post("/email-sender", async (req: Req, res: Response) => {
        await emailSenderController.send(req, res)
    })
    return router
}
