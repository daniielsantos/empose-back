import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveCompany = jest.fn()
const getCompanies = jest.fn()
const getCompany = jest.fn()
const updateCompany = jest.fn()
const deleteCompany = jest.fn()

const app = makeApp({
},{
},{
    getCompanies,
    saveCompany,
    getCompany,
    updateCompany,
    deleteCompany
})


describe('/api/v1/company', () => {
    beforeEach(() => {
        saveCompany.mockReset()
        getCompanies.mockReset()
        getCompany.mockReset()
        updateCompany.mockReset()
        deleteCompany.mockReset()
    });
    let company, payload, companyResponse
    let token = 'bearer '
    company = {
        name: "emp",
        email: "emp@bace.com",
        cnpj: "2313123123",
        address: "Rua Almirante 331"
    }
    companyResponse = {
        id: 5,
        name: "emp",
        email: "emp@bace.com",
        cnpj: "2313123123",
        address: "Rua Almirante 331",
        created_at: "2022-11-13T05:27:32.721Z",
        updated_at: null
    }
    const listCompany = []
    listCompany.push(companyResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the company on database and return the company', async () => {
        expect(token)
        saveCompany.mockResolvedValue(companyResponse)
        let res = await request(app)
            .post('/api/v1/company')
            .set('authorization', token)
            .send(companyResponse)
        
        expect(res.status).toBe(200)
        expect(saveCompany.mock.calls.length).toBe(1)
        expect(saveCompany.mock.calls[0][0]).toMatchObject(companyResponse)
        expect(res.body).toMatchObject(companyResponse)
    });

    it('should return error', async () => {
        saveCompany.mockImplementationOnce(() => {
            throw new Error("erro ao salvar empresa")
        })
        let res = await request(app)
        .post('/api/v1/company')
        .set('authorization', token)
        .send(company)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar empresa"})
        expect(saveCompany.mock.calls.length).toBe(1)
    });

    it('should return all companys', async () => {
        expect(token)
        getCompanies.mockResolvedValue(listCompany)
        let res = await request(app)
            .get('/api/v1/company')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getCompanies.mock.calls.length).toBe(1)
        // expect(getCompanies.mock.calls[0][0]).toBe(listCompany)
        expect(res.body).toMatchObject(listCompany)
    });

    it('should return error 2', async () => {
        getCompanies.mockImplementationOnce(() => {
            throw new Error("erro ao buscar empresa")
        })
        let res = await request(app)
        .get('/api/v1/company')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar empresa"})
        expect(getCompanies.mock.calls.length).toBe(1)
    });

    it('should return a company', async () => {
        expect(token)
        getCompany.mockResolvedValue(companyResponse)
        let res = await request(app)
            .get('/api/v1/company/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getCompany.mock.calls.length).toBe(1)
        expect(getCompany.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(companyResponse)
    });

    it('should return error 3', async () => {
        getCompany.mockImplementationOnce(() => {
            throw new Error("erro ao buscar empresa")
        })
        let res = await request(app)
        .get('/api/v1/company/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar empresa"})
        expect(getCompany.mock.calls.length).toBe(1)
    });

    it('should update a company', async () => {
        expect(token)
        updateCompany.mockResolvedValue(companyResponse)
        let res = await request(app)
            .put('/api/v1/company')
            .set('authorization', token)
            .send(companyResponse)
            
        expect(res.status).toBe(200)
        expect(updateCompany.mock.calls.length).toBe(1)
        // expect(getCompany.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(companyResponse)
    });

    it('should return error 4', async () => {
        updateCompany.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar empresa")
        })
        let res = await request(app)
        .put('/api/v1/company/')
        .set('authorization', token)
        .send(companyResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar empresa"})
        expect(updateCompany.mock.calls.length).toBe(1)
    });

    it('should delete a company', async () => {
        expect(token)
        deleteCompany.mockResolvedValue(companyResponse)
        let res = await request(app)
            .delete('/api/v1/company')
            .set('authorization', token)
            .send(companyResponse)
            
        expect(res.status).toBe(200)
        expect(deleteCompany.mock.calls.length).toBe(1)
        // expect(getCompany.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(companyResponse)
    });

    it('should return error 5', async () => {
        deleteCompany.mockImplementationOnce(() => {
            throw new Error("erro ao deletar empresa")
        })
        let res = await request(app)
        .delete('/api/v1/company/')
        .set('authorization', token)
        .send(companyResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar empresa"})
        expect(deleteCompany.mock.calls.length).toBe(1)
    });

});
