import { Company } from "../model/company.model"
import { Orders } from "../model/order.model"
import { orderService } from "../services/order.service"

function OrderController() {
    this.orderService = orderService
}

OrderController.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

OrderController.prototype.getOrders = async function(user: any): Promise<Orders[]>{
    const company = this.getCompany(user)
    return this.orderService.getOrders(company)
}

OrderController.prototype.getOrder = async function(orderId: number, user: any): Promise<Orders> {
    const company = this.getCompany(user)
    return this.orderService.getOrder(orderId, company.id)
}

OrderController.prototype.saveOrder = async function(order: Orders, user: any): Promise<Orders> {
    const company: Company = this.getCompany(user)
    order.company = company
    return this.orderService.saveOrder(order)
}

OrderController.prototype.updateOrder = async function(order: Orders, user: any): Promise<Orders> {
    const company: Company = this.getCompany(user)
    order.company = company
    return this.orderService.updateOrder(order)
}

OrderController.prototype.deleteOrder = async function(order: Orders): Promise<Orders> {
    return this.orderService.deleteOrder(order)
}

const orderController = new (OrderController as any)
export { orderController } 

