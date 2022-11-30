import { storeRepository } from "../repository/store.repository"
import { crypt } from "./bcrypt.service"
import { Store } from "../model/store.model"


function StoreService() {
    this.storeRepository = storeRepository
    this.bcrypt = crypt
}

StoreService.prototype.getStores = async function() {
    try {
        const result = await this.storeRepository.getStores()
        return result.rows
    } catch(e) {
        throw new Error("Falha ao buscar loja: "+ e.message)
    }
}

StoreService.prototype.getStore = async function(storeId: number) {
    try {
        const result = await this.storeRepository.getStore(storeId)
        return result.rows[0]
    } catch(e) {
        throw new Error("Falha ao buscar loja: "+ e.message)
    }
}

StoreService.prototype.saveStore = async function(store: Store) {
    try {        
        const result = await this.storeRepository.saveStore(store)
        return result.rows[0]
    } catch(e) {
        throw new Error("Falha ao inserir loja: "+ e.message)
    }
}

StoreService.prototype.updateStore = async function(store: Store) {
    try {        
        const comp = await this.getStore(store.id)
        if(!comp)
            throw new Error("loja nao encontrada")
        const result = await this.storeRepository.updateStore(store)
        return result.rows[0]
    } catch(e) {
        throw new Error("Falha ao atualizar empresa: "+ e.message)
    }
}

StoreService.prototype.deleteStore = async function(store: Store) {
    try {        
        const comp = await this.getStore(store.id)
        if(!comp)
            throw new Error("loja nao encontrada")
        await this.storeRepository.deleteStore(store)
        return {message: "loja deletada"}
    } catch(e) {
        throw new Error("Falha ao deletar loja: "+ e.message)
    }
}


const storeService = new (StoreService as any)
export { storeService }
