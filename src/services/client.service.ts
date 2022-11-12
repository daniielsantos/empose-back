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
        throw new Error(e.message)
    }
}

ClientService.prototype.getClient = async function(clientId: number) {
    try {
        const result = await this.clientRepository.getClient(clientId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

ClientService.prototype.saveClient = async function(client: Client) {
    try {
        client.created_at = new Date
        const result = await this.clientRepository.saveClient(client)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

ClientService.prototype.updateClient = async function(client: Client) {
    try {
        let pay = await this.getClient(client.id)
        if(!pay)
            throw new Error("cliente nao encontrado")
        client.updated_at = new Date
        const result = await this.clientRepository.updateClient(client)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

ClientService.prototype.deleteClient = async function(client: Client) {
    try {
        let pay = await this.getClient(client.id)
        if(!pay)
            throw new Error("cliente nao encontrado")
        await this.clientRepository.deleteClient(client)
        return { message: "cliente deletado" }
    } catch(e) {
        throw new Error(e.message)
    }
}

const clientService = new (ClientService as any)
export { clientService }

// exports = ClientService