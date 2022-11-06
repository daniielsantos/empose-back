import "dotenv/config"
import { db } from "../services/db.service"
jest.mock('pg')
const pg = require('pg')
const dbMock = jest.fn().mockReturnValueOnce('ok')
pg.Pool.mockReturnValue({ connect: dbMock })


const makeSut = () => {
    return db
}
beforeEach(() => {
    dbMock.mockClear()
    pg.Pool.mockClear()
})

describe("Db service",() => {
    
    test('should return ok if database is connected', async () => {
        const sut = makeSut()
        dbMock.mockReturnValueOnce('ok')
        const result = await sut.connect()
        expect(result).toEqual('Db connected')
    });

    test('should return error if not connected', async () => {
        const sut = makeSut()
        dbMock.mockImplementationOnce(() => {
            throw new Error()
        })

        try {
            const result = await sut.connect()
        } catch (error) {
            expect(error.message).toBe("Falha ao connectar ao banco de dados")
        }
    });
})

