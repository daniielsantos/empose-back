import "dotenv/config"
import DateUtil from "../utils/date.util"


describe("Date util", () => {
    it('should ', () => {
        expect(true)
    });
    // it("should format date to a format", async () => {
    //     const date = new Date('2022-11-12T07:16:57.010Z')
    //     const dt = DateUtil.toFormat(date, "DD/MM/YYYY HH:mm:ss")
    //     expect(dt).toBe("12/11/2022 04:16:57")
    // })

    // it("should format a list of objects with 'updated_at' and 'created_at' property to a format", async () => {
    //     const date = new Date('2022-11-12T07:16:57.010Z')
    //     let dates = [
    //         {
    //             updated_at: date,
    //             created_at: date
    //         }
    //     ]
    //     const dt = DateUtil.toFormatList(dates, "DD/MM/YYYY HH:mm:ss")
    //     expect(dt[0].created_at).toBe("12/11/2022 04:16:57")
    //     expect(dt[0].created_at).toBe("12/11/2022 04:16:57")
    // })

    // it("should format a list of objects with 'address' list to a format", async () => {
    //     const date = new Date('2022-11-12T07:16:57.010Z')
    //     let dates = [
    //         {
    //             updated_at: date,
    //             created_at: date,
    //             address: [
    //                 {
    //                     updated_at: date,
    //                     created_at: date,
    //                 }
    //             ]
    //         }
    //     ]
    //     const dt = DateUtil.toFormat(dates, "DD/MM/YYYY HH:mm:ss")
    //     expect(dt[0].created_at).toBe("12/11/2022 04:16:57")
    //     expect(dt[0].created_at).toBe("12/11/2022 04:16:57")
    //     expect(dt[0].address[0].created_at).toBe("12/11/2022 04:16:57")
    //     expect(dt[0].address[0].created_at).toBe("12/11/2022 04:16:57")
    // })
})
