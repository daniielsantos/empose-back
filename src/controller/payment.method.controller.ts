import { Request, Response } from "express"
import { Company } from "../model/company.model"
import { PaymentMethods } from "../model/payment.method.model"
import { paymentMethodService } from "../services/payment.method.service"

function PaymentMethodController() {
    this.paymentMethodService = paymentMethodService
}

PaymentMethodController.prototype.getCompany = function(user: any): Company {
    const company: Company = {
        id: user.company_id
    }
    return company
}

PaymentMethodController.prototype.getPaymentMethods = async function(user: any): Promise<PaymentMethods[]> {
    const company: Company = this.getCompany(user)
    return this.paymentMethodService.getPaymentMethods(company)
}

PaymentMethodController.prototype.getPaymentMethod = async function(paymentId: number, user: any): Promise<PaymentMethods> {
    const company = this.getCompany(user)
    return this.paymentMethodService.getPaymentMethod(paymentId, company.id)
}

PaymentMethodController.prototype.savePaymentMethod = async function(paymentMethod: PaymentMethods, user: any): Promise<PaymentMethods> {
    const company: Company = this.getCompany(user)
    paymentMethod.company = company
    return this.paymentMethodService.savePaymentMethod(paymentMethod)
}

PaymentMethodController.prototype.updatePaymentMethod = async function(paymentMethod: PaymentMethods, user: any) {
    const company: Company = this.getCompany(user)
    paymentMethod.company = company
    return this.paymentMethodService.updatePaymentMethod(paymentMethod)
}

PaymentMethodController.prototype.deletePaymentMethod = async function(paymentMethod: PaymentMethods, user: any) {
    const company = this.getCompany(user)
    paymentMethod.company = company
    return this.paymentMethodService.deletePaymentMethod(paymentMethod)
}

const paymentMethodController = new (PaymentMethodController as any)
export { paymentMethodController } 

