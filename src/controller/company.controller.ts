import { Request, Response } from "express"
import { Users } from "../model/user.model"
import { userService } from "../services/user.service"
import { companyService } from "../services/company.service"
import { Company } from "../model/company.model"
function CompanyController() {
    this.companyService = companyService
}

CompanyController.prototype.getCompany = async function(req: Request, res: Response) {
    try {
        console.log("aaaaa", req.params.id)
        const result: Company = await this.companyService.getCompany(req.params.id)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.status(400).send({ message: e.message })
    }
}

CompanyController.prototype.getCompanies = async function(req: Request, res: Response) {
    try {
        const result: Company = await this.companyService.getCompanies(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.status(400).send({ message: e.message })
    }
}

CompanyController.prototype.saveCompany = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.companyService.saveCompany(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.status(400).send({ message: e.message })
    }
}

CompanyController.prototype.updateCompany = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.companyService.updateCompany(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.status(400).send({ message: e.message })
    }
}

CompanyController.prototype.deleteCompany = async function(req: Request, res: Response) {
    try {
        const result: Users = await this.companyService.deleteCompany(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.status(400).send({ message: e.message })
    }
}



const companyController = new (CompanyController as any)
export { companyController } 

