import { db } from "../services/db.service"
import format from "pg-format"
import { Client } from "../model/client.model"

function ClientRepository(this: any){
    this.db = db
}

ClientRepository.prototype.getClients = async function(companyId: number) {
    // const query = `SELECT *,
    // (
    //     SELECT json_strip_nulls(json_agg(json_build_object('id', address.id, 'address', address.address, 'city', address.city, 'state', address.state, 'zip_code', address.zip_code, 'country', address.country, 'created_at', address.created_at)))
    //     FROM (
    //         SELECT *
    //         FROM client_address ca
    //         WHERE ca.client_id = c.id
    //     ) address
    // ) AS address
    // FROM client c
    // WHERE c.company_id = $1
    // `

    const query = `SELECT c.id, c.name, c.email, c.cpf, c.phone_number, c.created_at, c.updated_at, 
    json_strip_nulls(json_build_object('id', com.id, 'name', com.name, 'email', com.email, 'cnpj', com.cnpj, 'address', com.address, 'created_at', com.created_at, 'updated_at', com.updated_at)) AS company,
    json_strip_nulls(json_agg(ca)) AS address
    FROM client c
    LEFT JOIN client_address ca ON c.id = ca.client_id
    JOIN company com ON com.id = $1
    JOIN client c2 ON c2.company_id = $1 
    GROUP BY 
    c.id,
    c.name,
    c.email,
    c.cpf,
    c.phone_number,
    c.created_at,
    c.updated_at,
    com.id
    `
    return this.db.query(query, [companyId])    
}


ClientRepository.prototype.saveClient = async function(client: Client) {
    const addresses = new Array
    const created_at = new Date
    const address = client.address || []
    const company_id = client.company.id
    delete client.address
    delete client.company
    const payload = {
        ...client,
        company_id
    }
    const query = format(`INSERT INTO Client("name", "email", "cpf", "phone_number", "created_at", "company_id") VALUES (%L) RETURNING *`, Object.values(payload)) 
    const cli = await this.db.query(query)
    address.forEach(item => {
        item.id = parseInt(cli.rows[0].id)
        item.created_at = created_at
        let payload = {
            ...item,
            company_id: cli.rows[0].company_id
        }
        addresses.push(Object.values(payload))
    })
    const addrs = format(`INSERT INTO client_address("address","city","state","zip_code","country", "client_id", "created_at", "company_id") VALUES %L RETURNING *;`, addresses)
    const result = await this.db.query(addrs)
    let clientSaved: Client
    clientSaved = cli.rows[0]
    clientSaved.address = result.rows
    return clientSaved
}

ClientRepository.prototype.updateClient = async function(client: Client) {
    const addresses = new Array
    const address = client.address || []
    delete client.address
    delete client.created_at
    const payload = {
        id: client.id,
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        phone_number: client.phone_number,
        updated_at: client.updated_at
    }
    console.log("entrou ", payload)

    const query = `UPDATE Client SET "name" = $2, "email" = $3, "cpf" = $4, "phone_number" = $5, "updated_at" = $6 WHERE id = $1 RETURNING *`

    const cli = await this.db.query(query, Object.values(payload))
    console.log("cli ", cli)
    address.forEach(item => {
        item.id = parseInt(cli.rows[0].id)
        let payload = {
            ...item,
            company_id: client.company.id
        }
        addresses.push(Object.values(item))
    })
    const del_addrs = `DELETE FROM client_address WHERE client_id = $1`
    const deleted = await this.db.query(del_addrs, [client.id])
    console.log(addresses)
    // const addrs = format(`INSERT INTO client_address("address","city","state","zip_code","country", "client_id", "created_at", "company_id") VALUES %L RETURNING *;`, addresses)
    
    // const addrs = format(`INSERT INTO client_address("client_id", "address", "city", "state", "zip_code", "country", "updated_at") VALUES %L RETURNING *`, addresses)
    // const result = await this.db.query(addrs)
    // let clientSaved: Client
    // clientSaved = cli.rows[0]
    // clientSaved.address = result.rows
    // return cli.rows
    return null
}
const clientRepository = new ClientRepository
export { clientRepository }
