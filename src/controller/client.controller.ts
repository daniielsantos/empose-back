import { Client } from "../model/client.model"
import { Store } from "../model/store.model"
import { clientService } from "../services/client.service"

function ClientController() {
    this.clientService = clientService
}
ClientController.prototype.getStore = function(user: any) {
    const store: Store = {
        id: user.store_id
    }
    return store
}

ClientController.prototype.getClients = async function(user: any): Promise<Client[]>{
    const store = this.getStore(user)
    return this.clientService.getClients(store)
}

ClientController.prototype.getClient = async function(clientId: number, user: any): Promise<Client> {
    let store = this.getStore(user)
    return this.clientService.getClient(clientId, store.id)
}

ClientController.prototype.saveClient = async function(client: Client, user: any): Promise<Client> {
    const store: Store = this.getStore(user)
    client.store = store
    return this.clientService.saveClient(client)
}

ClientController.prototype.updateClient = async function(client: Client, user: any): Promise<Client> {
    const store = this.getStore(user)
    client.store = store
    return this.clientService.updateClient(client)
}

ClientController.prototype.deleteClient = async function(client: Client, user: any): Promise<Client> {
    const store = this.getStore(user)
    client.store = store
    return this.clientService.deleteClient(client)
}

const clientController = new (ClientController as any)
export { clientController } 

