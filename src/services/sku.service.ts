import { Company } from "../model/company.model"
import { Sku } from "../model/sku.model"
import { skuRepository } from "../repository/sku.repository"



function SkuService(this: any) {
    this.skuRepository = skuRepository
}

SkuService.prototype.getSkus = async function(company: Company) {
    try {
        const result = await this.skuRepository.getSkus(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.getSku = async function(skuId: number) {
    try {
        const result = await this.skuRepository.getSku(skuId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.saveSku = async function(sku: Sku) {
    try {
        sku.created_at = new Date
        const result = await this.skuRepository.saveSku(sku)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.updateSku = async function(sku: Sku) {
    try {
        let pay = await this.getSku(sku.id)
        if(!pay)
            throw new Error("sku nao encontrado")
        sku.updated_at = new Date
        const result = await this.skuRepository.updateSku(sku)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.deleteSku = async function(sku: Sku) {
    try {
        let pay = await this.getSku(sku.id)
        if(!pay)
            throw new Error("sku nao encontrado")
        await this.skuRepository.deleteSku(sku)
        return { message: "sku deletado" }
    } catch(e) {
        throw new Error(e.message)
    }
}

const skuService = new (SkuService as any)
export { skuService }
