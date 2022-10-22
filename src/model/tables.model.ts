import { db } from "../services/db.service"

function Tables() {
    this.db = db
    // this.create((res) =>{
    //     console.log("Tables created ")
    // })
    this.create()
}

Tables.prototype.create = async function(callback) {
    let query
    let result
    // id INT PRIMARY KEY NOT NULL,
    query = `CREATE TABLE IF NOT EXISTS Company(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(255) NOT NULL,
        email CHARACTER VARYING(100) NOT NULL,
        cnpj CHARACTER VARYING(18) NOT NULL,
        address CHARACTER VARYING(255) NOT NULL,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    )`
    result = await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(250) NOT NULL,
        email CHARACTER VARYING(100) NOT NULL,
        password CHARACTER VARYING(255) NOT NULL,
        role CHARACTER VARYING(100) NOT NULL,
        company_id INT NOT NULL REFERENCES Company(id),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    )`    
    result = await this.db.query(query)
    

}



export default new Tables