import { db } from "../services/db.service"
import format from "pg-format"
import { Users } from "../model/user.model"
import { Company } from "../model/company.model"

function CompanyRepository(){
    this.db = db
}

CompanyRepository.prototype.getCompanies = async function():Promise<Company[]> {
    const query = `SELECT * FROM Company`
    return this.db.query(query)
}

CompanyRepository.prototype.getCompany = async function(companyId: number):Promise<Company> {
    const query = `SELECT * FROM Company WHERE id = $1`
    return this.db.query(query, [companyId])
}

CompanyRepository.prototype.saveCompany = async function(company: Company): Promise<Company> {
    company.created_at = new Date
    const query = format(`INSERT INTO Company(name, email, cnpj, address, created_at) VALUES (%L) RETURNING *`, Object.values(company)) 
    return this.db.query(query)
}

CompanyRepository.prototype.updateCompany = async function(company: Company): Promise<Company> {
    company.updated_at = new Date
    const query = `UPDATE Company SET "name" = $2, "email" = $3, "cnpj" = $4, "address" = $5, "updated_at" = $6 WHERE id = $1 RETURNING *`
    return this.db.query(query, Object.values(company))
}

CompanyRepository.prototype.deleteCompany = async function(company: Company) {
    const query = `DELETE 
    FROM company c
    WHERE c.id = $1
    `
    return this.db.query(query, [company.id])    
}

const companyRepository = new (CompanyRepository as any)
export { companyRepository }
