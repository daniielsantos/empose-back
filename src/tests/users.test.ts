import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveUser = jest.fn().mockImplementation(() => {
    return {
        saveUser: jest.fn()
    }
})

const app = makeApp({
    saveUser,
})


describe('/api/v1/users', () => {
    beforeEach(() => {
        saveUser.mockReset()
    });
    let user, payload
    let token = 'bearer '
    user = {
        name: "teste",
        email: "teste@teste.com",
        password: "teste",
        role: "admin",
        company: {
            id: 1
        }
    }
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the client on database', async () => {
        expect(token)

        let res = await request(app)
            .post('/api/v1/users')
            .set('authorization', token)
            .send({
                name: "teste",
                email: "teste@teste.com",
                password: "teste",
                role: "admin",
                company: {
                    id: 1
                }
            })
        expect(res.status).toBe(200)
        expect(saveUser.mock.calls.length).toBe(1)
        expect(saveUser.mock.calls[0][0]).toMatchObject(user)
    });

    it('should return a json object with the user', async () => {
        saveUser.mockResolvedValue(user)
        let res = await request(app)
        .post('/api/v1/users')
        .set('authorization', token)
        .send({
            name: "teste",
            email: "teste@teste.com",
            password: "teste",
            role: "admin",
            company: {
                id: 1
            }
        })
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(user)
        expect(saveUser.mock.calls.length).toBe(1)
        expect(saveUser.mock.calls[0][0]).toMatchObject(user)
    });

    it('should return error', async () => {
        saveUser.mockImplementationOnce(() => {
            throw new Error("erro")
        })
        let res = await request(app)
        .post('/api/v1/users')
        .set('authorization', token)
        .send({
            name: "teste",
            email: "teste@teste.com",
            password: "teste",
            role: "admin",
            company: {
                id: 1
            }
        })

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro"})
        expect(saveUser.mock.calls.length).toBe(1)
        // expect(saveUser.mock.calls[0][0]).toMatchObject(user)
    });

});