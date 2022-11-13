import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const userLogin = jest.fn()

const app = makeApp({
    userLogin,
},{
},{
},{
},{
},{
},{
},{
},{
})


describe('/api/v1/users-login', () => {
    beforeEach(() => {
        userLogin.mockReset()
    });
    let userLoginIn, payload, userLoginResponse
    let token = 'bearer '
    userLoginIn = {
        email: "teste@teste.com",
        password: "teste"
    }
    userLoginResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsIm5hbWUiOiJkYW5pZWwgc2FudG9zIiwiY29tcGFueV9pZCI6MSwiaWF0IjoxNjY4MzEwNzIzfQ.yP7YstTdnfjfXcyTxCV22gLwOa7_AsiV43YEFrer9Ik",
        user: {
            id: 1,
            name: "teste",
            email: "teste@teste.com",
            role: "admin",
            company_id: 1,
            created_at: "2022-11-12T02:31:03.284Z",
            updated_at: "2022-11-12T00:17:58.520Z"
        }
    }
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should authenticate', async () => {
        expect(token)
        userLogin.mockResolvedValue(userLoginResponse)
        let res = await request(app)
            .post('/api/v1/users-login')
            .set('authorization', token)
            .send(userLoginResponse)
        
        expect(res.status).toBe(200)
        expect(userLogin.mock.calls.length).toBe(1)
        expect(userLogin.mock.calls[0][0]).toMatchObject(userLoginResponse)
        expect(res.body).toMatchObject(userLoginResponse)
    });

    it('should return error', async () => {
        userLogin.mockImplementationOnce(() => {
            throw new Error("erro ao autenticar")
        })
        let res = await request(app)
        .post('/api/v1/users-login')
        .set('authorization', token)
        .send(userLoginIn)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao autenticar"})
        expect(userLogin.mock.calls.length).toBe(1)
    });

    it('should return error invalid token', async () => {
        let res = await request(app)
        .post('/api/v1/users')
        .set('authorization', 'invalid_token')
        .send()

        expect(res.status).toBe(401)
        expect(res.body).toMatchObject({message: "Error: invalid token"})
        // expect(userLogin.mock.calls.length).toBe(1)
    });

    it('should return error Failed to authenticate token', async () => {
        let res = await request(app)
        .post('/api/v1/users')
        .set('authorization', 'bearer 1234asldkj')
        .send()

        expect(res.status).toBe(500)
        expect(res.body).toMatchObject({message: "Error: Failed to authenticate token"})
    });


});
