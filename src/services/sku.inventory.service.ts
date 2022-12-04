import { Store } from "../model/store.model"
import { SkuInventory } from "../model/sku.inventory.model"
import { skuInventoryRepository } from "../repository/sku.inventory"

function SkuInventoryService() {
    this.skuInventoryRepository = skuInventoryRepository
}

SkuInventoryService.prototype.getSkusInventory = async function(store: Store) {
    try {
        const result = await this.skuInventoryRepository.getSkusInventory(store.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}


SkuInventoryService.prototype.getSkuInventory = async function(skuInventoryId: number, storeId: number) {
    try {
        const result = await this.skuInventoryRepository.getSkuInventory(skuInventoryId, storeId)        
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuInventoryService.prototype.updateSkuInventory = async function(skuInventory: SkuInventory) {
    try {
        let pay = await this.getSkuInventory(skuInventory.sku.id, skuInventory.store.id)
        if(!pay)
            throw new Error("inventario nao encontrado")
        skuInventory.updated_at = new Date
        const result = await this.skuInventoryRepository.updateSkuInventory(skuInventory)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

const skuInventoryService = new (SkuInventoryService as any)
export { skuInventoryService }
