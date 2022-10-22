import { Request, Response } from "express"
import { Client } from "../model/client.model"
import { clientService } from "../services/client.service"

function ClientController(this: any) {
    this.clientService = clientService
}

ClientController.prototype.getClients = async function(req: Request, res: Response) {
    try {
        const result: Client[] = await this.clientService.getClients()
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.send({message: "falha ao consultar clientes", error: e.message })
    }
}

ClientController.prototype.saveClient = async function(req: Request, res: Response) {
    try {
        const result: Client[] = await this.clientService.saveClient(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.send({message: "falha ao salvar cliente", error: e.message })
    }
}

ClientController.prototype.updateClient = async function(req: Request, res: Response) {
    try {
        const result: Client = await this.clientService.updateClient(req.body)
        res.send(result)
    } catch(e) {
        console.error(e.message)
        res.send({message: "falha ao atualizar cliente", error: e.message })
    }
}
const clientController = new (ClientController as any)
export { clientController } 

