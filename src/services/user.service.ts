import { Users } from "../model/user.model"
import { userRepository } from "../repository/user.repository"
import { crypt } from "../services/bcrypt.service"
import * as jwt from "jsonwebtoken"
import { Company } from "../model/company.model"
import { companyService } from "./company.service"

function UserService() {
    this.userRepository = userRepository
    this.companyService = companyService
    this.bcrypt = crypt
}

UserService.prototype.getUserByEmail = async function(user: Users) {
    try {
        const result = await this.userRepository.getUserByEmail(user)
        return result.rows[0]
    } catch(e) {
        throw new Error("falha ao buscar por usuario")
    }
}

UserService.prototype.getUser = async function(userId: number, companyId: number) {
    try {
        const result = await this.userRepository.getUser(userId, companyId)
        return result.rows[0]
    } catch(e) {
        throw new Error("falha ao buscar por usuario")
    }
}

UserService.prototype.getUsers = async function(company: Company) {
    try {
        const result = await this.userRepository.getUsers(company.id)
        return result.rows
    } catch(e) {
        throw new Error("falha ao buscar por usuarios")
    }
}

UserService.prototype.userLogin = async function(user: Users) {
    try {        
        const usr = await this.getUserByEmail(user)
        if(!usr)
            throw new Error("usuario nao encontrado")
        
        const isValid = await this.bcrypt.compare(user.password, usr.password)
        if(isValid) {
            const payload = {
                email: usr.email,
                name: usr.name,
                company_id: usr.company_id
            }
            const token = jwt.sign(payload, process.env.SECRET as string)
            delete usr.password
            return { token, user: usr }
        } else {
            throw new Error("usuario ou senha invalidos")
        }
    } catch(e) {
        throw new Error("falha ao autenticar")
    }
}

UserService.prototype.saveUser = async function(user: Users) {
    try {
        let company = await this.companyService.getCompany(user.company.id)
        if(!company)
            throw new Error("empresa nao encontrada")

        const usr = await this.getUserByEmail(user)
        if(usr) 
            throw new Error("email em uso")
        const hash = await this.bcrypt.hash(user.password)
        user.password = hash
        const result = await this.userRepository.saveUser(user)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

UserService.prototype.updateUser = async function(user: Users) {
    try {
        user.updated_at = new Date
        let usr = await this.getUser(user.id, user.company.id)
        if(!usr)
            throw new Error("usuario nao encontrado")
        const result = await this.userRepository.updateUser(user)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

UserService.prototype.deleteUser = async function(user: Users) {
    try {
        let usr = await this.getUser(user.id, user.company.id)
        if(!usr)
            throw new Error("usuario nao encontrado")
        await this.userRepository.deleteUser(user)
        return {message: "usuario deletado"}
    } catch(e) {
        throw new Error(e.message)
    }
}

const userService = new (UserService as any)
export { userService }
