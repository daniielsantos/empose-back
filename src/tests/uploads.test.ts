import "dotenv/config"
import request from "supertest"
import makeApp from "../app"
import jwt from "jsonwebtoken"


jest.setTimeout(10000)

const saveUpload = jest.fn()
const getUploads = jest.fn()
const getUpload = jest.fn()
const updateUpload = jest.fn()
const deleteUpload = jest.fn()

const app = makeApp({
},{
},{
},{
},{
},{
},{
},{
},{
},{
}, {
    getUploads,
    saveUpload,
    getUpload,
    updateUpload,
    deleteUpload
})


describe('/api/v1/uploads', () => {
    beforeEach(() => {
        saveUpload.mockReset()
        getUploads.mockReset()
        getUpload.mockReset()
        updateUpload.mockReset()
        deleteUpload.mockReset()
    });
    let uploads, payload, uploadsResponse
    let token = 'bearer '
    uploads = {
        name: "televisao",
        path: "uploads/televisao.png"
    }
    uploadsResponse = {
        id: 5,
        name: "televisao",
        path: "uploads/televisao.png",
        ompany_id: 1,
        created_at: "2022-11-13T17:13:18.055Z",
        updated_at: null
    }
    const listUploads = []
    listUploads.push(uploadsResponse)
    payload = {
        email: "teste@teste.com",
        name: "teste",
        company_id: 1
    }
    token += jwt.sign(payload, process.env.SECRET as string)

    it('should save the uploads on database and return the uploads', async () => {
        expect(token)
        saveUpload.mockResolvedValue(uploadsResponse)
        let res = await request(app)
            .post('/api/v1/uploads')
            .set('authorization', token)
            .send(uploadsResponse)
        
        expect(res.status).toBe(200)
        expect(saveUpload.mock.calls.length).toBe(1)
        expect(saveUpload.mock.calls[0][0]).toMatchObject(uploadsResponse)
        expect(res.body).toMatchObject(uploadsResponse)
    });

    it('should return error', async () => {
        saveUpload.mockImplementationOnce(() => {
            throw new Error("erro ao salvar upload")
        })
        let res = await request(app)
        .post('/api/v1/uploads')
        .set('authorization', token)
        .send(uploads)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao salvar upload"})
        expect(saveUpload.mock.calls.length).toBe(1)
    });

    it('should return all uploadss', async () => {
        expect(token)
        getUploads.mockResolvedValue(listUploads)
        let res = await request(app)
            .get('/api/v1/uploads')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getUploads.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(listUploads)
    });

    it('should return error 2', async () => {
        getUploads.mockImplementationOnce(() => {
            throw new Error("erro ao buscar upload")
        })
        let res = await request(app)
        .get('/api/v1/uploads')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar upload"})
        expect(getUploads.mock.calls.length).toBe(1)
    });

    it('should return a uploads', async () => {
        expect(token)
        getUpload.mockResolvedValue(uploadsResponse)
        let res = await request(app)
            .get('/api/v1/uploads/1')
            .set('authorization', token)
            .send()
            
        expect(res.status).toBe(200)
        expect(getUpload.mock.calls.length).toBe(1)
        expect(getUpload.mock.calls[0][0]).toBe('1')
        expect(res.body).toMatchObject(uploadsResponse)
    });

    it('should return error 3', async () => {
        getUpload.mockImplementationOnce(() => {
            throw new Error("erro ao buscar upload")
        })
        let res = await request(app)
        .get('/api/v1/uploads/1')
        .set('authorization', token)
        .send()

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao buscar upload"})
        expect(getUpload.mock.calls.length).toBe(1)
    });

    it('should update a uploads', async () => {
        expect(token)
        updateUpload.mockResolvedValue(uploadsResponse)
        let res = await request(app)
            .put('/api/v1/uploads')
            .set('authorization', token)
            .send(uploadsResponse)
            
        expect(res.status).toBe(200)
        expect(updateUpload.mock.calls.length).toBe(1)
        expect(res.body).toMatchObject(uploadsResponse)
    });

    it('should return error 4', async () => {
        updateUpload.mockImplementationOnce(() => {
            throw new Error("erro ao atualizar upload")
        })
        let res = await request(app)
        .put('/api/v1/uploads/')
        .set('authorization', token)
        .send(uploadsResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao atualizar upload"})
        expect(updateUpload.mock.calls.length).toBe(1)
    });

    it('should delete a uploads', async () => {
        expect(token)
        deleteUpload.mockResolvedValue(uploadsResponse)
        let res = await request(app)
            .delete('/api/v1/uploads')
            .set('authorization', token)
            .send(uploadsResponse)
            
        expect(res.status).toBe(200)
        expect(deleteUpload.mock.calls.length).toBe(1)        
        expect(res.body).toMatchObject(uploadsResponse)
    });

    it('should return error 5', async () => {
        deleteUpload.mockImplementationOnce(() => {
            throw new Error("erro ao deletar upload")
        })
        let res = await request(app)
        .delete('/api/v1/uploads/')
        .set('authorization', token)
        .send(uploadsResponse)

        expect(res.status).toBe(400)
        expect(res.body).toMatchObject({message: "erro ao deletar upload"})
        expect(deleteUpload.mock.calls.length).toBe(1)
    });

});
