const Database = require("../src/bd-agent.ts")



test("Connection with database", async () => {
    const db = new Database
    console.log(db)
    expect(await db.init()).toBeTruthy()    
})
