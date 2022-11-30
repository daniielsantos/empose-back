import { Store } from "../model/store.model"
import { PaymentMethods } from "../model/payment.method.model"
import { paymentMethod } from "../repository/payment.method"

function PaymentMethodService() {
    this.paymentMethod = paymentMethod
}

PaymentMethodService.prototype.getPaymentMethods = async function(store: Store) {
    try {
        const result = await this.paymentMethod.getPaymentMethods(store.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

PaymentMethodService.prototype.getPaymentMethod = async function(paymentId: number, storeId: number) {
    try {
        const result = await this.paymentMethod.getPaymentMethod(paymentId, storeId)        
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
        let pay = await this.getPaymentMethod(paymentMethod.id, paymentMethod.store.id)
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
        let pay = await this.getPaymentMethod(paymentMethod.id, paymentMethod.store.id)
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
