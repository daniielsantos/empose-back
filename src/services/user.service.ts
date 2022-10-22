import { Users } from "../model/user.model"
import { userRepository } from "../repository/user.repository"
import { crypt } from "../services/bcrypt.service"
import * as jwt from "jsonwebtoken"
import { companyRepository } from "../repository/company.repository"

function UserService(this: any) {
    this.userRepository = userRepository
    this.companyRepository = companyRepository
    this.bcrypt = crypt
}

UserService.prototype.getUser = async function(user: Users) {
    try {
        const result = await this.userRepository.getUser(user)
        return result.rows
    } catch(e) {
        console.error(e)
        return e
    }
}

UserService.prototype.userLogin = async function(user: Users) {
    try {        
        const result = await this.userRepository.getUser(user)
        const usr = result.rows[0]
        if(!usr)
            return null
        
        const isValid = await this.bcrypt.compare(user.password, usr.password)
        if(isValid) {
            const payload = {
                email: usr.email,
                name: usr.name
            }
            const token = jwt.sign(payload, process.env.SECRET as string)
            delete usr.password
            return { token, user: usr }
        } else {
            return null
        }
    } catch(e) {
        console.error(e)
        return e
    }
}

UserService.prototype.saveUser = async function(user: Users) {
    try {
        if(!user.company.id)
            throw new Error("campo 'company' obrigatorio")
        let company = await this.companyRepository.getCompany(user.company)
        if(!company.rows.length)
            throw new Error("empresa nao encontrada")

        const usr = await this.getUser(user)
        if(usr.length) 
            return "User already exists"
        const hash = await this.bcrypt.hash(user.password)
        user.password = hash
        const result = await this.userRepository.saveUser(user)
        return result.rows
    } catch(e) {
        console.error(e.message)
        throw new Error(e.message)
    }
}

const userService = new (UserService as any)
export { userService }
