import { Company } from "../model/company.model"
import { SkuInventory } from "../model/sku.inventory.model"
import { skuInventoryService } from "../services/sku.inventory.service"

function SkuInventoryController() {
    this.skuInventoryService = skuInventoryService
}

SkuInventoryController.prototype.getCompany = function(user: any): Company {
    const company: Company = {
        id: user.company_id
    }
    return company
}

SkuInventoryController.prototype.getSkusInventory = async function(user: any): Promise<SkuInventory[]> {
    const company: Company = this.getCompany(user)
    return this.skuInventoryService.getSkusInventory(company)
}

SkuInventoryController.prototype.getSkuInventory = async function(skuInventoryId: number, user: any): Promise<SkuInventory> {
    const company: Company = this.getCompany(user)
    return this.skuInventoryService.getSkuInventory(skuInventoryId, company.id)
}

SkuInventoryController.prototype.updateSkuInventory = async function(skuInventory: SkuInventory, user: any) {
    const company = this.getCompany(user)
    skuInventory.company = company
    return this.skuInventoryService.updateSkuInventory(skuInventory)
}


const skuInventoryController = new (SkuInventoryController as any)
export { skuInventoryController } 

