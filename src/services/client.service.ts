import { Request, Response } from "express"
import { Client } from "../model/client.model"
import { ClientRepository } from "../repository/client.repository"



function ClientService(this: any) {
    this.clientRepository = new (ClientRepository as any)
}

ClientService.prototype.getClients = async function() {
    try {
        const result = await this.clientRepository.getClients()
        return result.rows
    } catch(e) {
        console.error(e)
        return e
    }
}

ClientService.prototype.saveClient = async function(client: Client) {
    try {
        client.createdAt = new Date
        client.updatedAt = new Date
        
        const result = await this.clientRepository.saveClient(client)
        return result
    } catch(e) {
        return e
    }
}

ClientService.prototype.updateClient = async function(client: Client) {
    try {
        // client.createdAt = new Date
        client.updatedAt = new Date
        
        const result = await this.clientRepository.updateClient(client)
        return result
    } catch(e) {
        return e
    }
}

const clientService = new (ClientService as any)
export { clientService }

// exports = ClientService