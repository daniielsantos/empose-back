import { Request, Response } from "express"
import { Company } from "../model/company.model"
import { Users } from "../model/user.model"
import { userService } from "../services/user.service"
import { Req } from "../types/request"

function UserController() {
    this.userService = userService
}

UserController.prototype.getCompany = function(req: Req, res: Response) {
    const user = JSON.stringify(req.user)
    const userParsed = JSON.parse(user)
    const company: Company = {
        id: userParsed.company_id
    }
    return company
}

UserController.prototype.getUser = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.userService.getUser(req.params.id)
        res.send(result)
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
}

UserController.prototype.getUsers = async function(req: Request, res: Response) {
    try {
        const company: Company = this.getCompany(req, res)
        const result: Users = await this.userService.getUsers(company)
        res.send(result)
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
}

UserController.prototype.userLogin = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.userService.userLogin(req.body)
        if(!result)
            return res.status(400).json({message: "Usuario ou senha invalidos"})
        res.send(result)
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
}

UserController.prototype.saveUser = async function(req: Request, res: Response) {
    try {
        const result = await this.userService.saveUser(req.body)
        res.send(result)
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
}

UserController.prototype.updateUser = async function(req: Req, res: Response) {
    try {
        const result = await this.userService.updateUser(req.body)
        res.send(result)
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
}

UserController.prototype.deleteUser = async function(req: Req, res: Response) {
    try {
        const result = await this.userService.deleteUser(req.body)
        res.send(result)
    } catch(e) {
        res.status(400).send({ message: e.message })
    }
}


const userController = new (UserController as any)
export { userController } 

