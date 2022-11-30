import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveSku = jest.fn()
const getSkus = jest.fn()
const getSku = jest.fn()
const updateSku = jest.fn()
const deleteSku = jest.fn()

const app = makeApp({
},{
},{
},{
},{
},{
    getSkus,
    saveSku,
    getSku,
    updateSku,
    deleteSku
})


describe('/api/v1/sku', () => {
    beforeEach(() => {
        saveSku.mockReset()
        getSkus.mockReset()
        getSku.mockReset()
        updateSku.mockReset()
        deleteSku.mockReset()
    });
    let sku, payload, skuResponse
    let token = 'bearer '
    sku = {
            name: "televisao",
            description: "televisao roxa",
            active: true,
            price: 299.50,
            product: {
                id: 1
            },
            images: [
                {
                    name: "foto_televisao",
                    url: "localhost/televisaoroxa.jpg"
                },
                {
                    name: "foto_televisao",
                    url: "localhost/televisaoroxa2.jpg"
                }
            ]
    }

    skuResponse = {
        id: 3,
        name: "televisao",
        description: "televisao roxa",
        active: true,
        price: "299.50",
        product_id: 1,
        store_id: 1,
        created_at: "2022-11-13T02:09:30.836Z",
        updated_at: null,
        images: [
            {
                id: 5,
                name: "foto_televisao",
                url: "localhost/televisaoroxa.jpg",
                sku_id: 3,
                store_id: 1,
                created_at: "2022-11-13T02:09:30.906Z",
                updated_at: null
            },
            {
                id: 6,
                name: "foto_televisao",
                url: "localhost/televisaoroxa2.jpg",
                sku_id: 3,
                store_id: 1,
                created_at: "2022-11-13T02:09:30.906Z",
                updated_at: null
            }
        ]
    }
    const listsku = []
    listsku.push(skuResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        store_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the sku on database and return the sku', async () => {
        expect(token)
        saveSku.mockResolvedValue(skuResponse)
        let res = await request(app)
            .post('/api/v1/sku')
            .set('authorization', token)
            .send(skuResponse)
        
        expect(res.status).toBe(200)
        expect(saveSku.mock.calls.length).toBe(1)
        expect(saveSku.mock.calls[0][0]).toMatchObject(skuResponse)
        expect(res.body).toMatchObject(skuResponse)
    });

    it('should return error', async () => {
        saveSku.mockImplementationOnce(() => {
            throw new Error("erro ao salvar sku")
        })
        let res = await request(app)
        .post('/api/v1/sku')
        .set('authorization', token)
        .send(sku)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar sku"})
        expect(saveSku.mock.calls.length).toBe(1)
    });

    it('should return all skus', async () => {
        expect(token)
        getSkus.mockResolvedValue(listsku)
        let res = await request(app)
            .get('/api/v1/sku')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getSkus.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listsku)
    });

    it('should return error 2', async () => {
        getSkus.mockImplementationOnce(() => {
            throw new Error("erro ao buscar sku")
        })
        let res = await request(app)
        .get('/api/v1/sku')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar sku"})
        expect(getSkus.mock.calls.length).toBe(1)
    });

    it('should return a sku', async () => {
        expect(token)
        getSku.mockResolvedValue(skuResponse)
        let res = await request(app)
            .get('/api/v1/sku/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getSku.mock.calls.length).toBe(1)
        expect(getSku.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(skuResponse)
    });

    it('should return error 3', async () => {
        getSku.mockImplementationOnce(() => {
            throw new Error("erro ao buscar sku")
        })
        let res = await request(app)
        .get('/api/v1/sku/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar sku"})
        expect(getSku.mock.calls.length).toBe(1)
    });

    it('should update a sku', async () => {
        expect(token)
        updateSku.mockResolvedValue(skuResponse)
        let res = await request(app)
            .put('/api/v1/sku')
            .set('authorization', token)
            .send(skuResponse)
            
        expect(res.status).toBe(200)
        expect(updateSku.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(skuResponse)
    });

    it('should return error 4', async () => {
        updateSku.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar sku")
        })
        let res = await request(app)
        .put('/api/v1/sku/')
        .set('authorization', token)
        .send(skuResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar sku"})
        expect(updateSku.mock.calls.length).toBe(1)
    });

    it('should delete a sku', async () => {
        expect(token)
        deleteSku.mockResolvedValue(skuResponse)
        let res = await request(app)
            .delete('/api/v1/sku')
            .set('authorization', token)
            .send(skuResponse)
            
        expect(res.status).toBe(200)
        expect(deleteSku.mock.calls.length).toBe(1)        
        expect(res.body).toMatchObject(skuResponse)
    });

    it('should return error 5', async () => {
        deleteSku.mockImplementationOnce(() => {
            throw new Error("erro ao deletar sku")
        })
        let res = await request(app)
        .delete('/api/v1/sku/')
        .set('authorization', token)
        .send(skuResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar sku"})
        expect(deleteSku.mock.calls.length).toBe(1)
    });

});
