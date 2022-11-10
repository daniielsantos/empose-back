import { db } from "../services/db.service"
import format from "pg-format"
import { PaymentMethods } from "../model/payment.method.model"

function PaymentMethod(this: any){
    this.db = db
}

PaymentMethod.prototype.getPaymentMethods = async function(companyId: number) {
    const query = `SELECT p.id, p.name, p.description, p.created_at, p.updated_at 
    FROM payment_method p
    WHERE p.company_id = $1
    `
    return this.db.query(query, [companyId])    
}

PaymentMethod.prototype.getPaymentMethod = async function(companyId: number) {
    const query = `SELECT p.id, p.name, p.description, p.created_at, p.updated_at 
    FROM payment_method p
    WHERE p.id = $1
    `
    return this.db.query(query, [companyId])    
}


PaymentMethod.prototype.savePaymentMethod = async function(paymentMethod: PaymentMethods) {
    console.log(paymentMethod)
    let payload = {
        name: paymentMethod.name,
        description: paymentMethod.description,
        company_id: paymentMethod.company.id,
        created_at: paymentMethod.created_at
    }

    const query = format(`INSERT INTO payment_method("name", "description", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const pay = await this.db.query(query)
    return pay
}

PaymentMethod.prototype.updatePaymentMethod = async function(paymentMethod: PaymentMethods) {
    const query = `UPDATE payment_method SET "name" = $2, "description" = $3, "updated_at" = $4 WHERE id = $1 RETURNING *`
    const pay = await this.db.query(query, Object.values(paymentMethod))
    return pay
}

PaymentMethod.prototype.deletePaymentMethod = async function(paymentMethod: PaymentMethods) {
    const query = `DELETE 
    FROM payment_method p
    WHERE p.id = $1
    `
    return this.db.query(query, [paymentMethod.id])    
}

const paymentMethod = new PaymentMethod
export { paymentMethod }
