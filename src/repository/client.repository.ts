import { db } from "../services/db.service"
import format from "pg-format"
import { Client } from "../model/client.model"

function ClientRepository(this: any){
    this.db = db
    // this.clientRepository = new (ClientRepository as any)
}

ClientRepository.prototype.getClients = async function() {
    const query = `SELECT c.id, c.name, c.email, c.cpf, c.phone_number, c.created_at, c.updated_at, json_strip_nulls(json_agg(ca)) AS address
    FROM clients c
    LEFT JOIN client_address ca ON c.id = ca.client_id
    GROUP BY 
    c.id,
    c.name,
    c.email,
    c.cpf,
    c.phone_number,
    c.created_at,
    c.updated_at
    `
    return this.db.query(query)
//json_build_object('asd', 'ss')
}

ClientRepository.prototype.saveClient = async function(client: Client) {
    const addresses = new Array
    const address = client.address || []
    delete client.address
    const query = format(`INSERT INTO Clients(name, email, cpf, phone_number, created_at, updated_at) VALUES (%L) RETURNING *`, Object.values(client)) 
    const cli = await this.db.query(query)
    address.forEach(item => {
        item.id = parseInt(cli.rows[0].id)
        addresses.push(Object.values(item))
    })
    const addrs = format(`INSERT INTO client_address("address","city","state","zip_code","country", "client_id") VALUES %L RETURNING *;`, addresses)
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
    delete client.createdAt

    const query = `UPDATE Clients SET "name" = $2, "email" = $3, "cpf" = $4, "phone_number" = $5, "updated_at" = $6 WHERE id = $1 RETURNING *`

    const cli = await this.db.query(query, Object.values(client))
    address.forEach(item => {
        item.id = parseInt(cli.rows[0].id)
        addresses.push(Object.values(item))
    })
    const del_addrs = `DELETE FROM client_address WHERE id = $1`
    const deleted = await this.db.query(del_addrs, [client.id])
    const addrs = format(`INSERT INTO client_address("client_id", "address","city","state","zip_code","country") VALUES %L RETURNING *;`, addresses)
    const result = await this.db.query(addrs)
    let clientSaved: Client
    clientSaved = cli.rows[0]
    clientSaved.address = result.rows
    return cli.rows
}

export { ClientRepository }
