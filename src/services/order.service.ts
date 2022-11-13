import { Company } from "../model/company.model"
import { Orders } from "../model/order.model"
import { orderRepository } from "../repository/order.repository"
import { clientService } from "./client.service"
import { paymentMethodService } from "./payment.method.service"
import { skuService } from "./sku.service"



function OrderService() {
    this.orderRepository = orderRepository
    this.clientService = clientService
    this.paymentMethodService = paymentMethodService
    this.skuService = skuService
}

OrderService.prototype.loadOrderInfo = async function(order: Orders) {
    let i = 0
    let total = 0
    for await (const it of order.items) {
        let sk = await this.skuService.getSku(it.sku.id, order.company.id)
        order.items[i].sku = sk
        total += (parseFloat(sk.price) * it.quantity)
        i++
    }
    order.total = total
    return order
}

OrderService.prototype.getErros = async function(order: Orders) {
    let res = await this.clientService.getClient(order.client.id, order.company.id)
    if(!res)
        throw new Error("cliente do pedido nao encontrado")
    res = await this.paymentMethodService.getPaymentMethod(order.payment.id, order.company.id)
    if(!res)
        throw new Error("metodo de pagamento do pedido nao encontrado")
    if(!order.items)
        throw new Error("pedido sem produto")
}

OrderService.prototype.getOrders = async function(company: Company) {
    try {
        const result = await this.orderRepository.getOrders(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.getOrder = async function(orderId: number, companyId: number) {
    try {
        const result = await this.orderRepository.getOrder(orderId, companyId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.saveOrder = async function(order: Orders) {
    try {
        order.created_at = new Date
        await this.getErros(order)
        let ord = await this.loadOrderInfo(order)
        let result = await this.orderRepository.saveOrder(ord)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.updateOrder = async function(order: Orders) {
    try {
        order.updated_at = new Date
        let pay = await this.getOrder(order.id, order.company.id)
        if(!pay)
            throw new Error("pedido nao encontrado")
        await this.getErros(order)
        const result = await this.orderRepository.updateOrder(order)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.deleteOrder = async function(order: Orders) {
    try {
        let pay = await this.getOrder(order.id, order.company.id)
        if(!pay)
            throw new Error("pedido nao encontrado")
        await this.orderRepository.deleteOrder(order)
        return { message: "pedido deletado" }
    } catch(e) {
        throw new Error(e.message)
    }
}

const orderService = new (OrderService as any)
export { orderService }
