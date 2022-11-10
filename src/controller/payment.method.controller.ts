import { Request, Response } from "express"
import { Company } from "../model/company.model"
import { PaymentMethods } from "../model/payment.method.model"
import { paymentMethodService } from "../services/payment.method.service"
import { Req } from "../types/request"

function PaymentMethodController(this: any) {
    this.paymentMethodService = paymentMethodService
}

PaymentMethodController.prototype.getCompany = function(req: Req, res: Response) {
    const user = JSON.stringify(req.user)
    const userParsed = JSON.parse(user)
    const company: Company = {
        id: userParsed.company_id
    }
    return company
}

PaymentMethodController.prototype.getPaymentMethods = async function(req: Req, res: Response) {
    try {
        const company: Company = this.getCompany(req, res)
        const result: PaymentMethods[] = await this.paymentMethodService.getPaymentMethods(company)
        res.send(result)
    } catch(e) {
        res.send({message: "falha ao consultar metodos de pagamentos", error: e.message })
    }
}

PaymentMethodController.prototype.getPaymentMethod = async function(req: Req, res: Response) {
    try {
        const result: PaymentMethods = await this.paymentMethodService.getPaymentMethod(req.params.id)
        res.send(result)
    } catch(e) {
        res.send({message: "falha ao consultar metodos de pagamentos", error: e.message })
    }
}

PaymentMethodController.prototype.savePaymentMethod = async function(req: Req, res: Response) {
    try {
        const company: Company = this.getCompany(req, res)
        const result: PaymentMethods[] = await this.paymentMethodService.savePaymentMethod(req.body, company)
        res.send(result)
    } catch(e) {
        res.send({message: "falha ao salvar metodo de pagamento", error: e.message })
    }
}

PaymentMethodController.prototype.updatePaymentMethod = async function(req: Req, res: Response) {
    try {
        const result: PaymentMethods = await this.paymentMethodService.updatePaymentMethod(req.body)
        res.send(result)
    } catch(e) {
        res.send({message: "falha ao atualizar metodo de pagamento", error: e.message })
    }
}

PaymentMethodController.prototype.deletePaymentMethod = async function(req: Req, res: Response) {
    try {
        const result: PaymentMethods = await this.paymentMethodService.deletePaymentMethod(req.body)
        res.send(result)
    } catch(e) {
        res.send({message: "falha ao deletar metodo de pagamento", error: e.message })
    }
}

const paymentMethodController = new (PaymentMethodController as any)
export { paymentMethodController } 

