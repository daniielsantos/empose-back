import { Pool } from "pg"



function Db(this: any) {
    this.client = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
    })
}

Db.prototype.connect = async function() {
    try {
        await this.client.connect()        
    } catch(e) {
        console.error(e)
    }
}

Db.prototype.query = async function(query: string, params: string) {
    await this.connect()
    // console.log("Database query: "+query)
    const result = await this.client.query(query, params)
    // this.client.end()
    return result
}

const db = new (Db as any)
export { db }
