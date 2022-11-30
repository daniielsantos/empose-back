import { Store } from "../model/store.model"
import { Sku } from "../model/sku.model"
import { skuService } from "../services/sku.service"

function SkuController() {
    this.skuService = skuService
}
SkuController.prototype.getStore = function(user: any) {
    const store: Store = {
        id: user.store_id
    }
    return store
}

SkuController.prototype.getSkus = async function(user: any): Promise<Sku[]>{
    const store = this.getStore(user)
    return this.skuService.getSkus(store)
}

SkuController.prototype.getSku = async function(skuId: number, user: any): Promise<Sku> {
    const store = this.getStore(user)
    return this.skuService.getSku(skuId, store.id)
}

SkuController.prototype.saveSku = async function(sku: Sku, user: any): Promise<Sku> {
    const store: Store = this.getStore(user)
    sku.store = store
    return this.skuService.saveSku(sku)
}

SkuController.prototype.updateSku = async function(sku: Sku, user: any): Promise<Sku> {
    const store = this.getStore(user)
    sku.store = store
    return this.skuService.updateSku(sku)
}

SkuController.prototype.deleteSku = async function(sku: Sku, user: any): Promise<Sku> {
    const store = this.getStore(user)
    sku.store = store
    return this.skuService.deleteSku(sku)
}

const skuController = new (SkuController as any)
export { skuController } 

