import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveCategory = jest.fn()
const getCategories = jest.fn()
const getCategory = jest.fn()
const updateCategory = jest.fn()
const deleteCategory = jest.fn()

const app = makeApp({
},{
},{
},{
},{
    getCategories,
    saveCategory,
    getCategory,
    updateCategory,
    deleteCategory
})


describe('/api/v1/category', () => {
    beforeEach(() => {
        saveCategory.mockReset()
        getCategories.mockReset()
        getCategory.mockReset()
        updateCategory.mockReset()
        deleteCategory.mockReset()
    });
    let category, payload, categoryResponse
    let token = 'bearer '
    category = {
        name: "Eletronicos",
        description: "eletronicos"
    }
    categoryResponse = {
        id: 37,
        name: "Eletronicos22",
        description: "eletronicos22",
        company_id: 1,
        created_at: "2022-11-13T05:51:35.312Z",
        updated_at: null
    }
    const listCategory = []
    listCategory.push(categoryResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the category on database and return the category', async () => {
        expect(token)
        saveCategory.mockResolvedValue(categoryResponse)
        let res = await request(app)
            .post('/api/v1/category')
            .set('authorization', token)
            .send(categoryResponse)
        
        expect(res.status).toBe(200)
        expect(saveCategory.mock.calls.length).toBe(1)
        expect(saveCategory.mock.calls[0][0]).toMatchObject(categoryResponse)
        expect(res.body).toMatchObject(categoryResponse)
    });

    it('should return error', async () => {
        saveCategory.mockImplementationOnce(() => {
            throw new Error("erro ao salvar categoria")
        })
        let res = await request(app)
        .post('/api/v1/category')
        .set('authorization', token)
        .send(category)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar categoria"})
        expect(saveCategory.mock.calls.length).toBe(1)
    });

    it('should return all categorys', async () => {
        expect(token)
        getCategories.mockResolvedValue(listCategory)
        let res = await request(app)
            .get('/api/v1/category')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getCategories.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listCategory)
    });

    it('should return error 2', async () => {
        getCategories.mockImplementationOnce(() => {
            throw new Error("erro ao buscar categoria")
        })
        let res = await request(app)
        .get('/api/v1/category')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar categoria"})
        expect(getCategories.mock.calls.length).toBe(1)
    });

    it('should return a category', async () => {
        expect(token)
        getCategory.mockResolvedValue(categoryResponse)
        let res = await request(app)
            .get('/api/v1/category/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getCategory.mock.calls.length).toBe(1)
        expect(getCategory.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(categoryResponse)
    });

    it('should return error 3', async () => {
        getCategory.mockImplementationOnce(() => {
            throw new Error("erro ao buscar categoria")
        })
        let res = await request(app)
        .get('/api/v1/category/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar categoria"})
        expect(getCategory.mock.calls.length).toBe(1)
    });

    it('should update a category', async () => {
        expect(token)
        updateCategory.mockResolvedValue(categoryResponse)
        let res = await request(app)
            .put('/api/v1/category')
            .set('authorization', token)
            .send(categoryResponse)
            
        expect(res.status).toBe(200)
        expect(updateCategory.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(categoryResponse)
    });

    it('should return error 4', async () => {
        updateCategory.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar categoria")
        })
        let res = await request(app)
        .put('/api/v1/category/')
        .set('authorization', token)
        .send(categoryResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar categoria"})
        expect(updateCategory.mock.calls.length).toBe(1)
    });

    it('should delete a category', async () => {
        expect(token)
        deleteCategory.mockResolvedValue(categoryResponse)
        let res = await request(app)
            .delete('/api/v1/category')
            .set('authorization', token)
            .send(categoryResponse)
            
        expect(res.status).toBe(200)
        expect(deleteCategory.mock.calls.length).toBe(1)        
        expect(res.body).toMatchObject(categoryResponse)
    });

    it('should return error 5', async () => {
        deleteCategory.mockImplementationOnce(() => {
            throw new Error("erro ao deletar categoria")
        })
        let res = await request(app)
        .delete('/api/v1/category/')
        .set('authorization', token)
        .send(categoryResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar categoria"})
        expect(deleteCategory.mock.calls.length).toBe(1)
    });

});
