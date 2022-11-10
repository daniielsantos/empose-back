import { Pool } from "pg"



function Db(this: any) {
    this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        max: 20
    })
}

Db.prototype.connect = async function() {
    try {
        this.client = await this.pool.connect()
        return 'Db connected'        
    } catch(e) {
        console.error(e)
        throw new Error('Falha ao connectar ao banco de dados')
    }
}

Db.prototype.query = async function(query: string, params: string) {
    await this.connect()
    const result = await this.client.query(query, params)
    this.client.release()
    return result
}

const db = new (Db as any)
export { db }
