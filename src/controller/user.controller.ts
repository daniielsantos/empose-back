import { Request, Response } from "express"
import { Company } from "../model/company.model"
import { Users } from "../model/user.model"
import { userService } from "../services/user.service"
import { Req } from "../types/request"

function UserController() {
    this.userService = userService
}

UserController.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

UserController.prototype.userLogin = async function(user: Users) {
    const result: Users = await this.userService.userLogin(user)
    if(!result)
        throw new Error("Usuario ou senha invalidos")
    return result
}

UserController.prototype.accountRecovery = async function(user: Users) {
    const result: Users = await this.userService.accountRecovery(user)
    return result
}

UserController.prototype.getUser = async function(userId: number, usr: any): Promise<Users> {
    let company = this.getCompany(usr)
    return this.userService.getUser(userId, company.id)
}

UserController.prototype.getUsers = async function(user: any): Promise<Users[]> {
    const company: Company = this.getCompany(user)
    console.log("aaaaaaa ", user)
    return this.userService.getUsers(company)
}

UserController.prototype.saveRegister = async function(user: Users): Promise<Users> {
    return this.userService.saveRegister(user)
}

UserController.prototype.saveUser = async function(user: Users, usr: any): Promise<Users> {
    const company = this.getCompany(usr)
    user.company = company
    return this.userService.saveUser(user)
}

UserController.prototype.updateUser = async function(user: Users, usr: any): Promise<Users> {
    const company = this.getCompany(usr)
    user.company = company
    return this.userService.updateUser(user)
}

UserController.prototype.deleteUser = async function(user: Users, usr: any): Promise<void> {
    const company = this.getCompany(usr)
    user.company = company
    return this.userService.deleteUser(user)
}


const userController = new (UserController as any)
export { userController } 

