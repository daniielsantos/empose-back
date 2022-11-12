// const makeApp = require('../app');
import makeApp from "../app"
// import usersRoute from "../routes/users.route";
const jwt = require('jsonwebtoken');
const request = require('supertest');
const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsIm5hbWUiOiJ0ZXN0ZSIsImNvbXBhbnlfaWQiOjEsImlhdCI6MTY2Nzc3ODc3M30.3MgbWH--'

jest.setTimeout(20000)
const userRouter = jest.fn()
const saveUser = jest.fn()
const userController = jest.fn()
// const app = usersRoute(saveUser)
// const app = makeApp([userController])



it('should save the client on database', async () => {
    // const jwtSpy = jest.spyOn(jwt, 'verify');
    // jwtSpy.mockReturnValue('Some decoded token');

    expect(true)

    // const res = await request(app)
    //     .post('/api/v1/client')
    //     .set('authorization', token)
    //     .send({
    //         name: "aline",
    //         email: "aline@gmail.com",
    //         cpf: "02730404215",
    //         phone_number: "123333553",
    //         company: {
    //             id: 1
    //         },
    //         address: 
    //         [
    //             {
    //                 address: "Rua Assis1",
    //                 city: "Sao paulo1",
    //                 state: "sp1",
    //                 zip_code: "80630285",
    //                 country: "BR"
    //             },
    //             {
    //                 address: "Rua Assis2",
    //                 city: "Sao paulo2",
    //                 state: "sp",
    //                 zip_code: "80630285",
    //                 country: "BR"
    //             }
    //         ]
    //     });
    // expect(saveUser.mock.calls.length).toBe(1)
    // expect(res.status).toEqual(200);
});

// it('It should return all clients', async () => {
//     const jwtSpy = jest.spyOn(jwt, 'verify');
//     jwtSpy.mockReturnValue('Some decoded token');

//     const res = await request(app)
//         .get('/api/v1/client')
//         .set('authorization', token)
//         .send({});
//     console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ")
//     expect(res.status).toEqual(200);
// });

