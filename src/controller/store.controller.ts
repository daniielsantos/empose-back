import { storeService } from "../services/store.service"
import { Store } from "../model/store.model"
function StoreController() {
    this.storeService = storeService
}

StoreController.prototype.getStores = async function(): Promise<Store[]> {
    return this.storeService.getStores()
}
StoreController.prototype.getStore = async function(storeId: number): Promise<Store> {
    return this.storeService.getStore(storeId)
}

StoreController.prototype.saveStore = async function(store: Store): Promise<Store> {
    return this.storeService.saveStore(store)
}

StoreController.prototype.updateStore = async function(store: Store): Promise<Store> {
    return this.storeService.updateStore(store)
}

StoreController.prototype.deleteStore = async function(store: Store): Promise<void> {
    return this.storeService.deleteStore(store)
}

const storeController = new (StoreController as any)
export { storeController } 
