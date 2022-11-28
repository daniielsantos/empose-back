import { Company } from "../model/company.model"
import { Sku } from "../model/sku.model"
import { skuRepository } from "../repository/sku.repository"
import { productService } from "./product.service"




function SkuService() {
    this.skuRepository = skuRepository
    this.productService = productService
}

SkuService.prototype.getSkus = async function(company: Company) {
    try {
        const result = await this.skuRepository.getSkus(company.id)
        return result.rows
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.getSku = async function(skuId: number, companyId: number) {
    try {
        const result = await this.skuRepository.getSku(skuId, companyId)
        return result.rows[0]
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.saveSku = async function(sku: Sku) {
    try {
        sku.created_at = new Date
        let prod = await this.productService.getProduct(sku.product.id, sku.company.id)
        if(!prod)
            throw new Error("produto nao encontrado: insira um produto")
        const result = await this.skuRepository.saveSku(sku)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.updateSku = async function(sku: Sku) {
    try {
        let sk = await this.getSku(sku.id, sku.company.id)
        if(!sk)
            throw new Error("sku nao encontrado")
        sku.updated_at = new Date
        sku.product = sk.product        
        const result = await this.skuRepository.updateSku(sku)
        return result
    } catch(e) {
        throw new Error(e.message)
    }
}

SkuService.prototype.deleteSku = async function(sku: Sku) {
    try {
        let pay = await this.getSku(sku.id, sku.company.id)
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
