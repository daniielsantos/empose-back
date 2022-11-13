import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const savePaymentMethod = jest.fn()
const getPaymentMethods = jest.fn()
const getPaymentMethod = jest.fn()
const updatePaymentMethod = jest.fn()
const deletePaymentMethod = jest.fn()

const app = makeApp({
},{
},{
},{
    getPaymentMethods,
    savePaymentMethod,
    getPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
})


describe('/api/v1/payment-methods', () => {
    beforeEach(() => {
        savePaymentMethod.mockReset()
        getPaymentMethods.mockReset()
        getPaymentMethod.mockReset()
        updatePaymentMethod.mockReset()
        deletePaymentMethod.mockReset()
    });
    let paymentMethod, payload, paymentMethodResponse
    let token = 'bearer '
    paymentMethod = {
        name: "Credito",
        description: "credito 1x"
    }
    paymentMethodResponse = {
        id: 10,
        name: "Credito",
        description: "credito 1x",
        company_id: 1,
        created_at: "2022-11-13T05:40:53.100Z",
        updated_at: null
    }
    const listPaymentMethod = []
    listPaymentMethod.push(paymentMethodResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the paymentMethod on database and return the paymentMethod', async () => {
        expect(token)
        savePaymentMethod.mockResolvedValue(paymentMethodResponse)
        let res = await request(app)
            .post('/api/v1/payment-methods')
            .set('authorization', token)
            .send(paymentMethodResponse)
        
        expect(res.status).toBe(200)
        expect(savePaymentMethod.mock.calls.length).toBe(1)
        expect(savePaymentMethod.mock.calls[0][0]).toMatchObject(paymentMethodResponse)
        expect(res.body).toMatchObject(paymentMethodResponse)
    });

    it('should return error', async () => {
        savePaymentMethod.mockImplementationOnce(() => {
            throw new Error("erro ao salvar metodo de pagamento")
        })
        let res = await request(app)
        .post('/api/v1/payment-methods')
        .set('authorization', token)
        .send(paymentMethod)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar metodo de pagamento"})
        expect(savePaymentMethod.mock.calls.length).toBe(1)
    });

    it('should return all paymentMethods', async () => {
        expect(token)
        getPaymentMethods.mockResolvedValue(listPaymentMethod)
        let res = await request(app)
            .get('/api/v1/payment-methods')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getPaymentMethods.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listPaymentMethod)
    });

    it('should return error 2', async () => {
        getPaymentMethods.mockImplementationOnce(() => {
            throw new Error("erro ao buscar metodo de pagamento")
        })
        let res = await request(app)
        .get('/api/v1/payment-methods')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar metodo de pagamento"})
        expect(getPaymentMethods.mock.calls.length).toBe(1)
    });

    it('should return a paymentMethod', async () => {
        expect(token)
        getPaymentMethod.mockResolvedValue(paymentMethodResponse)
        let res = await request(app)
            .get('/api/v1/payment-methods/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getPaymentMethod.mock.calls.length).toBe(1)
        expect(getPaymentMethod.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(paymentMethodResponse)
    });

    it('should return error 3', async () => {
        getPaymentMethod.mockImplementationOnce(() => {
            throw new Error("erro ao buscar metodo de pagamento")
        })
        let res = await request(app)
        .get('/api/v1/payment-methods/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar metodo de pagamento"})
        expect(getPaymentMethod.mock.calls.length).toBe(1)
    });

    it('should update a paymentMethod', async () => {
        expect(token)
        updatePaymentMethod.mockResolvedValue(paymentMethodResponse)
        let res = await request(app)
            .put('/api/v1/payment-methods')
            .set('authorization', token)
            .send(paymentMethodResponse)
            
        expect(res.status).toBe(200)
        expect(updatePaymentMethod.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(paymentMethodResponse)
    });

    it('should return error 4', async () => {
        updatePaymentMethod.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar metodo de pagamento")
        })
        let res = await request(app)
        .put('/api/v1/payment-methods/')
        .set('authorization', token)
        .send(paymentMethodResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar metodo de pagamento"})
        expect(updatePaymentMethod.mock.calls.length).toBe(1)
    });

    it('should delete a paymentMethod', async () => {
        expect(token)
        deletePaymentMethod.mockResolvedValue(paymentMethodResponse)
        let res = await request(app)
            .delete('/api/v1/payment-methods')
            .set('authorization', token)
            .send(paymentMethodResponse)
            
        expect(res.status).toBe(200)
        expect(deletePaymentMethod.mock.calls.length).toBe(1)        
        expect(res.body).toMatchObject(paymentMethodResponse)
    });

    it('should return error 5', async () => {
        deletePaymentMethod.mockImplementationOnce(() => {
            throw new Error("erro ao deletar metodo de pagamento")
        })
        let res = await request(app)
        .delete('/api/v1/payment-methods/')
        .set('authorization', token)
        .send(paymentMethodResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar metodo de pagamento"})
        expect(deletePaymentMethod.mock.calls.length).toBe(1)
    });

});
