import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveSkuInventory = jest.fn()
const getSkusInventory = jest.fn()
const getSkuInventory = jest.fn()
const updateSkuInventory = jest.fn()


const app = makeApp({
},{
},{
},{
},{
},{
},{
    getSkusInventory,
    saveSkuInventory,
    getSkuInventory,
    updateSkuInventory
},{
},{
})


describe('/api/v1/sku-inventory', () => {
    beforeEach(() => {
        saveSkuInventory.mockReset()
        getSkusInventory.mockReset()
        getSkuInventory.mockReset()
        updateSkuInventory.mockReset()
    });
    let skusInventory, payload, skusInventoryResponse
    let token = 'bearer '
    // skusInventory = {
    //     name: "Credito",
    //     description: "credito 1x"
    // }
    skusInventoryResponse = {
        id: 10,
        name: "Credito",
        description: "credito 1x",
        store_id: 1,
        created_at: "2022-11-13T05:40:53.100Z",
        updated_at: null
    }
    const listSkusInventory = []
    listSkusInventory.push(skusInventoryResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        store_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should return all inventories', async () => {
        expect(token)
        getSkusInventory.mockResolvedValue(listSkusInventory)
        let res = await request(app)
            .get('/api/v1/sku-inventory')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getSkusInventory.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listSkusInventory)
    });

    it('should return error 2', async () => {
        getSkusInventory.mockImplementationOnce(() => {
            throw new Error("erro ao buscar inventario")
        })
        let res = await request(app)
        .get('/api/v1/sku-inventory')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar inventario"})
        expect(getSkusInventory.mock.calls.length).toBe(1)
    });

    it('should return a skusInventory', async () => {
        expect(token)
        getSkuInventory.mockResolvedValue(skusInventoryResponse)
        let res = await request(app)
            .get('/api/v1/sku-inventory/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getSkuInventory.mock.calls.length).toBe(1)
        expect(getSkuInventory.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(skusInventoryResponse)
    });

    it('should return error 3', async () => {
        getSkuInventory.mockImplementationOnce(() => {
            throw new Error("erro ao buscar inventario")
        })
        let res = await request(app)
        .get('/api/v1/sku-inventory/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar inventario"})
        expect(getSkuInventory.mock.calls.length).toBe(1)
    });

    it('should update a skusInventory', async () => {
        expect(token)
        updateSkuInventory.mockResolvedValue(skusInventoryResponse)
        let res = await request(app)
            .put('/api/v1/sku-inventory')
            .set('authorization', token)
            .send(skusInventoryResponse)
            
        expect(res.status).toBe(200)
        expect(updateSkuInventory.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(skusInventoryResponse)
    });

    it('should return error 4', async () => {
        updateSkuInventory.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar inventario")
        })
        let res = await request(app)
        .put('/api/v1/sku-inventory/')
        .set('authorization', token)
        .send(skusInventoryResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar inventario"})
        expect(updateSkuInventory.mock.calls.length).toBe(1)
    });

});
