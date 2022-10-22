import "dotenv/config"
// require("dotenv").config()
jest.mock("../services/db.service")
import { db } from "../services/db.service"
const dbConnect = jest.fn().mockReturnValueOnce(true)
db.connect.mockReturnValue({ connect: dbConnect })


beforeEach(() => {
    dbConnect.mockClear()
    db.connect.mockClear()
})

const makeSut = () => {
    return db
}

describe("Should connect with postgres database", () => {
     it("Connection with database", async () => {
        const sut = makeSut()
        // dbConnect.mockReturnValueOnce(false)
        const result = await sut.connect()
        expect(result.connect()).toEqual(true)
        expect(db.connect).toHaveBeenCalledTimes(1)
    })
})


