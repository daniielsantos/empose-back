import { Store } from "../model/store.model"
import { Orders } from "../model/order.model"
import { orderService } from "../services/order.service"

function OrderController() {
    this.orderService = orderService
}

OrderController.prototype.getStore = function(user: any) {
    const store: Store = {
        id: user.store_id
    }
    return store
}

OrderController.prototype.getOrders = async function(user: any): Promise<Orders[]>{
    const store = this.getStore(user)
    return this.orderService.getOrders(store)
}

OrderController.prototype.getOrder = async function(orderId: number, user: any): Promise<Orders> {
    const store = this.getStore(user)
    return this.orderService.getOrder(orderId, store.id)
}

OrderController.prototype.saveOrder = async function(order: Orders, user: any): Promise<Orders> {
    const store: Store = this.getStore(user)
    order.store = store
    return this.orderService.saveOrder(order)
}

OrderController.prototype.updateOrder = async function(order: Orders, user: any): Promise<Orders> {
    const store: Store = this.getStore(user)
    order.store = store
    return this.orderService.updateOrder(order)
}

OrderController.prototype.deleteOrder = async function(order: Orders, user: any): Promise<Orders> {
    const store = this.getStore(user)
    order.store = store
    return this.orderService.deleteOrder(order)
}

const orderController = new (OrderController as any)
export { orderController } 

