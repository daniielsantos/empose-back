import { companyRepository } from "../repository/company.repository"
import { crypt } from "./bcrypt.service"
import { Company } from "../model/company.model"

function CompanyService(this: any) {
    this.companyRepository = companyRepository
    this.bcrypt = crypt
}

CompanyService.prototype.getCompanies = async function() {
    try {
        const result = await this.companyRepository.getCompanies()
        return result.rows
    } catch(e) {
        console.error(e.message)
        throw new Error("Falha ao buscar empresas")
    }
}

CompanyService.prototype.getCompany = async function(company: Company) {
    try {
        const result = await this.companyRepository.getCompany(company)
        return result.rows
    } catch(e) {
        console.error(e.message)
        throw new Error("Falha ao buscar empresa")
    }
}

CompanyService.prototype.saveCompany = async function(company: Company) {
    try {        
        const result = await this.companyRepository.saveCompany(company)
        return result.rows
    } catch(e) {
        console.error(e.message)
        throw new Error("Falha ao inserir empresa")
    }
}

CompanyService.prototype.updateCompany = async function(company: Company) {
    try {        
        const result = await this.companyRepository.updateCompany(company)
        return result.rows
    } catch(e) {
        console.error(e.message)
        throw new Error("Falha ao atualizar empresa")
    }
}


const companyService = new (CompanyService as any)
export { companyService }
