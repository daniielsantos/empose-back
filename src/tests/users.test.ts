import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"



jest.setTimeout(10000)

const saveUser = jest.fn()
const saveRegister = jest.fn()
const getUsers = jest.fn()
const getUser = jest.fn()
const updateUser = jest.fn()
const deleteUser = jest.fn()

const app = makeApp({
    getUsers,
    saveUser,
    getUser,
    updateUser,
    deleteUser,
    saveRegister
},{

})


describe('/api/v1/users', () => {
    beforeEach(() => {
        saveUser.mockReset()
        getUsers.mockReset()
        getUser.mockReset()
        updateUser.mockReset()
        deleteUser.mockReset()
    });
    let user, payload, userResponse, userRegister
    let token = 'bearer '
    user = {
        name: "teste",
        email: "teste@teste.com",
        password: "teste",
        role: "admin",
        store: {
            id: 1
        }
    }
    userRegister = {
        name: "teste",
        email: "teste@teste.com",
        password: "teste",
        store: {
            id: 1,
            name: 'teste',
            address: 'rua reste',
            cnpj: '22222222222222',
        }
    }
    userResponse = {
        name: "teste",
        email: "teste@teste.com",
        password: "$2b$10$uX1BY6mhIG5W0qTC3hfON.MFtbYtbQ5WGmFlho/xz.eVgnF9wU1je",
        role: "admin",
        created_at: "2022-11-12T02:31:03.284Z",
        updated_at: "2022-11-12T00:17:58.520Z"
    }
    const listUsers = []
    listUsers.push(userResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        store_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the client on database and return the user', async () => {
        expect(token)
        saveUser.mockResolvedValue(user)
        let res = await request(app)
            .post('/api/v1/users')
            .set('authorization', token)
            .send(user)
            
        expect(res.status).toBe(200)
        expect(saveUser.mock.calls.length).toBe(1)
        expect(saveUser.mock.calls[0][0]).toMatchObject(user)
        expect(res.body).toMatchObject(user)
    });

    it('should save user register on database and return the user', async () => {
        expect(token)
        saveRegister.mockResolvedValue(userRegister)
        let res = await request(app)
            .post('/api/v1/register')
            // .set('authorization', token)
            .send(userRegister)

        expect(res.status).toBe(200)
        expect(saveRegister.mock.calls.length).toBe(1)
        expect(saveRegister.mock.calls[0][0]).toMatchObject(userRegister)
        expect(res.body).toMatchObject(userRegister)
    });

    it('should return error', async () => {
        saveUser.mockImplementationOnce(() => {
            throw new Error("erro")
        })
        let res = await request(app)
        .post('/api/v1/users')
        .set('authorization', token)
        .send(user)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro"})
        expect(saveUser.mock.calls.length).toBe(1)
    });

    it('should return all users', async () => {
        expect(token)
        getUsers.mockResolvedValue(listUsers)
        let res = await request(app)
            .get('/api/v1/users')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getUsers.mock.calls.length).toBe(1)
        // expect(getUsers.mock.calls[0][0]).toBe(listUsers)
        expect(res.body).toMatchObject(listUsers)
    });

    it('should return error 2', async () => {
        getUsers.mockImplementationOnce(() => {
            throw new Error("erro ao buscar usuarios")
        })
        let res = await request(app)
        .get('/api/v1/users')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar usuarios"})
        expect(getUsers.mock.calls.length).toBe(1)
    });

    it('should return a user', async () => {
        expect(token)
        getUser.mockResolvedValue(userResponse)
        let res = await request(app)
            .get('/api/v1/users/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getUser.mock.calls.length).toBe(1)
        expect(getUser.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(userResponse)
    });

    it('should return error 3', async () => {
        getUser.mockImplementationOnce(() => {
            throw new Error("erro ao buscar usuario")
        })
        let res = await request(app)
        .get('/api/v1/users/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar usuario"})
        expect(getUser.mock.calls.length).toBe(1)
    });

    it('should update a user', async () => {
        expect(token)
        updateUser.mockResolvedValue(userResponse)
        let res = await request(app)
            .put('/api/v1/users')
            .set('authorization', token)
            .send(userResponse)
            
        expect(res.status).toBe(200)
        expect(updateUser.mock.calls.length).toBe(1)
        // expect(getUser.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(userResponse)
    });

    it('should return error 4', async () => {
        updateUser.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar usuario")
        })
        let res = await request(app)
        .put('/api/v1/users/')
        .set('authorization', token)
        .send(userResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar usuario"})
        expect(updateUser.mock.calls.length).toBe(1)
    });

    it('should delete a user', async () => {
        expect(token)
        deleteUser.mockResolvedValue(userResponse)
        let res = await request(app)
            .delete('/api/v1/users')
            .set('authorization', token)
            .send(userResponse)
            
        expect(res.status).toBe(200)
        expect(deleteUser.mock.calls.length).toBe(1)
        // expect(getUser.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(userResponse)
    });

    it('should return error 5', async () => {
        deleteUser.mockImplementationOnce(() => {
            throw new Error("erro ao deletar usuario")
        })
        let res = await request(app)
        .delete('/api/v1/users/')
        .set('authorization', token)
        .send(userResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar usuario"})
        expect(deleteUser.mock.calls.length).toBe(1)
    });

});
