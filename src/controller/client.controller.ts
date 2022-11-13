import { Request, Response } from "express"
import { Client } from "../model/client.model"
import { Company } from "../model/company.model"
import { clientService } from "../services/client.service"
import { Req } from "../types/request"

function ClientController(this: any) {
    this.clientService = clientService
}
ClientController.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

ClientController.prototype.getClients = async function(user: any): Promise<Client[]>{
    const company = this.getCompany(user)
    return this.clientService.getClients(company)
}

ClientController.prototype.getClient = async function(clientId: number, user: any): Promise<Client> {
    let company = this.getCompany(user)
    return this.clientService.getClient(clientId, company.id)
}

ClientController.prototype.saveClient = async function(client: Client, user: any): Promise<Client> {
    const company: Company = this.getCompany(user)
    client.company = company
    return this.clientService.saveClient(client)
}

ClientController.prototype.updateClient = async function(client: Client): Promise<Client> {
    return this.clientService.updateClient(client)
}

ClientController.prototype.deleteClient = async function(client: Client): Promise<Client> {
    return this.clientService.deleteClient(client)
}

const clientController = new (ClientController as any)
export { clientController } 

