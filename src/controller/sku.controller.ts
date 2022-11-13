import { Company } from "../model/company.model"
import { Sku } from "../model/sku.model"
import { skuService } from "../services/sku.service"

function SkuController(this: any) {
    this.skuService = skuService
}
SkuController.prototype.getCompany = function(user: any) {
    const company: Company = {
        id: user.company_id
    }
    return company
}

SkuController.prototype.getSkus = async function(user: any): Promise<Sku[]>{
    const company = this.getCompany(user)
    return this.skuService.getSkus(company)
}

SkuController.prototype.getSku = async function(skuId: number, user: any): Promise<Sku> {
    const company = this.getCompany(user)
    return this.skuService.getSku(skuId, company.id)
}

SkuController.prototype.saveSku = async function(sku: Sku, user: any): Promise<Sku> {
    const company: Company = this.getCompany(user)
    sku.company = company
    return this.skuService.saveSku(sku)
}

SkuController.prototype.updateSku = async function(sku: Sku): Promise<Sku> {
    return this.skuService.updateSku(sku)
}

SkuController.prototype.deleteSku = async function(sku: Sku): Promise<Sku> {
    return this.skuService.deleteSku(sku)
}

const skuController = new (SkuController as any)
export { skuController } 

