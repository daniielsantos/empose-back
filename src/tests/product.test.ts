import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveProduct = jest.fn()
const getProducts = jest.fn()
const getProduct = jest.fn()
const updateProduct = jest.fn()
const deleteProduct = jest.fn()

const app = makeApp({
},{
},{
},{
},{
},{
},{
},{
    getProducts,
    saveProduct,
    getProduct,
    updateProduct,
    deleteProduct
})


describe('/api/v1/product', () => {
    beforeEach(() => {
        saveProduct.mockReset()
        getProducts.mockReset()
        getProduct.mockReset()
        updateProduct.mockReset()
        deleteProduct.mockReset()
    });
    let product, payload, productResponse
    let token = 'bearer '
    product = {
        name: "Televisao",
        description: "smart",
        price: 4999,
        active: true,
        discount: 0.25,
        category: {
            id: 3
        }
    }
    productResponse = {
        id: 2,
        name: "Televisao",
        description: "smart",
        active: true,
        discount: "0.25",
        category_id: 3,
        company_id: 1,
        created_at: "2022-11-13T06:26:42.848Z",
        updated_at: null
    }
    const listProduct = []
    listProduct.push(productResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the product on database and return the product', async () => {
        expect(token)
        saveProduct.mockResolvedValue(productResponse)
        let res = await request(app)
            .post('/api/v1/product')
            .set('authorization', token)
            .send(productResponse)
        
        expect(res.status).toBe(200)
        expect(saveProduct.mock.calls.length).toBe(1)
        expect(saveProduct.mock.calls[0][0]).toMatchObject(productResponse)
        expect(res.body).toMatchObject(productResponse)
    });

    it('should return error', async () => {
        saveProduct.mockImplementationOnce(() => {
            throw new Error("erro ao salvar produto")
        })
        let res = await request(app)
        .post('/api/v1/product')
        .set('authorization', token)
        .send(product)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar produto"})
        expect(saveProduct.mock.calls.length).toBe(1)
    });

    it('should return all products', async () => {
        expect(token)
        getProducts.mockResolvedValue(listProduct)
        let res = await request(app)
            .get('/api/v1/product')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getProducts.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listProduct)
    });

    it('should return error 2', async () => {
        getProducts.mockImplementationOnce(() => {
            throw new Error("erro ao buscar produto")
        })
        let res = await request(app)
        .get('/api/v1/product')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar produto"})
        expect(getProducts.mock.calls.length).toBe(1)
    });

    it('should return a product', async () => {
        expect(token)
        getProduct.mockResolvedValue(productResponse)
        let res = await request(app)
            .get('/api/v1/product/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getProduct.mock.calls.length).toBe(1)
        expect(getProduct.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(productResponse)
    });

    it('should return error 3', async () => {
        getProduct.mockImplementationOnce(() => {
            throw new Error("erro ao buscar produto")
        })
        let res = await request(app)
        .get('/api/v1/product/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar produto"})
        expect(getProduct.mock.calls.length).toBe(1)
    });

    it('should update a product', async () => {
        expect(token)
        updateProduct.mockResolvedValue(productResponse)
        let res = await request(app)
            .put('/api/v1/product')
            .set('authorization', token)
            .send(productResponse)
            
        expect(res.status).toBe(200)
        expect(updateProduct.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(productResponse)
    });

    it('should return error 4', async () => {
        updateProduct.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar produto")
        })
        let res = await request(app)
        .put('/api/v1/product/')
        .set('authorization', token)
        .send(productResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar produto"})
        expect(updateProduct.mock.calls.length).toBe(1)
    });

    it('should delete a product', async () => {
        expect(token)
        deleteProduct.mockResolvedValue(productResponse)
        let res = await request(app)
            .delete('/api/v1/product')
            .set('authorization', token)
            .send(productResponse)
            
        expect(res.status).toBe(200)
        expect(deleteProduct.mock.calls.length).toBe(1)        
        expect(res.body).toMatchObject(productResponse)
    });

    it('should return error 5', async () => {
        deleteProduct.mockImplementationOnce(() => {
            throw new Error("erro ao deletar produto")
        })
        let res = await request(app)
        .delete('/api/v1/product/')
        .set('authorization', token)
        .send(productResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar produto"})
        expect(deleteProduct.mock.calls.length).toBe(1)
    });

});
