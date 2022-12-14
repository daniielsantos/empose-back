import { Store } from "../model/store.model"
import { OrderItem, Orders } from "../model/order.model"
import { orderRepository } from "../repository/order.repository"
import { clientService } from "./client.service"
import { paymentMethodService } from "./payment.method.service"
import { skuService } from "./sku.service"
import { skuInventoryService } from "./sku.inventory.service"
import { SkuInventory } from "../model/sku.inventory.model"
import { Sku } from "../model/sku.model"
import { productService } from "./product.service"
import { Product } from "../model/product.model"



function OrderService() {
    this.orderRepository = orderRepository
    this.clientService = clientService
    this.paymentMethodService = paymentMethodService
    this.skuService = skuService
    this.skuInventoryService = skuInventoryService
    this.productService = productService
}

OrderService.prototype.processOrder = async function(order: Orders) {
    let i = 0
    let total = 0
    
    for await (const it of order.items) {
        let sk: Sku = await this.skuService.getSku(it.id, order.store.id)
        let prod: Product = await this.productService.getProduct(sk.product.id, order.store.id)
        let priceWithDiscount = sk.price - (sk.price * prod.discount)
        order.items[i].sku = sk
        total += (parseFloat(priceWithDiscount.toString()) * it.quantity)
        i++
    }
    await this.updateInventory(order, true)

    order.total = total
    return order
}

OrderService.prototype.checkAndUpdateOrderItemsInventory = async function(order: Orders, newOrder: Orders) {
    for await (const it of order.items) {
        let res = newOrder.items.find(i => i.id == it.id)
        if(res && res.quantity != it.quantity) {
            let inv: SkuInventory = await this.skuInventoryService.getSkuInventory(it.id, order.store.id)
            if(res.quantity > inv.quantity) {
                throw new Error(`Sku id: ${it.id} sem estoque!`)
            }
        }
    }
    for await (const it of newOrder.items) {
        let res = order.items.find(i => i.id == it.id)
        if(!res) {
            let inv: SkuInventory = await this.skuInventoryService.getSkuInventory(it.id, order.store.id)
            if(it.quantity > inv.quantity) {
                throw new Error(`Sku id: ${it.id} sem estoque!`)
            }
        }
    }
    await this.hasDeletedItem(order, newOrder)
    //new items in the order
    for await (const it of newOrder.items) {
        let res = order.items.find(i => i.id == it.id)
        if(!res) {
            let inv: SkuInventory = await this.skuInventoryService.getSkuInventory(it.id, order.store.id)
            inv.quantity = inv.quantity - it.quantity
            await this.skuInventoryService.updateSkuInventory(inv)
        }
    }
    //update keept items that change quantity
    for await (const it of order.items) {
        let res = newOrder.items.find(i => i.id == it.id)
        if(res && res.quantity != it.quantity) {
            let inv: SkuInventory = await this.skuInventoryService.getSkuInventory(it.id, order.store.id)
            inv.quantity = inv.quantity - it.quantity
            await this.skuInventoryService.updateSkuInventory(inv)
        }
    }
}

OrderService.prototype.hasDeletedItem = async function(order: Orders, newOrder: Orders) {
    let deletedItems: OrderItem[] = []
    for await (const it of order.items) {
        let res = newOrder.items.find(i => i.id == it.id)
        if(!res) {
            deletedItems.push(it)
            let inv: SkuInventory = await this.skuInventoryService.getSkuInventory(it.id, order.store.id)
            inv.quantity = inv.quantity + it.quantity
            await this.skuInventoryService.updateSkuInventory(inv)
        }
    }
    return deletedItems
}

OrderService.prototype.updateInventory = async function(order: Orders, subtract: boolean, newOrder: Orders) {
    if(subtract) {
        await this.checkAndUpdateOrderItemsInventory(order, newOrder)
    } else {
        for await (const it of order.items) {
            let inv: SkuInventory = await this.skuInventoryService.getSkuInventory(it.id, order.store.id)
            inv.quantity = inv.quantity + it.quantity
            await this.skuInventoryService.updateSkuInventory(inv)
        }
    }
}


OrderService.prototype.orderInventoryUpdate = async function(order: Orders) {
    let ord: Orders = await this.getOrder(order.id, order.store.id)
    if(!order.canceled && ord.status == order.status && ord.delivery_status == order.delivery_status) {
        await this.updateInventory(ord, true, order)
    } else if(order.canceled && ord.status == order.status && ord.delivery_status == order.delivery_status){
        await this.updateInventory(order, false)
    }
}


OrderService.prototype.getErros = async function(order: Orders) {
    let res = await this.clientService.getClient(order.client.id, order.store.id)
    if(!res)
        throw new Error("cliente do pedido nao encontrado")
    res = await this.paymentMethodService.getPaymentMethod(order.payment.id, order.store.id)
    if(!res)
        throw new Error("metodo de pagamento do pedido nao encontrado")
    if(!order.items)
        throw new Error("pedido sem produto")
}

OrderService.prototype.getOrders = async function(store: Store) {
    try {
        const result = await this.orderRepository.getOrders(store.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.getOrder = async function(orderId: number, storeId: number) {
    try {
        const result = await this.orderRepository.getOrder(orderId, storeId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.saveOrder = async function(order: Orders) {
    try {
        order.created_at = new Date
        await this.getErros(order)
        let ord = await this.processOrder(order)
        let result = await this.orderRepository.saveOrder(ord)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

OrderService.prototype.updateOrder = async function(order: Orders) {
    try {
        order.updated_at = new Date        
        let pay = await this.getOrder(order.id, order.store.id)
        
        if(!pay)
            throw new Error("pedido nao encontrado")
        
        await this.getErros(order)
        await this.orderInventoryUpdate(order)
        const result = await this.orderRepository.updateOrder(order)
        return result
        return null
    } catch(e) {
        console.log("eeee ", e.message)
        throw new Error(e.message)
    }
}

OrderService.prototype.deleteOrder = async function(order: Orders) {
    try {
        let pay = await this.getOrder(order.id, order.store.id)
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
