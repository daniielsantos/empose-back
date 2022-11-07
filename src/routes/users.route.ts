import { Router, Response } from "express"
import { userController } from "../controller/user.controller"
import { Req } from "../types/request"
const router = Router()


router.get("/users", async (req: Req, res: Response) => {
    await userController.getUser(req, res)
})

router.post("/users", async (req: Req, res: Response) => {
    await userController.saveUser(req, res)
})

export = { router }