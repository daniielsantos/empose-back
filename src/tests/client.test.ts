import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveClient = jest.fn()
const getClients = jest.fn()
const getClient = jest.fn()
const updateClient = jest.fn()
const deleteClient = jest.fn()

const app = makeApp({
},{
    getClients,
    saveClient,
    getClient,
    updateClient,
    deleteClient
})


describe('/api/v1/client', () => {
    beforeEach(() => {
        saveClient.mockReset()
        getClients.mockReset()
        getClient.mockReset()
        updateClient.mockReset()
        deleteClient.mockReset()
    });
    let client, payload, clientResponse
    let token = 'bearer '
    client = {
        name: "teste",
        email: "teste@gmail.com",
        cpf: "22211133344",
        phone_number: "44998645214",
        address: [
            {
                address: "Rua almeida",
                city: "Sao paulo1",
                state: "sp1",
                zip_code: "80630285",
                country: "BR"
            },
            {
                address: "Rua almeida 2",
                city: "Sao paulo2",
                state: "sp",
                zip_code: "80630285",
                country: "BR"
            }
        ]
    }
    clientResponse = {
        name: "teste",
        email: "teste@gmail.com",
        cpf: "22211133344",
        phone_number: "44998645214",
        created_at: "2022-11-12T02:31:03.284Z",
        updated_at: "2022-11-12T00:17:58.520Z",
        address: [
            {
                id: 33,
                address: "Rua almeida",
                city: "Sao paulo1",
                state: "sp1",
                zip_code: "80630285",
                country: "BR",
                client_id: 12,
                store_id: 1,
                created_at: "2022-11-13T05:09:49.139Z",
                updated_at: null
            },
            {
                id: 34,
                address: "Rua almeida 2",
                city: "Sao paulo2",
                state: "sp",
                zip_code: "80630285",
                country: "BR",
                client_id: 12,
                store_id: 1,
                created_at: "2022-11-13T05:09:49.139Z",
                updated_at: null
            }
        ]
    }
    const listClient = []
    listClient.push(clientResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        store_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the client on database and return the client', async () => {
        expect(token)
        saveClient.mockResolvedValue(clientResponse)
        let res = await request(app)
            .post('/api/v1/client')
            .set('authorization', token)
            .send(clientResponse)
        
        expect(res.status).toBe(200)
        expect(saveClient.mock.calls.length).toBe(1)
        expect(saveClient.mock.calls[0][0]).toMatchObject(clientResponse)
        expect(res.body).toMatchObject(clientResponse)
    });

    it('should return error', async () => {
        saveClient.mockImplementationOnce(() => {
            throw new Error("erro")
        })
        let res = await request(app)
        .post('/api/v1/client')
        .set('authorization', token)
        .send(client)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro"})
        expect(saveClient.mock.calls.length).toBe(1)
    });

    it('should return all clients', async () => {
        expect(token)
        getClients.mockResolvedValue(listClient)
        let res = await request(app)
            .get('/api/v1/client')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getClients.mock.calls.length).toBe(1)
        // expect(getClients.mock.calls[0][0]).toBe(listClient)
        expect(res.body).toMatchObject(listClient)
    });

    it('should return error 2', async () => {
        getClients.mockImplementationOnce(() => {
            throw new Error("erro ao buscar clientes")
        })
        let res = await request(app)
        .get('/api/v1/client')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar clientes"})
        expect(getClients.mock.calls.length).toBe(1)
    });

    it('should return a client', async () => {
        expect(token)
        getClient.mockResolvedValue(clientResponse)
        let res = await request(app)
            .get('/api/v1/client/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getClient.mock.calls.length).toBe(1)
        expect(getClient.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(clientResponse)
    });

    it('should return error 3', async () => {
        getClient.mockImplementationOnce(() => {
            throw new Error("erro ao buscar cliente")
        })
        let res = await request(app)
        .get('/api/v1/client/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar cliente"})
        expect(getClient.mock.calls.length).toBe(1)
    });

    it('should update a client', async () => {
        expect(token)
        updateClient.mockResolvedValue(clientResponse)
        let res = await request(app)
            .put('/api/v1/client')
            .set('authorization', token)
            .send(clientResponse)
            
        expect(res.status).toBe(200)
        expect(updateClient.mock.calls.length).toBe(1)
        // expect(getClient.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(clientResponse)
    });

    it('should return error 4', async () => {
        updateClient.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar cliente")
        })
        let res = await request(app)
        .put('/api/v1/client/')
        .set('authorization', token)
        .send(clientResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar cliente"})
        expect(updateClient.mock.calls.length).toBe(1)
    });

    it('should delete a client', async () => {
        expect(token)
        deleteClient.mockResolvedValue(clientResponse)
        let res = await request(app)
            .delete('/api/v1/client')
            .set('authorization', token)
            .send(clientResponse)
            
        expect(res.status).toBe(200)
        expect(deleteClient.mock.calls.length).toBe(1)
        // expect(getClient.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(clientResponse)
    });

    it('should return error 5', async () => {
        deleteClient.mockImplementationOnce(() => {
            throw new Error("erro ao deletar cliente")
        })
        let res = await request(app)
        .delete('/api/v1/client/')
        .set('authorization', token)
        .send(clientResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar cliente"})
        expect(deleteClient.mock.calls.length).toBe(1)
    });

});
