import { Store } from "../model/store.model"
import { SkuInventory } from "../model/sku.inventory.model"
import { skuInventoryService } from "../services/sku.inventory.service"

function SkuInventoryController() {
    this.skuInventoryService = skuInventoryService
}

SkuInventoryController.prototype.getStore = function(user: any): Store {
    const store: Store = {
        id: user.store_id
    }
    return store
}

SkuInventoryController.prototype.getSkusInventory = async function(user: any): Promise<SkuInventory[]> {
    const store: Store = this.getStore(user)
    return this.skuInventoryService.getSkusInventory(store)
}

SkuInventoryController.prototype.getSkuInventory = async function(skuInventoryId: number, user: any): Promise<SkuInventory> {
    const store: Store = this.getStore(user)
    return this.skuInventoryService.getSkuInventory(skuInventoryId, store.id)
}

SkuInventoryController.prototype.updateSkuInventory = async function(skuInventory: SkuInventory, user: any) {
    const store = this.getStore(user)
    skuInventory.store = store
    return this.skuInventoryService.updateSkuInventory(skuInventory)
}


const skuInventoryController = new (SkuInventoryController as any)
export { skuInventoryController } 

