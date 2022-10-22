import { Request, Response } from "express"
import { Users } from "../model/user.model"
import { userService } from "../services/user.service"

function UserController() {
    this.userService = userService
}

UserController.prototype.getUser = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.userService.getUser(req.body)
        res.send(result)
    } catch(e) {
        console.error(e)
    }
}
UserController.prototype.userLogin = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.userService.userLogin(req.body)
        if(!result)
            return res.status(400).json({message: "Usuario ou senha invalidos"})
        res.send(result)
    } catch(e) {
        console.error(e)
    }
}

UserController.prototype.saveUser = async function(req: Request, res: Response) {
    try {
        const result = await this.userService.saveUser(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.status(400).send({ message: e.message })
    }
}
const userController = new (UserController as any)
export { userController } 

