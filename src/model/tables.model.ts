import { db } from "../services/db.service"

function Tables() {
    this.db = db
    this.create()
}

Tables.prototype.create = async function() {
    let query
    let result
    
    query = `CREATE TABLE IF NOT EXISTS Company(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(255) NOT NULL,
        email CHARACTER VARYING(100) NOT NULL,
        cnpj CHARACTER VARYING(18) NOT NULL,
        address CHARACTER VARYING(255) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`
    await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(250) NOT NULL,
        email CHARACTER VARYING(100) NOT NULL,
        password CHARACTER VARYING(255) NOT NULL,
        role CHARACTER VARYING(100) NOT NULL,
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`    
    await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS Client(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(250) NOT NULL,
        email CHARACTER VARYING(100) NOT NULL,
        cpf CHARACTER VARYING(11) NOT NULL,
        phone_number CHARACTER VARYING(20) NOT NULL,
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`    

    await this.db.query(query)
    query = `CREATE TABLE IF NOT EXISTS client_address(
        id SERIAL PRIMARY KEY,
        address CHARACTER VARYING(250) NOT NULL,
        city CHARACTER VARYING(100) NOT NULL,
        state CHARACTER VARYING(100) NOT NULL,
        zip_code CHARACTER VARYING(20) NOT NULL,
        country CHARACTER VARYING(100) NOT NULL,
        client_id INT NOT NULL REFERENCES Client(id) ON DELETE CASCADE,
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`    
    await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS payment_method(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(150) NOT NULL,
        description CHARACTER VARYING(250),
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`
    await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS Category(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(150) NOT NULL,
        description CHARACTER VARYING(250),
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`
    await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS Sku(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(150) NOT NULL,
        description CHARACTER VARYING(150),
        active BOOLEAN,
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`
    await this.db.query(query)

    query = `CREATE TABLE IF NOT EXISTS Sku_image(
        id SERIAL PRIMARY KEY,
        name CHARACTER VARYING(150),
        url CHARACTER VARYING(250),
        sku_id INT NOT NULL REFERENCES Sku(id) ON DELETE CASCADE,
        company_id INT NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )`
    

    await this.db.query(query)
}


export default new Tables