import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveOrder = jest.fn()
const getOrders = jest.fn()
const getOrder = jest.fn()
const updateOrder = jest.fn()
const deleteOrder = jest.fn()

const app = makeApp({
},{
},{
},{
},{
},{
},{
},{
},{
    getOrders,
    saveOrder,
    getOrder,
    updateOrder,
    deleteOrder
})


describe('/api/v1/order', () => {
    beforeEach(() => {
        saveOrder.mockReset()
        getOrders.mockReset()
        getOrder.mockReset()
        updateOrder.mockReset()
        deleteOrder.mockReset()
    });
    let order, payload, orderResponse
    let token = 'bearer '
    order = {
        status: 1,
        delivery_status: 1,
        payment: {
            id: 4
        },
        client: {
            id: 7
        },
        items: [
            {
                quantity: 3,
                sku: {
                    id: 1
                }
            },
            {
                quantity: 1,
                sku: {
                    id: 1
                }
            }         
        ]
    }
    orderResponse = {
        id: 10,
        name: "Credito",
        description: "credito 1x",
        store_id: 1,
        created_at: "2022-11-13T05:40:53.100Z",
        updated_at: null
    }
    const listOrder = []
    listOrder.push(orderResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        store_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the order on database and return the order', async () => {
        expect(token)
        saveOrder.mockResolvedValue(orderResponse)
        let res = await request(app)
            .post('/api/v1/order')
            .set('authorization', token)
            .send(orderResponse)
        
        expect(res.status).toBe(200)
        expect(saveOrder.mock.calls.length).toBe(1)
        expect(saveOrder.mock.calls[0][0]).toMatchObject(orderResponse)
        expect(res.body).toMatchObject(orderResponse)
    });

    it('should return error', async () => {
        saveOrder.mockImplementationOnce(() => {
            throw new Error("erro ao salvar pedido")
        })
        let res = await request(app)
        .post('/api/v1/order')
        .set('authorization', token)
        .send(order)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar pedido"})
        expect(saveOrder.mock.calls.length).toBe(1)
    });

    it('should return all orders', async () => {
        expect(token)
        getOrders.mockResolvedValue(listOrder)
        let res = await request(app)
            .get('/api/v1/order')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getOrders.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listOrder)
    });

    it('should return error 2', async () => {
        getOrders.mockImplementationOnce(() => {
            throw new Error("erro ao buscar pedido")
        })
        let res = await request(app)
        .get('/api/v1/order')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar pedido"})
        expect(getOrders.mock.calls.length).toBe(1)
    });

    it('should return a order', async () => {
        expect(token)
        getOrder.mockResolvedValue(orderResponse)
        let res = await request(app)
            .get('/api/v1/order/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getOrder.mock.calls.length).toBe(1)
        expect(getOrder.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(orderResponse)
    });

    it('should return error 3', async () => {
        getOrder.mockImplementationOnce(() => {
            throw new Error("erro ao buscar pedido")
        })
        let res = await request(app)
        .get('/api/v1/order/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar pedido"})
        expect(getOrder.mock.calls.length).toBe(1)
    });

    it('should update a order', async () => {
        expect(token)
        updateOrder.mockResolvedValue(orderResponse)
        let res = await request(app)
            .put('/api/v1/order')
            .set('authorization', token)
            .send(orderResponse)
            
        expect(res.status).toBe(200)
        expect(updateOrder.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(orderResponse)
    });

    it('should return error 4', async () => {
        updateOrder.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar pedido")
        })
        let res = await request(app)
        .put('/api/v1/order/')
        .set('authorization', token)
        .send(orderResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar pedido"})
        expect(updateOrder.mock.calls.length).toBe(1)
    });

    it('should delete a order', async () => {
        expect(token)
        deleteOrder.mockResolvedValue(orderResponse)
        let res = await request(app)
            .delete('/api/v1/order')
            .set('authorization', token)
            .send(orderResponse)
            
        expect(res.status).toBe(200)
        expect(deleteOrder.mock.calls.length).toBe(1)        
        expect(res.body).toMatchObject(orderResponse)
    });

    it('should return error 5', async () => {
        deleteOrder.mockImplementationOnce(() => {
            throw new Error("erro ao deletar pedido")
        })
        let res = await request(app)
        .delete('/api/v1/order/')
        .set('authorization', token)
        .send(orderResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar pedido"})
        expect(deleteOrder.mock.calls.length).toBe(1)
    });

});
