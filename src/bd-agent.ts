const { Client } = require("pg")



function Database() {
    this.client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })
}

Database.prototype.init = async () => {
    try {
        await this.client.connect()
        console.log("Database connected...")
    } catch(e) {
        console.error(e)
        console.error("deu merda ", this.client)
        return false
    }
    return true
}




module.exports = Database
