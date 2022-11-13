import { db } from "../services/db.service"
import format from "pg-format"
import { Orders } from "../model/order.model"
import { skuService } from "../services/sku.service"

function OrderRepository() {
    this.db = db
    this.skuService = skuService
}

OrderRepository.prototype.getOrders = async function(companyId: number) {
    const query = `SELECT o.id, o.total, o.status, o.delivery_status, o.created_at, o.updated_at,
    json_strip_nulls(json_build_object('id', pm.id, 'name', pm.name, 'description', pm.description)) AS payment,
    json_strip_nulls(json_build_object('id', c.id, 'name', c.name, 'email', c.email, 'cpf', c.cpf, 'phone_number', c.phone_number)) AS client,
    json_strip_nulls(json_agg(json_build_object('id', s.id, 'name', s.name, 'description', s.description, 'active', s.active, 'price', s.price, 'quantity', oi.quantity))) AS items
    FROM Orders o
    LEFT JOIN payment_method pm ON pm.id = o.payment_method_id
    LEFT JOIN client c ON c.id = o.client_id
    LEFT JOIN order_item oi ON oi.order_id = o.id
    LEFT JOIN sku s ON s.id = oi.sku_id
    WHERE o.company_id = $1
    GROUP BY 
    o.id,
    o.total,
    o.status,
    o.delivery_status,
    o.created_at,
    o.updated_at,
    pm.id,
    c.id
    `
    return this.db.query(query, [companyId])    
}

OrderRepository.prototype.getOrder = async function(orderId: number, companyId: number) {
    const query = `SELECT o.id, o.total, o.status, o.delivery_status, o.created_at, o.updated_at,
    json_strip_nulls(json_build_object('id', pm.id, 'name', pm.name, 'description', pm.description)) AS payment,
    json_strip_nulls(json_build_object('id', c.id, 'name', c.name, 'email', c.email, 'cpf', c.cpf, 'phone_number', c.phone_number)) AS client,
    json_strip_nulls(json_agg(json_build_object('id', s.id, 'name', s.name, 'description', s.description, 'active', s.active, 'price', s.price, 'quantity', oi.quantity))) AS items
    FROM Orders o
    LEFT JOIN payment_method pm ON pm.id = o.payment_method_id
    LEFT JOIN client c ON c.id = o.client_id
    LEFT JOIN order_item oi ON oi.order_id = o.id
    LEFT JOIN sku s ON s.id = oi.sku_id
    WHERE o.company_id = $2
    AND o.id = $1
    GROUP BY 
    o.id,
    o.total,
    o.status,
    o.delivery_status,
    o.created_at,
    o.updated_at,
    pm.id,
    c.id
    `
    return this.db.query(query, [orderId, companyId])    
}

OrderRepository.prototype.saveOrder = async function(order: Orders) {
    const items = new Array
    if(!order.status)
        order.status = "AGUARDANDO PAGAMENTO"
    if(!order.delivery_status)
        order.status = "AGUARDANDO"

    const payload = {
        total: order.total,
        status: order.status,
        delivery_status: order.delivery_status,
        payment_method_id: order.payment.id,
        client_id: order.client.id,
        company_id: order.company.id,
        created_at: order.created_at,
    }
    const query = format(`INSERT INTO Orders("total", "status", "delivery_status", "payment_method_id", "client_id", "company_id", "created_at") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const ord = await this.db.query(query)
    order.items.forEach(it => {
        let pld = {
            quantity: it.quantity,
            order_id: ord.rows[0].id,
            sku_id: it.sku.id,
            company_id: ord.rows[0].company_id,
            created_at: new Date,
        }
        items.push(Object.values(pld))
    })

    const orderItem = format(`INSERT INTO order_item("quantity", "order_id", "sku_id", "company_id", "created_at") VALUES %L RETURNING *;`, items)
    const result = await this.db.query(orderItem)
    let savedOrder: Orders = {...ord.rows[0]}
    savedOrder.items = result.rows
    return savedOrder
}

OrderRepository.prototype.updateOrder = async function(order: Orders) {
    const items = new Array
    const payload = {
        id: order.id,
        total: order.total,
        status: order.status,
        delivery_status: order.delivery_status,
        payment_method_id: order.payment.id,
        client_id: order.client.id,
        updated_at: order.updated_at,
    }

    let res = await this.calculateTotal(order)
    payload.total = res.total
    
    const query = `UPDATE Orders SET "total" = $2, "status" = $3, "delivery_status" = $4, "payment_method_id" = $5, "client_id" = $6, "updated_at" = $7 WHERE id = $1 RETURNING *`
    let ord = await this.db.query(query, Object.values(payload))

    res.items.forEach(it => {
        let pld = {
            quantity: it.quantity,
            order_id: ord.rows[0].id,
            sku_id: it.sku.id,
            company_id: ord.rows[0].company_id,
            created_at: new Date,
            updated_at: new Date,
        }
        items.push(Object.values(pld))
    })

    const del_item = `DELETE FROM order_item WHERE order_id = $1`
    await this.db.query(del_item, [order.id])

    const orderItem = format(`INSERT INTO order_item("quantity", "order_id", "sku_id", "company_id", "created_at", "updated_at") VALUES %L RETURNING *;`, items)
    const result = await this.db.query(orderItem)
    let orderSaved: Orders = {...ord.rows[0]}
    orderSaved.items = result.rows
    return orderSaved
}

OrderRepository.prototype.deleteOrder = async function(order: Orders) {
    const query = `DELETE 
    FROM orders o
    WHERE o.id = $1
    `
    return this.db.query(query, [order.id])    
}

OrderRepository.prototype.calculateTotal = async function(order: Orders) {
    let i = 0
    let total = 0.0
    for await (const it of order.items) {
        let sk = await this.skuService.getSku(it.id, order.company.id)
        order.items[i].sku = sk
        total += (parseFloat(sk.price) * it.quantity)
        i++
    }
    order.total = total
    return order
}

const orderRepository = new OrderRepository
export { orderRepository }