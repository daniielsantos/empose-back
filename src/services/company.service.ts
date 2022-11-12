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
        throw new Error("Falha ao buscar empresas: "+ e.message)
    }
}

CompanyService.prototype.getCompany = async function(companyId: number) {
    try {
        const result = await this.companyRepository.getCompany(companyId)
        return result.rows[0]
    } catch(e) {
        throw new Error("Falha ao buscar empresa: "+ e.message)
    }
}

CompanyService.prototype.saveCompany = async function(company: Company) {
    try {        
        const result = await this.companyRepository.saveCompany(company)
        return result.rows[0]
    } catch(e) {
        throw new Error("Falha ao inserir empresa: "+ e.message)
    }
}

CompanyService.prototype.updateCompany = async function(company: Company) {
    try {        
        const comp = await this.getCompany(company.id)
        if(!comp)
            throw new Error("empresa nao encontrada")
        const result = await this.companyRepository.updateCompany(company)
        return result.rows[0]
    } catch(e) {
        throw new Error("Falha ao atualizar empresa: "+ e.message)
    }
}

CompanyService.prototype.deleteCompany = async function(company: Company) {
    try {        
        const comp = await this.getCompany(company.id)
        if(!comp)
            throw new Error("empresa nao encontrada")
        await this.companyRepository.deleteCompany(company)
        return {message: "empresa deleted"}
    } catch(e) {
        throw new Error("Falha ao deletar empresa: "+ e.message)
    }
}


const companyService = new (CompanyService as any)
export { companyService }
