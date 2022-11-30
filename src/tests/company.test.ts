import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveStore = jest.fn()
const getStores = jest.fn()
const getStore = jest.fn()
const updateStore = jest.fn()
const deleteStore = jest.fn()

const app = makeApp({
},{
},{
    getStores,
    saveStore,
    getStore,
    updateStore,
    deleteStore
})


describe('/api/v1/store', () => {
    beforeEach(() => {
        saveStore.mockReset()
        getStores.mockReset()
        getStore.mockReset()
        updateStore.mockReset()
        deleteStore.mockReset()
    });
    let store, payload, storeResponse
    let token = 'bearer '
    store = {
        name: "emp",
        email: "emp@bace.com",
        cnpj: "2313123123",
        address: "Rua Almirante 331"
    }
    storeResponse = {
        id: 5,
        name: "emp",
        email: "emp@bace.com",
        cnpj: "2313123123",
        address: "Rua Almirante 331",
        created_at: "2022-11-13T05:27:32.721Z",
        updated_at: null
    }
    const listStore = []
    listStore.push(storeResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        store_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the store on database and return the store', async () => {
        expect(token)
        saveStore.mockResolvedValue(storeResponse)
        let res = await request(app)
            .post('/api/v1/store')
            .set('authorization', token)
            .send(storeResponse)
        
        expect(res.status).toBe(200)
        expect(saveStore.mock.calls.length).toBe(1)
        expect(saveStore.mock.calls[0][0]).toMatchObject(storeResponse)
        expect(res.body).toMatchObject(storeResponse)
    });

    it('should return error', async () => {
        saveStore.mockImplementationOnce(() => {
            throw new Error("erro ao salvar empresa")
        })
        let res = await request(app)
        .post('/api/v1/store')
        .set('authorization', token)
        .send(store)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar empresa"})
        expect(saveStore.mock.calls.length).toBe(1)
    });

    it('should return all stores', async () => {
        expect(token)
        getStores.mockResolvedValue(listStore)
        let res = await request(app)
            .get('/api/v1/store')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getStores.mock.calls.length).toBe(1)
        // expect(getStores.mock.calls[0][0]).toBe(listStore)
        expect(res.body).toMatchObject(listStore)
    });

    it('should return error 2', async () => {
        getStores.mockImplementationOnce(() => {
            throw new Error("erro ao buscar empresa")
        })
        let res = await request(app)
        .get('/api/v1/store')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar empresa"})
        expect(getStores.mock.calls.length).toBe(1)
    });

    it('should return a store', async () => {
        expect(token)
        getStore.mockResolvedValue(storeResponse)
        let res = await request(app)
            .get('/api/v1/store/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getStore.mock.calls.length).toBe(1)
        expect(getStore.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(storeResponse)
    });

    it('should return error 3', async () => {
        getStore.mockImplementationOnce(() => {
            throw new Error("erro ao buscar empresa")
        })
        let res = await request(app)
        .get('/api/v1/store/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar empresa"})
        expect(getStore.mock.calls.length).toBe(1)
    });

    it('should update a store', async () => {
        expect(token)
        updateStore.mockResolvedValue(storeResponse)
        let res = await request(app)
            .put('/api/v1/store')
            .set('authorization', token)
            .send(storeResponse)
            
        expect(res.status).toBe(200)
        expect(updateStore.mock.calls.length).toBe(1)
        // expect(getStore.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(storeResponse)
    });

    it('should return error 4', async () => {
        updateStore.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar empresa")
        })
        let res = await request(app)
        .put('/api/v1/store/')
        .set('authorization', token)
        .send(storeResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar empresa"})
        expect(updateStore.mock.calls.length).toBe(1)
    });

    it('should delete a store', async () => {
        expect(token)
        deleteStore.mockResolvedValue(storeResponse)
        let res = await request(app)
            .delete('/api/v1/store')
            .set('authorization', token)
            .send(storeResponse)
            
        expect(res.status).toBe(200)
        expect(deleteStore.mock.calls.length).toBe(1)
        // expect(getStore.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(storeResponse)
    });

    it('should return error 5', async () => {
        deleteStore.mockImplementationOnce(() => {
            throw new Error("erro ao deletar empresa")
        })
        let res = await request(app)
        .delete('/api/v1/store/')
        .set('authorization', token)
        .send(storeResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar empresa"})
        expect(deleteStore.mock.calls.length).toBe(1)
    });

});
