import { db } from "../services/db.service"
import format from "pg-format"
import { PaymentMethods } from "../model/payment.method.model"

function PaymentMethod(){
    this.db = db
}

PaymentMethod.prototype.getPaymentMethods = async function(storeId: number) {
    const query = `SELECT p.id, p.name, p.description, p.created_at, p.updated_at 
    FROM payment_method p
    WHERE p.store_id = $1
    `
    return this.db.query(query, [storeId])    
}

PaymentMethod.prototype.getPaymentMethod = async function(paymentMethodId: number, storeId: number) {
    const query = `SELECT p.id, p.name, p.description, p.created_at, p.updated_at 
    FROM payment_method p
    WHERE p.id = $1
    AND p.store_id = $2
    `
    return this.db.query(query, [paymentMethodId, storeId])    
}

PaymentMethod.prototype.savePaymentMethod = async function(paymentMethod: PaymentMethods) {
    let payload = {
        name: paymentMethod.name,
        description: paymentMethod.description,
        store_id: paymentMethod.store.id,
        created_at: paymentMethod.created_at
    }
    const query = format(`INSERT INTO payment_method("name", "description", "store_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    return this.db.query(query)
}

PaymentMethod.prototype.updatePaymentMethod = async function(paymentMethod: PaymentMethods) {
    let payload = {
        id: paymentMethod.id,
        name: paymentMethod.name,
        description: paymentMethod.description,
        updated_at: paymentMethod.updated_at,
    }
    const query = `UPDATE payment_method SET "name" = $2, "description" = $3, "updated_at" = $4 WHERE id = $1 RETURNING *`
    return this.db.query(query, Object.values(payload))
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
