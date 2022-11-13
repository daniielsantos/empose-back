import { Company } from "../model/company.model"
import { PaymentMethods } from "../model/payment.method.model"
import { paymentMethod } from "../repository/payment.method"

function PaymentMethodService() {
    this.paymentMethod = paymentMethod
}

PaymentMethodService.prototype.getPaymentMethods = async function(company: Company) {
    try {
        const result = await this.paymentMethod.getPaymentMethods(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

PaymentMethodService.prototype.getPaymentMethod = async function(paymentId: number, companyId: number) {
    try {
        const result = await this.paymentMethod.getPaymentMethod(paymentId, companyId)        
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

PaymentMethodService.prototype.savePaymentMethod = async function(paymentMethod: PaymentMethods) {
    try {
        paymentMethod.created_at = new Date
        const result = await this.paymentMethod.savePaymentMethod(paymentMethod)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

PaymentMethodService.prototype.updatePaymentMethod = async function(paymentMethod: PaymentMethods) {
    try {
        let pay = await this.getPaymentMethod(paymentMethod.id, paymentMethod.company.id)
        if(!pay)
            throw new Error("metodo de pagamento nao encontrado")
        paymentMethod.updated_at = new Date
        const result = await this.paymentMethod.updatePaymentMethod(paymentMethod)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

PaymentMethodService.prototype.deletePaymentMethod = async function(paymentMethod: PaymentMethods) {
    try {
        let pay = await this.getPaymentMethod(paymentMethod.id, paymentMethod.company.id)
        if(!pay)
            throw new Error("metodo de pagamento nao encontrado")
        await this.paymentMethod.deletePaymentMethod(paymentMethod)
        return {message: "metodo de pagamento deletado"}
    } catch(e) {
        throw new Error(e.message)
    }
}

const paymentMethodService = new (PaymentMethodService as any)
export { paymentMethodService }
