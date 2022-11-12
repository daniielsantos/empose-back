import { companyService } from "../services/company.service"
import { Company } from "../model/company.model"
function CompanyController() {
    this.companyService = companyService
}

CompanyController.prototype.getCompanies = async function(): Promise<Company[]> {
    return this.companyService.getCompanies()
}
CompanyController.prototype.getCompany = async function(companyId: number): Promise<Company> {
    return this.companyService.getCompany(companyId)
}

CompanyController.prototype.saveCompany = async function(company: Company): Promise<Company> {
    return this.companyService.saveCompany(company)
}

CompanyController.prototype.updateCompany = async function(company: Company): Promise<Company> {
    return this.companyService.updateCompany(company)
}

CompanyController.prototype.deleteCompany = async function(company: Company): Promise<void> {
    return this.companyService.deleteCompany(company)
}

const companyController = new (CompanyController as any)
export { companyController } 
