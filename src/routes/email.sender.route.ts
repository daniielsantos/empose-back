import { Router, Response } from "express"
import { emailSenderController } from "../controller/email.controller"
import { Req } from "../types/request"
const router = Router()


router.post("/email-sender", async (req: Req, res: Response) => {
    await emailSenderController.send(req, res)
})

export = { router }