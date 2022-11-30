import { Store } from "../model/store.model"
import { configsService } from "../services/config.service"
import { Configs } from "../model/configs.model"

function ConfigController() {
    this.configsService = configsService
}

ConfigController.prototype.getStore = function(user: any): Store {
    const store: Store = {
        id: user.store_id
    }
    return store
}

ConfigController.prototype.getConfig = async function(user: any): Promise<Configs> {
    const store = this.getStore(user)
    return this.configsService.getConfig(store.id)
}

ConfigController.prototype.saveConfig = async function(config: Configs, user: any): Promise<Configs> {
    const store: Store = this.getStore(user)
    config.store = store
    return this.configsService.saveConfig(config)
}

ConfigController.prototype.updateConfig = async function(config: Configs, user: any) {
    const store: Store = this.getStore(user)
    config.store = store
    return this.configsService.updateConfig(config)
}

ConfigController.prototype.deleteConfig = async function(config: Configs, user: any) {
    const store = this.getStore(user)
    config.store = store
    return this.configsService.deleteConfig(config)
}

const configController = new (ConfigController as any)
export { configController } 

