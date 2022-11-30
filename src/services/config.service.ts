import { configRepository } from "../repository/config.repository"
import { Configs } from "../model/configs.model"

function ConfigsService() {
    this.configRepository = configRepository
}


ConfigsService.prototype.getConfig = async function(storeId: number) {
    try {
        const result = await this.configRepository.getConfig(storeId)        
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

ConfigsService.prototype.saveConfig = async function(config: Configs) {
    try {
        const result = await this.configRepository.saveConfig(config)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

ConfigsService.prototype.updateConfig = async function(config: Configs) {
    try {
        let pay = await this.getConfig(config.store.id)
        if(!pay)
            throw new Error("config nao encontrado")
        const result = await this.configRepository.updateConfig(config)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

ConfigsService.prototype.deleteConfig = async function(config: Configs) {
    try {
        let pay = await this.getConfig(config.store.id)
        if(!pay)
            throw new Error("config nao encontrado")
        await this.configRepository.deleteConfig(config)
        return {message: "config deletada"}
    } catch(e) {
        throw new Error(e.message)
    }
}

const configsService = new (ConfigsService as any)
export { configsService }
