import "dotenv/config"
// require("dotenv").config()
import {crypt} from"../services/bcrypt.service"

jest.mock("../services/db.service.ts", () => {
    return jest.fn().mockImplementation(() => {
        return {
            connect: jest.fn().mockReturnValue(true),
            query: jest.fn(),
        };
    })
})


describe("Should test bcrypt module", () => {
    let bc: any
    beforeEach(() => {
        bc = crypt
    })

    it("should return a hash", async () => {
        const password = "112233"
        const hash = await bc.hash(password)
        expect(hash)
    })

    it("valid password should return true", async () => {
        const password = "112233"
        const hash = await bc.hash(password)
        const isValid = await bc.compare(password, hash)
        expect(isValid).toBeTruthy()
    })

    it("invalid password should return false", async () => {
        const password = "112233"
        const hash = await bc.hash(password)
        const isValid = await bc.compare("lalala", hash)
        expect(isValid).toBeFalsy()
    })
})
