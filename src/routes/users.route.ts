import { Router, Response } from "express"
import { userController } from "../controller/user.controller"
import { Req } from "../types/request"
const router = Router()


router.get("/users/:id", async (req: Req, res: Response) => {
    await userController.getUser(req, res)
})

router.get("/users", async (req: Req, res: Response) => {
    await userController.getUsers(req, res)
})

router.post("/users", async (req: Req, res: Response) => {
    await userController.saveUser(req, res)
})

router.put("/users", async (req: Req, res: Response) => {
    await userController.updateUser(req, res)
})

router.delete("/users", async (req: Req, res: Response) => {
    await userController.deleteUser(req, res)
})

export = { router }