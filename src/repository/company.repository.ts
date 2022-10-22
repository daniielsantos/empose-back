import { db } from "../services/db.service"
import format from "pg-format"
import { Users } from "../model/user.model"
import { Company } from "../model/company.model"

function CompanyRepository(){
    this.db = db
}

CompanyRepository.prototype.getCompanies = async function():Promise<Company> {
    const query = `SELECT * FROM Company`
    return this.db.query(query)
}

CompanyRepository.prototype.getCompany = async function(company: Company):Promise<Company> {
    const query = `SELECT * FROM Company WHERE id = $1`
    return this.db.query(query, [company.id])
}

CompanyRepository.prototype.saveCompany = async function(company: Company): Promise<Company> {
    company.createdAt = new Date
    const query = format(`INSERT INTO Company(name, email, cnpj, address, createdat) VALUES (%L) RETURNING *`, Object.values(company)) 
    return this.db.query(query)
}

CompanyRepository.prototype.updateCompany = async function(company: Company): Promise<Company> {
    company.updatedAt = new Date
    const query = `UPDATE Company SET "name" = $2, "email" = $3, "cnpj" = $4, "address" = $5, "updatedat" = $6 WHERE id = $1 RETURNING *`
    return this.db.query(query, Object.values(company))
}

const companyRepository = new (CompanyRepository as any)
export { companyRepository }
