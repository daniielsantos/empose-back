import { Request, Response } from "express"
import { Client } from "../model/client.model"
import { Company } from "../model/company.model"
import { clientRepository } from "../repository/client.repository"



function ClientService(this: any) {
    this.clientRepository = clientRepository
}

ClientService.prototype.getClients = async function(company: Company) {
    try {
        const result = await this.clientRepository.getClients(company.id)
        return result.rows
    } catch(e) {
        console.error(e)
        return e
    }
}

ClientService.prototype.saveClient = async function(client: Client) {
    try {
        client.created_at = new Date
        const result = await this.clientRepository.saveClient(client)
        return result
    } catch(e) {
        return e
    }
}

ClientService.prototype.updateClient = async function(client: Client) {
    try {
        client.updated_at = new Date
        const result = await this.clientRepository.updateClient(client)
        return result
    } catch(e) {
        return e
    }
}

const clientService = new (ClientService as any)
export { clientService }

// exports = ClientService